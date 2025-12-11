/**
 * Go 语言课程数据
 * TODO: 后续开发
 */
export const golangLessons = [
  {
    title: 'Go 语言简介',
    desc: '了解 Go 语言的特点和应用场景',
    theory: `
      <p>Go 是 Google 开发的开源编程语言，简洁高效</p>
      <p>特点：编译快、并发强、语法简单、自带垃圾回收</p>
      <p>应用：云原生、微服务、DevOps 工具、区块链</p>
    `,
    html: `<div id="output"></div>`,
    css: `#output { font-family: monospace; white-space: pre-line; padding: 20px; background: #f5f5f5; border-radius: 8px; }`,
    js: `document.getElementById("output").textContent = "🚧 Go 语言课程正在开发中...\\n\\n敬请期待！";`,
    task: '课程开发中，敬请期待',
    hints: ['课程即将上线'],
    solution: {},
    check: () => true
  }
]
