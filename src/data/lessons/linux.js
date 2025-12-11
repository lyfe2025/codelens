/**
 * Linux 命令行课程数据
 * TODO: 后续开发
 */
export const linuxLessons = [
  {
    title: 'Linux 基础入门',
    desc: '了解 Linux 系统和命令行基础',
    theory: `
      <p>Linux 是开源的类 Unix 操作系统</p>
      <p>命令行是与系统交互的强大方式</p>
      <p>应用：服务器运维、开发环境、云计算</p>
    `,
    html: `<div id="output"></div>`,
    css: `#output { font-family: monospace; white-space: pre-line; padding: 20px; background: #1e1e1e; color: #0f0; border-radius: 8px; }`,
    js: `document.getElementById("output").textContent = "$ echo '🚧 Linux 课程正在开发中...'\\n🚧 Linux 课程正在开发中...\\n\\n$ _";`,
    task: '课程开发中，敬请期待',
    hints: ['课程即将上线'],
    solution: {},
    check: () => true
  }
]
