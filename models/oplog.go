package models

import (
	"log"
	"time"
)

// OpLog 操作日志（记录面板 / Telegram / 系统的关键操作）
type OpLog struct {
	ID     int
	Time   string
	Source string // 面板 / Telegram / 系统
	Action string // 如：添加节点、删除节点、保存配置
	Detail string
}

// OpLogAdd 记录一条操作日志
func OpLogAdd(source, action, detail string) {
	l := OpLog{
		Time:   time.Now().Format("2006-01-02 15:04:05"),
		Source: source,
		Action: action,
		Detail: detail,
	}
	if err := DB.Create(&l).Error; err != nil {
		log.Println("写入操作日志失败:", err)
	}
}

// OpLogList 获取最近的操作日志（按时间倒序）
func OpLogList(limit int) ([]OpLog, error) {
	var logs []OpLog
	if limit <= 0 {
		limit = 200
	}
	err := DB.Order("id desc").Limit(limit).Find(&logs).Error
	return logs, err
}

// OpLogClear 清空操作日志
func OpLogClear() error {
	return DB.Where("1 = 1").Delete(&OpLog{}).Error
}
