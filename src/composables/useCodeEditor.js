/**
 * 代码编辑器管理
 */
import { ref, watch, nextTick } from 'vue'
import loader from '@monaco-editor/loader'

export function useCodeEditor(options = {}) {
  const editorContainer = ref(null)
  const activeTab = ref('html')
  const code = ref({ html: '', css: '', js: '' })
  const autoSaved = ref(false)
  
  let editor = null
  let saveTimeout = null
  let monaco = null

  // 获取存储键
  const getStorageKey = (module, lessonId) => `lesson-code-${module}-${lessonId}`

  // 保存代码到 localStorage
  const saveCode = (module, lessonId) => {
    localStorage.setItem(getStorageKey(module, lessonId), JSON.stringify(code.value))
    autoSaved.value = true
    setTimeout(() => autoSaved.value = false, 2000)
  }

  // 加载保存的代码
  const loadSavedCode = (module, lessonId) => {
    const saved = localStorage.getItem(getStorageKey(module, lessonId))
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return null
      }
    }
    return null
  }

  // 清除保存的代码
  const clearSavedCode = (module, lessonId) => {
    localStorage.removeItem(getStorageKey(module, lessonId))
  }

  // 初始化编辑器
  const initEditor = async (isMobile = false) => {
    monaco = await loader.init()
    
    if (editor) editor.dispose()
    
    editor = monaco.editor.create(editorContainer.value, {
      value: code.value[activeTab.value],
      language: activeTab.value === 'js' ? 'javascript' : activeTab.value,
      theme: 'vs-dark',
      minimap: { enabled: false },
      fontSize: isMobile ? 12 : 14,
      lineNumbers: 'on',
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'on'
    })

    return editor
  }

  // 设置编辑器内容变化回调
  const onContentChange = (callback) => {
    if (!editor) return
    
    editor.onDidChangeModelContent(() => {
      code.value[activeTab.value] = editor.getValue()
      callback?.()
    })
  }

  // 添加快捷键
  const addCommand = (keybinding, handler) => {
    if (!editor || !monaco) return
    editor.addCommand(keybinding, handler)
  }

  // 获取 Monaco 实例
  const getMonaco = () => monaco

  // 设置编辑器值
  const setValue = (value) => {
    if (editor) {
      editor.setValue(value)
    }
  }

  // 设置语言
  const setLanguage = async (lang) => {
    if (!editor) return
    if (!monaco) monaco = await loader.init()
    monaco.editor.setModelLanguage(editor.getModel(), lang === 'js' ? 'javascript' : lang)
  }

  // 切换标签
  const switchTab = async (tab) => {
    activeTab.value = tab
    if (editor) {
      editor.setValue(code.value[tab])
      await setLanguage(tab)
    }
  }

  // 设置代码
  const setCode = (newCode) => {
    code.value = { ...newCode }
    if (editor) {
      editor.setValue(code.value[activeTab.value])
    }
  }

  // 销毁编辑器
  const dispose = () => {
    if (editor) {
      editor.dispose()
      editor = null
    }
    clearTimeout(saveTimeout)
  }

  // 自动保存（防抖）
  const autoSave = (module, lessonId, delay = 1000) => {
    clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => saveCode(module, lessonId), delay)
  }

  // 格式化代码
  const formatCode = async () => {
    if (!editor) return
    await editor.getAction('editor.action.formatDocument')?.run()
  }

  return {
    editorContainer,
    activeTab,
    code,
    autoSaved,
    initEditor,
    onContentChange,
    addCommand,
    getMonaco,
    setValue,
    setLanguage,
    switchTab,
    setCode,
    dispose,
    saveCode,
    loadSavedCode,
    clearSavedCode,
    autoSave,
    formatCode,
    getStorageKey
  }
}
