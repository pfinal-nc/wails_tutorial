# 快速开始

欢迎来到 Wails 中文教程！本指南将帮助您快速搭建开发环境并创建第一个 Wails 应用。

## 环境要求

在开始之前，请确保您的系统满足以下要求：

### 必需软件

- **Go 1.18+** - 后端开发语言
- **Node.js 16+** - 前端开发环境
- **Git** - 版本控制工具

### 操作系统支持

- ✅ Windows 10/11 (64位)
- ✅ macOS 10.15+ (Intel/Apple Silicon)
- ✅ Linux (Ubuntu 18.04+, CentOS 7+, 等)

## 安装 Wails CLI

### 使用 Go 安装（推荐）

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 验证安装

安装完成后，运行以下命令验证：

```bash
wails version
```

如果看到版本信息，说明安装成功。

## 创建第一个项目

### 1. 初始化项目

```bash
# 创建新项目
wails init -n my-first-app

# 进入项目目录
cd my-first-app
```

### 2. 项目结构

创建完成后，您会看到以下项目结构：

```
my-first-app/
├── build/              # 构建输出目录
├── frontend/           # 前端代码
│   ├── src/
│   ├── package.json
│   └── ...
├── wails.json         # Wails 配置文件
├── main.go           # Go 主程序
├── app.go            # 应用逻辑
└── README.md         # 项目说明
```

### 3. 启动开发服务器

```bash
# 启动开发模式
wails dev
```

这将启动开发服务器，您会看到：
- 前端开发服务器（通常是 http://localhost:34115）
- 桌面应用窗口自动打开
- 支持热重载，修改代码后自动更新

## 项目配置

### wails.json 配置

```json
{
  "name": "my-first-app",
  "outputfilename": "my-first-app",
  "frontend:install": "npm install",
  "frontend:build": "npm run build",
  "frontend:dev:watcher": "npm run dev",
  "frontend:dev:serverUrl": "auto",
  "author": {
    "name": "Your Name",
    "email": "your@email.com"
  }
}
```

### 主要配置项说明

- `name`: 应用名称
- `outputfilename`: 输出文件名
- `frontend:install`: 前端依赖安装命令
- `frontend:build`: 前端构建命令
- `frontend:dev:watcher`: 开发模式监听命令
- `frontend:dev:serverUrl`: 开发服务器 URL

## 基础开发流程

### 1. 修改前端代码

前端代码位于 `frontend/` 目录，支持：
- HTML/CSS/JavaScript
- Vue.js
- React
- 其他现代前端框架

### 2. 修改后端代码

后端代码位于根目录的 Go 文件中：
- `main.go`: 应用入口
- `app.go`: 应用逻辑和 API

### 3. 前后端通信

Wails 提供了简单的前后端通信机制：

**后端定义方法：**
```go
// app.go
func (a *App) Greet(name string) string {
    return fmt.Sprintf("Hello %s!", name)
}
```

**前端调用方法：**
```javascript
// 前端代码
import { Greet } from '../wailsjs/go/main/App'

// 调用后端方法
const result = await Greet("World")
console.log(result) // 输出: Hello World!
```

## 构建和发布

### 开发构建

```bash
# 构建开发版本
wails build
```

### 生产构建

```bash
# 构建生产版本（优化和压缩）
wails build -production
```

### 平台特定构建

```bash
# 构建 Windows 版本
wails build -platform windows/amd64

# 构建 macOS 版本
wails build -platform darwin/amd64

# 构建 Linux 版本
wails build -platform linux/amd64
```

## 常见问题

### Q: 安装 Wails CLI 失败怎么办？

A: 确保您的 Go 环境配置正确，可以尝试：
```bash
# 更新 Go 模块
go mod tidy

# 清理缓存
go clean -cache
```

### Q: 开发服务器启动失败？

A: 检查端口是否被占用，可以修改 `wails.json` 中的端口配置。

### Q: 前端框架支持哪些？

A: Wails 支持所有现代前端框架，包括：
- Vue.js
- React
- Angular
- Svelte
- 原生 HTML/CSS/JS

## 下一步

恭喜！您已经成功创建了第一个 Wails 应用。接下来可以：

1. 📖 阅读 [环境配置](/guide/environment) 了解详细配置
2. 🏗️ 学习 [项目结构](/guide/project-structure) 深入了解架构
3. 🔧 查看 [API 参考](/api/) 了解更多功能
4. 💡 浏览 [示例项目](/examples/) 获取灵感

如果您遇到任何问题，欢迎在 [GitHub Issues](https://github.com/wailsapp/wails/issues) 中提问！
