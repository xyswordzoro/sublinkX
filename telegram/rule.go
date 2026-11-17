package telegram

import (
	"fmt"
	"strconv"
	"strings"
	"sync"

	"sublink/tpl"
)

/* ---------------- 会话状态 ---------------- */

type ruleSession struct {
	Step    string   // add_body: 等待规则内容 / add_kind: 等待类型 / add_target: 等待目标 / confirm: 等待确认
	File    string   // 目标模板文件
	Body    string   // 规则内容
	Kind    string   // 规则类型
	Target  string   // 目标策略
	Targets []string // 目标选择列表（回调里用下标）
}

var (
	ruleMu    sync.Mutex
	ruleSess  *ruleSession
	ruleKinds = []string{
		"DOMAIN", "DOMAIN-SUFFIX", "DOMAIN-KEYWORD", "DOMAIN-REGEX",
		"IP-CIDR", "IP-CIDR6", "GEOIP", "GEOSITE", "RULE-SET", "PROCESS-NAME",
	}
	builtinTargets = []string{"DIRECT", "REJECT"}
)

func ruleResetSession() {
	ruleMu.Lock()
	ruleSess = nil
	ruleMu.Unlock()
}

// ruleIntercept 会话进行中时拦截普通文本输入（返回 true 表示已处理）
func ruleIntercept(token string, chatID int64, text string) bool {
	ruleMu.Lock()
	s := ruleSess
	ruleMu.Unlock()
	if s == nil || s.Step != "add_body" || strings.HasPrefix(text, "/") {
		return false
	}
	ruleHandleBody(token, chatID, s, text)
	return true
}

/* ---------------- 命令入口 ---------------- */

// handleRule /rule [模板名] — 模板规则管理
func handleRule(token string, chatID int64, arg string) {
	ruleResetSession()
	if arg != "" {
		for _, t := range tpl.ListFiles() {
			if t.File == arg {
				renderRuleMenu(token, chatID, 0, arg)
				return
			}
		}
		sendMessage(token, chatID, "模板不存在："+arg, nil)
	}
	renderRuleFiles(token, chatID, 0)
}

func renderRuleFiles(token string, chatID int64, messageID int64) {
	files := tpl.ListFiles()
	if len(files) == 0 {
		sendOrEdit(token, chatID, messageID, "未找到任何模板文件，请先在面板创建。", nil)
		return
	}
	var rows [][]map[string]string
	var row []map[string]string
	for i, f := range files {
		row = append(row, kbButton("📄 "+f.File, "rtpl:"+f.File))
		if len(row) == 2 || i == len(files)-1 {
			rows = append(rows, row)
			row = nil
		}
	}
	sendOrEdit(token, chatID, messageID,
		fmt.Sprintf("🗂 选择要管理规则的模板（共 %d 个）：", len(files)), inlineKeyboard(rows))
}

func sendOrEdit(token string, chatID int64, messageID int64, text string, kb map[string]interface{}) {
	if messageID > 0 {
		editMessage(token, chatID, messageID, text, kb)
	} else {
		sendMessage(token, chatID, text, kb)
	}
}

func renderRuleMenu(token string, chatID int64, messageID int64, file string) {
	res, err := tpl.ParseFile(file)
	if err != nil {
		sendOrEdit(token, chatID, messageID, "❌ "+err.Error(), nil)
		return
	}
	if !res.IsYaml {
		sendOrEdit(token, chatID, messageID, "该模板不是可解析的 mihomo YAML，请在面板用原始文本编辑。", nil)
		return
	}
	text := fmt.Sprintf("🧩 模板：%s\n策略组 %d 个 · 规则 %d 条 · 规则集 %d 个",
		file, len(res.Groups), len(res.Rules), len(res.Providers))
	kb := inlineKeyboard([][]map[string]string{
		{kbButton("➕ 添加规则", "radd:"+file), kbButton("📋 查看规则", "rview:"+file)},
		{kbButton("🔙 重新选择模板", "rfiles")},
	})
	sendOrEdit(token, chatID, messageID, text, kb)
}

