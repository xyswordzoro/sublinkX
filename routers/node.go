package routers

import (
	"sublink/api"

	"github.com/gin-gonic/gin"
)

func Nodes(r *gin.Engine) {
	NodesGroup := r.Group("/api/v1/nodes")
	{
		NodesGroup.POST("/add", api.NodeAdd)
		NodesGroup.DELETE("/delete", api.NodeDel)
		NodesGroup.GET("/get", api.NodeGet)
		NodesGroup.POST("/update", api.NodeUpdadte)

	}
	// 分组
	Group := NodesGroup.Group("/group")
	{
		Group.GET("/get", api.GroupNodeGet)  // 添加分组
		Group.POST("/set", api.GroupNodeSet) // 绑定创建分组
		// Group.DELETE("/delete", api.GroupNodeDel) // 删除分组
		// Group.POST("/update", api.GroupNodeUpdate) // 更新分组
	}
	// 延迟测试
	Lat := NodesGroup.Group("/latency")
	{
		Lat.POST("/test", api.NodeLatencyTest)       // 全量测速
		Lat.GET("/settings", api.LatencySettingsGet) // 获取测速设置
		Lat.POST("/settings", api.LatencySettingsSet) // 保存测速设置
		Lat.POST("/geo", api.NodeGeoTest)             // 国家归属测试
	}
}
