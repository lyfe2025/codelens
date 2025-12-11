/**
 * 学习数据导出功能
 */
import { lessons } from '../data/lessons/index'

const PROGRESS_KEY = 'lesson-progress'
const NOTES_KEY = 'lesson-notes'
const STATS_KEY = 'learning-stats'
const ACHIEVEMENTS_KEY = 'achievements'
const FAVORITES_KEY = 'favorites'

export function useExport() {
  // 获取所有学习数据
  const getAllData = () => {
    return {
      progress: JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'),
      notes: JSON.parse(localStorage.getItem(NOTES_KEY) || '{}'),
      stats: JSON.parse(localStorage.getItem(STATS_KEY) || '{}'),
      achievements: JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '[]'),
      favorites: JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'),
      exportTime: new Date().toISOString()
    }
  }

  // 导出为 JSON
  const exportAsJson = () => {
    const data = getAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    downloadFile(blob, `学习数据_${formatDate()}.json`)
  }

  // 导出为 Markdown
  const exportAsMarkdown = () => {
    const data = getAllData()
    let md = `# 编程学习平台 - 学习记录\n\n`
    md += `导出时间：${new Date().toLocaleString()}\n\n`

    // 学习统计
    md += `## 📊 学习统计\n\n`
    md += `- 已完成课程：${data.stats.completedLessons || 0} 节\n`
    md += `- 最长连续学习：${data.stats.maxStreak || 0} 天\n`
    md += `- 代码运行次数：${data.stats.runCount || 0} 次\n`
    md += `- 笔记数量：${data.stats.notesCount || 0} 条\n\n`

    // 成就
    if (data.achievements.length > 0) {
      md += `## 🏆 已解锁成就\n\n`
      data.achievements.forEach(id => {
        md += `- ${id}\n`
      })
      md += '\n'
    }

    // 学习进度
    md += `## 📚 学习进度\n\n`
    Object.entries(data.progress).forEach(([module, completed]) => {
      const total = lessons[module]?.length || 0
      const completedCount = Object.keys(completed).length
      md += `### ${module.toUpperCase()}\n`
      md += `进度：${completedCount}/${total}\n\n`
    })

    // 笔记
    if (Object.keys(data.notes).length > 0) {
      md += `## 📝 学习笔记\n\n`
      Object.entries(data.notes).forEach(([key, note]) => {
        const [module, id] = key.split('-')
        const lesson = lessons[module]?.[parseInt(id)]
        md += `### ${lesson?.title || key}\n`
        md += `${note}\n\n`
      })
    }

    // 收藏
    if (data.favorites.length > 0) {
      md += `## ⭐ 收藏课程\n\n`
      data.favorites.forEach(fav => {
        const lesson = lessons[fav.module]?.[fav.id]
        md += `- [${fav.module.toUpperCase()}] ${lesson?.title || `课程 ${fav.id}`}\n`
      })
    }

    const blob = new Blob([md], { type: 'text/markdown' })
    downloadFile(blob, `学习记录_${formatDate()}.md`)
  }

  // 导入数据
  const importData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          
          if (data.progress) localStorage.setItem(PROGRESS_KEY, JSON.stringify(data.progress))
          if (data.notes) localStorage.setItem(NOTES_KEY, JSON.stringify(data.notes))
          if (data.stats) localStorage.setItem(STATS_KEY, JSON.stringify(data.stats))
          if (data.achievements) localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(data.achievements))
          if (data.favorites) localStorage.setItem(FAVORITES_KEY, JSON.stringify(data.favorites))
          
          resolve({ success: true })
        } catch (err) {
          reject(new Error('文件格式错误'))
        }
      }
      reader.onerror = () => reject(new Error('读取文件失败'))
      reader.readAsText(file)
    })
  }

  // 下载文件
  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // 格式化日期
  const formatDate = () => {
    const d = new Date()
    return `${d.getFullYear()}${(d.getMonth()+1).toString().padStart(2,'0')}${d.getDate().toString().padStart(2,'0')}`
  }

  return {
    getAllData,
    exportAsJson,
    exportAsMarkdown,
    importData
  }
}
