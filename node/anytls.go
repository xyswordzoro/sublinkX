package node

import (
	"fmt"
	"net/url"
	"strconv"
	"strings"
)

type Anytls struct {
	Name     string
	Password string
	Host     string
	Port     int
	Sni      string
	Insecure bool
	Fp       string
}

// AnyTLS 解码
// 链接格式: anytls://password@host:port/?sni=xxx&insecure=0&fp=chrome#name
func DecodeAnytlsURL(s string) (Anytls, error) {
	u, err := url.Parse(s)
	if err != nil {
		return Anytls{}, fmt.Errorf("解析失败的URL: %s", s)
	}
	if u.Scheme != "anytls" {
		return Anytls{}, fmt.Errorf("非anytls协议: %s", s)
	}

	password := u.User.Username()
	if p, ok := u.User.Password(); ok && p != "" {
		password = p
	}
	if decoded, err := url.QueryUnescape(password); err == nil {
		password = decoded
	}
	host := u.Hostname()
	port, _ := strconv.Atoi(u.Port())
	if port == 0 {
		port = 443
	}
	sni := u.Query().Get("sni")
	fp := u.Query().Get("fp")
	insecure := u.Query().Get("insecure") == "1" || strings.EqualFold(u.Query().Get("insecure"), "true") ||
		strings.EqualFold(u.Query().Get("allowInsecure"), "1")
	name := u.Fragment
	// 如果没有设置 Name，则使用 Host:Port 作为 Fragment
	if name == "" {
		name = host + ":" + u.Port()
	}
	if CheckEnvironment() {
		fmt.Println("password:", password)
		fmt.Println("server:", host)
		fmt.Println("port:", port)
		fmt.Println("sni:", sni)
		fmt.Println("insecure:", insecure)
		fmt.Println("fp:", fp)
		fmt.Println("name:", name)
	}
	return Anytls{
		Name:     name,
		Password: password,
		Host:     host,
		Port:     port,
		Sni:      sni,
		Insecure: insecure,
		Fp:       fp,
	}, nil
}

// 编码为 anytls:// 分享链接
func EncodeAnytlsURL(a Anytls) string {
	u := url.URL{
		Scheme: "anytls",
		User:   url.User(a.Password),
		Host:   fmt.Sprintf("%s:%d", a.Host, a.Port),
	}
	q := url.Values{}
	if a.Sni != "" {
		q.Set("sni", a.Sni)
	}
	if a.Insecure {
		q.Set("insecure", "1")
	}
	if a.Fp != "" {
		q.Set("fp", a.Fp)
	}
	u.RawQuery = q.Encode()
	u.Fragment = a.Name
	return u.String()
}
