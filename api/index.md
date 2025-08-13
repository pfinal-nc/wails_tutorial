# API 参考

Wails 提供了丰富的 API 来帮助您构建功能强大的桌面应用。

## 核心 API

### [应用 API](/api/app)
应用生命周期管理、窗口控制、系统交互等核心功能。

- 应用启动、运行、关闭事件
- 窗口大小、位置、状态控制
- 对话框和消息显示
- 系统通知和剪贴板操作
- 环境信息获取

### [窗口 API](/api/window)
窗口相关的所有操作和配置。

- 窗口创建和配置
- 窗口样式和属性设置
- 窗口事件处理
- 多窗口管理

### [事件系统](/api/events)
前后端通信和事件处理机制。

- 事件发送和监听
- 实时数据同步
- 异步操作处理
- 状态管理

### [工具函数](/api/utils)
常用的工具函数和辅助方法。

- 文件操作工具
- 数据处理函数
- 系统工具函数
- 开发辅助工具

## 使用示例

### 基本用法

```go
import "github.com/wailsapp/wails/v2/pkg/runtime"

// 获取窗口大小
width, height := runtime.WindowGetSize(ctx)

// 显示消息对话框
runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
    Type:    runtime.InfoDialog,
    Title:   "提示",
    Message: "操作成功！",
})
```

### 前端调用

```javascript
import { GetSystemInfo, ShowMessage } from '../wailsjs/go/main/App'

// 调用后端方法
const systemInfo = await GetSystemInfo()
console.log(systemInfo)

// 显示消息
await ShowMessage("标题", "消息内容")
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
    runtime.EventsEmit(a.ctx, "state-changed", state)
}
```

## 下一步

1. 🔧 查看 [应用 API](/api/app) 了解核心功能
2. 🪟 学习 [窗口 API](/api/window) 掌握窗口控制
3. 📡 了解 [事件系统](/api/events) 实现通信
4. 🛠️ 使用 [工具函数](/api/utils) 提高开发效率
