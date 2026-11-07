package routers

import (
	"sublink/api"

	"github.com/gin-gonic/gin"
)

func Logs(r *gin.Engine) {
	LogGroup := r.Group("/api/v1/logs")
	{
		LogGroup.GET("/get", api.LogsGet)
		LogGroup.POST("/clear", api.LogsClear)
	}
}