/* ---------------- 添加规则 ---------------- */

func ruleAskBody(token string, chatID int64, messageID int64, file string) {
	ruleMu.Lock()
	ruleSess = &ruleSession{Step: "add_body", File: file}
	ruleMu.Unlock()
	kb := inlineKeyboard([][]map[string]string{{kbButton("❌ 取消", "rcancel")}})
	sendOrEdit(token, chatID, messageID,
		"➕ 向模板「"+file+"」添加规则\n\n请发送规则，两种写法：\n"+
			"① 完整格式：DOMAIN,ads.example.com,REJECT\n"+
			"② 简写：只发内容，如 ads.example.com\n\n"+
			"新规则将插入到列表最上面（MATCH 兜底规则自动追加到末尾）。", kb)
}

// ruleHandleBody 处理用户发送的规则内容
func ruleHandleBody(token string, chatID int64, s *ruleSession, text string) {
	text = strings.TrimSpace(text)
	if text == "" {
		return
	}
	if strings.Contains(text, ",") {
		parts := strings.Split(text, ",")
		for i := range parts {
			parts[i] = strings.TrimSpace(parts[i])
		}
		kind := strings.ToUpper(parts[0])
		validKind := false
		for _, k := range ruleKinds {
			if k == kind {
				validKind = true
				break
			}
		}
		if kind == "MATCH" && len(parts) >= 2 {
			s.Kind = "MATCH"
			s.Target = parts[1]
			ruleConfirm(token, chatID, s)
			return
		}
		if !validKind || len(parts) < 3 {
			sendMessage(token, chatID,
				"❌ 格式不正确。完整格式示例：\nDOMAIN,ads.example.com,REJECT\n\n或只发内容简写，如：ads.example.com", nil)
			return
		}
		s.Kind = kind
		s.Body = parts[1]
		s.Target = parts[2]
		ruleConfirm(token, chatID, s)
		return
	}
	// 简写：只有内容，进入类型选择
	ruleMu.Lock()
	s.Body = text
	s.Step = "add_kind"
	ruleMu.Unlock()
	var rows [][]map[string]string
	var row []map[string]string
	for i, k := range ruleKinds {
		row = append(row, kbButton(k, "rk:"+strconv.Itoa(i)))
		if len(row) == 2 || i == len(ruleKinds)-1 {
			rows = append(rows, row)
			row = nil
		}
	}
	rows = append(rows, []map[string]string{kbButton("❌ 取消", "rcancel")})
	sendMessage(token, chatID, "选择规则类型：", inlineKeyboard(rows))
}

// ruleAskTarget 类型已定，展示目标策略选择
func ruleAskTarget(token string, chatID int64, s *ruleSession) {
	res, err := tpl.ParseFile(s.File)
	if err != nil {
		sendMessage(token, chatID, "❌ "+err.Error(), nil)
		return
	}
	targets := append([]string{}, builtinTargets...)
	for _, g := range res.Groups {
		if g.Name != "" {
			targets = append(targets, g.Name)
		}
	}
	ruleMu.Lock()
	s.Targets = targets
	s.Step = "add_target"
	ruleMu.Unlock()
	var rows [][]map[string]string
	var row []map[string]string
	for i, t := range targets {
		row = append(row, kbButton(t, "rt:"+strconv.Itoa(i)))
		if len(row) == 2 || i == len(targets)-1 {
			rows = append(rows, row)
			row = nil
		}
	}
	rows = append(rows, []map[string]string{kbButton("❌ 取消", "rcancel")})
	sendMessage(token, chatID,
		fmt.Sprintf("规则类型 %s，内容 %s\n选择目标策略组：", s.Kind, s.Body), inlineKeyboard(rows))
}

