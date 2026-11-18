package telegram

import (
	"errors"
	"testing"
)

func TestIsTransportErr(t *testing.T) {
	yes := []error{
		errors.New("getUpdates 请求失败: dial tcp: connection refused"),
		errors.New("getUpdates 请求失败: EOF"),
		errors.New("getUpdates 请求失败: proxyconnect tcp: connection reset by peer"),
		errors.New("getUpdates 请求失败: context deadline exceeded (Client.Timeout)"),
	}
	no := []error{
		errors.New("telegram api getUpdates: Conflict: terminated by other getUpdates"),
		errors.New("telegram api sendMessage: Bad Request: chat not found"),
		nil,
	}
	for _, e := range yes {
		if !isTransportErr(e) {
			t.Errorf("应判定为连接层错误: %v", e)
		}
	}
	for _, e := range no {
		if isTransportErr(e) {
			t.Errorf("不应判定为连接层错误: %v", e)
		}
	}
}
