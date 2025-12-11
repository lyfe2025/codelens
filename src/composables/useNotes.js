/**
 * 笔记管理
 */
import { ref, computed } from 'vue'
import { lessons } from '../data/lessons/index'
import { MODULE_NAMES } from '../utils/constants'

const NOTES_PREFIX = 'lesson-note-'

// 获取所有笔记
export function getAllNotes() {
  const notes = []
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(NOTES_PREFIX)) {
      const content = localStorage.getItem(key)
      if (content && content.trim()) {
        // 解析 key: lesson-note-html-0
        const parts = key.replace(NOTES_PREFIX, '').split('-')
        const module = parts[0]
        const lessonId = parseInt(parts[1])
        
        const lesson = lessons[module]?.[lessonId]
        if (lesson) {
          notes.push({
            key,
            module,
            moduleName: MODULE_NAMES[module] || module,
            lessonId,
            lessonTitle: lesson.title,
            content,
            path: `/lesson/${module}/${lessonId}`,
            updatedAt: new Date().toISOString() // 简化处理
          })
        }
      }
    }
  }
  
  return notes
}

// 删除笔记
export function deleteNote(key) {
  localStorage.removeItem(key)
}

// 导出所有笔记
export function exportNotes() {
  const notes = getAllNotes()
  let markdown = '# 我的学习笔记\n\n'
  
  const grouped = {}
  notes.forEach(note => {
    if (!grouped[note.module]) {
      grouped[note.module] = []
    }
    grouped[note.module].push(note)
  })
  
  Object.entries(grouped).forEach(([module, moduleNotes]) => {
    markdown += `## ${MODULE_NAMES[module] || module}\n\n`
    moduleNotes.forEach(note => {
      markdown += `### ${note.lessonTitle}\n\n`
      markdown += `${note.content}\n\n`
      markdown += `---\n\n`
    })
  })
  
  return markdown
}

// 组合式函数
export function useNotes() {
  const notes = ref([])
  
  const loadNotes = () => {
    notes.value = getAllNotes()
  }
  
  const removeNote = (key) => {
    deleteNote(key)
    loadNotes()
  }
  
  const notesCount = computed(() => notes.value.length)
  
  const exportAllNotes = () => {
    const markdown = exportNotes()
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `学习笔记_${new Date().toLocaleDateString()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  return {
    notes,
    notesCount,
    loadNotes,
    removeNote,
    exportAllNotes
  }
}
