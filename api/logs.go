package api

import (
	"strconv"

	"sublink/models"

	"github.com/gin-gonic/gin"
)

// LogsGet 获取最近的操作日志
func LogsGet(c *gin.Context) {
	limit := 200
	if l := c.Query("limit"); l != "" {
		if n, err := strconv.Atoi(l); err == nil && n > 0 && n <= 1000 {
			limit = n
		}
	}
	logs, err := models.OpLogList(limit)
	if err != nil {
		c.JSON(500, gin.H{"msg": "获取日志失败"})
		return
	}
	c.JSON(200, gin.H{
		"code": "00000",
		"data": logs,
		"msg":  "ok",
	})
}

// LogsClear 清空操作日志
func LogsClear(c *gin.Context) {
	if err := models.OpLogClear(); err != nil {
		c.JSON(500, gin.H{"msg": "清空失败"})
		return
	}
	models.OpLogAdd("面板", "清空日志", "")
	c.JSON(200, gin.H{
		"code": "00000",
		"msg":  "清空成功",
	})
}
