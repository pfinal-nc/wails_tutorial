# 基础示例

这是一个简单的 Wails 应用示例，展示了基本的前后端通信功能。

## 项目结构

```
basic-example/
├── frontend/
│   ├── src/
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   └── index.html
├── main.go
├── app.go
└── wails.json
```

## 后端代码

### main.go

```go
package main

import (
    "embed"
    "log"

    "github.com/wailsapp/wails/v2"
    "github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed frontend/dist
var assets embed.FS

func main() {
    app := NewApp()

    err := wails.Run(&options.App{
        Title:            "基础示例",
        Width:            800,
        Height:           600,
        Assets:           assets,
        BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
        OnStartup:        app.startup,
        OnDomReady:       app.domReady,
        OnShutdown:       app.shutdown,
        Bind: []interface{}{
            app,
        },
    })

    if err != nil {
        log.Fatal(err)
    }
}
```

### app.go

```go
package main

import (
    "context"
    "fmt"
    "time"

    "github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
    ctx context.Context
}

func NewApp() *App {
    return &App{}
}

func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    runtime.LogPrint(a.ctx, "应用启动")
}

func (a *App) domReady(ctx context.Context) {
    runtime.LogPrint(a.ctx, "DOM 加载完成")
}

func (a *App) shutdown(ctx context.Context) {
    runtime.LogPrint(a.ctx, "应用关闭")
}

// Greet 问候函数
func (a *App) Greet(name string) string {
    return fmt.Sprintf("你好，%s！欢迎使用 Wails！", name)
}

// GetCurrentTime 获取当前时间
func (a *App) GetCurrentTime() string {
    return time.Now().Format("2006-01-02 15:04:05")
}

// ShowMessage 显示消息对话框
func (a *App) ShowMessage(title, message string) {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.InfoDialog,
        Title:   title,
        Message: message,
    })
}

// GetSystemInfo 获取系统信息
func (a *App) GetSystemInfo() map[string]string {
    env := runtime.Environment(a.ctx)
    return map[string]string{
        "appName":    env.AppName,
        "appVersion": env.AppVersion,
        "os":         env.OS,
        "arch":       env.Arch,
        "platform":   env.Platform,
    }
}
```

## 前端代码

### frontend/src/App.vue

```vue
<template>
  <div class="app">
    <header class="header">
      <h1>Wails 基础示例</h1>
    </header>

    <main class="main">
      <div class="card">
        <h2>问候功能</h2>
        <div class="input-group">
          <input 
            v-model="name" 
            placeholder="请输入您的姓名"
            @keyup.enter="greet"
          />
          <button @click="greet">问候</button>
        </div>
        <p v-if="greeting" class="result">{{ greeting }}</p>
      </div>

      <div class="card">
        <h2>系统信息</h2>
        <button @click="getSystemInfo">获取系统信息</button>
        <div v-if="systemInfo" class="info-grid">
          <div class="info-item">
            <strong>应用名称:</strong> {{ systemInfo.appName }}
          </div>
          <div class="info-item">
            <strong>应用版本:</strong> {{ systemInfo.appVersion }}
          </div>
          <div class="info-item">
            <strong>操作系统:</strong> {{ systemInfo.os }}
          </div>
          <div class="info-item">
            <strong>架构:</strong> {{ systemInfo.arch }}
          </div>
          <div class="info-item">
            <strong>平台:</strong> {{ systemInfo.platform }}
          </div>
        </div>
      </div>

      <div class="card">
        <h2>时间功能</h2>
        <button @click="getTime">获取当前时间</button>
        <p v-if="currentTime" class="result">{{ currentTime }}</p>
      </div>

      <div class="card">
        <h2>消息对话框</h2>
        <div class="input-group">
          <input v-model="messageTitle" placeholder="标题" />
          <input v-model="messageContent" placeholder="内容" />
          <button @click="showMessage">显示消息</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Greet, GetCurrentTime, ShowMessage, GetSystemInfo } from '../wailsjs/go/main/App'

export default {
  name: 'App',
  data() {
    return {
      name: '',
      greeting: '',
      currentTime: '',
      messageTitle: '',
      messageContent: '',
      systemInfo: null
    }
  },
  methods: {
    async greet() {
      if (this.name.trim()) {
        this.greeting = await Greet(this.name)
      }
    },
    async getTime() {
      this.currentTime = await GetCurrentTime()
    },
    async showMessage() {
      if (this.messageTitle && this.messageContent) {
        await ShowMessage(this.messageTitle, this.messageContent)
      }
    },
    async getSystemInfo() {
      this.systemInfo = await GetSystemInfo()
    }
  }
}
</script>

<style>
.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  margin: 0;
}

.main {
  display: grid;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
  margin-top: 0;
  color: #34495e;
  font-size: 1.2em;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.input-group input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

button:hover {
  background: #2980b9;
}

.result {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  margin: 0;
  color: #495057;
}

.info-grid {
  display: grid;
  gap: 8px;
  margin-top: 15px;
}

.info-item {
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
}

.info-item strong {
  color: #495057;
}
</style>
```

### frontend/src/main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### frontend/index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wails 基础示例</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

## 配置文件

### wails.json

```json
{
  "name": "basic-example",
  "outputfilename": "basic-example",
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

### frontend/package.json

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.0.0",
    "vite": "^4.0.0"
  }
}
```

## 运行示例

### 1. 创建项目

```bash
# 创建新项目
wails init -n basic-example

# 进入项目目录
cd basic-example
```

### 2. 替换代码

将上述代码复制到对应的文件中。

### 3. 安装依赖

```bash
# 安装前端依赖
cd frontend
npm install
cd ..
```

### 4. 运行项目

```bash
# 启动开发模式
wails dev
```

## 功能说明

这个基础示例展示了以下功能：

1. **问候功能** - 输入姓名，后端返回个性化问候
2. **时间功能** - 获取当前系统时间
3. **系统信息** - 显示应用和系统的基本信息
4. **消息对话框** - 显示系统消息对话框

## 学习要点

### 前后端通信

- 前端通过导入的 Go 函数调用后端方法
- 后端方法返回数据给前端显示
- 支持异步操作和错误处理

### 用户界面

- 使用 Vue.js 构建响应式界面
- 现代化的 CSS 样式设计
- 良好的用户体验

### 系统集成

- 获取系统环境信息
- 显示系统对话框
- 日志输出功能

## 下一步

基于这个基础示例，您可以：

1. 📝 查看 [Todo 应用](/examples/todo) 学习更复杂的功能
2. 📁 了解 [文件管理器](/examples/file-manager) 学习文件操作
3. 💬 探索 [聊天应用](/examples/chat) 学习实时通信
4. 🔧 查看 [API 参考](/api/) 了解更多功能
