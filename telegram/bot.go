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
	clientMu   sync.Mutex // 保护 httpClient（代理重建时会并发替换）
	httpClient = &http.Client{Timeout: 40 * time.Second}
	dialTimeo  = 3 * time.Second

	seenMu  sync.Mutex
	seenIDs = map[int64]bool{} // 已处理的 update_id，防止重复回复
)

// maxUpdateAge 超过此时间的历史消息不再回复（切换 bot / 长时间停机后避免旧消息刷屏）
const maxUpdateAge = 30 * time.Minute

// markSeen 记录 update_id；首次出现返回 true
func markSeen(id int64) bool {
	seenMu.Lock()
	defer seenMu.Unlock()
	if seenIDs[id] {
		return false
	}
	seenIDs[id] = true
	if len(seenIDs) > 2000 { // 简单防止无限增长
		seenIDs = map[int64]bool{id: true}
	}
	return true
}

func resetSeen() {
	seenMu.Lock()
	seenIDs = map[int64]bool{}
	seenMu.Unlock()
}

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
	// 切换 bot 后 update_id 序列完全变了，必须重置本地 offset：
	// 否则旧 token 的序号会让新 bot 的 getUpdates 直接"跳过"全部消息（表现为 bot 不响应）。
	offset = 0
	resetSeen()
	// 重建 HTTP 客户端以应用代理配置
	clientMu.Lock()
	httpClient = buildClient()
	clientMu.Unlock()
	// 注册命令菜单放后台执行，避免网络抖动阻塞轮询启动
	go registerCommands(token)
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
	{"command": "rule", "description": "模板规则管理"},
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
		Date int64  `json:"date"`
	} `json:"message"`
	CallbackQuery *struct {
		ID   string `json:"id"`
		Data string `json:"data"`
		// 回调消息自带 date；回调本身没有独立时间戳，用消息时间近似
		Message struct {
			Chat struct {
				ID int64 `json:"id"`
			} `json:"chat"`
			MessageID int64 `json:"message_id"`
			Date      int64 `json:"date"`
		} `json:"message"`
	} `json:"callback_query"`
}

