/**
 * 课程验证管理
 */
import { ref } from 'vue'

export function useLessonCheck() {
  const checkResult = ref(null)
  const showSolution = ref(false)
  const currentHintIndex = ref(0)

  // 重置状态
  const resetCheckState = () => {
    checkResult.value = null
    showSolution.value = false
    currentHintIndex.value = 0
  }

  // 显示下一个提示
  const showNextHint = (hints) => {
    if (hints && currentHintIndex.value < hints.length) {
      currentHintIndex.value++
    }
  }

  // 切换答案显示
  const toggleSolution = () => {
    showSolution.value = !showSolution.value
  }

  // 生成具体的错误提示
  const generateErrorMessage = (task, code) => {
    if (!task) return '还不对，请仔细阅读任务要求'
    
    const taskLower = task.toLowerCase()
    
    // HTML 相关检查
    if (task.includes('添加') && task.includes('h3')) {
      if (!code.html.includes('<h3>')) return '需要添加 <h3> 标签'
      if (!code.html.includes('</h3>')) return '<h3> 标签需要正确闭合'
    }
    
    if (task.includes('段落') || task.includes('<p>')) {
      const pCount = (code.html.match(/<p>/g) || []).length
      if (pCount < 2) return '需要添加更多的 <p> 段落标签'
    }
    
    if (task.includes('链接') && task.includes('github')) {
      if (!code.html.includes('href="https://github.com"')) {
        return '链接的 href 属性需要设置为 https://github.com'
      }
    }
    
    if (task.includes('邮箱') || task.includes('email')) {
      if (!code.html.includes('type="email"')) return '需要添加 type="email" 的输入框'
    }
    
    // CSS 相关检查
    if (task.includes('颜色') && task.includes('red')) {
      if (!code.css.includes('red')) return '需要将颜色设置为 red'
    }
    
    if (task.includes('border')) {
      if (!code.css.includes('border')) return '需要添加 border 属性'
    }
    
    if (task.includes('padding') && task.includes('40')) {
      if (!code.css.includes('40')) return '需要将 padding 设置为 40px'
    }
    
    if (task.includes('space-between')) {
      if (!code.css.includes('space-between')) return '需要将 justify-content 设置为 space-between'
    }
    
    if (task.includes('2 列') || task.includes('2列')) {
      if (!code.css.includes('repeat(2')) return '需要将 grid-template-columns 改为 repeat(2, 1fr)'
    }
    
    if (task.includes('box-shadow') && task.includes('hover')) {
      if (!code.css.includes('box-shadow')) return '需要在 :hover 状态添加 box-shadow'
    }
    
    // JS 相关检查
    if (task.includes('city') && task.includes('变量')) {
      if (!code.js.includes('city')) return '需要声明一个名为 city 的变量'
      if (!code.js.includes('let city') && !code.js.includes('const city')) {
        return '需要使用 let 或 const 声明 city 变量'
      }
    }
    
    if (task.includes('55') || task.includes('score')) {
      if (!code.js.includes('55') && !code.js.includes('score = 5')) {
        return '需要将 score 的值改为 55'
      }
    }
    
    if (task.includes('草莓')) {
      if (!code.js.includes('草莓')) return '需要在 fruits 数组中添加草莓'
    }
    
    if (task.includes('multiply') && task.includes('乘法')) {
      if (!code.js.includes('multiply')) return '需要创建一个名为 multiply 的函数'
      if (!code.js.includes('*')) return 'multiply 函数需要使用 * 运算符实现乘法'
    }
    
    if (task.includes('fontSize') || task.includes('字号')) {
      if (!code.js.includes('fontSize') && !code.js.includes('font-size')) {
        return '需要修改元素的 fontSize 样式属性'
      }
    }
    
    if (task.includes('10') && task.includes('红色')) {
      if (!code.js.includes('10')) return '需要判断字符数是否超过 10'
      if (!code.js.includes('red') && !code.js.includes('color')) {
        return '需要在超过 10 个字符时改变颜色'
      }
    }
    
    if (task.includes('job') && task.includes('工程师')) {
      if (!code.js.includes('job')) return '需要在返回数据中添加 job 字段'
      if (!code.js.includes('工程师')) return 'job 的值需要设置为 "工程师"'
    }
    
    // Vue 相关检查
    if (task.includes('学习') && task.includes('Vue')) {
      if (!code.js.includes('学习')) return '需要修改 message 的内容'
    }
    
    if (task.includes('name.value') && task.includes('清空')) {
      if (!code.js.includes('name.value = ""') && !code.js.includes("name.value = ''")) {
        return '需要添加按钮并在点击时将 name.value 设置为空字符串'
      }
    }
    
    if (task.includes('watch') && task.includes('price')) {
      if (!code.js.includes('watch(price')) return '需要添加 watch(price, ...) 来监听 price 变化'
    }
    
    return '还不对，请仔细阅读任务要求并检查代码'
  }

  // 验证答案
  const checkAnswer = (lesson, code, onSuccess) => {
    if (!lesson.check) return
    
    try {
      // 支持新的 checkMessage 函数
      if (lesson.checkMessage) {
        const message = lesson.checkMessage(code)
        if (message === null || message === true) {
          checkResult.value = { success: true }
          onSuccess?.()
        } else {
          checkResult.value = { success: false, message: message || '还不对，再试试' }
        }
      } else {
        // 兼容旧的 check 函数
        const result = lesson.check(code)
        if (result) {
          checkResult.value = { success: true }
          onSuccess?.()
        } else {
          const errorMsg = generateErrorMessage(lesson.task, code)
          checkResult.value = { success: false, message: errorMsg }
        }
      }
    } catch (e) {
      checkResult.value = { success: false, message: '代码执行出错: ' + e.message }
    }
  }

  return {
    checkResult,
    showSolution,
    currentHintIndex,
    resetCheckState,
    showNextHint,
    toggleSolution,
    generateErrorMessage,
    checkAnswer
  }
}
