/**
 * 成就系统
 */
import { ref, computed, markRaw } from 'vue'
import { lessons } from '../data/lessons/index'
import {
  LeafOutline, LibraryOutline, RibbonOutline, SchoolOutline,
  LogoHtml5, LogoCss3, LogoJavascript, LogoVue, LogoNodejs, CloudOutline,
  FlameOutline, StarOutline, CalendarOutline, TrophyOutline,
  PlayOutline, GameControllerOutline, RocketOutline, DesktopOutline,
  CreateOutline, DocumentTextOutline, PencilOutline,
  MoonOutline, SunnyOutline, HeartOutline
} from '@vicons/ionicons5'

const STORAGE_KEY = 'achievements'
const STATS_KEY = 'learning-stats'

// 成就定义
const ACHIEVEMENTS = [
  // 课程完成类
  { id: 'first_lesson', name: '初出茅庐', desc: '完成第一节课', icon: markRaw(LeafOutline), check: (s) => s.completedLessons >= 1 },
  { id: 'ten_lessons', name: '小有所成', desc: '完成 10 节课', icon: markRaw(LibraryOutline), check: (s) => s.completedLessons >= 10 },
  { id: 'twenty_lessons', name: '学有所成', desc: '完成 20 节课', icon: markRaw(RibbonOutline), check: (s) => s.completedLessons >= 20 },
  { id: 'fifty_lessons', name: '融会贯通', desc: '完成 50 节课', icon: markRaw(SchoolOutline), check: (s) => s.completedLessons >= 50 },
  
  // 模块完成类
  { id: 'html_master', name: 'HTML 达人', desc: '完成全部 HTML 课程', icon: markRaw(LogoHtml5), check: (s) => s.modules?.html === true },
  { id: 'css_master', name: 'CSS 达人', desc: '完成全部 CSS 课程', icon: markRaw(LogoCss3), check: (s) => s.modules?.css === true },
  { id: 'js_master', name: 'JS 达人', desc: '完成全部 JS 课程', icon: markRaw(LogoJavascript), check: (s) => s.modules?.js === true },
  { id: 'vue_master', name: 'Vue 达人', desc: '完成全部 Vue 课程', icon: markRaw(LogoVue), check: (s) => s.modules?.vue === true },
  { id: 'nodejs_master', name: 'Node 达人', desc: '完成全部 Node.js 课程', icon: markRaw(LogoNodejs), check: (s) => s.modules?.nodejs === true },
  { id: 'ajax_master', name: 'Ajax 达人', desc: '完成全部 Ajax 课程', icon: markRaw(CloudOutline), check: (s) => s.modules?.ajax === true },
  
  // 连续学习类
  { id: 'streak_3', name: '坚持不懈', desc: '连续学习 3 天', icon: markRaw(FlameOutline), check: (s) => s.maxStreak >= 3 },
  { id: 'streak_7', name: '一周达人', desc: '连续学习 7 天', icon: markRaw(StarOutline), check: (s) => s.maxStreak >= 7 },
  { id: 'streak_14', name: '两周坚持', desc: '连续学习 14 天', icon: markRaw(CalendarOutline), check: (s) => s.maxStreak >= 14 },
  { id: 'streak_30', name: '月度之星', desc: '连续学习 30 天', icon: markRaw(TrophyOutline), check: (s) => s.maxStreak >= 30 },
  
  // 代码运行类
  { id: 'run_10', name: '初试身手', desc: '运行代码 10 次', icon: markRaw(PlayOutline), check: (s) => s.runCount >= 10 },
  { id: 'run_50', name: '勤于实践', desc: '运行代码 50 次', icon: markRaw(GameControllerOutline), check: (s) => s.runCount >= 50 },
  { id: 'run_100', name: '代码狂人', desc: '运行代码 100 次', icon: markRaw(RocketOutline), check: (s) => s.runCount >= 100 },
  { id: 'run_500', name: '编程大师', desc: '运行代码 500 次', icon: markRaw(DesktopOutline), check: (s) => s.runCount >= 500 },
  
  // 笔记类
  { id: 'first_note', name: '善于总结', desc: '写下第一条笔记', icon: markRaw(CreateOutline), check: (s) => s.notesCount >= 1 },
  { id: 'five_notes', name: '笔记新手', desc: '写下 5 条笔记', icon: markRaw(DocumentTextOutline), check: (s) => s.notesCount >= 5 },
  { id: 'ten_notes', name: '笔记达人', desc: '写下 10 条笔记', icon: markRaw(PencilOutline), check: (s) => s.notesCount >= 10 },
  
  // 特殊成就
  { id: 'night_owl', name: '夜猫子', desc: '在凌晨 0-5 点学习', icon: markRaw(MoonOutline), check: (s) => s.nightStudy === true },
  { id: 'early_bird', name: '早起鸟', desc: '在早上 5-6 点学习', icon: markRaw(SunnyOutline), check: (s) => s.earlyStudy === true },
  { id: 'first_favorite', name: '收藏家', desc: '收藏第一节课', icon: markRaw(HeartOutline), check: (s) => s.favoritesCount >= 1 },
]

