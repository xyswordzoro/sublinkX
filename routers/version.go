package routers

import (
	"sublink/api"

	"github.com/gin-gonic/gin"
)

func Version(r *gin.Engine, version string) {

	api.SetCurrentVersion(version) // 注入当前版本号供更新检查使用

	r.GET("/api/v1/version", func(c *gin.Context) {

		c.JSON(200, gin.H{
			"code": "00000",
			"data": version,
		})
	})
	// 检查是否有新版本（读取 GitHub 最新 Release）
	r.GET("/api/v1/version/check", api.UpdateCheck)
	// Telegram Bot 配置
	tg := r.Group("/api/v1/telegram")
	{
		tg.POST("/set", api.TGSet)
		tg.GET("/info", api.TGInfo)
		tg.POST("/stop", api.TGStop)
	}
}
