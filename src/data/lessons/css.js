/**
 * CSS 课程数据
 */
export const cssLessons = [
  {
    title: 'CSS 入门',
    desc: '了解 CSS 是什么，如何添加样式',
    theory: `
      <p><strong>CSS</strong> 用于美化网页。规则：<code>选择器 { 属性: 值; }</code></p>
      <p>常用属性：color（文字颜色）、background（背景）、font-size（字号）</p>
    `,
    html: `<h1>欢迎学习 CSS</h1>
<p>CSS 让网页变得漂亮！</p>`,
    css: `h1 {
  color: blue;
}
p {
  color: gray;
  font-size: 18px;
}`,
    task: '把 h1 的颜色改成红色（red）',
    hints: [
      '找到 h1 选择器的样式规则',
      '修改 color 属性的值',
      '把 blue 改成 red'
    ],
    solution: {
      css: `h1 {
  color: red;
}
p {
  color: gray;
  font-size: 18px;
}`
    },
    check: (code) => code.css.includes('h1') && code.css.includes('red')
  },
  {
    title: '选择器',
    desc: '学习元素、类、ID 选择器',
    theory: `
      <p>选择器类型：</p>
      <ul>
        <li><code>p</code> - 元素选择器</li>
        <li><code>.classname</code> - 类选择器</li>
        <li><code>#idname</code> - ID 选择器</li>
      </ul>
      <p>优先级：ID > 类 > 元素</p>
    `,
    html: `<h1 id="title">页面标题</h1>
<p class="highlight">这是高亮段落</p>
<p>这是普通段落</p>`,
    css: `#title { color: purple; }
.highlight { background: yellow; padding: 5px; }
p { font-size: 16px; }`,
    task: '给 .highlight 类添加红色边框（border: 2px solid red）',
    hints: [
      '找到 .highlight 选择器',
      '在花括号内添加 border 属性',
      '值为 2px solid red'
    ],
    solution: {
      css: `#title { color: purple; }
.highlight { background: yellow; padding: 5px; border: 2px solid red; }
p { font-size: 16px; }`
    },
    check: (code) => code.css.includes('.highlight') && code.css.includes('border')
  },
  {
    title: '盒模型',
    desc: '理解 margin、padding、border',
    theory: `
      <p>盒模型由内到外：content → padding → border → margin</p>
      <p>使用 <code>box-sizing: border-box</code> 让 width 包含 padding 和 border</p>
    `,
    html: `<div class="box">盒模型示例</div>
<div class="box">另一个盒子</div>`,
    css: `.box {
  width: 200px;
  padding: 20px;
  border: 3px solid #333;
  margin: 15px;
  background: #e3f2fd;
  box-sizing: border-box;
}`,
    task: '把 padding 改成 40px，观察变化',
    hints: [
      '找到 padding 属性',
      '把值从 20px 改成 40px',
      '观察盒子内部空间的变化'
    ],
    solution: {
      css: `.box {
  width: 200px;
  padding: 40px;
  border: 3px solid #333;
  margin: 15px;
  background: #e3f2fd;
  box-sizing: border-box;
}`
    },
    check: (code) => code.css.includes('padding') && code.css.includes('40')
  },
  {
    title: 'Flexbox 布局',
    desc: '学习弹性盒子布局',
    theory: `
      <p>Flexbox 关键属性：</p>
      <ul>
        <li><code>display: flex</code> - 启用</li>
        <li><code>justify-content</code> - 主轴对齐</li>
        <li><code>align-items</code> - 交叉轴对齐</li>
        <li><code>gap</code> - 间距</li>
      </ul>
    `,
    html: `<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>`,
    css: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 200px;
  background: #f5f5f5;
}
.item {
  width: 60px;
  height: 60px;
  background: #667eea;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}`,
    task: '把 justify-content 改成 space-between',
    hints: [
      '找到 .container 中的 justify-content',
      '把 center 改成 space-between',
      '观察元素的分布变化'
    ],
    solution: {
      css: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 200px;
  background: #f5f5f5;
}
.item {
  width: 60px;
  height: 60px;
  background: #667eea;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}`
    },
    check: (code) => code.css.includes('space-between')
  },
  {
    title: 'Grid 布局',
    desc: '学习网格布局',
    theory: `
      <p>Grid 关键属性：</p>
      <ul>
        <li><code>display: grid</code></li>
        <li><code>grid-template-columns</code> - 定义列</li>
        <li><code>gap</code> - 网格间距</li>
        <li><code>1fr</code> - 弹性单位</li>
      </ul>
    `,
    html: `<div class="grid">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
  <div class="cell">6</div>
</div>`,
    css: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 20px;
}
.cell {
  background: #764ba2;
  color: white;
  padding: 30px;
  text-align: center;
  border-radius: 8px;
}`,
    task: '把列数改成 2 列',
    hints: [
      '找到 grid-template-columns 属性',
      '把 repeat(3, 1fr) 改成 repeat(2, 1fr)',
      '3 表示 3 列，改成 2 就是 2 列'
    ],
    solution: {
      css: `.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 20px;
}
.cell {
  background: #764ba2;
  color: white;
  padding: 30px;
  text-align: center;
  border-radius: 8px;
}`
    },
    check: (code) => code.css.includes('repeat(2')
  },
  {
    title: '过渡动画',
    desc: '学习 transition 过渡效果',
    theory: `
      <p><code>transition: 属性 时长 缓动函数</code></p>
      <p>常用于 :hover 悬停效果</p>
    `,
    html: `<button class="btn">悬停我</button>
<div class="card">悬停看效果</div>`,
    css: `.btn {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn:hover {
  background: #5a6fd6;
  transform: scale(1.05);
}
.card {
  margin-top: 20px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}`,
    task: '给 .btn:hover 添加 box-shadow',
    hints: [
      '找到 .btn:hover 选择器',
      '添加 box-shadow 属性',
      '例如：box-shadow: 0 4px 15px rgba(0,0,0,0.3)'
    ],
    solution: {
      css: `.btn {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn:hover {
  background: #5a6fd6;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}
.card {
  margin-top: 20px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}`
    },
    check: (code) => code.css.includes('.btn:hover') && code.css.includes('box-shadow')
  },
  {
    title: '响应式设计',
    desc: '学习媒体查询适配不同屏幕',
    theory: `
      <p>媒体查询语法：<code>@media (max-width: 768px) { ... }</code></p>
      <p>常用断点：手机 < 768px，平板 768-1024px，桌面 > 1024px</p>
    `,
    html: `<div class="responsive-box">调整预览窗口大小试试</div>`,
    css: `.responsive-box {
  padding: 40px;
  text-align: center;
  font-size: 24px;
  background: #667eea;
  color: white;
  border-radius: 12px;
}
@media (max-width: 400px) {
  .responsive-box {
    background: #e91e63;
    font-size: 16px;
    padding: 20px;
  }
}`,
    task: '在媒体查询中添加 border-radius: 0',
    hints: [
      '找到 @media 内的 .responsive-box',
      '添加 border-radius: 0;',
      '这样小屏幕时圆角会消失'
    ],
    solution: {
      css: `.responsive-box {
  padding: 40px;
  text-align: center;
  font-size: 24px;
  background: #667eea;
  color: white;
  border-radius: 12px;
}
@media (max-width: 400px) {
  .responsive-box {
    background: #e91e63;
    font-size: 16px;
    padding: 20px;
    border-radius: 0;
  }
}`
    },
    check: (code) => code.css.includes('@media') && code.css.includes('border-radius') && code.css.includes('0')
  }
]
