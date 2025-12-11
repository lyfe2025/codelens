/**
 * 常量定义
 */

export const MODULE_NAMES = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  nodejs: 'Node.js',
  ajax: 'Ajax',
  vue: 'Vue',
  advanced: '进阶',
  // 新增模块
  typescript: 'TypeScript',
  golang: 'Go',
  linux: 'Linux',
  mobile: '移动开发'
}

export const DIFFICULTY_TEXT = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}

export const MODULE_CONFIG = [
  // 前端基础
  { id: 'html', name: 'HTML 基础', icon: '📄', desc: '网页结构与语义化标签', category: 'frontend' },
  { id: 'css', name: 'CSS 样式', icon: '🎨', desc: '布局、动画与响应式设计', category: 'frontend' },
  { id: 'js', name: 'JavaScript', icon: '⚡', desc: '编程逻辑与 DOM 操作', category: 'frontend' },
  // 前端进阶
  { id: 'vue', name: 'Vue 框架', icon: '💚', desc: '组件化开发与响应式', category: 'frontend' },
  { id: 'ajax', name: 'Ajax 网络请求', icon: '🌐', desc: 'Fetch、REST API 与数据处理', category: 'frontend' },
  { id: 'advanced', name: '实战进阶', icon: '🚀', desc: 'Router、Pinia、Axios、组件库', category: 'frontend' },
  // 后端 & 语言
  { id: 'nodejs', name: 'Node.js', icon: '🟢', desc: '模块系统、事件循环与 NPM', category: 'backend' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷', desc: '类型安全的 JavaScript 超集', category: 'backend', comingSoon: true },
  { id: 'golang', name: 'Go 语言', icon: '🐹', desc: '高性能后端与云原生开发', category: 'backend', comingSoon: true },
  // 系统 & 运维
  { id: 'linux', name: 'Linux 命令行', icon: '🐧', desc: '服务器运维与 Shell 脚本', category: 'devops', comingSoon: true },
  // 移动开发
  { id: 'mobile', name: '移动开发', icon: '📱', desc: 'React Native、Flutter 跨平台开发', category: 'mobile', comingSoon: true }
]

// 模块分类
export const MODULE_CATEGORIES = {
  frontend: { name: '前端开发' },
  backend: { name: '后端 & 语言' },
  devops: { name: '系统 & 运维' },
  mobile: { name: '移动开发' }
}

export const STORAGE_KEYS = {
  PROGRESS: 'learn-progress',
  FAVORITES: 'favorites',
  STREAK: 'studyStreak',
  LAST_STUDY: 'lastStudyDate',
  TODAY_DATE: 'todayDate',
  TODAY_MINUTES: 'todayMinutes'
}
