package telegram

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"

	"sublink/node"

	"gopkg.in/yaml.v3"
)

/* ---------------- 订阅链接导入 ---------------- */

// isSubURL 是否为 http(s) 订阅链接
func isSubURL(s string) bool {
	u, err := url.Parse(strings.TrimSpace(s))
	return err == nil && (u.Scheme == "http" || u.Scheme == "https") && u.Host != ""
}

// fetchSubscription 拉取订阅并解析为节点分享链接列表
func fetchSubscription(rawurl string) ([]string, error) {
	req, err := http.NewRequest("GET", rawurl, nil)
	if err != nil {
		return nil, fmt.Errorf("链接格式不正确")
	}
	// 使用中性 UA，多数面板会返回 base64 节点列表
	req.Header.Set("User-Agent", "SublinkX-Bot/1.0")
	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("拉取失败：%s", err.Error())
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("拉取失败：HTTP %d", resp.StatusCode)
	}
	body, err := io.ReadAll(io.LimitReader(resp.Body, 8<<20)) // 上限 8MB
	if err != nil {
		return nil, fmt.Errorf("读取内容失败")
	}
	links := parseSubscriptionBody(string(body))
	if len(links) == 0 {
		return nil, fmt.Errorf("未解析到节点（可能是 Clash 订阅且协议不受支持，或订阅为空）")
	}
	return links, nil
}

// parseSubscriptionBody 解析订阅内容：分享链接列表 / base64 / Clash YAML
func parseSubscriptionBody(body string) []string {
	trimmed := strings.TrimSpace(body)
	if trimmed == "" {
		return nil
	}
	// 1. Clash / mihomo YAML
	if strings.Contains(trimmed, "proxies:") {
		var cfg node.Config
		if err := yaml.Unmarshal([]byte(trimmed), &cfg); err == nil && len(cfg.Proxies) > 0 {
			var out []string
			for _, p := range cfg.Proxies {
				if link, ok := clashProxyToLink(p); ok {
					out = append(out, link)
				}
			}
			if len(out) > 0 {
				return out
			}
		}
	}
	// 2. 明文分享链接
	if links := extractShareLinks(trimmed); len(links) > 0 {
		return links
	}
	// 3. base64（含 URL-safe / 无补齐）
	if decoded := node.Base64Decode(trimmed); decoded != trimmed {
		if links := extractShareLinks(decoded); len(links) > 0 {
			return links
		}
	}
	return nil
}

// extractShareLinks 从文本中提取非 http(s) 的节点分享链接
func extractShareLinks(s string) []string {
	var out []string
	fields := strings.FieldsFunc(s, func(r rune) bool {
		return r == '\n' || r == '\r' || r == ' ' || r == '\t' || r == ','
	})
	for _, f := range fields {
		f = strings.TrimSpace(f)
		if !strings.Contains(f, "://") {
			continue
		}
		if isSubURL(f) {
			continue // 订阅链接本身不算节点
		}
		out = append(out, f)
	}
	return out
}

/* ---------------- Clash proxy → 分享链接 ---------------- */

func optStr(m map[string]interface{}, key string) string {
	if m == nil {
		return ""
	}
	if v, ok := m[key].(string); ok {
		return v
	}
	return ""
}

func optBool(m map[string]interface{}, key string) bool {
	if m == nil {
		return false
	}
	if v, ok := m[key].(bool); ok {
		return v
	}
	return false
}