// updateDate 取更新的时间戳（秒）
func updateDate(upd *tgUpdate) int64 {
	if upd.Message != nil {
		return upd.Message.Date
	}
	if upd.CallbackQuery != nil {
		return upd.CallbackQuery.Message.Date
	}
	return 0
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
	do := func(c *http.Client) (interface{}, error) {
		req, err := http.NewRequest("POST", apiBase+token+"/"+method, strings.NewReader(string(body)))
		if err != nil {
			return nil, fmt.Errorf("%s 请求构造失败: %s", method, maskTokenInErr(err.Error(), token))
		}
		req.Header.Set("Content-Type", "application/json")
		resp, err := c.Do(req)
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

	clientMu.Lock()
	c := httpClient
	clientMu.Unlock()

	result, err := do(c)
	if err == nil {
		return result, nil
	}
	// 连接层失败（多为代理重启/连接池失效）：重建客户端后重试一次。
	// 代理异常不会返回错误体，这类失败若不复建客户端会一直沿用坏连接。
	if isTransportErr(err) && clientRebuildDue() {
		clientMu.Lock()
		if tr, ok := c.Transport.(*http.Transport); ok {
			tr.CloseIdleConnections() // 释放旧连接，避免长期失败时堆积
		}
		httpClient = buildClient()
		c = httpClient
		lastRebuild = time.Now()
		clientMu.Unlock()
		if result2, err2 := do(c); err2 == nil {
			return result2, nil
		}
	}
	return nil, err
}

var lastRebuild time.Time

// clientRebuildDue 限制重建频率（10 秒内不重复重建），避免失败风暴时频繁建连
func clientRebuildDue() bool {
	clientMu.Lock()
	defer clientMu.Unlock()
	return time.Since(lastRebuild) > 10*time.Second
}

// isTransportErr 判断是否为连接层错误（可安全重试）
func isTransportErr(err error) bool {
	if err == nil {
		return false
	}
	msg := err.Error()
	for _, key := range []string{"请求失败", "connection", "EOF", "timeout", "reset", "refused", "proxyconnect"} {
		if strings.Contains(strings.ToLower(msg), strings.ToLower(key)) {
			return true
		}
	}
	return false
}

// maskTokenInErr 从错误信息中抹掉 bot token，避免日志泄露
func maskTokenInErr(msg, token string) string {
	if token != "" {
		msg = strings.ReplaceAll(msg, token, "<bot-token>")
	}
	return msg
}

// sendMessage 发送消息，返回消息 ID（失败返回 0），供会话流程追踪清理
func sendMessage(token string, chatID int64, text string, keyboard interface{}) int64 {
	params := map[string]interface{}{
		"chat_id":    chatID,
		"text":       text,
		"parse_mode": "HTML",
	}
	if keyboard != nil {
		params["reply_markup"] = keyboard
	}
	result, err := callAPI(token, "sendMessage", params)
	if err != nil {
		log.Println("[telegram] sendMessage:", err)
		return 0
	}
	if m, ok := result.(map[string]interface{}); ok {
		switch id := m["message_id"].(type) {
		case float64:
			return int64(id)
		case int64:
			return id
		}
	}
	return 0
}

// deleteMessage 删除消息（失败静默忽略，如消息已不存在）
func deleteMessage(token string, chatID, messageID int64) {
	if messageID <= 0 {
		return
	}
	if _, err := callAPI(token, "deleteMessage", map[string]interface{}{
		"chat_id":    chatID,
		"message_id": messageID,
	}); err != nil {
		log.Println("[telegram] deleteMessage:", err)
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
	fails := 0
	lastErr := ""
	for {
		select {
		case <-stop:
			return
		default:
		}
		params := map[string]interface{}{
			// 长轮询超时取较短值：部分代理会掐断长时间静默连接，
			// 5 秒既能降低空转开销，也能避免连接被中途断开。
			"timeout":         5,
			"offset":          offset + 1,
			"allowed_updates": []string{"message", "callback_query"},
		}
		result, err := callAPI(token, "getUpdates", params)
		if err != nil {
			fails++
			// 首次失败与每 20 次失败记录一次，避免日志刷屏
			if fails == 1 || fails%20 == 0 {
				msg := maskTokenInErr(err.Error(), token)
				if msg != lastErr || fails == 1 {
					log.Printf("[telegram] 轮询失败（第 %d 次）: %s", fails, msg)
					lastErr = msg
				}
			}
			// 同一 token 被多个实例轮询会持续 409，退避更久，避免请求风暴
			wait := 3 * time.Second
			if strings.Contains(err.Error(), "Conflict") {
				wait = 15 * time.Second
			}
			select {
			case <-stop:
				return
			case <-time.After(wait):
			}
			continue
		}
		if fails > 0 {
			log.Printf("[telegram] 轮询已恢复正常（此前失败 %d 次）", fails)
			fails = 0
			lastErr = ""
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
			// 去重：同一 update 只处理一次（重启/切换 token 后避免重复回复）
			if !markSeen(upd.UpdateID) {
				continue
			}
			// 过旧的历史消息直接丢弃，避免切换 bot 后把积压旧消息全部回复造成刷屏
			if d := updateDate(&upd); d > 0 && time.Since(time.Unix(d, 0)) > maxUpdateAge {
				log.Printf("[telegram] 跳过 %s 前的旧消息（update %d）",
					time.Unix(d, 0).Format("01-02 15:04"), upd.UpdateID)
				continue
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
	// 任意斜杠命令都会结束进行中的规则会话
	if strings.HasPrefix(text, "/") {
		ruleResetSession()
	}
	// 规则会话进行中时，普通文本作为规则内容处理
	if ruleIntercept(token, chatID, text) {
		return
	}
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
	case strings.HasPrefix(text, "/rule"):
		handleRule(token, chatID, strings.TrimSpace(strings.TrimPrefix(text, "/rule")))
	case strings.HasPrefix(text, "/"):
		sendMessage(token, chatID, "未知命令，发送 /help 查看用法。", nil)
	case strings.Contains(text, "://"):
		// 直接发送节点/订阅链接（未加 /add）时自动按添加处理
		handleAdd(token, chatID, "/add "+text)
	}
}

func helpText() string {
	return "🤖 SublinkX 节点管理机器人\n\n" +
		"/add 节点链接 — 添加节点（同名自动替换）\n" +
		"/list — 节点列表（点击查看详情）\n" +
		"/test — 测试节点连通性\n" +
		"/del — 删除节点（点击即删）\n" +
		"/sub — 获取订阅链接\n" +
		"/rule — 模板规则管理（添加/删除规则）\n\n" +
		"💡 也可以直接发送节点链接或订阅链接（无需命令）"
}

/* ---------------- /add ---------------- */

func handleAdd(token string, chatID int64, text string) {
	arg := strings.TrimSpace(strings.TrimPrefix(text, "/add"))
	if arg == "" {
		sendMessage(token, chatID,
			"用法：\n/add 节点链接\n/add 订阅链接\n\n"+
				"也支持直接发送链接（无需 /add）。\n"+
				"示例：/add anytls://password@host:443?sni=host#名称\n"+
				"　　　/add https://example.com/c/?token=xxx", nil)
		return
	}
	// 支持一次发送多条（逗号或换行分隔），订阅链接会展开为多个节点
	items := strings.FieldsFunc(arg, func(r rune) bool { return r == ',' || r == '\n' })
	var sb strings.Builder
	total := 0
	for _, item := range items {
		item = strings.TrimSpace(item)
		if item == "" || !strings.Contains(item, "://") {
			continue
		}
		if isSubURL(item) {
			sendMessage(token, chatID, "⏳ 正在拉取订阅…", nil)
			links, err := fetchSubscription(item)
			if err != nil {
				sb.WriteString("❌ 订阅导入失败：" + short(item) + "\n" + err.Error() + "\n\n")
				continue
			}
			sb.WriteString(fmt.Sprintf("📥 订阅解析出 %d 个节点\n\n", len(links)))
			for _, link := range links {
				sb.WriteString(addOneNode(link))
				total++
			}
			continue
		}
		sb.WriteString(addOneNode(item))
		total++
	}
	if sb.Len() == 0 {
		sendMessage(token, chatID, "未识别到有效的节点链接或订阅链接。", nil)
		return
	}
	if total > 0 {
		models.OpLogAdd("Telegram", "添加节点", fmt.Sprintf("共 %d 个，来源：%s", total, short(arg)))
	}
	out := strings.TrimRight(sb.String(), "\n")
	// Telegram 单条消息上限 4096 字符，超长截断提示
	if len([]rune(out)) > 3500 {
		out = string([]rune(out)[:3500]) + "\n\n…（内容过长已截断）"
	}
	sendMessage(token, chatID, out, nil)
}

// addOneNode 添加单个分享链接，返回结果文案
func addOneNode(link string) string {
	name, err := resolveNodeName(link)
	if err != nil {
		return "❌ 解析失败：" + short(link) + "\n" + err.Error() + "\n\n"
	}
	n := &models.Node{Name: name, Link: link}
	added, err := n.AddOrReplace()
	if err != nil {
		return "❌ 保存失败：" + name + "\n" + err.Error() + "\n\n"
	}
	if added {
		return "✅ 已添加节点：" + name + "\n\n"
	}
	return "🔄 已替换节点：" + name + "\n\n"
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
	// 规则管理回调（rtpl:/radd:/rview:/rdel:/rk:/rt:/rgo/rcancel/rfiles）
	if strings.HasPrefix(data, "r") && ruleCallback(token, chatID, messageID, cbID, data) {
		return
	}
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
