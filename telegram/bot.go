package telegram

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"sync"
	"time"

	"sublink/models"
	"sublink/node"
)

const apiBase = "https://api.telegram.org/bot"

var (
	offset     int64
	stopCh     chan struct{}
	stopMutex  sync.Mutex
	httpClient = &http.Client{Timeout: 40 * time.Second}
	dialTimeo  = 3 * time.Second
)

// buildClient 按配置中的代理地址构建 HTTP 客户端（支持 http/socks5 代理）
func buildClient() *http.Client {
	cfg := models.ReadConfig()
	transport := &http.Transport{}
	if cfg.TelegramProxy != "" {
		if pu, err := url.Parse(cfg.TelegramProxy); err == nil && pu.Scheme != "" {
			transport.Proxy = http.ProxyURL(pu)
			log.Println("[telegram] 使用代理:", cfg.TelegramProxy)
		}
	}
	return &http.Client{Timeout: 40 * time.Second, Transport: transport}
}

// Start 启动 bot 长轮询（若已运行则先停止旧的）
func Start(token string) {
	Stop()
	if token == "" {
		return
	}
	// 重建 HTTP 客户端以应用代理配置
	httpClient = buildClient()
	// 注册命令菜单（Telegram 输入框上方/斜杠提示）
	registerCommands(token)
	stopMutex.Lock()
	stopCh = make(chan struct{})
	ch := stopCh
	stopMutex.Unlock()
	go pollLoop(token, ch)
	log.Println("[telegram] bot 已启动")
}

// botCommands 命令菜单（Telegram 中 "/" 提示列表）
var botCommands = []map[string]string{
	{"command": "add", "description": "添加节点（同名自动替换）"},
	{"command": "list", "description": "节点列表"},
	{"command": "test", "description": "测试节点连通性"},
	{"command": "del", "description": "删除节点"},
	{"command": "sub", "description": "获取订阅链接"},
	{"command": "help", "description": "使用帮助"},
}

// registerCommands 向 Telegram 注册命令菜单，失败不影响轮询
func registerCommands(token string) {
	_, err := callAPI(token, "setMyCommands", map[string]interface{}{
		"commands": botCommands,
	})
	if err != nil {
		log.Println("[telegram] 注册命令菜单失败:", err)
		return
	}
	log.Println("[telegram] 命令菜单已注册:", len(botCommands), "条")
}

// Stop 停止当前轮询
func Stop() {
	stopMutex.Lock()
	if stopCh != nil {
		close(stopCh)
		stopCh = nil
	}
	stopMutex.Unlock()
}

/* ---------------- Telegram API 调用 ---------------- */

type tgUpdate struct {
	UpdateID int64 `json:"update_id"`
	Message  *struct {
		Chat struct {
			ID int64 `json:"id"`
		} `json:"chat"`
		Text string `json:"text"`
	} `json:"message"`
	CallbackQuery *struct {
		ID   string `json:"id"`
		Data string `json:"data"`
		Message struct {
			Chat struct {
				ID int64 `json:"id"`
			} `json:"chat"`
			MessageID int64 `json:"message_id"`
		} `json:"message"`
	} `json:"callback_query"`
}

type tgResponse struct {
	OK          bool        `json:"ok"`
	Result      interface{} `json:"result"`
	Description string      `json:"description"`
}

func callAPI(token, method string, params interface{}) (interface{}, error) {
	body, err := json.Marshal(params)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequest("POST", apiBase+token+"/"+method, strings.NewReader(string(body)))
	if err != nil {
		return nil, fmt.Errorf("%s 请求构造失败: %s", method, maskTokenInErr(err.Error(), token))
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("%s 请求失败: %s", method, maskTokenInErr(err.Error(), token))
	}
	defer resp.Body.Close()
	var tr tgResponse
	if err := json.NewDecoder(resp.Body).Decode(&tr); err != nil {
		return nil, err
	}
	if !tr.OK {
		return nil, fmt.Errorf("telegram api %s: %s", method, tr.Description)
	}
	return tr.Result, nil
}