// ruleConfirm 显示确认卡片
func ruleConfirm(token string, chatID int64, s *ruleSession) {
	ruleMu.Lock()
	s.Step = "confirm"
	ruleMu.Unlock()
	var rule string
	if s.Kind == "MATCH" {
		rule = "MATCH," + s.Target
	} else {
		rule = s.Kind + "," + s.Body + "," + s.Target
	}
	pos := "插入到规则最上面"
	if s.Kind == "MATCH" {
		pos = "追加到规则末尾（兜底规则）"
	}
	kb := inlineKeyboard([][]map[string]string{
		{kbButton("✅ 确认添加", "rgo"), kbButton("❌ 取消", "rcancel")},
	})
	sendMessage(token, chatID,
		"📝 确认规则：\n<code>"+htmlEscape(rule)+"</code>\n\n"+pos+"\n目标模板："+s.File, kb)
}

// ruleSave 确认写入模板
func ruleSave(token string, chatID int64) {
	ruleMu.Lock()
	s := ruleSess
	ruleMu.Unlock()
	if s == nil || s.Step != "confirm" {
		sendMessage(token, chatID, "会话已失效，请重新发送 /rule。", nil)
		return
	}
	res, err := tpl.ParseFile(s.File)
	if err != nil {
		sendMessage(token, chatID, "❌ "+err.Error(), nil)
		return
	}
	var rule string
	if s.Kind == "MATCH" {
		rule = "MATCH," + s.Target
		res.Rules = append(res.Rules, rule)
	} else {
		rule = s.Kind + "," + s.Body + "," + s.Target
		res.Rules = append([]string{rule}, res.Rules...)
	}
	if err := tpl.SaveStruct(s.File, res.Groups, res.Rules, res.Providers, "Telegram"); err != nil {
		sendMessage(token, chatID, "❌ 保存失败："+err.Error(), nil)
		return
	}
	ruleResetSession()
	sendMessage(token, chatID,
		fmt.Sprintf("✅ 已添加规则\n<code>%s</code>\n\n模板「%s」现有 %d 条规则，订阅将即时生效。",
			htmlEscape(rule), s.File, len(res.Rules)), nil)
}

/* ---------------- 查看 / 删除规则 ---------------- */

const ruleViewCount = 10

func renderRuleView(token string, chatID int64, messageID int64, file string) {
	res, err := tpl.ParseFile(file)
	if err != nil {
		sendOrEdit(token, chatID, messageID, "❌ "+err.Error(), nil)
		return
	}
	if len(res.Rules) == 0 {
		sendOrEdit(token, chatID, messageID, "模板「"+file+"」暂无规则。", nil)
		return
	}
	var sb strings.Builder
	var rows [][]map[string]string
	var row []map[string]string
	n := len(res.Rules)
	if n > ruleViewCount {
		n = ruleViewCount
	}
	for i := 0; i < n; i++ {
		r := res.Rules[i]
		sb.WriteString(fmt.Sprintf("%d. <code>%s</code>\n", i+1, htmlEscape(short(r))))
		if isMatchRule(r) {
			sb.WriteString("　（兜底规则，不可删除）\n")
			continue
		}
		row = append(row, kbButton("🗑 "+strconv.Itoa(i+1), "rdel:"+strconv.Itoa(i)+":"+file))
		if len(row) == 4 || i == n-1 {
			rows = append(rows, row)
			row = nil
		}
	}
	rows = append(rows, []map[string]string{kbButton("🔙 返回", "rtpl:"+file)})
	note := ""
	if len(res.Rules) > ruleViewCount {
		note = fmt.Sprintf("\n\n仅显示前 %d 条（共 %d 条），更多请在面板查看。", ruleViewCount, len(res.Rules))
	}
	sendOrEdit(token, chatID, messageID,
		fmt.Sprintf("📋 模板「%s」规则：\n\n%s%s", file, sb.String(), note), inlineKeyboard(rows))
}

func isMatchRule(rule string) bool {
	return strings.HasPrefix(strings.ToUpper(strings.TrimSpace(rule)), "MATCH")
}

