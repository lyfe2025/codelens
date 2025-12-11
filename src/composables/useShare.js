/**
 * 代码分享功能
 */
import { ref } from 'vue'

export function useShare() {
  const shareUrl = ref('')
  const isSharing = ref(false)

  // 压缩并编码代码
  const encodeCode = (code) => {
    try {
      const json = JSON.stringify(code)
      // 使用 base64 编码
      const encoded = btoa(unescape(encodeURIComponent(json)))
      return encoded
    } catch (e) {
      console.error('编码失败:', e)
      return null
    }
  }

  // 解码代码
  const decodeCode = (encoded) => {
    try {
      const json = decodeURIComponent(escape(atob(encoded)))
      return JSON.parse(json)
    } catch (e) {
      console.error('解码失败:', e)
      return null
    }
  }

  // 生成分享链接
  const generateShareUrl = (code, module, lessonId) => {
    const encoded = encodeCode(code)
    if (!encoded) return null
    
    const baseUrl = window.location.origin + window.location.pathname
    const url = `${baseUrl}#/lesson/${module}/${lessonId}?code=${encoded}`
    shareUrl.value = url
    return url
  }

  // 从 URL 获取分享的代码
  const getSharedCode = () => {
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('code')
    if (encoded) {
      return decodeCode(encoded)
    }
    return null
  }

  // 复制到剪贴板
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (e) {
      // 降级方案
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      return true
    }
  }

  // 分享代码
  const shareCode = async (code, module, lessonId) => {
    isSharing.value = true
    const url = generateShareUrl(code, module, lessonId)
    
    if (url) {
      // 尝试使用 Web Share API
      if (navigator.share) {
        try {
          await navigator.share({
            title: '编程学习平台 - 代码分享',
            text: '来看看我写的代码！',
            url: url
          })
          isSharing.value = false
          return { success: true, method: 'share' }
        } catch (e) {
          // 用户取消或不支持
        }
      }
      
      // 降级到复制链接
      const copied = await copyToClipboard(url)
      isSharing.value = false
      return { success: copied, method: 'copy', url }
    }
    
    isSharing.value = false
    return { success: false }
  }

  return {
    shareUrl,
    isSharing,
    encodeCode,
    decodeCode,
    generateShareUrl,
    getSharedCode,
    copyToClipboard,
    shareCode
  }
}
