/**
 * Node.js 基础课程
 */
export const nodejsLessons = [
  {
    title: 'Node.js 简介',
    desc: '了解 Node.js 是什么以及它的特点',
    theory: `
      <p><strong>Node.js</strong> 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，让 JavaScript 可以在服务器端运行。</p>
      <ul>
        <li><strong>事件驱动</strong>：基于事件循环的非阻塞 I/O</li>
        <li><strong>单线程</strong>：主线程单线程，但通过异步处理高并发</li>
        <li><strong>NPM</strong>：拥有世界上最大的包管理器</li>
        <li><strong>跨平台</strong>：可在 Windows、Linux、macOS 运行</li>
      </ul>
      <p>Node.js 常用于：Web 服务器、API 开发、命令行工具、实时应用等。</p>
    `,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Node.js 简介</title>
</head>
<body>
  <h1>Node.js 特点</h1>
  <ul id="features"></ul>
  
  <script>
    // 模拟 Node.js 环境的特点展示
    const features = [
      '事件驱动架构',
      '非阻塞 I/O',
      '单线程模型',
      'NPM 包管理',
      '跨平台支持'
    ];
    
    const ul = document.getElementById('features');
    features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      ul.appendChild(li);
    });
  </script>
</body>
</html>`,
    task: '在 features 数组中添加一个新特点："高性能"',
    check: (code) => code.html.includes('高性能'),
    hints: ['在 features 数组中添加新元素', '使用引号包裹字符串'],
    solution: `<!DOCTYPE html>
<html>
<head>
  <title>Node.js 简介</title>
</head>
<body>
  <h1>Node.js 特点</h1>
  <ul id="features"></ul>
  
  <script>
    const features = [
      '事件驱动架构',
      '非阻塞 I/O',
      '单线程模型',
      'NPM 包管理',
      '跨平台支持',
      '高性能'
    ];
    
    const ul = document.getElementById('features');
    features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      ul.appendChild(li);
    });
  </script>
</body>
</html>`
  },
  {
    title: '模块系统 - CommonJS',
    desc: '学习 Node.js 的模块导入导出',
    theory: `
      <p>Node.js 使用 <strong>CommonJS</strong> 模块规范：</p>
      <ul>
        <li><code>require()</code> - 导入模块</li>
        <li><code>module.exports</code> - 导出模块</li>
        <li><code>exports</code> - module.exports 的简写</li>
      </ul>
      <pre>
// 导出
module.exports = { name: 'test' };
// 或
exports.name = 'test';

