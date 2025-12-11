/**
 * 学习统计管理
 */
import { ref, onMounted, onUnmounted } from 'vue'

const streakDays = ref(0)
const todayMinutes = ref(0)

let startTime = null
let onStatsChange = null

export function setStatsChangeCallback(callback) {
  onStatsChange = callback
}

// 更新连续学习天数
function updateStreak() {
  const today = new Date().toDateString()
  const lastStudy = localStorage.getItem('lastStudyDate')
  const streak = parseInt(localStorage.getItem('studyStreak') || '0')
  
  if (lastStudy === today) {
    streakDays.value = streak
  } else {
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    if (lastStudy === yesterday) {
      streakDays.value = streak
    } else if (lastStudy) {
      // 超过一天没学习，重置连续天数
      streakDays.value = 0
      localStorage.setItem('studyStreak', '0')
    }
  }
}

// 更新今日学习时间
function updateTodayTime() {
  const today = new Date().toDateString()
  const savedDate = localStorage.getItem('todayDate')
  
  if (savedDate === today) {
    todayMinutes.value = parseInt(localStorage.getItem('todayMinutes') || '0')
  } else {
    todayMinutes.value = 0
    localStorage.setItem('todayDate', today)
    localStorage.setItem('todayMinutes', '0')
  }
}

// 记录学习时间
function recordStudyTime() {
  if (!startTime) return
  
  const minutes = Math.floor((Date.now() - startTime) / 60000)
  if (minutes > 0) {
    const today = new Date().toDateString()
    const currentMinutes = parseInt(localStorage.getItem('todayMinutes') || '0')
    localStorage.setItem('todayMinutes', String(currentMinutes + minutes))
    localStorage.setItem('todayDate', today)
    todayMinutes.value = currentMinutes + minutes
    
    // 更新连续学习
    const lastStudy = localStorage.getItem('lastStudyDate')
    if (lastStudy !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const streak = parseInt(localStorage.getItem('studyStreak') || '0')
      
      if (lastStudy === yesterday) {
        // 连续学习
        const newStreak = streak + 1
        localStorage.setItem('studyStreak', String(newStreak))
        streakDays.value = newStreak
      } else {
        // 新的开始
        localStorage.setItem('studyStreak', '1')
        streakDays.value = 1
      }
      localStorage.setItem('lastStudyDate', today)
      
      // 触发成就检查
      onStatsChange?.()
    }
    
    startTime = Date.now() // 重置计时起点
  }
}

// 开始计时
function startTracking() {
  startTime = Date.now()
  updateStreak()
  updateTodayTime()
  
  // 首次访问也记录为学习
  const today = new Date().toDateString()
  const lastStudy = localStorage.getItem('lastStudyDate')
  if (lastStudy !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const streak = parseInt(localStorage.getItem('studyStreak') || '0')
    
    if (lastStudy === yesterday) {
      const newStreak = streak + 1
      localStorage.setItem('studyStreak', String(newStreak))
      streakDays.value = newStreak
    } else if (!lastStudy) {
      localStorage.setItem('studyStreak', '1')
      streakDays.value = 1
    }
    localStorage.setItem('lastStudyDate', today)
    onStatsChange?.()
  }
}

// 停止计时
function stopTracking() {
  recordStudyTime()
  startTime = null
}

// 组合式函数
export function useStudyStats() {
  onMounted(() => {
    startTracking()
    window.addEventListener('beforeunload', recordStudyTime)
    
    // 每分钟记录一次
    const interval = setInterval(recordStudyTime, 60000)
    onUnmounted(() => clearInterval(interval))
  })
  
  onUnmounted(() => {
    stopTracking()
    window.removeEventListener('beforeunload', recordStudyTime)
  })
  
  return {
    streakDays,
    todayMinutes,
    updateStreak,
    updateTodayTime,
    startTracking,
    stopTracking,
    setStatsChangeCallback
  }
}
