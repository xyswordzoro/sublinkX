package main

import (
	"testing"
	"time"
)

// TestEmbeddedTzdata 验证内嵌时区数据库可用：
// Windows 无 /usr/share/zoneinfo，LoadLocation 成功只能来自 time/tzdata 内嵌数据。
func TestEmbeddedTzdata(t *testing.T) {
	loc, err := time.LoadLocation("Asia/Shanghai")
	if err != nil {
		t.Fatal("内嵌 tzdata 无法解析 Asia/Shanghai:", err)
	}
	utc0 := time.Date(2026, 11, 17, 23, 15, 48, 0, time.UTC)
	sh := utc0.In(loc)
	if sh.Format("2006-01-02 15:04:05") != "2026-11-18 07:15:48" {
		t.Fatalf("时区换算错误: %s", sh.Format("2006-01-02 15:04:05"))
	}
	if _, err := time.LoadLocation("America/New_York"); err != nil {
		t.Fatal("内嵌 tzdata 无法解析 America/New_York:", err)
	}
}
