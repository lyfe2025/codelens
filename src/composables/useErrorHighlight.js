/**
 * 错误代码高亮管理
 */
import { ref } from 'vue'

export function useErrorHighlight() {
  const errorDecorations = ref([])
  let editor = null
  let monaco = null

  // 设置编辑器实例
  const setEditor = (editorInstance, monacoInstance) => {
    editor = editorInstance
    monaco = monacoInstance
  }

  // 解析错误信息中的行号
  const parseErrorLine = (errorMessage) => {
    // 匹配常见的错误格式
    // "Error: xxx (line 5)"
    // "at line 5"
    // "line 5, column 10"
    // ":5:10"
    const patterns = [
      /\(line (\d+)\)/i,
      /at line (\d+)/i,
      /line (\d+)/i,
      /:(\d+):\d+/,
      /at .*:(\d+):\d+/
    ]

    for (const pattern of patterns) {
      const match = errorMessage.match(pattern)
      if (match) {
        return parseInt(match[1], 10)
      }
    }
    return null
  }

  // 高亮错误行
  const highlightErrorLine = (lineNumber, message = '') => {
    if (!editor || !monaco) return

    // 清除之前的装饰
    clearHighlights()

    // 添加新的错误装饰
    const decorations = editor.deltaDecorations([], [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: 'error-line',
          glyphMarginClassName: 'error-glyph',
          hoverMessage: message ? { value: `**错误**: ${message}` } : undefined
        }
      }
    ])

    errorDecorations.value = decorations
  }

  // 从错误消息自动高亮
  const highlightFromError = (errorMessage) => {
    const lineNumber = parseErrorLine(errorMessage)
    if (lineNumber) {
      highlightErrorLine(lineNumber, errorMessage)
      return lineNumber
    }
    return null
  }

  // 清除高亮
  const clearHighlights = () => {
    if (!editor) return
    
    if (errorDecorations.value.length) {
      editor.deltaDecorations(errorDecorations.value, [])
      errorDecorations.value = []
    }
  }

  // 注入错误高亮样式
  const injectStyles = () => {
    const styleId = 'error-highlight-styles'
    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      .error-line {
        background: rgba(244, 67, 54, 0.2) !important;
      }
      .error-glyph {
        background: #f44336;
        border-radius: 50%;
        margin-left: 5px;
      }
    `
    document.head.appendChild(style)
  }

  return {
    errorDecorations,
    setEditor,
    parseErrorLine,
    highlightErrorLine,
    highlightFromError,
    clearHighlights,
    injectStyles
  }
}
