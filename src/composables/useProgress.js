/**
 * 学习进度管理
 */
import { ref } from 'vue'
import { lessons } from '../data/lessons/index'

const completed = ref({})
const completedTime = ref({}) // 记录完成时间
const favorites = ref([])

// 成就刷新回调
let onProgressChange = null

export function setProgressChangeCallback(callback) {
  onProgressChange = callback
}

// 加载数据
export function loadProgress() {
  const saved = localStorage.getItem('learn-progress')
  if (saved) completed.value = JSON.parse(saved)
  
  const savedTime = localStorage.getItem('learn-progress-time')
  if (savedTime) completedTime.value = JSON.parse(savedTime)
  
  const savedFav = localStorage.getItem('favorites')
  if (savedFav) favorites.value = JSON.parse(savedFav)
}

// 保存进度
export function saveProgress() {
  localStorage.setItem('learn-progress', JSON.stringify(completed.value))
  localStorage.setItem('learn-progress-time', JSON.stringify(completedTime.value))
  // 触发成就检查
  onProgressChange?.()
}

// 标记完成
export function markCompleted(module, lessonId) {
  const key = `${module}-${lessonId}`
  if (!completed.value[key]) {
    completed.value[key] = true
    completedTime.value[key] = Date.now() // 记录完成时间
    saveProgress()
  }
}

// 获取完成时间
export function getCompletedTime(module, lessonId) {
  return completedTime.value[`${module}-${lessonId}`] || null
}

// 检查是否完成
export function isCompleted(module, lessonId) {
  return completed.value[`${module}-${lessonId}`] || false
}

// 获取模块进度百分比
export function getModuleProgress(module) {
  const total = lessons[module]?.length || 0
  if (total === 0) return 0
  
  let done = 0
  for (let i = 0; i < total; i++) {
    if (completed.value[`${module}-${i}`]) done++
  }
  return Math.round((done / total) * 100)
}

// 获取模块已完成数量
export function getModuleCompletedCount(module) {
  const total = lessons[module]?.length || 0
  let done = 0
  for (let i = 0; i < total; i++) {
    if (completed.value[`${module}-${i}`]) done++
  }
  return done
}

// 总课程数
export function getTotalCount() {
  return Object.values(lessons).reduce((sum, arr) => sum + arr.length, 0)
}

// 已完成总数
export function getCompletedCount() {
  return Object.keys(completed.value).filter(k => completed.value[k]).length
}

// 总进度百分比
export function getTotalProgress() {
  const total = getTotalCount()
  if (total === 0) return 0
  return Math.round((getCompletedCount() / total) * 100)
}

// 收藏相关
export function isFavorite(path) {
  return favorites.value.some(f => f.path === path)
}

export function toggleFavorite(module, lessonId, title) {
  const path = `/lesson/${module}/${lessonId}`
  const index = favorites.value.findIndex(f => f.path === path)
  
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push({ path, module, title })
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
  // 触发成就检查
  onProgressChange?.()
}

export function removeFavorite(path) {
  favorites.value = favorites.value.filter(f => f.path !== path)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

export function getFavorites() {
  return favorites
}

// 组合式函数
export function useProgress() {
  return {
    completed,
    completedTime,
    favorites,
    loadProgress,
    saveProgress,
    markCompleted,
    isCompleted,
    getCompletedTime,
    getModuleProgress,
    getModuleCompletedCount,
    getTotalCount,
    getCompletedCount,
    getTotalProgress,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    getFavorites,
    setProgressChangeCallback
  }
}
