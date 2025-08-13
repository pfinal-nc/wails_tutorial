import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wails 中文教程",
  description: "Wails 框架中文教程 - 使用 Go 和 Web 技术构建桌面应用",
  lang: 'zh-CN',
  ignoreDeadLinks: true, // 忽略死链接检查
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'Wails, Go, 桌面应用, 跨平台, 教程' }],
    ['meta', { name: 'author', content: 'PFinal南丞' }]
  ],
  
  themeConfig: {
    // 网站 Logo
    logo: '/logo.png',
    
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '教程', link: '/guide/' },
      { text: 'API 参考', link: '/api/' },
      { text: '示例', link: '/examples/' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏配置
    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '环境配置', link: '/guide/environment' },
            { text: '项目结构', link: '/guide/project-structure' },
            { text: '第一个应用', link: '/guide/first-app' }
          ]
        },
        {
          text: '核心概念',
          items: [
            { text: '应用生命周期', link: '/guide/lifecycle' },
            { text: '前后端通信', link: '/guide/communication' },
            { text: '资源管理', link: '/guide/assets' },
            { text: '打包发布', link: '/guide/build' }
          ]
        },
        {
          text: '高级特性',
          items: [
            { text: '自定义窗口', link: '/guide/custom-window' },
            { text: '系统托盘', link: '/guide/system-tray' },
            { text: '原生菜单', link: '/guide/native-menu' },
            { text: '插件系统', link: '/guide/plugins' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '应用 API', link: '/api/app' },
            { text: '窗口 API', link: '/api/window' },
            { text: '事件系统', link: '/api/events' },
            { text: '工具函数', link: '/api/utils' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '示例项目',
          items: [
            { text: '基础示例', link: '/examples/basic' },
            { text: 'Todo 应用', link: '/examples/todo' },
            { text: '文件管理器', link: '/examples/file-manager' },
            { text: '聊天应用', link: '/examples/chat' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pfinal-nc' },
      { icon: 'twitter', link: 'https://twitter.com/pfinal_nc' }
    ],

    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    // 页脚配置
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present PFinal南丞'
    },

    // 大纲配置
    outline: {
      level: [2, 3],
      label: '目录'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/pfinal-nc/wails-tutorial/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // 侧边栏菜单标签
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
