/**
 * JavaScript 课程数据
 */
export const jsLessons = [
  {
    title: '变量与数据类型',
    desc: '学习 let、const 和基本数据类型',
    theory: `
      <p>变量声明：<code>let</code>（可变）、<code>const</code>（常量）</p>
      <p>数据类型：字符串、数字、布尔、数组、对象</p>
    `,
    html: `<div id="output"></div>`,
    css: `#output { font-family: monospace; white-space: pre-line; padding: 20px; background: #f5f5f5; border-radius: 8px; }`,
    js: `const name = "小明";
let age = 18;
const hobbies = ["编程", "游戏", "音乐"];

document.getElementById("output").textContent = \`姓名：\${name}
年龄：\${age}
爱好：\${hobbies.join("、")}\`;`,
    task: '添加一个 city 变量并显示出来',
    hints: [
      '使用 let 或 const 声明 city 变量',
      '给 city 赋值，如 "北京"',
      '在模板字符串中添加城市的显示'
    ],
    solution: {
      js: `const name = "小明";
let age = 18;
const hobbies = ["编程", "游戏", "音乐"];
const city = "北京";

document.getElementById("output").textContent = \`姓名：\${name}
年龄：\${age}
城市：\${city}
爱好：\${hobbies.join("、")}\`;`
    },
    check: (code) => code.js.includes('city') && (code.js.includes('let city') || code.js.includes('const city'))
  },
  {
    title: '条件判断',
    desc: '学习 if-else 和三元运算符',
    theory: `
      <p>语法：<code>if (条件) { } else { }</code></p>
      <p>三元：<code>条件 ? 真值 : 假值</code></p>
    `,
    html: `<div id="result"></div>`,
    css: `#result { padding: 20px; border-radius: 8px; font-size: 18px; }`,
    js: `const score = 85;
const result = document.getElementById("result");

if (score >= 90) {
  result.textContent = "优秀！🎉";
  result.style.background = "#e8f5e9";
} else if (score >= 60) {
  result.textContent = "及格 👍";
  result.style.background = "#fff3e0";
} else {
  result.textContent = "需要努力 💪";
  result.style.background = "#ffebee";
}`,
    task: '把 score 改成 55，看看结果',
    hints: [
      '找到 const score = 85',
      '把 85 改成 55',
      '观察显示结果的变化'
    ],
    solution: {
      js: `const score = 55;
const result = document.getElementById("result");

if (score >= 90) {
  result.textContent = "优秀！🎉";
  result.style.background = "#e8f5e9";
} else if (score >= 60) {
  result.textContent = "及格 👍";
  result.style.background = "#fff3e0";
} else {
  result.textContent = "需要努力 💪";
  result.style.background = "#ffebee";
}`
    },
    check: (code) => code.js.includes('55') || code.js.includes('score = 5')
  },
  {
    title: '循环',
    desc: '学习 for 循环和数组遍历',
    theory: `
      <p>for 循环：<code>for (let i = 0; i < 5; i++) { }</code></p>
      <p>数组方法：forEach、map、filter</p>
    `,
    html: `<ul id="list"></ul>`,
    css: `#list { list-style: none; padding: 0; }
#list li { padding: 10px; margin: 5px 0; background: #e3f2fd; border-radius: 6px; }`,
    js: `const fruits = ["🍎 苹果", "🍌 香蕉", "🍊 橙子", "🍇 葡萄"];
const list = document.getElementById("list");

fruits.forEach(fruit => {
  const li = document.createElement("li");
  li.textContent = fruit;
  list.appendChild(li);
});`,
    task: '在 fruits 数组中添加 "🍓 草莓"',
    hints: [
      '找到 fruits 数组的定义',
      '在数组末尾添加新元素',
      '格式：["...", "...", "🍓 草莓"]'
    ],
    solution: {
      js: `const fruits = ["🍎 苹果", "🍌 香蕉", "🍊 橙子", "🍇 葡萄", "🍓 草莓"];
const list = document.getElementById("list");

fruits.forEach(fruit => {
  const li = document.createElement("li");
  li.textContent = fruit;
  list.appendChild(li);
});`
    },
    check: (code) => code.js.includes('草莓')
  },
  {
    title: '函数',
    desc: '学习函数定义和箭头函数',
    theory: `
      <p>传统：<code>function add(a, b) { return a + b; }</code></p>
      <p>箭头：<code>const add = (a, b) => a + b;</code></p>
    `,
    html: `<input type="number" id="num1" value="10" style="width:60px">
<span> + </span>
<input type="number" id="num2" value="20" style="width:60px">
<button id="calcBtn">= 计算</button>
<span id="result" style="font-weight:bold; margin-left:10px;"></span>`,
    css: `input, button { padding: 8px; font-size: 16px; }
button { cursor: pointer; background: #667eea; color: white; border: none; border-radius: 4px; }`,
    js: `const add = (a, b) => a + b;

document.getElementById("calcBtn").addEventListener("click", () => {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  document.getElementById("result").textContent = add(num1, num2);
});`,
    task: '创建一个 multiply 函数实现乘法',
    hints: [
      '参考 add 函数的写法',
      '使用 * 运算符实现乘法',
      'const multiply = (a, b) => a * b;'
    ],
    solution: {
      js: `const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

document.getElementById("calcBtn").addEventListener("click", () => {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  document.getElementById("result").textContent = add(num1, num2);
});`
    },
    check: (code) => code.js.includes('multiply') && code.js.includes('*')
  },
  {
    title: 'DOM 操作',
    desc: '学习获取和修改页面元素',
    theory: `
      <p>获取：getElementById、querySelector</p>
      <p>修改：textContent、innerHTML、style、classList</p>
    `,
    html: `<h2 id="title">点击按钮改变我</h2>
<button id="changeBtn">改变标题</button>
<button id="colorBtn">改变颜色</button>`,
    css: `button { padding: 10px 20px; margin: 5px; cursor: pointer; border: none; border-radius: 6px; }
#changeBtn { background: #667eea; color: white; }
#colorBtn { background: #e91e63; color: white; }
.highlight { color: #e91e63; }`,
    js: `const title = document.getElementById("title");

document.getElementById("changeBtn").addEventListener("click", () => {
  title.textContent = "我被改变了！🎉";
});

document.getElementById("colorBtn").addEventListener("click", () => {
  title.classList.toggle("highlight");
});`,
    task: '添加按钮，点击后把标题字号改成 36px',
    hints: [
      '在 HTML 中添加一个新按钮',
      '使用 addEventListener 监听点击',
      '通过 style.fontSize = "36px" 修改字号'
    ],
    solution: {
      html: `<h2 id="title">点击按钮改变我</h2>
<button id="changeBtn">改变标题</button>
<button id="colorBtn">改变颜色</button>
<button id="sizeBtn">改变大小</button>`,
      js: `const title = document.getElementById("title");

document.getElementById("changeBtn").addEventListener("click", () => {
  title.textContent = "我被改变了！🎉";
});

document.getElementById("colorBtn").addEventListener("click", () => {
  title.classList.toggle("highlight");
});

document.getElementById("sizeBtn").addEventListener("click", () => {
  title.style.fontSize = "36px";
});`
    },
    check: (code) => code.js.includes('fontSize') || code.js.includes('font-size')
  },
  {
    title: '事件处理',
    desc: '学习各种事件监听',
    theory: `
      <p>常用事件：click、input、submit、keydown</p>
      <p>语法：<code>element.addEventListener("事件", 回调)</code></p>
    `,
    html: `<input type="text" id="input" placeholder="输入文字...">
<p>实时显示：<span id="display"></span></p>
<p>字符数：<span id="count">0</span></p>`,
    css: `input { padding: 10px; font-size: 16px; width: 100%; max-width: 300px; border: 2px solid #ddd; border-radius: 6px; }
input:focus { border-color: #667eea; outline: none; }`,
    js: `const input = document.getElementById("input");
const display = document.getElementById("display");
const count = document.getElementById("count");

input.addEventListener("input", (e) => {
  display.textContent = e.target.value;
  count.textContent = e.target.value.length;
});`,
    task: '当字符数超过 10 时，让 count 变成红色',
    hints: [
      '在 input 事件回调中添加判断',
      '使用 if 判断 length > 10',
      '通过 style.color = "red" 改变颜色'
    ],
    solution: {
      js: `const input = document.getElementById("input");
const display = document.getElementById("display");
const count = document.getElementById("count");

input.addEventListener("input", (e) => {
  display.textContent = e.target.value;
  count.textContent = e.target.value.length;
  if (e.target.value.length > 10) {
    count.style.color = "red";
  } else {
    count.style.color = "";
  }
});`
    },
    check: (code) => code.js.includes('10') && (code.js.includes('red') || code.js.includes('color'))
  },
  {
    title: '异步与 Promise',
    desc: '学习异步编程基础',
    theory: `
      <p>Promise：异步操作的容器</p>
      <p>async/await：更优雅的异步写法</p>
    `,
    html: `<button id="loadBtn">加载数据</button>
<div id="status">点击按钮开始</div>
<div id="data"></div>`,
    css: `button { padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; }
#status { margin: 15px 0; color: #666; }
#data { background: #f5f5f5; padding: 15px; border-radius: 8px; min-height: 50px; }`,
    js: `const fetchData = () => new Promise(resolve => {
  setTimeout(() => resolve({ name: "张三", age: 25, city: "北京" }), 1500);
});

document.getElementById("loadBtn").addEventListener("click", async () => {
  document.getElementById("status").textContent = "加载中...";
  const data = await fetchData();
  document.getElementById("status").textContent = "加载完成！";
  document.getElementById("data").innerHTML = \`
    <p>姓名：\${data.name}</p>
    <p>年龄：\${data.age}</p>
    <p>城市：\${data.city}</p>
  \`;
});`,
    task: '在返回数据中添加 job: "工程师" 并显示',
    hints: [
      '在 resolve 的对象中添加 job 属性',
      '值设为 "工程师"',
      '在 innerHTML 中添加显示 job 的代码'
    ],
    solution: {
      js: `const fetchData = () => new Promise(resolve => {
  setTimeout(() => resolve({ name: "张三", age: 25, city: "北京", job: "工程师" }), 1500);
});

document.getElementById("loadBtn").addEventListener("click", async () => {
  document.getElementById("status").textContent = "加载中...";
  const data = await fetchData();
  document.getElementById("status").textContent = "加载完成！";
  document.getElementById("data").innerHTML = \`
    <p>姓名：\${data.name}</p>
    <p>年龄：\${data.age}</p>
    <p>城市：\${data.city}</p>
    <p>职业：\${data.job}</p>
  \`;
});`
    },
    check: (code) => code.js.includes('job') && code.js.includes('工程师')
  },
  {
    title: '本地存储',
    desc: '学习 localStorage 数据持久化',
    theory: `
      <p>localStorage.setItem(key, value) - 存储</p>
      <p>localStorage.getItem(key) - 读取</p>
      <p>对象需要 JSON 转换</p>
    `,
    html: `<input type="text" id="todoInput" placeholder="添加待办事项">
<button id="addBtn">添加</button>
<ul id="todoList"></ul>
<button id="clearBtn">清空所有</button>`,
    css: `input { padding: 10px; width: 200px; border: 2px solid #ddd; border-radius: 6px; }
button { padding: 10px 15px; margin: 5px; border: none; border-radius: 6px; cursor: pointer; }
#addBtn { background: #4caf50; color: white; }
#clearBtn { background: #f44336; color: white; }
#todoList { list-style: none; padding: 0; margin: 15px 0; }
#todoList li { padding: 10px; background: #f5f5f5; margin: 5px 0; border-radius: 6px; }`,
    js: `const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const render = () => {
  list.innerHTML = todos.map((t, i) => 
    \`<li>\${t} <button onclick="remove(\${i})">×</button></li>\`
  ).join("");
};

const save = () => localStorage.setItem("todos", JSON.stringify(todos));

window.remove = (i) => { todos.splice(i, 1); save(); render(); };

document.getElementById("addBtn").addEventListener("click", () => {
  if (input.value.trim()) {
    todos.push(input.value);
    save(); render();
    input.value = "";
  }
});

document.getElementById("clearBtn").addEventListener("click", () => {
  todos = []; save(); render();
});

render();`,
    task: '刷新页面后，待办事项还在吗？试试看！',
    hints: [
      '添加几个待办事项',
      '点击运行按钮刷新预览',
      '观察数据是否保留'
    ],
    solution: {},
    check: () => true
  }
]
