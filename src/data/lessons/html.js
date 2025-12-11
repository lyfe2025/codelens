/**
 * HTML 课程数据
 */
export const htmlLessons = [
  {
    title: '认识 HTML',
    desc: '了解 HTML 是什么，创建第一个网页',
    theory: `
      <p><strong>HTML</strong>（HyperText Markup Language）是网页的骨架，用标签来描述内容结构。</p>
      <p>每个 HTML 标签都有开始和结束：</p>
      <ul>
        <li><code>&lt;标签名&gt;内容&lt;/标签名&gt;</code></li>
        <li>例如：<code>&lt;h1&gt;标题&lt;/h1&gt;</code></li>
      </ul>
    `,
    html: `<h1>你好，世界！</h1>
<p>这是我的第一个网页。</p>`,
    task: '把 h1 标签里的文字改成你的名字',
    hints: [
      '找到 <h1> 和 </h1> 之间的文字',
      '把"你好，世界！"替换成你的名字',
      '例如：<h1>小明</h1>'
    ],
    solution: {
      html: `<h1>小明</h1>
<p>这是我的第一个网页。</p>`
    },
    check: (code) => code.html.includes('<h1>') && code.html.includes('</h1>') && !code.html.includes('你好，世界')
  },
  {
    title: '标题与段落',
    desc: '学习 h1-h6 标题和 p 段落标签',
    theory: `
      <p>HTML 提供 6 级标题，从 <code>&lt;h1&gt;</code> 到 <code>&lt;h6&gt;</code>，重要性依次递减。</p>
      <p><code>&lt;p&gt;</code> 标签用于段落文本。</p>
    `,
    html: `<h1>主标题</h1>
<h2>副标题</h2>
<p>这是一段正文内容。</p>`,
    task: '添加一个 h3 标题和另一个段落',
    hints: [
      'h3 标签格式：<h3>标题内容</h3>',
      'p 标签格式：<p>段落内容</p>',
      '在现有代码下方添加新的标签'
    ],
    solution: {
      html: `<h1>主标题</h1>
<h2>副标题</h2>
<p>这是一段正文内容。</p>
<h3>三级标题</h3>
<p>这是另一段内容。</p>`
    },
    check: (code) => code.html.includes('<h3>') && code.html.includes('</h3>') && (code.html.match(/<p>/g) || []).length >= 2
  },
  {
    title: '链接与图片',
    desc: '学习 a 链接和 img 图片标签',
    theory: `
      <p><strong>链接</strong>使用 <code>&lt;a&gt;</code> 标签：<code>&lt;a href="网址"&gt;链接文字&lt;/a&gt;</code></p>
      <p><strong>图片</strong>使用 <code>&lt;img&gt;</code> 标签：<code>&lt;img src="图片地址" alt="描述"&gt;</code></p>
    `,
    html: `<a href="https://www.baidu.com">访问百度</a>
<img src="https://picsum.photos/200/150" alt="随机图片">`,
    task: '添加一个指向 https://github.com 的链接，文字为"GitHub"',
    hints: [
      '使用 <a> 标签创建链接',
      'href 属性设置为 https://github.com',
      '标签之间的文字就是显示的链接文字'
    ],
    solution: {
      html: `<a href="https://www.baidu.com">访问百度</a>
<a href="https://github.com">GitHub</a>
<img src="https://picsum.photos/200/150" alt="随机图片">`
    },
    check: (code) => code.html.includes('href="https://github.com"') && code.html.toLowerCase().includes('github')
  },
  {
    title: '列表',
    desc: '学习有序列表和无序列表',
    theory: `
      <p><strong>无序列表</strong> <code>&lt;ul&gt;</code>：项目符号列表</p>
      <p><strong>有序列表</strong> <code>&lt;ol&gt;</code>：数字编号列表</p>
      <p>列表项都用 <code>&lt;li&gt;</code> 标签</p>
    `,
    html: `<h3>购物清单</h3>
<ul>
  <li>苹果</li>
  <li>香蕉</li>
</ul>
<h3>做饭步骤</h3>
<ol>
  <li>洗菜</li>
  <li>切菜</li>
</ol>`,
    task: '在购物清单中再添加两个水果',
    hints: [
      '在 <ul> 标签内添加新的 <li> 标签',
      '每个水果用一个 <li> 包裹',
      '例如：<li>橙子</li>'
    ],
    solution: {
      html: `<h3>购物清单</h3>
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
  <li>葡萄</li>
</ul>
<h3>做饭步骤</h3>
<ol>
  <li>洗菜</li>
  <li>切菜</li>
</ol>`
    },
    check: (code) => (code.html.match(/<li>/g) || []).length >= 6
  },
  {
    title: '表格',
    desc: '学习创建数据表格',
    theory: `
      <p>表格标签：<code>&lt;table&gt;</code>容器、<code>&lt;tr&gt;</code>行、<code>&lt;th&gt;</code>表头、<code>&lt;td&gt;</code>数据</p>
    `,
    html: `<table border="1">
  <tr>
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr>
    <td>小明</td>
    <td>18</td>
  </tr>
</table>`,
    css: `table { border-collapse: collapse; }
th, td { padding: 8px 16px; }
th { background: #f0f0f0; }`,
    task: '添加一行新数据：小红，20岁',
    hints: [
      '添加一个新的 <tr> 行',
      '使用 <td> 标签包裹数据',
      '参考已有的数据行格式'
    ],
    solution: {
      html: `<table border="1">
  <tr>
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr>
    <td>小明</td>
    <td>18</td>
  </tr>
  <tr>
    <td>小红</td>
    <td>20</td>
  </tr>
</table>`
    },
    check: (code) => code.html.includes('小红') && code.html.includes('20')
  },
  {
    title: '表单基础',
    desc: '学习输入框、按钮等表单元素',
    theory: `
      <p>表单元素：<code>&lt;input&gt;</code>输入框、<code>&lt;button&gt;</code>按钮、<code>&lt;label&gt;</code>标签</p>
      <p>input 类型：text、password、email、number 等</p>
    `,
    html: `<form>
  <label>用户名：</label>
  <input type="text" placeholder="请输入用户名">
  <br><br>
  <label>密码：</label>
  <input type="password" placeholder="请输入密码">
  <br><br>
  <button type="submit">登录</button>
</form>`,
    task: '添加一个邮箱输入框（type="email"）',
    hints: [
      '添加一个 label 和 input',
      'input 的 type 属性设为 "email"',
      '可以参考用户名输入框的格式'
    ],
    solution: {
      html: `<form>
  <label>用户名：</label>
  <input type="text" placeholder="请输入用户名">
  <br><br>
  <label>邮箱：</label>
  <input type="email" placeholder="请输入邮箱">
  <br><br>
  <label>密码：</label>
  <input type="password" placeholder="请输入密码">
  <br><br>
  <button type="submit">登录</button>
</form>`
    },
    check: (code) => code.html.includes('type="email"')
  },
  {
    title: 'div 与 span',
    desc: '学习通用容器标签',
    theory: `
      <p><code>&lt;div&gt;</code> - 块级元素，独占一行，用于布局</p>
      <p><code>&lt;span&gt;</code> - 行内元素，不换行，用于包裹文字</p>
    `,
    html: `<div style="background: #e3f2fd; padding: 20px;">
  <h2>这是一个 div 容器</h2>
  <p>div 是<span style="color: red;">块级</span>元素</p>
</div>
<div style="background: #fff3e0; padding: 20px; margin-top: 10px;">
  <p>另一个 div</p>
</div>`,
    task: '再添加一个 div，背景色设为 #e8f5e9',
    hints: [
      '复制一个现有的 div 结构',
      '修改 style 中的 background 值',
      '背景色设为 #e8f5e9'
    ],
    solution: {
      html: `<div style="background: #e3f2fd; padding: 20px;">
  <h2>这是一个 div 容器</h2>
  <p>div 是<span style="color: red;">块级</span>元素</p>
</div>
<div style="background: #fff3e0; padding: 20px; margin-top: 10px;">
  <p>另一个 div</p>
</div>
<div style="background: #e8f5e9; padding: 20px; margin-top: 10px;">
  <p>新的 div</p>
</div>`
    },
    check: (code) => code.html.includes('#e8f5e9')
  },
  {
    title: '语义化标签',
    desc: '学习 header、nav、main、footer 等',
    theory: `
      <p>语义化标签：<code>&lt;header&gt;</code>页头、<code>&lt;nav&gt;</code>导航、<code>&lt;main&gt;</code>主内容、<code>&lt;footer&gt;</code>页脚</p>
    `,
    html: `<header style="background: #333; color: white; padding: 1rem;">
  <h1>我的网站</h1>
  <nav>
    <a href="#" style="color: white;">首页</a> |
    <a href="#" style="color: white;">关于</a>
  </nav>
</header>
<main style="padding: 1rem;">
  <article>
    <h2>文章标题</h2>
    <p>文章内容...</p>
  </article>
</main>
<footer style="background: #eee; padding: 1rem; text-align: center;">
  © 2024 版权所有
</footer>`,
    task: '在 nav 中添加一个"联系我们"链接',
    hints: [
      '在 nav 标签内添加新的 <a> 标签',
      '记得添加分隔符 |',
      '设置 style="color: white;" 保持样式一致'
    ],
    solution: {
      html: `<header style="background: #333; color: white; padding: 1rem;">
  <h1>我的网站</h1>
  <nav>
    <a href="#" style="color: white;">首页</a> |
    <a href="#" style="color: white;">关于</a> |
    <a href="#" style="color: white;">联系我们</a>
  </nav>
</header>
<main style="padding: 1rem;">
  <article>
    <h2>文章标题</h2>
    <p>文章内容...</p>
  </article>
</main>
<footer style="background: #eee; padding: 1rem; text-align: center;">
  © 2024 版权所有
</footer>`
    },
    check: (code) => code.html.includes('联系')
  }
]
