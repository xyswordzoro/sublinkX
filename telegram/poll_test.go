package telegram

import (
	"testing"
	"time"
)

func TestMarkSeenDedupe(t *testing.T) {
	resetSeen()
	if !markSeen(100) {
		t.Fatal("首次出现的 update 应返回 true")
	}
	if markSeen(100) {
		t.Fatal("重复 update 应返回 false（防止重复回复）")
	}
	if !markSeen(101) {
		t.Fatal("新 update 应返回 true")
	}
	// 清理后集合重置，旧 id 又可处理（重启场景）
	resetSeen()
	if !markSeen(100) {
		t.Fatal("resetSeen 后应可重新处理")
	}
}

func TestUpdateDateAndStale(t *testing.T) {
	now := time.Now()
	fresh := msgUpdate(1, "/help")
	if d := updateDate(fresh); d == 0 {
		t.Fatal("updateDate 应返回消息时间")
	}
	if time.Since(time.Unix(updateDate(fresh), 0)) > maxUpdateAge {
		t.Fatal("新消息不应被判定为过期")
	}

	old := msgUpdate(2, "/help")
	old.Message.Date = now.Add(-2 * time.Hour).Unix()
	if time.Since(time.Unix(updateDate(old), 0)) <= maxUpdateAge {
		t.Fatal("2 小时前的消息应判定为过期（避免刷屏）")
	}

	// 回调时间来自消息
	cb := cbUpdate(3, "rgo")
	if updateDate(cb) == 0 {
		t.Fatal("回调应能取到消息时间")
	}
}
