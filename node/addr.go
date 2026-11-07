package node

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/url"
	"strconv"
	"strings"
)

// GetNodeAddr 从任意协议的分享链接中提取服务器地址和端口（用于连通性测试）
func GetNodeAddr(link string) (string, int, error) {
	scheme := strings.Split(link, "://")[0]
	switch scheme {
	case "vmess":
		raw := link[len("vmess://"):]
		decoded := Base64Decode2(raw)
		var obj map[string]interface{}
		if err := json.Unmarshal([]byte(decoded), &obj); err != nil {
			return "", 0, fmt.Errorf("vmess json 解析失败")
		}
		add, _ := obj["add"].(string)
		port := 0
		switch v := obj["port"].(type) {
		case string:
			port, _ = strconv.Atoi(v)
		case float64:
			port = int(v)
		}
		if add == "" || port == 0 {
			return "", 0, fmt.Errorf("vmess 缺少地址或端口")
		}
		return add, port, nil
	}

	u, err := url.Parse(link)
	if err != nil {
		return "", 0, fmt.Errorf("链接解析失败")
	}
	host := u.Hostname()
	port := 0
	if scheme == "ss" {
		// ss 链接有两种格式，userinfo 可能是 base64(method:password)
		if host == "" {
			// ss://base64(method:pass@host:port)#name 旧格式
			raw := link[len("ss://"):]
			if i := strings.IndexAny(raw, "#?"); i >= 0 {
				raw = raw[:i]
			}
			decoded, err := base64.RawURLEncoding.DecodeString(IsBase64makeup(strings.TrimRight(raw, "=")))
			if err != nil {
				decoded, err = base64.StdEncoding.DecodeString(IsBase64makeup(strings.TrimRight(raw, "=")))
			}
			if err == nil && strings.Contains(string(decoded), "@") {
				parts := strings.SplitN(string(decoded), "@", 2)
				hp := parts[1]
				if j := strings.LastIndex(hp, ":"); j >= 0 {
					host = strings.Trim(hp[:j], "[]")
					port, _ = strconv.Atoi(hp[j+1:])
				}
			}
		}
	}
	if host == "" {
		return "", 0, fmt.Errorf("无法提取服务器地址")
	}
	if p := u.Port(); p != "" {
		port, _ = strconv.Atoi(p)
	}
	switch scheme {
	case "vmess", "trojan", "vless", "anytls":
		if port == 0 {
			port = 443
		}
	case "hy", "hysteria", "hy2", "hysteria2", "tuic":
		if port == 0 {
			port = 443
		}
	case "ss", "ssr":
		if port == 0 {
			port = 8388
		}
	default:
		if port == 0 {
			port = 443
		}
	}
	return host, port, nil
}
