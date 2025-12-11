<div align="center">

<img src="public/pwa-192x192.png" alt="CodeLens Logo" width="80" />

# CodeLens

### AI 写代码，你来掌控

核心模块不能只靠 AI，逐行理解代码逻辑，关键时刻自己能改

<br />

[![在线体验](https://img.shields.io/badge/🚀_在线体验-GitHub_Pages-blue?style=for-the-badge)](https://lyfe2025.github.io/codelens/)

<br />

[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Naive UI](https://img.shields.io/badge/Naive_UI-2.x-18a058?style=flat-square)](https://www.naiveui.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[功能特性](#-功能特性) · [课程模块](#-课程模块) · [快速开始](#-快速开始) · [技术栈](#️-技术栈)

</div>

<br />

---

## 🎯 为什么需要 CodeLens？

AI 能帮你快速生成代码，但当你需要：
- 调试一个诡异的 Bug
- 优化核心业务逻辑
- 定制 AI 生成的代码

你会发现：**看不懂代码 = 无法掌控产品**

CodeLens 通过逐行代码解析，帮你建立扎实的编程基础，让 AI 生成的代码不再是黑盒。

## ✨ 功能特性

| 特性 | 描述 |
|------|------|
| 💻 **在线编辑器** | 内置 Monaco Editor，实时编写、运行、预览代码 |
| 📚 **逐行解析** | 每节课配有理论讲解 + 动手任务 + 代码验证 |
| ✅ **即时反馈** | 自动检测代码正确性，完成任务即刻解锁下一课 |
| 📝 **学习笔记** | 随时记录心得，支持 Markdown 导出 |
| 🏆 **成就系统** | 25+ 成就徽章，激励持续学习 |
| 📊 **学习统计** | 追踪进度、连续学习天数、代码运行次数 |
| 🎨 **主题定制** | 8 种预设主题 + 自定义颜色 + 深色模式 |
| 📱 **响应式设计** | 桌面、平板、手机全适配 |
| ⚡ **PWA 支持** | 可安装为桌面应用，离线可用 |
| 💾 **本地存储** | 学习进度自动保存，支持导入/导出 |

## 📖 课程模块

### 前端开发
| 模块 | 课时 | 内容 |
|------|:----:|------|
| HTML | 8 | 标签、表单、语义化、多媒体 |
| CSS | 7 | 选择器、Flexbox、Grid、动画、响应式 |
| JavaScript | 8 | 变量、函数、DOM、事件、异步、ES6+ |
| Vue | 6 | 响应式、组件、指令、生命周期 |
| Ajax | 6 | Fetch、XMLHttpRequest、跨域、错误处理 |

### 后端 & 运维
| 模块 | 状态 | 内容 |
|------|:----:|------|
| Node.js | ✅ | 模块系统、文件操作、HTTP、Express |
| TypeScript | 🚧 | 类型系统、泛型、装饰器 |
| Go | 🚧 | 并发、接口、云原生开发 |
| Linux | 🚧 | Shell 命令、脚本、服务器运维 |

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/lyfe2025/codelens.git
cd codelens

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

或者使用快捷脚本：
```bash
./run.sh
```

## 🛠️ 技术栈

- **框架**: Vue 3 + Composition API
- **构建**: Vite 7
- **UI**: Naive UI
- **编辑器**: Monaco Editor
- **图标**: Ionicons 5
- **PWA**: vite-plugin-pwa

## 📁 项目结构

```
src/
├── components/      # UI 组件
├── composables/     # 组合式函数 (状态管理、主题、成就等)
├── data/lessons/    # 课程数据 (HTML/CSS/JS/Vue/Node...)
├── plugins/         # 插件配置
├── utils/           # 工具函数
└── views/           # 页面视图
```

## 🚀 部署

项目已配置 GitHub Actions，推送到 `main` 分支后自动部署到 GitHub Pages。

首次部署需在仓库设置中开启：**Settings → Pages → Source → GitHub Actions**

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

[MIT](LICENSE)
