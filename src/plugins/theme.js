/**
 * Naive UI 主题配置
 * 动态主题色支持
 */
import { computed } from 'vue'
import { darkTheme } from 'naive-ui'

// 创建主题覆盖配置
const createThemeOverrides = (primaryColor, primaryHover, isDark) => {
  const base = {
    common: {
      primaryColor: primaryColor,
      primaryColorHover: primaryHover,
      primaryColorPressed: primaryHover,
      primaryColorSuppl: primaryColor,
      borderRadius: '8px',
      borderRadiusSmall: '6px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    Button: {
      borderRadiusMedium: '8px',
      borderRadiusSmall: '6px',
      borderRadiusLarge: '10px'
    },
    Card: {
      borderRadius: '12px'
    },
    Modal: {
      borderRadius: '16px'
    },
    Input: {
      borderRadius: '8px'
    },
    Tag: {
      borderRadius: '6px'
    },
    Drawer: {
      borderRadius: '16px 0 0 16px'
    }
  }

  if (isDark) {
    return {
      ...base,
      common: {
        ...base.common,
        bodyColor: '#1a1a2e',
        cardColor: '#2d2d44',
        modalColor: '#2d2d44',
        popoverColor: '#2d2d44'
      },
      Card: {
        ...base.Card,
        color: '#2d2d44',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)'
      },
      Modal: {
        ...base.Modal,
        color: '#2d2d44'
      },
      Input: {
        ...base.Input,
        color: '#3d3d5c'
      },
      Drawer: {
        ...base.Drawer,
        color: '#2d2d44'
      }
    }
  }

  return {
    ...base,
    Card: {
      ...base.Card,
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
    }
  }
}

export { darkTheme }

// 创建响应式主题配置
export function useNaiveTheme(isDark, primaryColor, primaryHover) {
  const theme = computed(() => isDark.value ? darkTheme : null)
  
  const themeOverrides = computed(() => 
    createThemeOverrides(
      primaryColor?.value || '#3b82f6',
      primaryHover?.value || '#2563eb',
      isDark.value
    )
  )
  
  return {
    theme,
    themeOverrides
  }
}
