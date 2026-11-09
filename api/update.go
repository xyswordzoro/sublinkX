package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"
	"sync"
	"time"

	"sublink/models"

	"github.com/gin-gonic/gin"
)

const (
	repoLatestAPI = "https://api.github.com/repos/xyswordzoro/sublinkX/releases/latest"
	repoLatestURL = "https://github.com/xyswordzoro/sublinkX/releases/latest"
	updateTTL     = 30 * time.Minute // 结果缓存时长，避免频繁请求 GitHub
)

var (
	updateMu      sync.Mutex
	updateCache   UpdateInfo
	updateCacheAt time.Time
	updateCurrent string // 当前版本号，由路由注册时注入
)

// UpdateInfo 更新检查结果
type UpdateInfo struct {
	Current     string `json:"current"`     // 当前版本
	Latest      string `json:"latest"`      // 远端最新版本
	HasUpdate   bool   `json:"hasUpdate"`   // 是否有新版本
	URL         string `json:"url"`         // Release 页面地址
	Notes       string `json:"notes"`       // 更新摘要（Release 说明首行）
	PublishedAt string `json:"publishedAt"` // 发布时间
	Checked     bool   `json:"checked"`     // 本次是否成功获取远端信息
}

// SetCurrentVersion 注入当前版本号（main.go 启动时调用）
func SetCurrentVersion(v string) { updateCurrent = v }

// WarmUpdateCheck 启动时异步预热一次更新缓存
func WarmUpdateCheck() {
	info, err := fetchLatest()
	if err != nil {
		log.Println("[update] 启动检查更新失败:", err)
		return
	}
	updateMu.Lock()
	updateCache = info
	updateCacheAt = time.Now()
	updateMu.Unlock()
	if info.HasUpdate {
		log.Println("[update] 发现新版本 v" + info.Latest)
	}
}

// versionParts 解析 "v0.12" / "0.12.1" 为数字切片（非数字段按 0 处理）
func versionParts(v string) []int {
	v = strings.TrimPrefix(strings.TrimSpace(v), "v")
	parts := strings.Split(v, ".")
	nums := make([]int, 0, len(parts))
	for _, p := range parts {
		n := 0
		fmt.Sscanf(p, "%d", &n)
		nums = append(nums, n)
	}
	return nums
}

// versionLess 比较版本号 a < b
func versionLess(a, b []int) bool {
	for i := 0; i < len(a) || i < len(b); i++ {
		x, y := 0, 0
		if i < len(a) {
			x = a[i]
		}
		if i < len(b) {
			y = b[i]
		}
		if x != y {
			return x < y
		}
	}
	return false
}

// firstLine 取文本首个非空行并限长
func firstLine(s string) string {
	for _, line := range strings.Split(s, "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		line = strings.TrimSpace(line)
		for strings.HasPrefix(line, "#") { // 去掉 markdown 标题井号
			line = strings.TrimSpace(strings.TrimPrefix(line, "#"))
		}
		if len([]rune(line)) > 80 {
			line = string([]rune(line)[:80]) + "…"
		}
		return line
	}
	return ""
}

// fetchLatest 拉取 GitHub 最新 Release（网络走 Telegram 代理配置，留空直连）
func fetchLatest() (UpdateInfo, error) {
	info := UpdateInfo{Current: updateCurrent, URL: repoLatestURL}
	cfg := models.ReadConfig()
	transport := &http.Transport{}
	if cfg.TelegramProxy != "" {
		if pu, err := url.Parse(cfg.TelegramProxy); err == nil && pu.Scheme != "" {
			transport.Proxy = http.ProxyURL(pu)
		}
	}
	client := &http.Client{Timeout: 10 * time.Second, Transport: transport}

	req, err := http.NewRequest("GET", repoLatestAPI, nil)
	if err != nil {
		return info, err
	}
	req.Header.Set("Accept", "application/vnd.github+json")
	resp, err := client.Do(req)
	if err != nil {
		return info, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return info, fmt.Errorf("github api 返回状态 %d", resp.StatusCode)
	}
	var rel struct {
		TagName     string `json:"tag_name"`
		Body        string `json:"body"`
		HTMLURL     string `json:"html_url"`
		PublishedAt string `json:"published_at"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&rel); err != nil {
		return info, err
	}
	latest := strings.TrimPrefix(strings.TrimSpace(rel.TagName), "v")
	info.Latest = latest
	info.HasUpdate = versionLess(versionParts(info.Current), versionParts(latest))
	if rel.HTMLURL != "" {
		info.URL = rel.HTMLURL
	}
	info.Notes = firstLine(rel.Body)
	info.PublishedAt = rel.PublishedAt
	info.Checked = true
	return info, nil
}

// UpdateCheck GET /api/v1/version/check 带缓存地检查是否有新版本
func UpdateCheck(c *gin.Context) {
	updateMu.Lock()
	defer updateMu.Unlock()

	// 缓存过期则重新拉取；失败时回退旧缓存
	if updateCacheAt.IsZero() || time.Since(updateCacheAt) > updateTTL {
		if info, err := fetchLatest(); err != nil {
			log.Println("[update] 检查更新失败:", err)
		} else {
			updateCache = info
			updateCacheAt = time.Now()
		}
	}
	c.JSON(http.StatusOK, gin.H{"code": "00000", "data": updateCache})
}
