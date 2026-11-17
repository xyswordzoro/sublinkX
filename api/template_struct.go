package api

import (
	"encoding/json"
	"strings"

	"sublink/tpl"

	"github.com/gin-gonic/gin"
)

// 模板可视化编辑的结构化解析与回写：引擎在 sublink/tpl 包，此处仅做 HTTP 封装。

// TplParse GET /api/v1/template/parse?file=xxx
func TplParse(c *gin.Context) {
	name := c.Query("file")
	res, err := tpl.ParseFile(name)
	if err != nil {
		status := 400
		if err.Error() == "模板不存在" {
			status = 404
		}
		c.JSON(status, gin.H{"code": "00001", "msg": err.Error()})
		return
	}
	c.JSON(200, gin.H{"code": "00000", "data": res, "msg": "ok"})
}

// TplSaveStruct POST /api/v1/template/save
// form: file, groups(JSON), rules(JSON), providers(JSON)
func TplSaveStruct(c *gin.Context) {
	name := c.PostForm("file")
	groupsJSON := c.PostForm("groups")
	rulesJSON := c.PostForm("rules")
	if name == "" {
		c.JSON(400, gin.H{"code": "00001", "msg": "文件名不能为空"})
		return
	}
	var groups []tpl.TplGroup
	if err := json.Unmarshal([]byte(groupsJSON), &groups); err != nil {
		c.JSON(400, gin.H{"code": "00001", "msg": "策略组数据格式错误"})
		return
	}
	var rules []string
	if err := json.Unmarshal([]byte(rulesJSON), &rules); err != nil {
		c.JSON(400, gin.H{"code": "00001", "msg": "规则数据格式错误"})
		return
	}
	var providers []tpl.TplProvider
	if pj := c.PostForm("providers"); pj != "" {
		if err := json.Unmarshal([]byte(pj), &providers); err != nil {
			c.JSON(400, gin.H{"code": "00001", "msg": "规则集数据格式错误"})
			return
		}
	}
	if err := tpl.SaveStruct(name, groups, rules, providers, "面板"); err != nil {
		status := 500
		if strings.HasPrefix(err.Error(), "模板不存在") {
			status = 404
		} else if !strings.HasPrefix(err.Error(), "生成 YAML") && !strings.HasPrefix(err.Error(), "写入") {
			status = 400
		}
		c.JSON(status, gin.H{"code": "00001", "msg": err.Error()})
		return
	}
	c.JSON(200, gin.H{
		"code": "00000",
		"msg":  "保存成功",
		"data": gin.H{"file": name, "groups": len(groups), "rules": len(rules), "providers": len(providers)},
	})
}
