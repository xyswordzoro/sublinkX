package api

import (
	"fmt"
	"net"
	"net/http"
	"strconv"
	"sync"
	"time"

	"sublink/models"
	"sublink/node"

	"github.com/gin-gonic/gin"
)

const defaultLatencyURL = "https://cp.cloudflare.com/generate_204"

// LatencySettingsGet 获取延迟测试设置
func LatencySettingsGet(c *gin.Context) {
	cfg := models.ReadConfig()
	url := cfg.LatencyTestURL
	if url == "" {
		url = defaultLatencyURL
	}
	timeout := cfg.LatencyTimeoutMS
	if timeout <= 0 {
		timeout = 3000
	}
	c.JSON(200, gin.H{
		"code": "00000",
		"data": gin.H{"url": url, "timeout": timeout},
		"msg":  "ok",
	})
}

// LatencySettingsSet 保存延迟测试设置
func LatencySettingsSet(c *gin.Context) {
	url := c.PostForm("url")
	timeout, err := strconv.Atoi(c.PostForm("timeout"))
	if err != nil || timeout <= 0 || timeout > 60000 {
		c.JSON(400, gin.H{"code": "00001", "msg": "超时时间不合法（1-60000 毫秒）"})
		return
	}
	models.SetConfig(models.Config{LatencyTestURL: url, LatencyTimeoutMS: timeout})
	models.OpLogAdd("面板", "修改延迟设置", url+" / "+strconv.Itoa(timeout)+"ms")
	c.JSON(200, gin.H{"code": "00000", "msg": "延迟设置已保存"})
}

// NodeLatencyTest 对全部节点做 TCP 握手延迟测试并保存结果
func NodeLatencyTest(c *gin.Context) {
	cfg := models.ReadConfig()
	timeoutMS := cfg.LatencyTimeoutMS
	if timeoutMS <= 0 {
		timeoutMS = 3000
	}
	nodes, err := models.GetNodeList()
	if err != nil {
		c.JSON(500, gin.H{"code": "00001", "msg": "获取节点失败"})
		return
	}
	type result struct {
		ID      int `json:"id"`
		Latency int `json:"latency"` // -1 失败
	}
	results := make([]result, len(nodes))
	sem := make(chan struct{}, 10)
	var wg sync.WaitGroup
	d := time.Duration(timeoutMS) * time.Millisecond
	for i, n := range nodes {
		wg.Add(1)
		go func(idx int, nd models.Node) {
			defer wg.Done()
			sem <- struct{}{}
			defer func() { <-sem }()
			host, port, e := node.GetNodeAddr(nd.Link)
			if e != nil || host == "" {
				results[idx] = result{nd.ID, -1}
				return
			}
			start := time.Now()
			conn, e := net.DialTimeout("tcp", net.JoinHostPort(host, strconv.Itoa(port)), d)
			if e != nil {
				results[idx] = result{nd.ID, -1}
				return
			}
			conn.Close()
			results[idx] = result{nd.ID, int(time.Since(start).Milliseconds())}
		}(i, n)
	}
	wg.Wait()
	for i, n := range nodes {
		models.DB.Model(&models.Node{}).Where("id = ?", n.ID).Update("latency", results[i].Latency)
	}
	total := len(nodes)
	online := 0
	for _, r := range results {
		if r.Latency >= 0 {
			online++
		}
	}
	models.OpLogAdd("面板", "节点测速", fmt.Sprintf("%d/%d 可达", online, total))
	c.JSON(200, gin.H{"code": "00000", "data": results, "msg": "ok"})
}

var _ = http.StatusOK
