/**
 * 主题管理 - 支持深色模式和自定义主题色
 */
import { ref, computed, watch, onMounted } from 'vue'

const STORAGE_KEY = 'theme-mode'
const COLOR_KEY = 'theme-color'

// 预设主题
export const THEME_PRESETS = [
  { id: 'blue', name: '清新蓝', color: '#3b82f6', hover: '#2563eb' },
  { id: 'green', name: '薄荷绿', color: '#10b981', hover: '#059669' },
  { id: 'orange', name: '活力橙', color: '#f97316', hover: '#ea580c' },
  { id: 'indigo', name: '靛蓝', color: '#6366f1', hover: '#4f46e5' },
  { id: 'pink', name: '樱花粉', color: '#ec4899', hover: '#db2777' },
  { id: 'cyan', name: '天青', color: '#06b6d4', hover: '#0891b2' },
  { id: 'slate', name: '深空灰', color: '#64748b', hover: '#475569' },
  { id: 'purple', name: '经典紫', color: '#8b5cf6', hover: '#7c3aed' },
]

// 全局状态
const isDark = ref(false)
const currentTheme = ref(THEME_PRESETS[0]) // 默认清新蓝
const customColor = ref('')

export function useTheme() {
  // 初始化主题
  const initTheme = () => {
    // 深色模式
    const savedMode = localStorage.getItem(STORAGE_KEY)
    if (savedMode) {
      isDark.value = savedMode === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    // 主题色
    const savedColor = localStorage.getItem(COLOR_KEY)
    if (savedColor) {
      const preset = THEME_PRESETS.find(t => t.id === savedColor)
      if (preset) {
        currentTheme.value = preset
      } else if (savedColor.startsWith('#')) {
        customColor.value = savedColor
        currentTheme.value = { id: 'custom', name: '自定义', color: savedColor, hover: savedColor }
      }
    }
    
    applyTheme()
  }

  // 应用主题
  const applyTheme = () => {
    const root = document.documentElement
    root.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    
    // 应用主题色 CSS 变量
    const color = customColor.value || currentTheme.value.color
    const hover = currentTheme.value.hover || color
    root.style.setProperty('--primary-color', color)
    root.style.setProperty('--primary-hover', hover)
    
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
    localStorage.setItem(COLOR_KEY, customColor.value || currentTheme.value.id)
  }

  // 切换深色模式
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  // 设置预设主题
  const setThemePreset = (presetId) => {
    const preset = THEME_PRESETS.find(t => t.id === presetId)
    if (preset) {
      currentTheme.value = preset
      customColor.value = ''
      applyTheme()
    }
  }

  // 设置自定义颜色
  const setCustomColor = (color) => {
    if (color && /^#[0-9A-Fa-f]{6}$/.test(color)) {
      customColor.value = color
      currentTheme.value = { id: 'custom', name: '自定义', color, hover: color }
      applyTheme()
    }
  }

  // 监听系统主题变化
  const watchSystemTheme = () => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        isDark.value = e.matches
        applyTheme()
      }
    })
  }

  // 获取当前主题色（用于 Naive UI）
  const primaryColor = computed(() => customColor.value || currentTheme.value.color)
  const primaryHover = computed(() => currentTheme.value.hover || primaryColor.value)

  onMounted(() => {
    initTheme()
    watchSystemTheme()
  })

  return {
    isDark,
    currentTheme,
    customColor,
    primaryColor,
    primaryHover,
    toggleTheme,
    setThemePreset,
    setCustomColor,
    initTheme,
    THEME_PRESETS
  }
}
