package routers

import (
	"sublink/api"

	"github.com/gin-gonic/gin"
)

func Version(r *gin.Engine, version string) {

	r.GET("/api/v1/version", func(c *gin.Context) {

		c.JSON(200, gin.H{
			"code": "00000",
			"data": version,
		})
	})
	// Telegram Bot 配置
	tg := r.Group("/api/v1/telegram")
	{
		tg.POST("/set", api.TGSet)
		tg.GET("/info", api.TGInfo)
		tg.POST("/stop", api.TGStop)
	}
}