// maskTokenInErr 从错误信息中抹掉 bot token，避免日志泄露
func maskTokenInErr(msg, token string) string {
	if token != "" {
		msg = strings.ReplaceAll(msg, token, "<bot-token>")
	}
	return msg
}

func sendMessage(token string, chatID int64, text string, keyboard interface{}) {
	params := map[string]interface{}{
		"chat_id":    chatID,
		"text":       text,
		"parse_mode": "HTML",
	}
	if keyboard != nil {
		params["reply_markup"] = keyboard
	}
	if _, err := callAPI(token, "sendMessage", params); err != nil {
		log.Println("[telegram] sendMessage:", err)
	}
}

func editMessage(token string, chatID, messageID int64, text string, keyboard interface{}) {
	params := map[string]interface{}{
		"chat_id":    chatID,
		"message_id": messageID,
		"text":       text,
		"parse_mode": "HTML",
	}
	if keyboard != nil {
		params["reply_markup"] = keyboard
	}
	if _, err := callAPI(token, "editMessageText", params); err != nil {
		log.Println("[telegram] editMessageText:", err)
	}
}

func answerCallback(token, callbackID, text string) {
	params := map[string]interface{}{
		"callback_query_id": callbackID,
		"text":              text,
	}
	_, _ = callAPI(token, "answerCallbackQuery", params)
}

/* ---------------- 键盘 ---------------- */

func inlineKeyboard(rows [][]map[string]string) map[string]interface{} {
	return map[string]interface{}{"inline_keyboard": rows}
}

func kbButton(text, data string) map[string]string {
	return map[string]string{"text": text, "callback_data": data}
}

/* ---------------- 长轮询 ---------------- */

func pollLoop(token string, stop chan struct{}) {
	for {
		select {
		case <-stop:
			return
		default:
		}
		params := map[string]interface{}{
			"timeout":         25,
			"offset":          offset + 1,
			"allowed_updates": []string{"message", "callback_query"},
		}
		result, err := callAPI(token, "getUpdates", params)
		if err != nil {
			select {
			case <-stop:
				return
			case <-time.After(3 * time.Second):
			}
			continue
		}
		updates, ok := result.([]interface{})
		if !ok {
			continue
		}
		for _, u := range updates {
			raw, _ := json.Marshal(u)
			var upd tgUpdate
			if json.Unmarshal(raw, &upd) != nil {
				continue
			}
			if upd.UpdateID > offset {
				offset = upd.UpdateID
			}
			select {
			case <-stop:
				return
			default:
			}
			handleUpdate(token, &upd)
		}
	}
}

/* ---------------- 授权 ---------------- */

func isAuthorized(chatID int64) bool {
	cfg := models.ReadConfig()
	if cfg.TelegramChatID == 0 {
		// 首次对话自动绑定会话
		models.SetConfig(models.Config{TelegramChatID: chatID})
		log.Println("[telegram] 已绑定会话:", chatID)
		return true
	}
	return cfg.TelegramChatID == chatID
}

func handleUpdate(token string, upd *tgUpdate) {
	if upd.CallbackQuery != nil {
		cb := upd.CallbackQuery
		if !isAuthorized(cb.Message.Chat.ID) {
			answerCallback(token, cb.ID, "未授权的会话")
			return
		}
		handleCallback(token, cb.Message.Chat.ID, cb.Message.MessageID, cb.ID, cb.Data)
		return
	}
	if upd.Message == nil {
		return
	}
	chatID := upd.Message.Chat.ID
	if !isAuthorized(chatID) {
		sendMessage(token, chatID, "⛔ 未授权的会话，无法使用此机器人。", nil)
		return
	}
	text := strings.TrimSpace(upd.Message.Text)
	switch {
	case text == "/start" || text == "/help":
		sendMessage(token, chatID, helpText(), nil)
	case strings.HasPrefix(text, "/add"):
		handleAdd(token, chatID, text)
	case text == "/list":
		handleList(token, chatID)
	case text == "/test":
		handleTest(token, chatID)
	case text == "/del":
		handleDel(token, chatID)
	case text == "/sub" || text == "/link":
		handleSub(token, chatID)
	case strings.HasPrefix(text, "/"):
		sendMessage(token, chatID, "未知命令，发送 /help 查看用法。", nil)
	}
}