// ruleDelete 删除指定下标的规则并回写
func ruleDelete(token string, chatID int64, messageID int64, cbID, file string, idx int) {
	res, err := tpl.ParseFile(file)
	if err != nil {
		answerCallback(token, cbID, "模板读取失败")
		return
	}
	if idx < 0 || idx >= len(res.Rules) {
		answerCallback(token, cbID, "规则不存在")
		return
	}
	if isMatchRule(res.Rules[idx]) {
		answerCallback(token, cbID, "MATCH 兜底规则不可删除")
		return
	}
	res.Rules = append(res.Rules[:idx], res.Rules[idx+1:]...)
	if err := tpl.SaveStruct(file, res.Groups, res.Rules, res.Providers, "Telegram"); err != nil {
		answerCallback(token, cbID, "保存失败")
		sendMessage(token, chatID, "❌ 删除失败："+err.Error(), nil)
		return
	}
	answerCallback(token, cbID, "已删除")
	renderRuleView(token, chatID, messageID, file)
}

/* ---------------- 回调分发 ---------------- */

// ruleCallback 处理 rule:* 回调；返回 true 表示已处理
func ruleCallback(token string, chatID int64, messageID int64, cbID, data string) bool {
	switch {
	case data == "rfiles":
		ruleResetSession()
		renderRuleFiles(token, chatID, messageID)
		answerCallback(token, cbID, "")
	case strings.HasPrefix(data, "rtpl:"):
		ruleResetSession()
		renderRuleMenu(token, chatID, messageID, strings.TrimPrefix(data, "rtpl:"))
		answerCallback(token, cbID, "")
	case strings.HasPrefix(data, "radd:"):
		ruleAskBody(token, chatID, messageID, strings.TrimPrefix(data, "radd:"))
		answerCallback(token, cbID, "")
	case strings.HasPrefix(data, "rview:"):
		renderRuleView(token, chatID, messageID, strings.TrimPrefix(data, "rview:"))
		answerCallback(token, cbID, "")
	case strings.HasPrefix(data, "rdel:"):
		payload := strings.TrimPrefix(data, "rdel:")
		i := strings.Index(payload, ":")
		if i < 0 {
			answerCallback(token, cbID, "参数错误")
			return true
		}
		idx, _ := strconv.Atoi(payload[:i])
		ruleDelete(token, chatID, messageID, cbID, payload[i+1:], idx)
	case data == "rcancel":
		ruleResetSession()
		sendMessage(token, chatID, "已取消。发送 /rule 重新开始。", nil)
		answerCallback(token, cbID, "已取消")
	case strings.HasPrefix(data, "rk:"):
		ruleMu.Lock()
		s := ruleSess
		i, _ := strconv.Atoi(strings.TrimPrefix(data, "rk:"))
		if s == nil || s.Step != "add_kind" || i < 0 || i >= len(ruleKinds) {
			ruleMu.Unlock()
			answerCallback(token, cbID, "会话已失效，请重新发送 /rule")
			return true
		}
		s.Kind = ruleKinds[i]
		kind := s.Kind
		ruleMu.Unlock()
		if kind == "RULE-SET" {
			res, err := tpl.ParseFile(s.File)
			if err != nil || !hasProvider(res, s.Body) {
				sendMessage(token, chatID,
					"❌ 模板中不存在规则集「"+s.Body+"」。\n请先在面板模板编辑器里添加规则集（rule-providers），再用 RULE-SET 引用。", nil)
				answerCallback(token, cbID, "缺少规则集")
				return true
			}
		}
		ruleAskTarget(token, chatID, s)
		answerCallback(token, cbID, "")
	case strings.HasPrefix(data, "rt:"):
		ruleMu.Lock()
		s := ruleSess
		i, _ := strconv.Atoi(strings.TrimPrefix(data, "rt:"))
		if s == nil || s.Step != "add_target" || i < 0 || i >= len(s.Targets) {
			ruleMu.Unlock()
			answerCallback(token, cbID, "会话已失效，请重新发送 /rule")
			return true
		}
		s.Target = s.Targets[i]
		ruleMu.Unlock()
		ruleConfirm(token, chatID, s)
		answerCallback(token, cbID, "")
	case data == "rgo":
		ruleSave(token, chatID)
		answerCallback(token, cbID, "")
	}
	return true
}

func hasProvider(res tpl.TplStruct, name string) bool {
	for _, p := range res.Providers {
		if p.Name == name {
			return true
		}
	}
	return false
}
