/**
 * 代码运行工具
 */

/**
 * 生成可运行的 HTML 文档
 * @param {Object} code - { html, css, js }
 * @param {string} consoleScript - Console 拦截脚本
 * @returns {string} 完整的 HTML 文档
 */
export function generateRunableHTML(code, consoleScript = '') {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${code.css || ''}</style>
</head>
<body>
${code.html || ''}
<script>
${consoleScript}
${code.js || ''}
<\/script>
</body>
</html>`
}

/**
 * 在 iframe 中运行代码
 * @param {HTMLIFrameElement} iframe - iframe 元素
 * @param {Object} code - { html, css, js }
 * @param {string} consoleScript - Console 拦截脚本
 */
export function runInIframe(iframe, code, consoleScript = '') {
  if (!iframe) return
  iframe.srcdoc = generateRunableHTML(code, consoleScript)
}