func helpText() string {
	return "🤖 SublinkX 节点管理机器人\n\n" +
		"/add 节点链接 — 添加节点（同名自动替换）\n" +
		"/list — 节点列表（点击查看详情）\n" +
		"/test — 测试节点连通性\n" +
		"/del — 删除节点（点击即删）\n" +
		"/sub — 获取订阅链接"
}

/* ---------------- /add ---------------- */

func handleAdd(token string, chatID int64, text string) {
	arg := strings.TrimSpace(strings.TrimPrefix(text, "/add"))
	if arg == "" {
		sendMessage(token, chatID, "用法：/add 节点链接\n例如：/add anytls://password@host:443?sni=host#名称", nil)
		return
	}
	// 支持一次发送多条链接（逗号或换行分隔）
	links := strings.FieldsFunc(arg, func(r rune) bool { return r == ',' || r == '\n' })
	var sb strings.Builder
	for _, link := range links {
		link = strings.TrimSpace(link)
		if link == "" || !strings.Contains(link, "://") {
			continue
		}
		name, err := resolveNodeName(link)
		if err != nil {
			sb.WriteString("❌ 解析失败：" + short(link) + "\n" + err.Error() + "\n\n")
			continue
		}
		n := &models.Node{Name: name, Link: link}
		added, err := n.AddOrReplace()
		if err != nil {
			sb.WriteString("❌ 保存失败：" + name + "\n" + err.Error() + "\n\n")
			continue
		}
		if added {
			sb.WriteString("✅ 已添加节点：" + name + "\n\n")
		} else {
			sb.WriteString("🔄 已替换节点：" + name + "\n\n")
		}
	}
	if sb.Len() == 0 {
		sendMessage(token, chatID, "未识别到有效的节点链接。", nil)
		return
	}
	models.OpLogAdd("Telegram", "添加节点", short(strings.TrimSpace(strings.TrimPrefix(text, "/add"))))
	sendMessage(token, chatID, strings.TrimRight(sb.String(), "\n"), nil)
}

// resolveNodeName 复用后端各协议解码器提取节点名
func resolveNodeName(link string) (string, error) {
	u, err := url.Parse(link)
	if err != nil {
		return "", fmt.Errorf("链接格式不正确")
	}
	var name string
	switch u.Scheme {
	case "ss":
		ss, err := node.DecodeSSURL(link)
		if err != nil {
			return "", err
		}
		name = ss.Name
	case "ssr":
		ssr, err := node.DecodeSSRURL(link)
		if err != nil {
			return "", err
		}
		name = ssr.Qurey.Remarks
	case "trojan":
		t, err := node.DecodeTrojanURL(link)
		if err != nil {
			return "", err
		}
		name = t.Name
	case "vmess":
		v, err := node.DecodeVMESSURL(link)
		if err != nil {
			return "", err
		}
		name = v.Ps
	case "vless":
		v, err := node.DecodeVLESSURL(link)
		if err != nil {
			return "", err
		}
		name = v.Name
	case "hy", "hysteria":
		h, err := node.DecodeHYURL(link)
		if err != nil {
			return "", err
		}
		name = h.Name
	case "hy2", "hysteria2":
		h, err := node.DecodeHY2URL(link)
		if err != nil {
			return "", err
		}
		name = h.Name
	case "tuic":
		t, err := node.DecodeTuicURL(link)
		if err != nil {
			return "", err
		}
		name = t.Name
	case "anytls":
		a, err := node.DecodeAnytlsURL(link)
		if err != nil {
			return "", err
		}
		name = a.Name
	default:
		return "", fmt.Errorf("不支持的协议: %s", u.Scheme)
	}
	if name != "" {
		return name, nil
	}
	// 没有名字则用 服务器:端口
	host, port, err := node.GetNodeAddr(link)
	if err != nil || host == "" {
		return "", fmt.Errorf("无法从链接中解析节点名")
	}
	return host + ":" + strconv.Itoa(port), nil
}

