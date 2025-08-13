# 项目结构

了解 Wails 项目的文件组织结构，掌握各个文件和目录的作用。

## 标准项目结构

一个典型的 Wails 项目包含以下文件和目录：

```
my-wails-app/
├── build/                    # 构建输出目录
│   ├── bin/                  # 可执行文件
│   └── assets/               # 静态资源
├── frontend/                 # 前端代码目录
│   ├── src/                  # 源代码
│   │   ├── components/       # Vue 组件
│   │   ├── assets/           # 前端资源
│   │   ├── App.vue           # 主应用组件
│   │   └── main.js           # 应用入口
│   ├── public/               # 公共资源
│   ├── package.json          # 前端依赖配置
│   ├── vite.config.js        # Vite 配置
│   └── index.html            # HTML 模板
├── wailsjs/                  # 自动生成的 JS 绑定
│   └── go/                   # Go 函数绑定
├── wails.json               # Wails 项目配置
├── go.mod                   # Go 模块文件
├── go.sum                   # Go 依赖校验
├── main.go                  # 应用入口文件
├── app.go                   # 应用逻辑文件
├── build/                   # 构建脚本
└── README.md                # 项目说明
```

## 核心文件详解

### 1. wails.json - 项目配置

这是 Wails 项目的核心配置文件：

```json
{
  "name": "my-wails-app",
  "outputfilename": "my-wails-app",
  "frontend:install": "npm install",
  "frontend:build": "npm run build",
  "frontend:dev:watcher": "npm run dev",
  "frontend:dev:serverUrl": "auto",
  "author": {
    "name": "Your Name",
    "email": "your@email.com"
  },
  "info": {
    "companyName": "Your Company",
    "productName": "Your Product",
    "productVersion": "1.0.0",
    "copyright": "Copyright © 2024",
    "comments": "Built with Wails"
  },
  "debounceMS": 100,
  "devServer": {
    "hmr": true,
    "port": 34115
  }
}
```

#### 配置项说明

- `name`: 项目名称
- `outputfilename`: 输出文件名（不含扩展名）
- `frontend:install`: 前端依赖安装命令
- `frontend:build`: 前端构建命令
- `frontend:dev:watcher`: 开发模式监听命令
- `frontend:dev:serverUrl`: 开发服务器 URL
- `author`: 作者信息
- `info`: 应用元信息
- `debounceMS`: 文件监听防抖时间
- `devServer`: 开发服务器配置

### 2. main.go - 应用入口

```go
package main

import (
    "embed"
    "log"

    "github.com/wailsapp/wails/v2"
    "github.com/wailsapp/wails/v2/pkg/options"
    "github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed frontend/dist
var assets embed.FS

func main() {
    // 创建应用实例
    app := NewApp()

    // 应用配置
    err := wails.Run(&options.App{
        Title:            "My Wails App",
        Width:            1024,
        Height:           768,
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

### 3. app.go - 应用逻辑

```go
package main

import (
    "context"
    "fmt"
)

// App 结构体
type App struct {
    ctx context.Context
}

// NewApp 创建新的应用实例
func NewApp() *App {
    return &App{}
}

// startup 应用启动时调用
func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    fmt.Println("应用启动")
}

// domReady DOM 加载完成时调用
func (a *App) domReady(ctx context.Context) {
    fmt.Println("DOM 加载完成")
}

// shutdown 应用关闭时调用
func (a *App) shutdown(ctx context.Context) {
    fmt.Println("应用关闭")
}

// Greet 示例方法
func (a *App) Greet(name string) string {
    return fmt.Sprintf("Hello %s!", name)
}
```

## 前端目录结构

### frontend/ 目录详解

```
frontend/
├── src/                      # 源代码目录
│   ├── components/           # Vue 组件
│   │   ├── Header.vue        # 头部组件
│   │   └── Footer.vue        # 底部组件
│   ├── assets/               # 静态资源
│   │   ├── images/           # 图片资源
│   │   ├── styles/           # 样式文件
│   │   └── icons/            # 图标文件
│   ├── App.vue               # 主应用组件
│   ├── main.js               # 应用入口
│   └── style.css             # 全局样式
├── public/                   # 公共资源
│   ├── favicon.ico           # 网站图标
│   └── index.html            # HTML 模板
├── package.json              # 依赖配置
├── vite.config.js            # Vite 配置
└── index.html                # 入口 HTML
```

### 前端配置文件

#### package.json
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

#### vite.config.js
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 34115
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

## 自动生成的文件

### wailsjs/ 目录

Wails 会自动生成 JavaScript 绑定文件：

```
wailsjs/
└── go/
    └── main/
        └── App.js            # Go 函数的 JS 绑定
```

这些文件包含从 Go 代码自动生成的 JavaScript 函数，用于前后端通信。

## 构建输出

### build/ 目录

构建后的文件结构：

```
build/
├── bin/                      # 可执行文件
│   ├── my-wails-app          # Linux/macOS 可执行文件
│   ├── my-wails-app.exe      # Windows 可执行文件
│   └── my-wails-app.app      # macOS 应用包
└── assets/                   # 静态资源
    ├── index.html
    ├── assets/
    └── favicon.ico
```

## 开发工作流

### 1. 开发模式

```bash
wails dev
```

开发模式下的文件监听：
- 前端文件变化 → 自动重新加载
- Go 文件变化 → 自动重启应用
- 配置文件变化 → 自动重启应用

### 2. 构建模式

```bash
wails build
```

构建过程：
1. 编译前端代码
2. 编译 Go 代码
3. 打包静态资源
4. 生成可执行文件

### 3. 生产构建

```bash
wails build -production
```

生产构建特点：
- 代码压缩和优化
- 移除调试信息
- 优化资源大小

## 最佳实践

### 1. 目录组织

- 保持前端和后端代码分离
- 使用清晰的命名约定
- 按功能模块组织代码

### 2. 配置文件

- 将配置项集中在 `wails.json`
- 使用环境变量管理敏感信息
- 保持配置文件简洁

### 3. 资源管理

- 将静态资源放在 `frontend/assets/`
- 使用相对路径引用资源
- 优化图片和字体文件大小

### 4. 版本控制

```gitignore
# .gitignore 示例
build/
node_modules/
.DS_Store
*.log
```

## 下一步

了解项目结构后，您可以：

1. 🔧 学习 [应用生命周期](/guide/lifecycle) 了解应用运行机制
2. 📡 掌握 [前后端通信](/guide/communication) 实现数据交互
3. 🎨 查看 [自定义窗口](/guide/custom-window) 优化用户体验
4. 📦 了解 [打包发布](/guide/build) 发布您的应用
