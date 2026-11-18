package telegram

import (
	"testing"
)

func TestParseSubscriptionBodyPlain(t *testing.T) {
	body := "anytls://pw@1.2.3.4:443?sni=a.com#HK-01\nanytls://pw@5.6.7.8:443?sni=b.com#JP-01\n"
	links := parseSubscriptionBody(body)
	if len(links) != 2 {
		t.Fatalf("明文列表解析出 %d 条，期望 2: %v", len(links), links)
	}
	if links[0] != "anytls://pw@1.2.3.4:443?sni=a.com#HK-01" {
		t.Fatalf("首条内容不符: %s", links[0])
	}
}

func TestParseSubscriptionBodyBase64(t *testing.T) {
	// 测试用假凭据（base64 "a:b"），非真实节点
	plain := "ss://YTpi@9.9.9.9:8388#US-01"
	body := "c3M6Ly9ZVHBpQDkuOS45Ljk6ODM4OCNVUy0wMQ=="
	links := parseSubscriptionBody(body)
	if len(links) != 1 || links[0] != plain {
		t.Fatalf("base64 解析结果不符: %v", links)
	}
}

func TestParseSubscriptionBodyClash(t *testing.T) {
	body := `proxies:
  - name: HK-01
    type: anytls
    server: 1.2.3.4
    port: 443
    password: secret
    sni: hk.example.com
    skip-cert-verify: true
  - name: US-01
    type: ss
    server: 5.6.7.8
    port: 8388
    cipher: aes-256-gcm
    password: pw123
  - name: 不支持协议
    type: wireguard
    server: 1.1.1.1
    port: 51820
`
	links := parseSubscriptionBody(body)
	if len(links) != 2 {
		t.Fatalf("Clash 解析出 %d 条，期望 2（wireguard 应跳过）: %v", len(links), links)
	}
	if !contains(links[0], "anytls://") || !contains(links[0], "1.2.3.4:443") {
		t.Fatalf("anytls 转换异常: %s", links[0])
	}
	if !contains(links[0], "HK-01") {
		t.Fatalf("节点名丢失: %s", links[0])
	}
	if !contains(links[1], "ss://") || !contains(links[1], "5.6.7.8:8388") {
		t.Fatalf("ss 转换异常: %s", links[1])
	}
}

func TestParseSubscriptionBodyEmpty(t *testing.T) {
	if links := parseSubscriptionBody("   \n\n  "); len(links) != 0 {
		t.Fatalf("空内容应返回空: %v", links)
	}
	if links := parseSubscriptionBody("hello world"); len(links) != 0 {
		t.Fatalf("无关内容应返回空: %v", links)
	}
}

func TestIsSubURL(t *testing.T) {
	yes := []string{"https://a.com/c/?token=x", "http://1.2.3.4:8000/sub"}
	no := []string{"anytls://pw@a.com:443", "ss://abc@a.com:1", "ftp://a.com/x", "not a url"}
	for _, s := range yes {
		if !isSubURL(s) {
			t.Errorf("应识别为订阅链接: %s", s)
		}
	}
	for _, s := range no {
		if isSubURL(s) {
			t.Errorf("不应识别为订阅链接: %s", s)
		}
	}
}

func contains(s, sub string) bool {
	return len(s) >= len(sub) && (func() bool {
		for i := 0; i+len(sub) <= len(s); i++ {
			if s[i:i+len(sub)] == sub {
				return true
			}
		}
		return false
	})()
}