func short(s string) string {
	if len(s) > 40 {
		return s[:40] + "…"
	}
	return s
}

/* ---------------- /list ---------------- */

func handleList(token string, chatID int64) {
	nodes := mustNodes()
	if len(nodes) == 0 {
		sendMessage(token, chatID, "暂无节点。发送 /add 节点链接 添加。", nil)
		return
	}
	var rows [][]map[string]string
	var row []map[string]string
	for i, n := range nodes {
		row = append(row, kbButton(n.Name, "node:"+strconv.Itoa(int(n.ID))))
		if len(row) == 2 || i == len(nodes)-1 {
			rows = append(rows, row)
			row = nil
		}
	}
	sendMessage(token, chatID, fmt.Sprintf("📋 节点列表（共 %d 个，点击查看详情）：", len(nodes)), inlineKeyboard(rows))
}

func handleCallback(token string, chatID int64, messageID int64, cbID, data string) {
	switch {
	case strings.HasPrefix(data, "node:"):
		idStr := strings.TrimPrefix(data, "node:")
		id, _ := strconv.Atoi(idStr)
		for _, n := range mustNodes() {
			if int(n.ID) == id {
				groups := ""
				for _, g := range n.GroupNodes {
					if groups != "" {
						groups += ", "
					}
					groups += g.Name
				}
				if groups == "" {
					groups = "无"
				}
				text := fmt.Sprintf("🔎 节点详情\n\n名称：%s\n分组：%s\n链接：\n<code>%s</code>",
					htmlEscape(n.Name), htmlEscape(groups), htmlEscape(n.Link))
				editMessage(token, chatID, messageID, text, nil)
				answerCallback(token, cbID, "已加载详情")
				return
			}
		}
		answerCallback(token, cbID, "节点不存在")
	case strings.HasPrefix(data, "del:"):
		idStr := strings.TrimPrefix(data, "del:")
		id, _ := strconv.Atoi(idStr)
		var found *models.Node
		for i := range mustNodes() {
			if int(mustNodes()[i].ID) == id {
				found = &mustNodes()[i]
				break
			}
		}
		if found == nil {
			answerCallback(token, cbID, "节点不存在")
			return
		}
		if err := found.Del(); err != nil {
			answerCallback(token, cbID, "删除失败")
			return
		}
		models.OpLogAdd("Telegram", "删除节点", found.Name)
		answerCallback(token, cbID, "已删除")
		renderDelList(token, chatID, messageID)
	default:
		answerCallback(token, cbID, "")
	}
}

func renderDelList(token string, chatID int64, messageID int64) {
	nodes := mustNodes()
	if len(nodes) == 0 {
		editMessage(token, chatID, messageID, "✅ 已删除。当前暂无节点。", nil)
		return
	}
	var rows [][]map[string]string
	var row []map[string]string
	for i, n := range nodes {
		row = append(row, kbButton("🗑 "+n.Name, "del:"+strconv.Itoa(int(n.ID))))
		if len(row) == 2 || i == len(nodes)-1 {
			rows = append(rows, row)
			row = nil
		}
	}
	editMessage(token, chatID, messageID,
		fmt.Sprintf("🗑 点击节点名称删除（共 %d 个）：", len(nodes)), inlineKeyboard(rows))
}

func mustNodes() []models.Node {
	ns, _ := models.GetNodeList()
	return ns
}

/* ---------------- /test ---------------- */

type testResult struct {
	name   string
	ok     bool
	ms     int64
	errMsg string
}

