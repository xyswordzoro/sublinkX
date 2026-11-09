package api

import (
	"strings"

	"sublink/models"
	"sublink/telegram"

	"github.com/gin-gonic/gin"
)

// TGSet 保存 Telegram Bot 配置并立即生效
func TGSet(c *gin.Context) {
	token := c.PostForm("token")
	serverHost := c.PostForm("serverHost")
	proxy := strings.TrimSpace(c.PostForm("proxy"))
	cfg0 := models.ReadConfig()
	if token == "" && cfg0.TelegramBotToken == "" {
		c.JSON(400, gin.H{
			"code": "00001",
			"msg":  "bot token 不能为空",
		})
		return
	}
	// 简单校验 token 格式：数字:字符串
	if token != "" && len(token) < 10 {
		c.JSON(400, gin.H{
			"code": "00001",
			"msg":  "bot token 格式不正确",
		})
		return
	}
	if proxy != "" && !strings.Contains(proxy, "://") {
		c.JSON(400, gin.H{
			"code": "00001",
			"msg":  "代理地址格式不正确，应为 http://host:port 或 socks5://host:port",
		})
		return
	}
	if token == "" && cfg0.TelegramBotToken != "" {
		// token 留空：保持已配置的 token 不变，仅更新其他字段
		token = cfg0.TelegramBotToken
	}
	cfg := models.ReadConfig()
	cfg.TelegramBotToken = token
	cfg.TelegramServerHost = serverHost
	cfg.TelegramProxy = proxy // 显式覆盖，允许清空
	models.WriteConfig(cfg)
	telegram.Start(token)
	models.OpLogAdd("面板", "保存 Telegram 配置", "bot: "+maskToken(token)+", 代理: "+proxy)
	c.JSON(200, gin.H{
		"code": "00000",
		"msg":  "Telegram Bot 配置已保存并生效",
	})
}

// maskToken 脱敏显示 token，避免泄露
func maskToken(token string) string {
	if len(token) <= 12 {
		return "****"
	}
	return token[:6] + "****" + token[len(token)-4:]
}

// TGInfo 获取当前 Telegram Bot 配置状态（token 脱敏返回）
func TGInfo(c *gin.Context) {
	cfg := models.ReadConfig()
	info := gin.H{
		"configured": cfg.TelegramBotToken != "",
	}
	if cfg.TelegramBotToken != "" {
		info["botId"] = splitToken(cfg.TelegramBotToken)
		info["tokenMasked"] = maskToken(cfg.TelegramBotToken)
		info["serverHost"] = cfg.TelegramServerHost
		info["chatBound"] = cfg.TelegramChatID != 0 // 仅告知是否已绑定，不暴露会话 ID
		info["proxy"] = cfg.TelegramProxy
	}
	c.JSON(200, gin.H{
		"code": "00000",
		"data": info,
		"msg":  "ok",
	})
}

func splitToken(token string) string {
	for i := 0; i < len(token); i++ {
		if token[i] == ':' {
			return token[:i]
		}
	}
	return ""
}

// TGStop 停止 bot 轮询（用于清除配置后）
func TGStop(c *gin.Context) {
	telegram.Stop()
	c.JSON(200, gin.H{
		"code": "00000",
		"msg":  "Telegram Bot 已停止",
	})
}
