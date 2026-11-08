package models

import (
	"fmt"
	"log"
	"os"
	"sublink/utils"

	"gopkg.in/yaml.v3"
)

// type Config struct {
// 	ID    int
// 	Key   string
// 	Value string
// }

// Config 配置结构体
type Config struct {
	JwtSecret         string `yaml:"jwt_secret"`         // JWT密钥
	ExpireDays        int    `yaml:"expire_days"`        // 过期天数
	Port              int    `yaml:"port"`               // 端口号
	TelegramBotToken  string `yaml:"telegram_bot_token"` // Telegram Bot Token
	TelegramChatID    int64  `yaml:"telegram_chat_id"`   // 授权的 Telegram 会话 ID（首次使用自动绑定）
	TelegramServerHost string `yaml:"telegram_server_host"` // 订阅链接中的服务器地址（如 example.com:8000）
	TelegramProxy     string `yaml:"telegram_proxy"`     // 访问 Telegram API 的代理（如 http://127.0.0.1:7897，留空直连）
	LatencyTestURL    string `yaml:"latency_test_url"`   // 延迟测试 URL
	LatencyTimeoutMS  int    `yaml:"latency_timeout_ms"` // 延迟测试超时（毫秒）
}

var comment string = `# jwt_secret: JWT密钥
# expire_days: token 过期天数
# port: 启动端口
# telegram_bot_token: Telegram Bot Token（通过 @BotFather 创建获取）
# telegram_chat_id: 授权的 Telegram 会话 ID，为空时首次对话自动绑定
# telegram_proxy: 访问 Telegram API 的代理，如 http://127.0.0.1:7897 或 socks5://127.0.0.1:7891，留空直连
# latency_test_url: 延迟测试 URL
# latency_timeout_ms: 延迟测试超时（毫秒）
`

// 初始化配置
func ConfigInit() {
	// 检查配置文件是否存在
	if _, err := os.Stat("./db/config.yaml"); os.IsNotExist(err) {
		R := utils.RandString(31) // 生成随机字符串作为JWT密钥
		// 如果不存在则创建默认配置文件
		defaultConfig := Config{
			JwtSecret:  R, // 生成随机JWT密钥
			ExpireDays: 14,
			Port:       8000, // 默认端口
		}

		// 生成yaml文件
		data, err := yaml.Marshal(&defaultConfig)
		if err != nil {
			log.Println("生成默认配置文件失败:", err)
			return
		}
		data = []byte(comment + string(data)) // 添加注释
		err = os.WriteFile("./db/config.yaml", data, 0644)
		if err != nil {
			fmt.Println("写入文件失败:", err)
			return
		}
		log.Println("配置文件不存在，已创建默认配置文件")
	}
}

// 读取配置
func ReadConfig() Config {
	file, err := os.ReadFile("./db/config.yaml")
	if err != nil {
		log.Println(err)
	}
	cfg := Config{}
	yaml.Unmarshal(file, &cfg)
	return cfg
}

// 设置配置
func SetConfig(newCfg Config) {
	oldCfg := ReadConfig() // 读取旧的配置文件
	// 覆盖新的字段
	if newCfg.JwtSecret != "" {
		oldCfg.JwtSecret = newCfg.JwtSecret
	}
	if newCfg.ExpireDays != 0 {
		oldCfg.ExpireDays = newCfg.ExpireDays
	}
	if newCfg.Port != 0 {
		oldCfg.Port = newCfg.Port
	}
	if newCfg.TelegramBotToken != "" {
		oldCfg.TelegramBotToken = newCfg.TelegramBotToken
	}
	if newCfg.TelegramChatID != 0 {
		oldCfg.TelegramChatID = newCfg.TelegramChatID
	}
	if newCfg.TelegramServerHost != "" {
		oldCfg.TelegramServerHost = newCfg.TelegramServerHost
	}
	if newCfg.TelegramProxy != "" {
		oldCfg.TelegramProxy = newCfg.TelegramProxy
	}
	if newCfg.LatencyTestURL != "" {
		oldCfg.LatencyTestURL = newCfg.LatencyTestURL
	}
	if newCfg.LatencyTimeoutMS > 0 {
		oldCfg.LatencyTimeoutMS = newCfg.LatencyTimeoutMS
	}
	WriteConfig(oldCfg)
}

// WriteConfig 将配置写回文件
func WriteConfig(cfg Config) {
	data, err := yaml.Marshal(&cfg)
	if err != nil {
		log.Println(err)
		return
	}
	data = []byte(comment + string(data)) // 添加注释
	os.WriteFile("./db/config.yaml", data, 0644)
}
