# 环境配置

本页面将详细介绍如何在不同操作系统上配置 Wails 开发环境。

## 系统要求

### 最低要求
- **内存**: 4GB RAM
- **存储**: 2GB 可用空间
- **网络**: 稳定的互联网连接（用于下载依赖）

### 推荐配置
- **内存**: 8GB+ RAM
- **存储**: 5GB+ 可用空间
- **CPU**: 多核处理器

## Windows 环境配置

### 1. 安装 Go

1. 访问 [Go 官网](https://golang.org/dl/) 下载 Windows 版本
2. 运行安装程序，建议使用默认安装路径
3. 验证安装：
   ```cmd
   go version
   ```

### 2. 安装 Node.js

1. 访问 [Node.js 官网](https://nodejs.org/) 下载 LTS 版本
2. 运行安装程序，确保勾选 "Add to PATH"
3. 验证安装：
   ```cmd
   node --version
   npm --version
   ```

### 3. 安装 Git

1. 访问 [Git 官网](https://git-scm.com/) 下载 Windows 版本
2. 运行安装程序，使用默认设置
3. 验证安装：
   ```cmd
   git --version
   ```

### 4. 安装 Wails CLI

```cmd
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 5. 验证安装

安装完成后，运行以下命令验证：

```cmd
wails version
```

如果看到版本信息，说明安装成功。

### 6. 使用 wails doctor 诊断环境

`wails doctor` 是 Wails 提供的环境诊断工具，可以检查您的开发环境是否正确配置：

```cmd
wails doctor
```

#### wails doctor 检查项目

该命令会检查以下内容：

- **Go 环境**：
  - Go 版本是否满足要求（1.18+）
  - Go 模块是否启用
  - GOPATH 和 GOROOT 配置

- **Node.js 环境**：
  - Node.js 版本是否满足要求（16+）
  - npm 是否可用
  - 包管理器配置

- **系统依赖**：
  - 操作系统版本
  - 必要的系统库
  - 编译器工具链

- **网络连接**：
  - 模块下载连接
  - 代理配置状态

#### 诊断结果解读

```cmd
Wails Doctor
============

✓ Go 1.21.0
✓ Node.js v18.17.0
✓ npm v9.6.7
✓ gcc
✓ pkg-config
✓ upx
✓ webview2
✓ windows build tools

✓ All checks passed!
```

如果看到 "All checks passed!"，说明环境配置正确。

#### 常见问题修复

如果 `wails doctor` 报告问题，可以按以下步骤修复：

**Go 相关问题**：
```cmd
# 更新 Go 版本
go version

# 设置 Go 代理（中国大陆用户）
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOSUMDB=sum.golang.google.cn

# 清理模块缓存
go clean -modcache
```

**Node.js 相关问题**：
```cmd
# 更新 Node.js
node --version
npm --version

# 设置 npm 镜像（中国大陆用户）
npm config set registry https://registry.npmmirror.com

# 清理 npm 缓存
npm cache clean --force
```

**系统依赖问题**：
```cmd
# Windows 用户可能需要安装 Visual Studio Build Tools
# macOS 用户可能需要安装 Xcode Command Line Tools
xcode-select --install

# Linux 用户可能需要安装开发工具
sudo apt install build-essential
```

### 7. 配置环境变量

确保以下路径已添加到系统 PATH：
- `C:\Go\bin`
- `%USERPROFILE%\go\bin`
- Node.js 安装路径

## macOS 环境配置

### 1. 使用 Homebrew 安装（推荐）

```bash
# 安装 Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Go
brew install go

# 安装 Node.js
brew install node

# 安装 Git
brew install git
```

### 2. 手动安装

#### 安装 Go
1. 访问 [Go 官网](https://golang.org/dl/) 下载 macOS 版本
2. 下载 `.pkg` 文件并运行安装程序
3. 验证安装：
   ```bash
   go version
   ```

#### 安装 Node.js
1. 访问 [Node.js 官网](https://nodejs.org/) 下载 macOS 版本
2. 下载 `.pkg` 文件并运行安装程序
3. 验证安装：
   ```bash
   node --version
   npm --version
   ```

### 3. 安装 Wails CLI

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 4. 验证安装

安装完成后，运行以下命令验证：

```bash
wails version
```

如果看到版本信息，说明安装成功。

### 5. 使用 wails doctor 诊断环境

运行环境诊断命令：

```bash
wails doctor
```

该命令会检查您的开发环境配置，包括 Go、Node.js、系统依赖等。

### 6. 配置 Shell 环境

在 `~/.zshrc` 或 `~/.bash_profile` 中添加：

```bash
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```

## Linux 环境配置

### Ubuntu/Debian

```bash
# 更新包管理器
sudo apt update

# 安装 Go
sudo apt install golang-go

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 Git
sudo apt install git

# 安装 Wails CLI
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 验证安装
wails version

# 运行环境诊断
wails doctor
```

### CentOS/RHEL/Fedora

```bash
# CentOS/RHEL
sudo yum install golang nodejs git

# Fedora
sudo dnf install golang nodejs git

# 安装 Wails CLI
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 验证安装
wails version

# 运行环境诊断
wails doctor
```

### Arch Linux

```bash
# 安装依赖
sudo pacman -S go nodejs npm git

# 安装 Wails CLI
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 验证安装
wails version

# 运行环境诊断
wails doctor
```

## 开发工具配置

### 推荐的 IDE

#### Visual Studio Code（推荐）

1. 下载安装 [VS Code](https://code.visualstudio.com/)
2. 安装推荐扩展：
   - Go
   - JavaScript and TypeScript
   - Vue Language Features (Volar)
   - React Developer Tools
   - GitLens

#### GoLand

1. 下载安装 [GoLand](https://www.jetbrains.com/go/)
2. 配置 Go 环境
3. 安装前端开发插件

### 终端工具

#### Windows
- **Windows Terminal** - 现代化的终端体验
- **PowerShell** - 强大的脚本环境

#### macOS
- **iTerm2** - 功能丰富的终端模拟器
- **Oh My Zsh** - 增强的 shell 配置

#### Linux
- **Terminator** - 多窗口终端
- **Oh My Zsh** - 增强的 shell 配置

## 网络配置

### 代理设置

如果您在中国大陆，可能需要配置代理：

#### Go 代理
```bash
# 设置 Go 模块代理
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOSUMDB=sum.golang.google.cn
```

#### npm 代理
```bash
# 设置 npm 镜像
npm config set registry https://registry.npmmirror.com
```

#### Git 代理（可选）
```bash
# 设置 Git 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

## 验证环境

### 1. 运行环境诊断

首先运行 `wails doctor` 检查环境配置：

```bash
wails doctor
```

确保所有检查项都通过（显示 ✓）。

### 2. 创建测试项目

创建测试项目验证环境配置：

```bash
# 创建测试项目
wails init -n test-project

# 进入项目目录
cd test-project

# 启动开发服务器
wails dev
```

如果一切正常，您应该看到：
- 前端开发服务器启动
- 桌面应用窗口打开
- 显示 "Hello World" 内容

### 3. 常见诊断结果

**正常结果**：
```bash
Wails Doctor
============

✓ Go 1.21.0
✓ Node.js v18.17.0
✓ npm v9.6.7
✓ gcc
✓ pkg-config
✓ upx
✓ webview2
✓ windows build tools

✓ All checks passed!
```

**问题结果**：
```bash
Wails Doctor
============

✓ Go 1.21.0
✗ Node.js (not found)
✗ npm (not found)
✓ gcc
✓ pkg-config
✓ upx
✓ webview2
✓ windows build tools

✗ Some checks failed!
```

如果发现问题，请参考前面的"常见问题修复"部分。

## 常见问题解决

### Go 相关

**Q: `go: command not found`**
A: 检查 Go 是否正确安装，确保 PATH 环境变量包含 Go 的 bin 目录。

**Q: 模块下载失败**
A: 配置 Go 代理：
```bash
go env -w GOPROXY=https://goproxy.cn,direct
```

### Node.js 相关

**Q: `node: command not found`**
A: 检查 Node.js 是否正确安装，确保 PATH 环境变量正确。

**Q: npm 安装包失败**
A: 配置 npm 镜像：
```bash
npm config set registry https://registry.npmmirror.com
```

### Wails 相关

**Q: `wails: command not found`**
A: 确保 Go 的 bin 目录在 PATH 中，重新安装 Wails CLI。

**Q: 构建失败**
A: 检查系统依赖是否完整，特别是 C 编译器。

## 下一步

环境配置完成后，您可以：

1. 🚀 开始 [快速开始](/guide/getting-started) 创建第一个项目
2. 🏗️ 了解 [项目结构](/guide/project-structure) 深入了解架构
3. 🔧 查看 [API 参考](/api/) 了解更多功能
