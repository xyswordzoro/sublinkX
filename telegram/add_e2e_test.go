package telegram

import (
	"encoding/base64"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"sublink/models"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// fakeTGRoundTripper 拦截 Telegram API 请求（避免测试真连外网），其余请求走真实网络
type fakeTGRoundTripper struct{}

func (fakeTGRoundTripper) RoundTrip(r *http.Request) (*http.Response, error) {
	if strings.Contains(r.URL.Host, "telegram.org") {
		body := `{"ok":true,"result":{"message_id":1}}`
		return &http.Response{
			StatusCode: 200,
			Body:       io.NopCloser(strings.NewReader(body)),
			Header:     http.Header{"Content-Type": []string{"application/json"}},
			Request:    r,
		}, nil
	}
	return http.DefaultTransport.RoundTrip(r)
}

// setupTestDB 在独立的临时目录中建立干净数据库，返回清理函数
func setupTestDB(t *testing.T) func() {
	t.Helper()
	dir, err := os.MkdirTemp("", "sx-tg-test-")
	if err != nil {
		t.Fatal(err)
	}
	oldWD, _ := os.Getwd()
	if err := os.Chdir(dir); err != nil {
		t.Fatal(err)
	}
	if err := os.MkdirAll("./db", 0o755); err != nil {
		t.Fatal(err)
	}
	db, err := gorm.Open(sqlite.Open(filepath.Join(dir, "db", "test.db")),
		&gorm.Config{Logger: logger.Default.LogMode(logger.Silent)})
	if err != nil {
		t.Fatal(err)
	}
	if err := db.AutoMigrate(&models.User{}, &models.Subcription{}, &models.SubLogs{},
		&models.GroupNode{}, &models.Node{}, &models.OpLog{}); err != nil {
		t.Fatal(err)
	}
	models.DB = db
	httpClient = &http.Client{Transport: fakeTGRoundTripper{}}
	return func() {
		if sqlDB, err := db.DB(); err == nil {
			sqlDB.Close()
		}
		models.DB = nil
		os.Chdir(oldWD)
		os.RemoveAll(dir)
	}
}

// TestHandleAddSubscriptionE2E 验证：直接发送订阅链接（无 /add）→ 自动展开为多个节点
func TestHandleAddSubscriptionE2E(t *testing.T) {
	defer setupTestDB(t)()

	// 假订阅服务：base64 包裹两条 anytls 节点
	plain := "anytls://pw1@1.1.1.1:443?sni=a.com#SUB-HK\n" +
		"anytls://pw2@2.2.2.2:443?sni=b.com#SUB-JP\n"
	encoded := base64.StdEncoding.EncodeToString([]byte(plain))
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, encoded)
	}))
	defer srv.Close()

	// 模拟用户「直接发订阅链接」的普通文本消息
	handleUpdate("fake-token", msgUpdate(990001, srv.URL+"/sub?token=abc"))

	nodes, err := models.GetNodeList()
	if err != nil {
		t.Fatal(err)
	}
	if len(nodes) != 2 {
		t.Fatalf("应导入 2 个节点，实际 %d 个", len(nodes))
	}
	names := map[string]bool{}
	for _, n := range nodes {
		names[n.Name] = true
		if !strings.HasPrefix(n.Link, "anytls://") {
			t.Errorf("节点链接异常: %s", n.Link)
		}
	}
	if !names["SUB-HK"] || !names["SUB-JP"] {
		t.Fatalf("节点名不符: %v", names)
	}

	// 重复导入应"替换"而非新增
	handleUpdate("fake-token", msgUpdate(990002, srv.URL+"/sub?token=abc"))
	nodes, _ = models.GetNodeList()
	if len(nodes) != 2 {
		t.Fatalf("重复导入后应仍为 2 个节点，实际 %d 个", len(nodes))
	}
}

// TestHandleAddNodeLinkE2E 验证直接发单个节点分享链接
func TestHandleAddNodeLinkE2E(t *testing.T) {
	defer setupTestDB(t)()

	link := "anytls://secret@3.3.3.3:8443?sni=c.com#DIRECT-HK"
	handleUpdate("fake-token", msgUpdate(990010, link))

	nodes, _ := models.GetNodeList()
	if len(nodes) != 1 || nodes[0].Name != "DIRECT-HK" {
		t.Fatalf("直接发链接未正确导入: %+v", nodes)
	}
}

// TestHandleAddWithSlashAdd 验证 /add 订阅链接同样生效
func TestHandleAddWithSlashAdd(t *testing.T) {
	defer setupTestDB(t)()

	plain := "anytls://pw9@9.9.9.9:443?sni=d.com#ADD-HK\n"
	encoded := base64.StdEncoding.EncodeToString([]byte(plain))
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, encoded)
	}))
	defer srv.Close()

	handleUpdate("fake-token", msgUpdate(990020, "/add "+srv.URL))

	nodes, _ := models.GetNodeList()
	if len(nodes) != 1 || nodes[0].Name != "ADD-HK" {
		t.Fatalf("/add 订阅链接未正确导入: %+v", nodes)
	}
}
