# 应用 API

Wails 应用 API 提供了应用生命周期管理、窗口控制、系统交互等核心功能。

## 应用生命周期

### 启动事件

```go
// OnStartup 应用启动时调用
func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    // 初始化应用
    fmt.Println("应用启动")
}
```

### DOM 就绪事件

```go
// OnDomReady DOM 加载完成时调用
func (a *App) domReady(ctx context.Context) {
    // DOM 已准备就绪，可以开始前端交互
    fmt.Println("DOM 加载完成")
}
```

### 关闭事件

```go
// OnShutdown 应用关闭时调用
func (a *App) shutdown(ctx context.Context) {
    // 清理资源，保存数据
    fmt.Println("应用关闭")
}
```

## 窗口控制

### 获取窗口信息

```go
import "github.com/wailsapp/wails/v2/pkg/runtime"

// 获取窗口大小
func (a *App) GetWindowSize() (int, int) {
    width, height := runtime.WindowGetSize(a.ctx)
    return width, height
}

// 设置窗口大小
func (a *App) SetWindowSize(width, height int) {
    runtime.WindowSetSize(a.ctx, width, height)
}

// 获取窗口位置
func (a *App) GetWindowPosition() (int, int) {
    x, y := runtime.WindowGetPosition(a.ctx)
    return x, y
}

// 设置窗口位置
func (a *App) SetWindowPosition(x, y int) {
    runtime.WindowSetPosition(a.ctx, x, y)
}
```

### 窗口状态

```go
// 最小化窗口
func (a *App) Minimize() {
    runtime.WindowMinimise(a.ctx)
}

// 最大化窗口
func (a *App) Maximize() {
    runtime.WindowMaximise(a.ctx)
}

// 恢复窗口
func (a *App) Restore() {
    runtime.WindowRestore(a.ctx)
}

// 关闭窗口
func (a *App) Close() {
    runtime.WindowClose(a.ctx)
}

// 隐藏窗口
func (a *App) Hide() {
    runtime.WindowHide(a.ctx)
}

// 显示窗口
func (a *App) Show() {
    runtime.WindowShow(a.ctx)
}
```

### 窗口属性

```go
// 设置窗口标题
func (a *App) SetTitle(title string) {
    runtime.WindowSetTitle(a.ctx, title)
}

// 设置窗口透明度
func (a *App) SetOpacity(opacity float64) {
    runtime.WindowSetOpacity(a.ctx, opacity)
}

// 设置窗口始终置顶
func (a *App) SetAlwaysOnTop(alwaysOnTop bool) {
    runtime.WindowSetAlwaysOnTop(a.ctx, alwaysOnTop)
}
```

## 对话框和消息

### 消息对话框

```go
// 显示信息对话框
func (a *App) ShowInfo(title, message string) {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.InfoDialog,
        Title:   title,
        Message: message,
    })
}

// 显示警告对话框
func (a *App) ShowWarning(title, message string) {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.WarningDialog,
        Title:   title,
        Message: message,
    })
}

// 显示错误对话框
func (a *App) ShowError(title, message string) {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.ErrorDialog,
        Title:   title,
        Message: message,
    })
}

// 显示确认对话框
func (a *App) ShowConfirm(title, message string) bool {
    result, _ := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.QuestionDialog,
        Title:   title,
        Message: message,
        Buttons: []string{"确定", "取消"},
    })
    return result == "确定"
}
```

### 文件对话框

```go
// 打开文件对话框
func (a *App) OpenFile(title string, filters []string) string {
    result, _ := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
        Title:  title,
        Filters: filters,
    })
    return result
}

// 保存文件对话框
func (a *App) SaveFile(title string, filters []string) string {
    result, _ := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
        Title:  title,
        Filters: filters,
    })
    return result
}

// 选择目录对话框
func (a *App) SelectDirectory(title string) string {
    result, _ := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
        Title: title,
    })
    return result
}
```

## 系统交互

### 剪贴板操作

```go
// 获取剪贴板内容
func (a *App) GetClipboardText() string {
    return runtime.ClipboardGetText(a.ctx)
}

// 设置剪贴板内容
func (a *App) SetClipboardText(text string) {
    runtime.ClipboardSetText(a.ctx, text)
}
```

### 系统通知

```go
// 发送系统通知
func (a *App) SendNotification(title, message string) {
    runtime.NotificationSend(a.ctx, &runtime.NotificationOptions{
        Title:   title,
        Message: message,
    })
}
```

### 浏览器操作

```go
// 在默认浏览器中打开 URL
func (a *App) OpenURL(url string) {
    runtime.BrowserOpenURL(a.ctx, url)
}
```

## 环境信息

### 获取应用信息

```go
// 获取应用目录
func (a *App) GetAppDir() string {
    return runtime.Environment(a.ctx).AppDir
}

// 获取应用名称
func (a *App) GetAppName() string {
    return runtime.Environment(a.ctx).AppName
}

// 获取应用版本
func (a *App) GetAppVersion() string {
    return runtime.Environment(a.ctx).AppVersion
}

// 获取构建版本
func (a *App) GetBuildVersion() string {
    return runtime.Environment(a.ctx).BuildVersion
}
```

### 获取系统信息

```go
// 获取操作系统
func (a *App) GetOS() string {
    return runtime.Environment(a.ctx).OS
}

// 获取架构
func (a *App) GetArch() string {
    return runtime.Environment(a.ctx).Arch
}

// 获取平台
func (a *App) GetPlatform() string {
    return runtime.Environment(a.ctx).Platform
}
```

## 日志和调试

### 日志输出

```go
// 输出日志到控制台
func (a *App) Log(message string) {
    runtime.LogPrint(a.ctx, message)
}

// 输出错误日志
func (a *App) LogError(message string) {
    runtime.LogError(a.ctx, message)
}

// 输出调试信息
func (a *App) LogDebug(message string) {
    runtime.LogDebug(a.ctx, message)
}
```

## 完整示例

```go
package main

import (
    "context"
    "fmt"
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

// 示例：获取系统信息
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

// 示例：文件操作
func (a *App) OpenFileExample() string {
    result, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
        Title: "选择文件",
        Filters: []string{
            "文本文件 (*.txt)",
            "所有文件 (*.*)",
        },
    })
    
    if err != nil {
        runtime.LogError(a.ctx, fmt.Sprintf("打开文件失败: %v", err))
        return ""
    }
    
    return result
}
```

## 最佳实践

### 1. 错误处理

```go
func (a *App) SafeOperation() (string, error) {
    result, err := someOperation()
    if err != nil {
        runtime.LogError(a.ctx, fmt.Sprintf("操作失败: %v", err))
        return "", err
    }
    return result, nil
}
```

### 2. 异步操作

```go
func (a *App) AsyncOperation() {
    go func() {
        // 执行耗时操作
        result := performHeavyTask()
        
        // 通过事件通知前端
        runtime.EventsEmit(a.ctx, "task-completed", result)
    }()
}
```

### 3. 状态管理

```go
type AppState struct {
    IsLoading bool
    Data      interface{}
}

func (a *App) UpdateState(state AppState) {
    // 更新应用状态
    runtime.EventsEmit(a.ctx, "state-changed", state)
}
```

## 下一步

了解更多 API 功能：

1. 🪟 查看 [窗口 API](/api/window) 了解更多窗口控制功能
2. 📡 学习 [事件系统](/api/events) 实现前后端通信
3. 🛠️ 了解 [工具函数](/api/utils) 使用便捷工具
