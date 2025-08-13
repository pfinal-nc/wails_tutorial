# 应用生命周期

了解 Wails 应用的生命周期，掌握应用启动、运行和关闭的完整流程。

## 生命周期概述

Wails 应用的生命周期包含以下几个关键阶段：

```
应用启动 → DOM 加载 → 应用运行 → 应用关闭
    ↓         ↓         ↓         ↓
  startup  domReady   运行中    shutdown
```

## 生命周期事件

### 1. 应用启动 (startup)

应用启动时触发，此时后端已初始化，但前端还未加载。

```go
func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    fmt.Println("应用启动")
    
    // 初始化应用配置
    a.initConfig()
    
    // 加载数据
    a.loadData()
    
    // 设置初始状态
    a.setInitialState()
}
```

**适用场景**：
- 初始化应用配置
- 加载必要的数据
- 设置全局状态
- 启动后台服务

### 2. DOM 就绪 (domReady)

前端 DOM 加载完成后触发，此时可以开始前后端交互。

```go
func (a *App) domReady(ctx context.Context) {
    fmt.Println("DOM 加载完成")
    
    // 发送初始数据到前端
    runtime.EventsEmit(ctx, "app-ready", a.getInitialData())
    
    // 启动定时任务
    a.startScheduledTasks()
    
    // 初始化前端状态
    a.initFrontendState()
}
```

**适用场景**：
- 发送初始数据到前端
- 启动定时任务
- 初始化前端状态
- 建立实时连接

### 3. 应用关闭 (shutdown)

应用关闭时触发，用于清理资源和保存数据。

```go
func (a *App) shutdown(ctx context.Context) {
    fmt.Println("应用关闭")
    
    // 保存用户数据
    a.saveUserData()
    
    // 关闭数据库连接
    a.closeDatabase()
    
    // 停止后台服务
    a.stopBackgroundServices()
    
    // 清理临时文件
    a.cleanupTempFiles()
}
```

**适用场景**：
- 保存用户数据
- 关闭数据库连接
- 停止后台服务
- 清理临时文件

## 完整示例

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
    config *Config
    data   *AppData
}

type Config struct {
    Theme     string
    Language  string
    AutoSave  bool
}

type AppData struct {
    UserSettings map[string]interface{}
    RecentFiles  []string
}

func NewApp() *App {
    return &App{
        config: &Config{},
        data:   &AppData{},
    }
}

// 应用启动
func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    fmt.Println("🚀 应用启动")
    
    // 加载配置文件
    a.loadConfig()
    
    // 初始化数据
    a.initData()
    
    // 启动后台服务
    a.startBackgroundServices()
    
    runtime.LogPrint(ctx, "应用初始化完成")
}

// DOM 就绪
func (a *App) domReady(ctx context.Context) {
    fmt.Println("📱 DOM 加载完成")
    
    // 发送初始数据到前端
    runtime.EventsEmit(ctx, "app-ready", map[string]interface{}{
        "config": a.config,
        "data":   a.data,
    })
    
    // 启动自动保存
    if a.config.AutoSave {
        a.startAutoSave()
    }
    
    // 初始化前端状态
    a.initFrontendState()
    
    runtime.LogPrint(ctx, "前端初始化完成")
}

// 应用关闭
func (a *App) shutdown(ctx context.Context) {
    fmt.Println("🛑 应用关闭")
    
    // 保存配置
    a.saveConfig()
    
    // 保存用户数据
    a.saveUserData()
    
    // 停止后台服务
    a.stopBackgroundServices()
    
    // 清理资源
    a.cleanup()
    
    runtime.LogPrint(ctx, "应用清理完成")
}

// 加载配置
func (a *App) loadConfig() {
    // 从文件或数据库加载配置
    a.config = &Config{
        Theme:    "light",
        Language: "zh-CN",
        AutoSave: true,
    }
}

// 初始化数据
func (a *App) initData() {
    a.data = &AppData{
        UserSettings: make(map[string]interface{}),
        RecentFiles:  []string{},
    }
}

// 启动后台服务
func (a *App) startBackgroundServices() {
    go func() {
        ticker := time.NewTicker(30 * time.Second)
        defer ticker.Stop()
        
        for {
            select {
            case <-ticker.C:
                // 执行定期任务
                a.performPeriodicTasks()
            }
        }
    }()
}

// 启动自动保存
func (a *App) startAutoSave() {
    go func() {
        ticker := time.NewTicker(60 * time.Second)
        defer ticker.Stop()
        
        for {
            select {
            case <-ticker.C:
                a.saveUserData()
                runtime.LogPrint(a.ctx, "自动保存完成")
            }
        }
    }()
}

// 初始化前端状态
func (a *App) initFrontendState() {
    // 设置主题
    runtime.EventsEmit(a.ctx, "theme-changed", a.config.Theme)
    
    // 设置语言
    runtime.EventsEmit(a.ctx, "language-changed", a.config.Language)
}

// 保存配置
func (a *App) saveConfig() {
    // 保存配置到文件或数据库
    fmt.Println("保存配置...")
}

// 保存用户数据
func (a *App) saveUserData() {
    // 保存用户数据
    fmt.Println("保存用户数据...")
}

// 停止后台服务
func (a *App) stopBackgroundServices() {
    // 停止所有后台服务
    fmt.Println("停止后台服务...")
}

// 清理资源
func (a *App) cleanup() {
    // 清理临时文件和资源
    fmt.Println("清理资源...")
}

// 执行定期任务
func (a *App) performPeriodicTasks() {
    // 执行定期维护任务
    fmt.Println("执行定期任务...")
}
```

## 最佳实践

### 1. 错误处理

```go
func (a *App) startup(ctx context.Context) {
    defer func() {
        if r := recover(); r != nil {
            runtime.LogError(ctx, fmt.Sprintf("启动失败: %v", r))
        }
    }()
    
    // 启动逻辑
}
```

### 2. 异步初始化

```go
func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    
    // 异步加载数据
    go func() {
        a.loadHeavyData()
        runtime.EventsEmit(ctx, "data-loaded")
    }()
}
```

### 3. 状态管理

```go
type AppState struct {
    IsLoading bool
    IsReady   bool
    Error     string
}

func (a *App) updateState(state AppState) {
    runtime.EventsEmit(a.ctx, "state-changed", state)
}
```

### 4. 优雅关闭

```go
func (a *App) shutdown(ctx context.Context) {
    // 设置关闭标志
    a.isShuttingDown = true
    
    // 等待后台任务完成
    a.wg.Wait()
    
    // 保存数据
    a.saveData()
    
    // 清理资源
    a.cleanup()
}
```

## 调试技巧

### 1. 日志输出

```go
func (a *App) startup(ctx context.Context) {
    runtime.LogPrint(ctx, "开始启动应用...")
    
    // 启动逻辑
    
    runtime.LogPrint(ctx, "应用启动完成")
}
```

### 2. 状态检查

```go
func (a *App) checkAppState() {
    runtime.LogPrint(a.ctx, fmt.Sprintf("应用状态: %+v", a.state))
}
```

### 3. 性能监控

```go
func (a *App) startup(ctx context.Context) {
    start := time.Now()
    
    // 启动逻辑
    
    runtime.LogPrint(ctx, fmt.Sprintf("启动耗时: %v", time.Since(start)))
}
```

## 下一步

1. 📡 学习 [前后端通信](/guide/communication) 实现数据交互
2. 🎨 了解 [自定义窗口](/guide/custom-window) 优化用户体验
3. 📦 掌握 [打包发布](/guide/build) 发布您的应用
