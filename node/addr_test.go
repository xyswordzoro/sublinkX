package node

import "testing"

func TestGetNodeAddr(t *testing.T) {
	cases := []struct {
		link string
		host string
		port int
	}{
		{"anytls://8e4a02849dffd9852054b3f190b5c534@lax122.111777.xyz:30122?sni=lax122.111777.xyz#PPFlight-us", "lax122.111777.xyz", 30122},
		{"trojan://pass@example.com:443?sni=a.com#t", "example.com", 443},
		{"ss://YWVzLTI1Ni1nY206dGVzdDEyMw@1.2.3.4:8388#ss-node", "1.2.3.4", 8388},
		{"vmess://eyJhZGQiOiIzLjMuMy4zIiwicG9ydCI6IjQ0MyIsImlkIjoiYmRkIiwicHMiOiLlronlhbfkuIAiLCJzY3kiOiJhdXRvIn0=", "3.3.3.3", 443},
	}
	for _, c := range cases {
		host, port, err := GetNodeAddr(c.link)
		if err != nil {
			t.Errorf("%s: error %v", c.host, err)
			continue
		}
		if host != c.host || port != c.port {
			t.Errorf("%s: got %s:%d, want %s:%d", c.host, host, port, c.host, c.port)
		}
	}
}
