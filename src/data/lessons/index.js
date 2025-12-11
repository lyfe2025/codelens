/**
 * 课程数据统一入口
 */
import { htmlLessons } from './html'
import { cssLessons } from './css'
import { jsLessons } from './javascript'
import { nodejsLessons } from './nodejs'
import { ajaxLessons } from './ajax'
import { vueLessons } from './vue'
import { advancedLessons } from './advanced'
// 新增技术模块（开发中）
import { typescriptLessons } from './typescript'
import { golangLessons } from './golang'
import { linuxLessons } from './linux'
import { mobileLessons } from './mobile'

export const lessons = {
  // 前端基础
  html: htmlLessons,
  css: cssLessons,
  js: jsLessons,
  // 前端进阶
  vue: vueLessons,
  ajax: ajaxLessons,
  advanced: advancedLessons,
  // 后端 & 运行时
  nodejs: nodejsLessons,
  typescript: typescriptLessons,
  golang: golangLessons,
  // 系统 & 运维
  linux: linuxLessons,
  // 移动开发
  mobile: mobileLessons
}

// 导出各模块方便单独引用
export { 
  htmlLessons, 
  cssLessons, 
  jsLessons, 
  nodejsLessons, 
  ajaxLessons, 
  vueLessons, 
  advancedLessons,
  typescriptLessons,
  golangLessons,
  linuxLessons,
  mobileLessons
}