// 全局状态
const stats = ref(loadStats())
const unlockedIds = ref(loadUnlocked())
const newAchievement = ref(null)

function loadStats() {
  try {
    const saved = localStorage.getItem(STATS_KEY)
    return saved ? JSON.parse(saved) : getDefaultStats()
  } catch {
    return getDefaultStats()
  }
}

function getDefaultStats() {
  return {
    completedLessons: 0,
    modules: {},
    maxStreak: 0,
    runCount: 0,
    notesCount: 0,
    favoritesCount: 0,
    nightStudy: false,
    earlyStudy: false
  }
}

function saveStats(data) {
  localStorage.setItem(STATS_KEY, JSON.stringify(data))
}

function loadUnlocked() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveUnlocked(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

// 从实际数据同步统计
function syncStatsFromStorage() {
  // 同步完成课程数
  const progress = JSON.parse(localStorage.getItem('learn-progress') || '{}')
  const completedLessons = Object.keys(progress).filter(k => progress[k]).length
  
  // 同步模块完成状态
  const modules = {}
  Object.keys(lessons).forEach(mod => {
    const total = lessons[mod]?.length || 0
    if (total === 0) return
    let done = 0
    for (let i = 0; i < total; i++) {
      if (progress[`${mod}-${i}`]) done++
    }
    if (done === total) modules[mod] = true
  })
  
  // 同步笔记数量
  let notesCount = 0
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('lesson-note-')) {
      const content = localStorage.getItem(key)
      if (content?.trim()) notesCount++
    }
  }
  
  // 同步收藏数量
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  const favoritesCount = favorites.length
  
  // 同步连续学习天数
  const maxStreak = parseInt(localStorage.getItem('studyStreak') || '0')
  
  // 更新统计
  stats.value = {
    ...stats.value,
    completedLessons,
    modules,
    notesCount,
    favoritesCount,
    maxStreak: Math.max(stats.value.maxStreak, maxStreak)
  }
  saveStats(stats.value)
}

export function useAchievements() {
  // 所有成就（带解锁状态）
  const achievements = computed(() => {
    return ACHIEVEMENTS.map(a => ({
      ...a,
      unlocked: unlockedIds.value.includes(a.id)
    }))
  })

  const unlockedAchievements = computed(() => achievements.value.filter(a => a.unlocked))
  const lockedAchievements = computed(() => achievements.value.filter(a => !a.unlocked))

  // 检查并解锁成就
  const checkAchievements = () => {
    const newUnlocked = []
    
    ACHIEVEMENTS.forEach(achievement => {
      if (!unlockedIds.value.includes(achievement.id)) {
        if (achievement.check(stats.value)) {
          unlockedIds.value.push(achievement.id)
          newUnlocked.push(achievement)
        }
      }
    })

    if (newUnlocked.length > 0) {
      saveUnlocked(unlockedIds.value)
      // 显示第一个新解锁的成就
      newAchievement.value = newUnlocked[0]
      setTimeout(() => {
        newAchievement.value = null
      }, 5000)
    }

    return newUnlocked
  }

  // 更新统计并检查成就
  const updateStats = (updates) => {
    stats.value = { ...stats.value, ...updates }
    saveStats(stats.value)
    checkAchievements()
  }

  // 增加运行次数
  const incrementRunCount = () => {
    updateStats({ runCount: (stats.value.runCount || 0) + 1 })
  }

  // 检查学习时间（夜猫子/早起鸟）
  const checkStudyTime = () => {
    const hour = new Date().getHours()
    if (hour >= 0 && hour < 5 && !stats.value.nightStudy) {
      updateStats({ nightStudy: true })
    }
    if (hour >= 5 && hour < 6 && !stats.value.earlyStudy) {
      updateStats({ earlyStudy: true })
    }
  }

  // 初始化：同步数据并检查成就
  const init = () => {
    syncStatsFromStorage()
    checkStudyTime()
    checkAchievements()
  }

  // 刷新统计（外部调用）
  const refreshStats = () => {
    syncStatsFromStorage()
    checkAchievements()
  }

  const clearNewAchievement = () => {
    newAchievement.value = null
  }

  return {
    stats,
    achievements,
    unlockedAchievements,
    lockedAchievements,
    newAchievement,
    checkAchievements,
    updateStats,
    incrementRunCount,
    checkStudyTime,
    refreshStats,
    clearNewAchievement,
    init
  }
}