// 导入
const mod = require('./module');
      </pre>
    `,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>模块系统演示</title>
</head>
<body>
  <h1>CommonJS 模块系统</h1>
  <div id="output"></div>
  
  <script>
    // 模拟 CommonJS 模块系统
    const modules = {};
    
    // 模拟 module.exports
    function defineModule(name, factory) {
      const module = { exports: {} };
      factory(module, module.exports);
      modules[name] = module.exports;
    }
    
    // 模拟 require
    function require(name) {
      return modules[name];
    }
    
    // 定义一个数学模块
    defineModule('math', (module, exports) => {
      exports.add = (a, b) => a + b;
      exports.multiply = (a, b) => a * b;
    });
    
    // 使用模块
    const math = require('math');
    const result = math.add(5, 3);
    
    document.getElementById('output').innerHTML = 
      '<p>5 + 3 = ' + result + '</p>';
  </script>
</body>
</html>`,
    task: '在 math 模块中添加 subtract 方法实现减法，并在下方调用显示 10 - 4 的结果',
    check: (code) => code.html.includes('subtract') && code.html.includes('10') && code.html.includes('4'),
    hints: ['在 defineModule 中添加 exports.subtract', '减法使用 a - b'],
    solution: `<!DOCTYPE html>
<html>
<head>
  <title>模块系统演示</title>
</head>
<body>
  <h1>CommonJS 模块系统</h1>
  <div id="output"></div>
  
  <script>
    const modules = {};
    
    function defineModule(name, factory) {
      const module = { exports: {} };
      factory(module, module.exports);
      modules[name] = module.exports;
    }
    
    function require(name) {
      return modules[name];
    }
    
    defineModule('math', (module, exports) => {
      exports.add = (a, b) => a + b;
      exports.multiply = (a, b) => a * b;
      exports.subtract = (a, b) => a - b;
    });
    
    const math = require('math');
    const result1 = math.add(5, 3);
    const result2 = math.subtract(10, 4);
    
    document.getElementById('output').innerHTML = 
      '<p>5 + 3 = ' + result1 + '</p>' +
      '<p>10 - 4 = ' + result2 + '</p>';
  </script>
</body>
</html>`
  },
  {
    title: 'ES Modules',
    desc: '学习现代 JavaScript 模块语法',
    theory: `
      <p><strong>ES Modules</strong> 是 JavaScript 官方的模块标准：</p>
      <ul>
        <li><code>import</code> - 导入模块</li>
        <li><code>export</code> - 导出模块</li>
        <li><code>export default</code> - 默认导出</li>
      </ul>
      <pre>
// 命名导出
export const name = 'test';
export function fn() {}

// 默认导出
export default class {}

// 导入
import { name, fn } from './module.js';
import MyClass from './module.js';
      </pre>
    `,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>ES Modules 演示</title>
</head>
<body>
  <h1>ES Modules 语法</h1>
  <div id="output"></div>
  
  <script type="module">
    // 模拟模块内容（实际项目中会是独立文件）
    
    // 命名导出示例
    const PI = 3.14159;
    const E = 2.71828;
    
    function circleArea(r) {
      return PI * r * r;
    }
    
    // 使用
    const area = circleArea(5);
    
    document.getElementById('output').innerHTML = \`
      <p>PI = \${PI}</p>
      <p>E = \${E}</p>
      <p>半径为 5 的圆面积 = \${area.toFixed(2)}</p>
    \`;
  </script>
</body>
</html>`,
    task: '添加一个计算圆周长的函数 circlePerimeter(r)，并显示半径为 5 的圆周长',
    check: (code) => code.html.includes('circlePerimeter') && code.html.includes('周长'),
    hints: ['圆周长公式：2 * PI * r', '创建新函数并调用它'],
    solution: `<!DOCTYPE html>
<html>
<head>
  <title>ES Modules 演示</title>
</head>
<body>
  <h1>ES Modules 语法</h1>
  <div id="output"></div>
  
  <script type="module">
    const PI = 3.14159;
    const E = 2.71828;
    
    function circleArea(r) {
      return PI * r * r;
    }
    
    function circlePerimeter(r) {
      return 2 * PI * r;
    }
    
    const area = circleArea(5);
    const perimeter = circlePerimeter(5);
    
    document.getElementById('output').innerHTML = \`
      <p>PI = \${PI}</p>
      <p>E = \${E}</p>
      <p>半径为 5 的圆面积 = \${area.toFixed(2)}</p>
      <p>半径为 5 的圆周长 = \${perimeter.toFixed(2)}</p>
    \`;
  </script>
</body>
</html>`
  },
  {
    title: '事件循环',
    desc: '理解 Node.js 的事件循环机制',
    theory: `
      <p><strong>事件循环</strong>是 Node.js 处理异步操作的核心机制：</p>
      <ul>
        <li><strong>调用栈</strong>：同步代码执行</li>
        <li><strong>任务队列</strong>：异步回调等待执行</li>
        <li><strong>微任务</strong>：Promise 回调，优先级更高</li>
        <li><strong>宏任务</strong>：setTimeout、setInterval 等</li>
      </ul>
      <p>执行顺序：同步代码 → 微任务 → 宏任务</p>
    `,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>事件循环</title>
</head>
<body>
  <h1>事件循环执行顺序</h1>
  <div id="output"></div>
  
  <script>
    const output = [];
    
    output.push('1. 同步代码开始');
    
    setTimeout(() => {
      output.push('4. setTimeout 宏任务');
      render();
    }, 0);
    
    Promise.resolve().then(() => {
      output.push('3. Promise 微任务');
    });
    
    output.push('2. 同步代码结束');
    
    function render() {
      document.getElementById('output').innerHTML = 
        output.map(item => '<p>' + item + '</p>').join('');
    }
    
    // 等微任务执行完再渲染
    Promise.resolve().then(() => {
      setTimeout(render, 10);
    });
  </script>
</body>
</html>`,
    task: '添加一个 queueMicrotask 调用，输出 "2.5. queueMicrotask 微任务"',
    check: (code) => code.html.includes('queueMicrotask'),
    hints: ['queueMicrotask(() => { ... })', '微任务会在同步代码后、宏任务前执行'],
    solution: `<!DOCTYPE html>
<html>
<head>
  <title>事件循环</title>
</head>
<body>
  <h1>事件循环执行顺序</h1>
  <div id="output"></div>
  
  <script>
    const output = [];
    
    output.push('1. 同步代码开始');
    
    setTimeout(() => {
      output.push('5. setTimeout 宏任务');
      render();
    }, 0);
    
    Promise.resolve().then(() => {
      output.push('3. Promise 微任务');
    });
    
    queueMicrotask(() => {
      output.push('4. queueMicrotask 微任务');
    });
    
    output.push('2. 同步代码结束');
    
    function render() {
      document.getElementById('output').innerHTML = 
        output.map(item => '<p>' + item + '</p>').join('');
    }
    
    Promise.resolve().then(() => {
      setTimeout(render, 10);
    });
  </script>
</body>
</html>`
  },
  {
    title: 'Buffer 缓冲区',
    desc: '学习处理二进制数据',
    theory: `
      <p><strong>Buffer</strong> 是 Node.js 中处理二进制数据的类：</p>
      <ul>
        <li><code>Buffer.from()</code> - 从字符串/数组创建</li>
        <li><code>Buffer.alloc()</code> - 创建指定大小的 Buffer</li>
        <li><code>buf.toString()</code> - 转换为字符串</li>
        <li><code>buf.length</code> - 获取字节长度</li>
      </ul>
      <p>浏览器中可以使用 <code>TextEncoder</code> 和 <code>Uint8Array</code> 实现类似功能。</p>
    `,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Buffer 演示</title>
</head>
<body>
  <h1>二进制数据处理</h1>
  <div id="output"></div>
  
  <script>
    // 浏览器中模拟 Buffer 操作
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    // 字符串转二进制
    const text = 'Hello Node.js';
    const bytes = encoder.encode(text);
    
    // 二进制转字符串
    const decoded = decoder.decode(bytes);
    
    // 显示结果
    document.getElementById('output').innerHTML = \`
      <p>原始文本: \${text}</p>
      <p>字节长度: \${bytes.length}</p>
      <p>字节数组: [\${Array.from(bytes).join(', ')}]</p>
      <p>解码结果: \${decoded}</p>
    \`;
  </script>
</body>
</html>`,
    task: '将文本改为 "你好世界"，观察中文字符的字节长度变化',
    check: (code) => code.html.includes('你好'),
    hints: ['UTF-8 编码中，中文字符占 3 个字节', '直接修改 text 变量的值'],
    solution: `<!DOCTYPE html>
<html>
<head>
  <title>Buffer 演示</title>
</head>
<body>
  <h1>二进制数据处理</h1>
  <div id="output"></div>
  
  <script>
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    const text = '你好世界';
    const bytes = encoder.encode(text);
    const decoded = decoder.decode(bytes);
    
    document.getElementById('output').innerHTML = \`
      <p>原始文本: \${text}</p>
      <p>字节长度: \${bytes.length}</p>
      <p>字节数组: [\${Array.from(bytes).join(', ')}]</p>
      <p>解码结果: \${decoded}</p>
    \`;
  </script>
</body>
</html>`
  },
  {
    title: 'Stream 流',
    desc: '理解流式数据处理',
    theory: `
      <p><strong>Stream</strong> 是处理大量数据的高效方式：</p>
      <ul>
        <li><strong>Readable</strong> - 可读流（如文件读取）</li>
        <li><strong>Writable</strong> - 可写流（如文件写入）</li>
        <li><strong>Duplex</strong> - 双向流（如 TCP 套接字）</li>
        <li><strong>Transform</strong> - 转换流（如压缩）</li>
      </ul>
      <p>流的优势：内存效率高，可以处理超大文件。</p>
    `,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Stream 演示</title>
</head>
<body>
  <h1>流式数据处理</h1>
  <div id="output"></div>
  <div id="progress"></div>
  
  <script>
    // 模拟流式处理大量数据
    const data = Array.from({ length: 100 }, (_, i) => \`数据块 \${i + 1}\`);
    let processed = 0;
    const results = [];
    
    function processChunk() {
      if (processed < data.length) {
        // 模拟处理一个数据块
        results.push(data[processed].toUpperCase());
        processed++;
        
        // 更新进度
        const percent = Math.round((processed / data.length) * 100);
        document.getElementById('progress').innerHTML = 
          \`<progress value="\${percent}" max="100"></progress> \${percent}%\`;
        
        // 继续处理下一块（模拟异步）
        setTimeout(processChunk, 20);
      } else {
        // 处理完成
        document.getElementById('output').innerHTML = 
          '<p>处理完成！共处理 ' + results.length + ' 个数据块</p>';
      }
    }
    
    processChunk();
  </script>
</body>
</html>`,
    task: '将处理间隔从 20ms 改为 50ms，并在完成后显示前 3 个处理结果',
    check: (code) => code.html.includes('50') && code.html.includes('slice'),
    hints: ['修改 setTimeout 的延迟时间', '使用 results.slice(0, 3) 获取前 3 个'],
    solution: `<!DOCTYPE html>
<html>
<head>
  <title>Stream 演示</title>
</head>
<body>
  <h1>流式数据处理</h1>
  <div id="output"></div>
  <div id="progress"></div>
  
  <script>
    const data = Array.from({ length: 100 }, (_, i) => \`数据块 \${i + 1}\`);
    let processed = 0;
    const results = [];
    
    function processChunk() {
      if (processed < data.length) {
        results.push(data[processed].toUpperCase());
        processed++;
        
        const percent = Math.round((processed / data.length) * 100);
        document.getElementById('progress').innerHTML = 
          \`<progress value="\${percent}" max="100"></progress> \${percent}%\`;
        
        setTimeout(processChunk, 50);
      } else {
        document.getElementById('output').innerHTML = 
          '<p>处理完成！共处理 ' + results.length + ' 个数据块</p>' +
          '<p>前 3 个结果: ' + results.slice(0, 3).join(', ') + '</p>';
      }
    }
    
    processChunk();
  </script>
</body>
</html>`
  },
  {
    title: 'Path 路径处理',
    desc: '学习跨平台路径操作',
    theory: `
      <p><strong>path</strong> 模块提供跨平台的路径处理：</p>
      <ul>
        <li><code>path.join()</code> - 拼接路径</li>
        <li><code>path.resolve()</code> - 解析为绝对路径</li>
        <li><code>path.basename()</code> - 获取文件名</li>
        <li><code>path.dirname()</code> - 获取目录名</li>
        <li><code>path.extname()</code> - 获取扩展名</li>
      </ul>
    `,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Path 路径处理</title>
</head>
<body>
  <h1>路径操作</h1>
  <div id="output"></div>
  
  <script>
    // 模拟 path 模块
    const path = {
      join: (...parts) => parts.join('/').replace(/\\/+/g, '/'),
      basename: (p) => p.split('/').pop(),
      dirname: (p) => p.split('/').slice(0, -1).join('/'),
      extname: (p) => {
        const match = p.match(/\\.[^.]+$/);
        return match ? match[0] : '';
      }
    };
    
    const filePath = '/users/documents/project/index.html';
    
    document.getElementById('output').innerHTML = \`
      <p>完整路径: \${filePath}</p>
      <p>文件名: \${path.basename(filePath)}</p>
      <p>目录: \${path.dirname(filePath)}</p>
      <p>扩展名: \${path.extname(filePath)}</p>
      <p>拼接路径: \${path.join('src', 'components', 'Button.vue')}</p>
    \`;
  </script>
</body>
</html>`,
    task: '添加一个 parse 方法，返回包含 dir、base、ext、name 的对象，并显示解析结果',
    check: (code) => code.html.includes('parse') && code.html.includes('name'),
    hints: ['parse 方法需要返回一个对象', '使用已有的 basename、dirname、extname 方法'],
    solution: `<!DOCTYPE html>
<html>
<head>
  <title>Path 路径处理</title>
</head>
<body>
  <h1>路径操作</h1>
  <div id="output"></div>
  
  <script>
    const path = {
      join: (...parts) => parts.join('/').replace(/\\/+/g, '/'),
      basename: (p) => p.split('/').pop(),
      dirname: (p) => p.split('/').slice(0, -1).join('/'),
      extname: (p) => {
        const match = p.match(/\\.[^.]+$/);
        return match ? match[0] : '';
      },
      parse: function(p) {
        const base = this.basename(p);
        const ext = this.extname(p);
        return {
          dir: this.dirname(p),
          base: base,
          ext: ext,
          name: base.replace(ext, '')
        };
      }
    };
    
    const filePath = '/users/documents/project/index.html';
    const parsed = path.parse(filePath);
    
    document.getElementById('output').innerHTML = \`
      <p>完整路径: \${filePath}</p>
      <p>文件名: \${path.basename(filePath)}</p>
      <p>目录: \${path.dirname(filePath)}</p>
      <p>扩展名: \${path.extname(filePath)}</p>
      <p>拼接路径: \${path.join('src', 'components', 'Button.vue')}</p>
      <hr>
      <p>解析结果: \${JSON.stringify(parsed, null, 2)}</p>
    \`;
  </script>
</body>
</html>`
  },
  {
    title: 'NPM 包管理',
    desc: '了解 NPM 的使用和 package.json',
    theory: `
      <p><strong>NPM</strong> (Node Package Manager) 是 Node.js 的包管理器：</p>
      <ul>
        <li><code>npm init</code> - 初始化项目</li>
        <li><code>npm install</code> - 安装依赖</li>
        <li><code>npm install -D</code> - 安装开发依赖</li>
        <li><code>npm run</code> - 运行脚本</li>
      </ul>
      <p><strong>package.json</strong> 是项目配置文件，包含依赖、脚本等信息。</p>
    `,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>NPM 包管理</title>
  <style>
    pre { background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 8px; overflow-x: auto; }
    .key { color: #9cdcfe; }
    .string { color: #ce9178; }
    .number { color: #b5cea8; }
  </style>
</head>
<body>
  <h1>package.json 示例</h1>
  <pre id="output"></pre>
  
  <script>
    const packageJson = {
      name: "my-project",
      version: "1.0.0",
      description: "一个示例项目",
      main: "index.js",
      scripts: {
        dev: "vite",
        build: "vite build",
        test: "vitest"
      },
      dependencies: {
        vue: "^3.3.0"
      },
      devDependencies: {
        vite: "^5.0.0"
      }
    };
    
    // 格式化显示
    document.getElementById('output').textContent = 
      JSON.stringify(packageJson, null, 2);
  </script>
</body>
</html>`,
    task: '在 dependencies 中添加 "axios": "^1.6.0"，在 scripts 中添加 "start": "node index.js"',
    check: (code) => code.html.includes('axios') && code.html.includes('start'),
    hints: ['在 dependencies 对象中添加新属性', '在 scripts 对象中添加新属性'],
    solution: `<!DOCTYPE html>
<html>
<head>
  <title>NPM 包管理</title>
  <style>
    pre { background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 8px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>package.json 示例</h1>
  <pre id="output"></pre>
  
  <script>
    const packageJson = {
      name: "my-project",
      version: "1.0.0",
      description: "一个示例项目",
      main: "index.js",
      scripts: {
        dev: "vite",
        build: "vite build",
        test: "vitest",
        start: "node index.js"
      },
      dependencies: {
        vue: "^3.3.0",
        axios: "^1.6.0"
      },
      devDependencies: {
        vite: "^5.0.0"
      }
    };
    
    document.getElementById('output').textContent = 
      JSON.stringify(packageJson, null, 2);
  </script>
</body>
</html>`
  }
]
