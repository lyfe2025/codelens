/**
 * 间隔复习系统
 * 基于艾宾浩斯遗忘曲线，在 1天、3天、7天 后提醒复习
 */
import { ref, computed } from 'vue'
import { lessons } from '../data/lessons/index'
import { useProgress } from './useProgress'
import { MODULE_NAMES } from '../utils/constants'

// 复习间隔（毫秒）
const REVIEW_INTERVALS = [
  { days: 1, label: '1天前学习' },
  { days: 3, label: '3天前学习' },
  { days: 7, label: '7天前学习' }
]

const DAY_MS = 24 * 60 * 60 * 1000

// 已忽略的复习提醒
const dismissed = ref(loadDismissed())

function loadDismissed() {
  try {
    return JSON.parse(localStorage.getItem('review-dismissed') || '{}')
  } catch {
    return {}
  }
}

function saveDismissed() {
  localStorage.setItem('review-dismissed', JSON.stringify(dismissed.value))
}

export function useSpacedReview() {
  const { completedTime } = useProgress()

  // 获取需要复习的课程
  const reviewLessons = computed(() => {
    const now = Date.now()
    const result = []

    Object.entries(completedTime.value).forEach(([key, time]) => {
      if (!time) return
      
      const daysPassed = Math.floor((now - time) / DAY_MS)
      
      // 检查是否在复习窗口内（允许 1 天的误差）
      for (const interval of REVIEW_INTERVALS) {
        if (daysPassed >= interval.days && daysPassed <= interval.days + 1) {
          // 检查是否已忽略
          const dismissKey = `${key}-${interval.days}`
          if (dismissed.value[dismissKey]) continue
          
          const [module, lessonId] = key.split('-')
          const lessonData = lessons[module]?.[parseInt(lessonId)]
          
          if (lessonData) {
            result.push({
              key,
              module,
              lessonId: parseInt(lessonId),
              title: lessonData.title,
              moduleName: MODULE_NAMES[module] || module,
              completedAt: time,
              daysPassed,
              intervalLabel: interval.label,
              intervalDays: interval.days,
              path: `/lesson/${module}/${lessonId}`
            })
          }
          break // 只匹配第一个符合的间隔
        }
      }
    })

    // 按完成时间排序，最近的在前
    return result.sort((a, b) => b.completedAt - a.completedAt)
  })

  // 是否有需要复习的课程
  const hasReviewItems = computed(() => reviewLessons.value.length > 0)

  // 忽略某个复习提醒
  const dismissReview = (key, intervalDays) => {
    const dismissKey = `${key}-${intervalDays}`
    dismissed.value[dismissKey] = Date.now()
    saveDismissed()
  }

  // 忽略所有当前提醒
  const dismissAll = () => {
    reviewLessons.value.forEach(item => {
      const dismissKey = `${item.key}-${item.intervalDays}`
      dismissed.value[dismissKey] = Date.now()
    })
    saveDismissed()
  }

  // 清理过期的忽略记录（超过 30 天）
  const cleanupDismissed = () => {
    const now = Date.now()
    const thirtyDays = 30 * DAY_MS
    let changed = false
    
    Object.entries(dismissed.value).forEach(([key, time]) => {
      if (now - time > thirtyDays) {
        delete dismissed.value[key]
        changed = true
      }
    })
    
    if (changed) saveDismissed()
  }

  // 初始化时清理
  cleanupDismissed()

  return {
    reviewLessons,
    hasReviewItems,
    dismissReview,
    dismissAll
  }
}
