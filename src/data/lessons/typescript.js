/**
 * TypeScript 课程数据
 * TODO: 后续开发
 */
export const typescriptLessons = [
  {
    title: 'TypeScript 简介',
    desc: '了解 TypeScript 的优势和基本概念',
    theory: `
      <p>TypeScript 是 JavaScript 的超集，添加了类型系统</p>
      <p>优势：类型安全、更好的 IDE 支持、易于维护</p>
      <p>应用：大型前端项目、Node.js 后端、全栈开发</p>
    `,
    html: `<div id="output"></div>`,
    css: `#output { font-family: monospace; white-space: pre-line; padding: 20px; background: #3178c6; color: white; border-radius: 8px; }`,
    js: `document.getElementById("output").textContent = "🚧 TypeScript 课程正在开发中...\\n\\n// 类型让代码更可靠\\nconst message: string = '敬请期待！'";`,
    task: '课程开发中，敬请期待',
    hints: ['课程即将上线'],
    solution: {},
    check: () => true
  }
]
