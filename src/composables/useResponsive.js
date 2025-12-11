/**
 * 响应式布局管理
 */
import { ref, onMounted, onUnmounted } from 'vue'

export function useResponsive(breakpoint = 768) {
  const isMobile = ref(false)
  const mobileView = ref('theory') // 'theory' | 'code' | 'preview'

  const checkMobile = () => {
    isMobile.value = window.innerWidth < breakpoint
  }

  const setMobileView = (view) => {
    mobileView.value = view
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })

  return {
    isMobile,
    mobileView,
    checkMobile,
    setMobileView
  }
}
