package telegram

import (
	"os"
	"testing"
	"time"

	"sublink/models"
	"sublink/tpl"
)

// TestMain 切换到项目根目录（配置/模板按相对路径读取）
func TestMain(m *testing.M) {
	os.Chdir("..")
	os.Exit(m.Run())
}

// msgUpdate 构造文本消息
func msgUpdate(id int64, text string) *tgUpdate {
	upd := &tgUpdate{UpdateID: id}
	upd.Message = &struct {
		Chat struct {
			ID int64 `json:"id"`
		} `json:"chat"`
		Text string `json:"text"`
		Date int64  `json:"date"`
	}{}
	upd.Message.Chat.ID = chatID
	upd.Message.Text = text
	upd.Message.Date = time.Now().Unix()
	return upd
}

// cbUpdate 构造按钮回调
func cbUpdate(id int64, data string) *tgUpdate {
	upd := &tgUpdate{UpdateID: id}
	upd.CallbackQuery = &struct {
		ID   string `json:"id"`
		Data string `json:"data"`
		Message struct {
			Chat struct {
				ID int64 `json:"id"`
			} `json:"chat"`
			MessageID int64 `json:"message_id"`
			Date      int64 `json:"date"`
		} `json:"message"`
	}{}
	upd.CallbackQuery.ID = "cb" + time.Now().Format("150405.000000000")
	upd.CallbackQuery.Data = data
	upd.CallbackQuery.Message.Chat.ID = chatID
	upd.CallbackQuery.Message.MessageID = 100 + id
	upd.CallbackQuery.Message.Date = time.Now().Unix()
	return upd
}

var chatID int64

const e2eTpl = "e2e-test.yaml"

var e2eTplBody = `# E2E 测试模板
proxy-groups:
  - name: 测试组
    type: select
    proxies:
      - DIRECT

rules:
  - MATCH,测试组
`

// TestRuleE2E 走通真实 Telegram 交互流：/rule → 选模板 → 添加 → 确认 → 查看删除
// 注意：会向授权会话发送真实消息（演示用），操作对象是临时模板，结束后清理。
func TestRuleE2E(t *testing.T) {
	cfg := models.ReadConfig()
	if cfg.TelegramBotToken == "" || cfg.TelegramChatID == 0 {
		t.Skip("未配置 bot token 或会话，跳过端到端测试")
	}
	chatID = cfg.TelegramChatID
	httpClient = buildClient() // 应用代理
	if _, err := tpl.SafeFilePath(e2eTpl); err != nil {
		t.Fatal(err)
	}
	path, _ := tpl.SafeFilePath(e2eTpl)
	if err := os.WriteFile(path, []byte(e2eTplBody), 0666); err != nil {
		t.Fatal(err)
	}
	defer os.Remove(path)
	time.Sleep(200 * time.Millisecond)

	verify := func(want string) {
		t.Helper()
		res, err := tpl.ParseFile(e2eTpl)
		if err != nil {
			t.Fatal(err)
		}
		if len(res.Rules) == 0 || res.Rules[0] != want {
			t.Fatalf("规则验证失败, got %v want top=%s", res.Rules, want)
		}
	}

	var updID int64 = 910000
	// 1. /rule → 选模板 → 添加入口
	handleUpdate(tokenForTest(), msgUpdate(updID, "/rule"))
	updID++
	handleUpdate(tokenForTest(), cbUpdate(updID, "rtpl:"+e2eTpl))
	updID++
	handleUpdate(tokenForTest(), cbUpdate(updID, "radd:"+e2eTpl))
	updID++
	time.Sleep(300 * time.Millisecond)

	// 2. 简写内容 → 类型选择 → 目标选择 → 确认写入
	handleUpdate(tokenForTest(), msgUpdate(updID, "e2e-rule.example.com"))
	updID++
	handleUpdate(tokenForTest(), cbUpdate(updID, "rk:1")) // DOMAIN-SUFFIX
	updID++
	handleUpdate(tokenForTest(), cbUpdate(updID, "rt:0")) // DIRECT
	updID++
	time.Sleep(300 * time.Millisecond)
	handleUpdate(tokenForTest(), cbUpdate(updID, "rgo"))
	updID++
	time.Sleep(300 * time.Millisecond)
	verify("DOMAIN-SUFFIX,e2e-rule.example.com,DIRECT")

	// 3. 完整格式插入（应到最上面）
	handleUpdate(tokenForTest(), cbUpdate(updID, "radd:"+e2eTpl))
	updID++
	time.Sleep(200 * time.Millisecond)
	handleUpdate(tokenForTest(), msgUpdate(updID, "DOMAIN,e2e-full.example,测试组"))
	updID++
	time.Sleep(300 * time.Millisecond)
	handleUpdate(tokenForTest(), cbUpdate(updID, "rgo"))
	updID++
	time.Sleep(300 * time.Millisecond)
	verify("DOMAIN,e2e-full.example,测试组")

	// 4. MATCH 兜底格式（完整）应追加到末尾而非顶部
	handleUpdate(tokenForTest(), cbUpdate(updID, "radd:"+e2eTpl))
	updID++
	time.Sleep(200 * time.Millisecond)
	handleUpdate(tokenForTest(), msgUpdate(updID, "MATCH,测试组"))
	updID++
	time.Sleep(300 * time.Millisecond)
	handleUpdate(tokenForTest(), cbUpdate(updID, "rgo"))
	updID++
	time.Sleep(300 * time.Millisecond)
	res, _ := tpl.ParseFile(e2eTpl)
	if res.Rules[len(res.Rules)-1] != "MATCH,测试组" {
		t.Fatalf("MATCH 不在末尾: %v", res.Rules)
	}

	// 5. 查看并删除顶部规则
	handleUpdate(tokenForTest(), cbUpdate(updID, "rview:"+e2eTpl))
	updID++
	time.Sleep(300 * time.Millisecond)
	handleUpdate(tokenForTest(), cbUpdate(updID, "rdel:0:"+e2eTpl))
	updID++
	time.Sleep(300 * time.Millisecond)
	res, _ = tpl.ParseFile(e2eTpl)
	if res.Rules[0] != "DOMAIN-SUFFIX,e2e-rule.example.com,DIRECT" {
		t.Fatalf("删除后顶部规则异常: %v", res.Rules)
	}

	// 6. 取消会话
	handleUpdate(tokenForTest(), cbUpdate(updID, "rcancel"))
	sendMessage(cfg.TelegramBotToken, chatID, "🧪 /rule 端到端测试完成，临时模板已清理。", nil)
}

func tokenForTest() string {
	return models.ReadConfig().TelegramBotToken
}
