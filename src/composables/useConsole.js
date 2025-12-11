/**
 * Console 输出管理
 */
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

export function useConsole() {
  const consoleLogs = ref([])
  const showConsole = ref(true)
  const consoleLogsRef = ref(null)

  // 清空 Console
  const clearConsole = () => {
    consoleLogs.value = []
  }

  // 添加日志
  const addLog = (type, content) => {
    consoleLogs.value.push({ type, content })
    scrollToBottom()
  }

  // 滚动到底部
  const scrollToBottom = () => {
    nextTick(() => {
      if (consoleLogsRef.value) {
        consoleLogsRef.value.scrollTop = consoleLogsRef.value.scrollHeight
      }
    })
  }

  // 处理来自 iframe 的消息
  const handleMessage = (event) => {
    if (event.data?.type === 'console') {
      addLog(event.data.logType, event.data.content)
    }
  }

  // 生成注入到 iframe 的 Console 拦截代码
  const getConsoleInterceptScript = () => {
    return `
(function() {
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info
  };
  
  function sendToParent(type, args) {
    const content = Array.from(args).map(arg => {
      if (typeof arg === 'object') {
        try { return JSON.stringify(arg, null, 2); }
        catch { return String(arg); }
      }
      return String(arg);
    }).join(' ');
    
    window.parent.postMessage({ type: 'console', logType: type, content }, '*');
  }
  
  console.log = function(...args) {
    sendToParent('log', args);
    originalConsole.log.apply(console, args);
  };
  console.error = function(...args) {
    sendToParent('error', args);
    originalConsole.error.apply(console, args);
  };
  console.warn = function(...args) {
    sendToParent('warn', args);
    originalConsole.warn.apply(console, args);
  };
  console.info = function(...args) {
    sendToParent('info', args);
    originalConsole.info.apply(console, args);
  };
  
  window.onerror = function(msg, url, line, col, error) {
    sendToParent('error', ['Error: ' + msg + ' (line ' + line + ')']);
  };
})();`
  }

  // 启动监听
  const startListening = () => {
    window.addEventListener('message', handleMessage)
  }

  // 停止监听
  const stopListening = () => {
    window.removeEventListener('message', handleMessage)
  }

  return {
    consoleLogs,
    showConsole,
    consoleLogsRef,
    clearConsole,
    addLog,
    scrollToBottom,
    getConsoleInterceptScript,
    startListening,
    stopListening
  }
}