// clashProxyToLink 将 Clash 节点转换为对应协议的分享链接
func clashProxyToLink(p node.Proxy) (string, bool) {
	switch strings.ToLower(p.Type) {
	case "ss":
		if p.Cipher == "" || p.Password == "" {
			return "", false
		}
		return node.EncodeSSURL(node.Ss{
			Param:  node.Param{Cipher: p.Cipher, Password: p.Password},
			Server: p.Server,
			Port:   p.Port,
			Name:   p.Name,
		}), true

	case "vmess":
		net := p.Network
		if net == "" {
			net = "tcp"
		}
		v := node.Vmess{
			Add:  p.Server,
			Port: p.Port,
			Id:   p.Uuid,
			Aid:  p.AlterId,
			Net:  net,
			Ps:   p.Name,
			Scy:  p.Cipher,
			Sni:  firstNonEmpty(p.Servername, p.Sni),
			Fp:   p.Client_fingerprint,
			V:    "2",
		}
		if p.Tls {
			v.Tls = "tls"
		}
		if p.Ws_opts != nil {
			v.Path = optStr(p.Ws_opts, "path")
			if h, ok := p.Ws_opts["headers"].(map[string]interface{}); ok {
				v.Host = firstNonEmpty(optStr(h, "Host"), optStr(h, "host"))
			}
		}
		if len(p.Alpn) > 0 {
			v.Alpn = strings.Join(p.Alpn, ",")
		}
		return node.EncodeVmessURL(v), true

	case "vless":
		q := node.VLESSQuery{
			Security:   "none",
			Type:       p.Network,
			Flow:       p.Flow,
			Sni:        firstNonEmpty(p.Servername, p.Sni),
			Fp:         p.Client_fingerprint,
			Pbk:        optStr(p.Reality_opts, "public-key"),
			Sid:        optStr(p.Reality_opts, "short-id"),
			HeaderType: p.Protocol,
		}
		if p.Tls || p.Reality_opts != nil {
			q.Security = "tls"
		}
		if p.Reality_opts != nil {
			q.Security = "reality"
		}
		if p.Ws_opts != nil {
			q.Path = optStr(p.Ws_opts, "path")
			if h, ok := p.Ws_opts["headers"].(map[string]interface{}); ok {
				q.Host = firstNonEmpty(optStr(h, "Host"), optStr(h, "host"))
			}
		}
		if p.Grpc_opts != nil {
			q.ServiceName = optStr(p.Grpc_opts, "grpc-service-name")
		}
		if len(p.Alpn) > 0 {
			q.Alpn = p.Alpn
		}
		return node.EncodeVLESSURL(node.VLESS{
			Name: p.Name, Uuid: p.Uuid, Server: p.Server, Port: p.Port, Query: q,
		}), true

	case "trojan":
		t := node.Trojan{
			Password: p.Password,
			Hostname: p.Server,
			Port:     p.Port,
			Name:     p.Name,
			Query: node.TrojanQuery{
				Sni:  firstNonEmpty(p.Servername, p.Sni),
				Fp:   p.Client_fingerprint,
				Host: p.Servername,
			},
		}
		if p.Skip_cert_verify {
			t.Query.AllowInsecure = 1
		}
		if p.Ws_opts != nil {
			t.Query.Type = "ws"
			t.Query.Path = optStr(p.Ws_opts, "path")
		}
		if len(p.Alpn) > 0 {
			t.Query.Alpn = p.Alpn
		}
		return node.EncodeTrojanURL(t), true

	case "anytls":
		return node.EncodeAnytlsURL(node.Anytls{
			Name:     p.Name,
			Password: p.Password,
			Host:     p.Server,
			Port:     p.Port,
			Sni:      firstNonEmpty(p.Servername, p.Sni),
			Insecure: p.Skip_cert_verify,
			Fp:       p.Client_fingerprint,
		}), true

	case "hysteria2", "hy2":
		h := node.HY2{
			Password:     firstNonEmpty(p.Password, p.Auth, p.Auth_str),
			Host:         p.Server,
			Port:         p.Port,
			Peer:         firstNonEmpty(p.Sni, p.Servername),
			Sni:          firstNonEmpty(p.Sni, p.Servername),
			UpMbps:       p.Up,
			DownMbps:     p.Down,
			Obfs:         p.Obfs,
			ObfsPassword: p.Obfs_password,
			Name:         p.Name,
		}
		if p.Skip_cert_verify {
			h.Insecure = 1
		}
		if len(p.Alpn) > 0 {
			h.ALPN = p.Alpn
		}
		return node.EncodeHY2URL(h), true
	}
	return "", false
}

func firstNonEmpty(vals ...string) string {
	for _, v := range vals {
		if v != "" {
			return v
		}
	}
	return ""
}