func handleTest(token string, chatID int64) {
	nodes := mustNodes()
	if len(nodes) == 0 {
		sendMessage(token, chatID, "暂无节点。发送 /add 节点链接 添加。", nil)
		return
	}
	sendMessage(token, chatID, fmt.Sprintf("⏳ 正在测试 %d 个节点的连通性（TCP 握手，超时 3 秒）…", len(nodes)), nil)

	results := make([]testResult, len(nodes))
	sem := make(chan struct{}, 5)
	var wg sync.WaitGroup
	for i, n := range nodes {
		wg.Add(1)
		go func(idx int, node models.Node) {
			defer wg.Done()
			sem <- struct{}{}
			defer func() { <-sem }()
			results[idx] = testNode(node)
		}(i, n)
	}
	wg.Wait()

	var sb strings.Builder
	online := 0
	for _, r := range results {
		if r.ok {
			online++
			sb.WriteString(fmt.Sprintf("✅ %s — %dms\n", htmlEscape(r.name), r.ms))
		} else {
			sb.WriteString(fmt.Sprintf("❌ %s — %s\n", htmlEscape(r.name), r.errMsg))
		}
	}
	sendMessage(token, chatID,
		fmt.Sprintf("📊 连通性测试完成（%d/%d 可达）：\n\n%s", online, len(nodes), sb.String()), nil)
}

func testNode(n models.Node) testResult {
	host, port, err := node.GetNodeAddr(n.Link)
	if err != nil {
		return testResult{name: n.Name, errMsg: "无法解析地址"}
	}
	start := time.Now()
	conn, err := net.DialTimeout("tcp", net.JoinHostPort(host, strconv.Itoa(port)), dialTimeo)
	if err != nil {
		msg := "连接失败"
		if strings.Contains(err.Error(), "i/o timeout") {
			msg = "连接超时"
		} else if strings.Contains(err.Error(), "connection refused") {
			msg = "连接被拒绝"
		}
		return testResult{name: n.Name, errMsg: msg}
	}
	conn.Close()
	return testResult{name: n.Name, ok: true, ms: time.Since(start).Milliseconds()}
}

/* ---------------- /del ---------------- */

func handleDel(token string, chatID int64) {
	nodes := mustNodes()
	if len(nodes) == 0 {
		sendMessage(token, chatID, "暂无节点。", nil)
		return
	}
	sendMessage(token, chatID,
		fmt.Sprintf("🗑 点击节点名称删除（共 %d 个）：", len(nodes)), delKeyboard(nodes))
}

func delKeyboard(nodes []models.Node) map[string]interface{} {
	var rows [][]map[string]string
	var row []map[string]string
	for i, n := range nodes {
		row = append(row, kbButton("🗑 "+n.Name, "del:"+strconv.Itoa(int(n.ID))))
		if len(row) == 2 || i == len(nodes)-1 {
			rows = append(rows, row)
			row = nil
		}
	}
	return inlineKeyboard(rows)
}

/* ---------------- /sub ---------------- */

// normalizeServerHost 规范化订阅链接地址：
// 带协议前缀（如 https://example.com:2022）则原样使用，否则默认补 http://
func normalizeServerHost(host string) string {
	host = strings.TrimRight(strings.TrimSpace(host), "/")
	if host == "" {
		return "http://127.0.0.1:8000"
	}
	if !strings.Contains(host, "://") {
		host = "http://" + host
	}
	return host
}

func handleSub(token string, chatID int64) {
	var sub models.Subcription
	subs, err := sub.List()
	if err != nil || len(subs) == 0 {
		sendMessage(token, chatID, "暂无订阅。请先在面板上创建订阅。", nil)
		return
	}
	cfg := models.ReadConfig()
	host := normalizeServerHost(cfg.TelegramServerHost)
	var sb strings.Builder
	for _, s := range subs {
		base := host + "/c/?token=" + fmt.Sprintf("%x", md5.Sum([]byte(s.Name)))
		sb.WriteString("📡 <b>" + htmlEscape(s.Name) + "</b>\n")
		sb.WriteString("通用：<code>" + base + "</code>\n")
		sb.WriteString("Clash：<code>" + base + "&amp;client=clash</code>\n\n")
	}
	sendMessage(token, chatID, strings.TrimRight(sb.String(), "\n"), nil)
}

func htmlEscape(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	return s
}
