# CodeLens

AI 写代码，你来掌控 —— 核心模块不能只靠 AI，逐行理解代码逻辑，关键时刻自己能改。

🔗 **在线体验**: [https://lyfe2025.github.io/codelens/](https://lyfe2025.github.io/codelens/)

## ✨ 特性

- 📚 **系统化课程** - 从基础到进阶，覆盖前端核心技术栈
- 💻 **在线编辑器** - 内置 Monaco Editor，实时编写和预览代码
- ✅ **代码验证** - 自动检测代码正确性，即时反馈
- 📝 **学习笔记** - 随时记录学习心得，支持导出
- 🏆 **成就系统** - 解锁成就，激励持续学习
- 📊 **学习统计** - 追踪学习进度和连续学习天数
- 🎨 **主题定制** - 8 种预设主题 + 自定义颜色
- 🌙 **深色模式** - 保护眼睛，舒适编码
- 📱 **响应式设计** - 支持桌面和移动端
- 💾 **本地存储** - 学习进度自动保存，支持导入导出
- ⚡ **PWA 支持** - 可安装为桌面应用，离线可用

## 📖 课程模块

| 模块 | 内容 |
|------|------|
| HTML | 标签、表单、语义化、多媒体 |
| CSS | 选择器、布局、Flexbox、Grid、动画 |
| JavaScript | 语法、DOM、事件、异步、ES6+ |
| Node.js | 模块、文件系统、HTTP、Express |
| Ajax | XMLHttpRequest、Fetch、跨域 |
| Vue | 组件、响应式、路由、状态管理 |

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

## 🛠️ 技术栈

- **框架**: Vue 3 + Composition API
- **构建**: Vite
- **UI 组件**: Naive UI
- **图标**: @vicons/ionicons5
- **编辑器**: Monaco Editor
- **路由**: Vue Router
- **PWA**: vite-plugin-pwa

## 📁 项目结构

```
src/
├── components/       # 组件
│   ├── ui/          # 通用 UI 组件
│   └── ...          # 业务组件
├── composables/     # 组合式函数
├── data/            # 课程数据
├── plugins/         # 插件配置
├── utils/           # 工具函数
└── views/           # 页面视图
```

## 🚀 部署到 GitHub Pages

项目已配置 GitHub Actions 自动部署，推送到 `main` 分支后会自动构建并发布到 GitHub Pages。

手动部署：

```bash
npm run build
# 将 dist 目录内容推送到 gh-pages 分支
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT
