<div align="center">

# SublinkX

**轻量级节点订阅管理面板 · 现代 Bento UI**

<img src="static/img/logo.png" width="120" alt="SublinkX"/>

</div>

基于 [gooaclok819/sublink](https://github.com/jaaksii/sublink) 与 [gooaclok819/sublinkX](https://github.com/gooaclok819/sublinkX) 二次开发，在此**特别感谢原作者 [gooaclok819](https://github.com/gooaclok819)** 的开源工作。本项目在其基础上重写了前端 UI、修复了若干后端问题，并新增了 Telegram Bot 等功能。

## ✨ 特性

- 🎨 **现代彩色 UI**：Bento Grid 仪表盘、浅色/深色主题自动切换（可手动切换）、毛玻璃顶栏
- 📊 **可视化看板**：多序列趋势图（悬停提示）、协议分布环形图、KPI 迷你曲线、动态时间线
- 🌐 **协议支持**：ss / ssr / vmess / vless / trojan / hysteria / hysteria2 / tuic / **anytls**
- 📡 **订阅下发**：v2ray base64 通用格式、Clash（mihomo）、Surge，客户端 UA 自动识别，也可用 `&client=clash|surge` 强制指定
- 🧩 **模板在线编辑**：Clash / Surge 模板在线增删改，支持分组 filter 正则筛选（不被生成节点污染）
- 🤖 **Telegram Bot**：`/add` 添加节点（同名自动替换）、`/list` 节点列表、`/test` 连通性测试（TCP 并发探测）、`/del` 点击删除、`/sub` 获取订阅链接
- 🖼 **用户头像**：头像上传，全界面同步显示
- 📝 **操作日志**：面板 / Telegram / 系统三个来源的关键操作全程留痕
- 🐳 **Docker 支持**：多架构镜像（amd64 / arm64 / armv7），GitHub Actions 自动构建发布

## 🚀 快速开始

### Docker

镜像：`ghcr.io/xyswordzoro/sublinkx:latest`（公开，支持 `linux/amd64` 与 `linux/arm64`）

**docker run 方式：**

```bash
docker run --name sublinkx -p 8000:8000 \
  -v $PWD/db:/app/db \
  -v $PWD/template:/app/template \
  -v $PWD/logs:/app/logs \
  -d ghcr.io/xyswordzoro/sublinkx:latest
```

**docker compose 方式：**

在任意空目录创建 `docker-compose.yml`：

```yaml
services:
  sublinkx:
    image: ghcr.io/xyswordzoro/sublinkx:latest
    container_name: sublinkx
    ports:
      - "8000:8000"
    volumes:
      - ./db:/app/db              # 数据库与配置（需备份）
      - ./template:/app/template  # Clash/Surge 模板（需备份）
      - ./logs:/app/logs
    environment:
      - TZ=Asia/Shanghai
    restart: unless-stopped
```

```bash
docker compose up -d     # 启动
docker compose pull && docker compose up -d   # 更新到最新镜像
```

启动后访问 `http://<服务器IP>:8000`，默认账号 `admin` / `123456`（**登录后请立即修改**）。需要备份的只有 `db/` 和 `template/` 两个目录。

### 二进制运行

```bash
go build -o sublinkx
./sublinkx              # 默认监听 8000
./sublinkx run -port 9000          # 指定端口
./sublinkx setting -username admin -password 123456   # 重置账号
```

## 🤖 Telegram Bot 配置

1. 在 [@BotFather](https://t.me/BotFather) 创建机器人，获取 Token
2. 面板 → 系统设置 → Telegram 机器人：填入 Token 保存即生效
3. 服务器无法直连 Telegram 时，填写代理地址（支持 `http://` 与 `socks5://`）
4. 首个与机器人对话的会话自动绑定为授权会话，其他会话将被拒绝

> Bot 以长轮询方式运行，无需公网回调地址。`/sub` 命令输出的订阅链接使用设置里填写的「订阅链接地址」。

## 📖 订阅链接说明

| 链接 | 内容 |
|---|---|
| `/c/?token=<md5(订阅名)>` | v2ray base64 通用格式（仅节点列表） |
| `&client=clash` | 完整 Clash 配置（proxies + proxy-groups + rules） |
| `&client=surge` | 完整 Surge 配置（含 MANAGED-CONFIG 自动更新头） |

Clash Verge / Surge 等客户端拉取链接时会自动携带 UA，无需手动加参数。订阅**自动包含全部节点**，通过面板或 Bot 增删节点即时生效。

## ⚙️ 配置文件

`db/config.yaml`（首次启动自动生成）：

```yaml
jwt_secret: <自动生成>
expire_days: 14
port: 8000
telegram_bot_token: ""
telegram_chat_id: 0
telegram_server_host: ""
telegram_proxy: ""
```

## 🛠 技术栈

- 后端：Go 1.22 + Gin + GORM + 纯 Go SQLite（免 CGO）+ JWT
- 前端：原生 HTML/CSS/JS 单页应用（无构建步骤），通过 Go `embed` 内嵌
- 图标：内联 SVG（Lucide 风格路径）

## 📁 目录结构

```
├── api/           # HTTP handler（节点/订阅/模板/日志/Telegram 配置）
├── middlewares/   # JWT 鉴权
├── models/        # GORM 模型（节点/订阅/分组/访问日志/操作日志/配置）
├── node/          # 各协议链接解析与 Clash/Surge 配置生成
├── routers/       # 路由注册
├── telegram/      # Telegram Bot（长轮询，零第三方依赖）
├── static/        # 前端静态资源（embed 内嵌）
├── template/      # Clash/Surge 模板（首次启动释放到磁盘）
├── Dockerfile
└── .github/workflows/docker-image.yml   # 多架构镜像自动构建
```

## 🙏 致谢

- [gooaclok819/sublinkX](https://github.com/gooaclok819/sublinkX) —— 本项目的直接上游，感谢原作者的开源精神
- [jaaksii/sublink](https://github.com/jaaksii/sublink) —— sublink 原始项目
- [vue3-element-admin](https://github.com/youlaitech/vue3-element-admin) —— 原项目前端参考
- [Lucide](https://lucide.dev) —— 图标

## 📄 License

[MIT](LICENSE)
