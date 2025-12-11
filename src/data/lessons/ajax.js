/**
 * Ajax 网络请求课程
 */
export const ajaxLessons = [
  {
    title: 'Ajax 简介',
    desc: '了解异步请求的基本概念',
    theory: `
      <p><strong>Ajax</strong> (Asynchronous JavaScript and XML) 是一种无需刷新页面即可与服务器交换数据的技术。</p>
      <ul>
        <li><strong>异步</strong>：不阻塞页面，后台请求数据</li>
        <li><strong>局部更新</strong>：只更新需要的部分</li>
        <li><strong>用户体验</strong>：页面响应更快</li>
      </ul>
      <p>现代 Ajax 主要使用 <code>fetch</code> API 或 <code>axios</code> 库。</p>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>Ajax 简介</title></head>
<body>
  <h1>Ajax 请求演示</h1>
  <button id="loadBtn">加载数据</button>
  <div id="result">点击按钮加载数据</div>
  <script>
    document.getElementById('loadBtn').onclick = function() {
      document.getElementById('result').innerHTML = '加载中...';
      // 模拟异步请求
      setTimeout(() => {
        document.getElementById('result').innerHTML = '数据加载成功！';
      }, 1000);
    };
  </script>
</body>
</html>`,
    task: '将延迟时间改为 2000ms，并在加载成功后显示当前时间',
    check: (code) => code.html.includes('2000') && code.html.includes('Date'),
    hints: ['修改 setTimeout 的第二个参数', '使用 new Date() 获取当前时间']
  },

  {
    title: 'XMLHttpRequest',
    desc: '学习传统的 Ajax 请求方式',
    theory: `
      <p><strong>XMLHttpRequest</strong> 是最早的 Ajax 实现方式：</p>
      <ul>
        <li><code>new XMLHttpRequest()</code> - 创建请求对象</li>
        <li><code>xhr.open(method, url)</code> - 配置请求</li>
        <li><code>xhr.send()</code> - 发送请求</li>
        <li><code>xhr.onload</code> - 请求完成回调</li>
      </ul>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>XMLHttpRequest</title></head>
<body>
  <h1>XMLHttpRequest 演示</h1>
  <button id="fetchBtn">获取用户</button>
  <div id="result"></div>
  <script>
    document.getElementById('fetchBtn').onclick = function() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/1');
      xhr.onload = function() {
        if (xhr.status === 200) {
          const user = JSON.parse(xhr.responseText);
          document.getElementById('result').innerHTML = 
            '<p>姓名: ' + user.name + '</p><p>邮箱: ' + user.email + '</p>';
        }
      };
      xhr.onerror = function() {
        document.getElementById('result').innerHTML = '请求失败';
      };
      xhr.send();
    };
  </script>
</body>
</html>`,
    task: '添加 onreadystatechange 事件，在 readyState 为 1 时显示"正在连接..."',
    check: (code) => code.html.includes('onreadystatechange') && code.html.includes('readyState'),
    hints: ['xhr.onreadystatechange 在状态变化时触发', 'readyState 1 表示 OPENED 状态']
  },
  {
    title: 'Fetch API 基础',
    desc: '学习现代的网络请求方式',
    theory: `
      <p><strong>Fetch API</strong> 是现代浏览器提供的网络请求接口：</p>
      <ul>
        <li>基于 Promise，支持 async/await</li>
        <li>语法更简洁</li>
        <li><code>fetch(url)</code> 返回 Promise</li>
        <li><code>response.json()</code> 解析 JSON</li>
      </ul>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>Fetch API</title></head>
<body>
  <h1>Fetch API 演示</h1>
  <button id="fetchBtn">获取帖子</button>
  <div id="result"></div>
  <script>
    document.getElementById('fetchBtn').onclick = async function() {
      document.getElementById('result').innerHTML = '加载中...';
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const post = await response.json();
        document.getElementById('result').innerHTML = 
          '<h3>' + post.title + '</h3><p>' + post.body + '</p>';
      } catch (error) {
        document.getElementById('result').innerHTML = '请求失败: ' + error.message;
      }
    };
  </script>
</body>
</html>`,
    task: '修改代码获取帖子 ID 为 5 的内容，并显示帖子 ID',
    check: (code) => code.html.includes('posts/5') && code.html.includes('post.id'),
    hints: ['修改 URL 中的数字', '在显示内容中添加 post.id']
  },
  {
    title: 'POST 请求',
    desc: '学习发送数据到服务器',
    theory: `
      <p><strong>POST 请求</strong>用于向服务器发送数据：</p>
      <pre>
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
      </pre>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>POST 请求</title></head>
<body>
  <h1>创建新帖子</h1>
  <input id="title" placeholder="标题" style="display:block;margin:10px 0;padding:8px;width:300px">
  <textarea id="body" placeholder="内容" style="display:block;margin:10px 0;padding:8px;width:300px;height:100px"></textarea>
  <button id="submitBtn">提交</button>
  <div id="result"></div>
  <script>
    document.getElementById('submitBtn').onclick = async function() {
      const title = document.getElementById('title').value;
      const body = document.getElementById('body').value;
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: 1 })
      });
      
      const result = await response.json();
      document.getElementById('result').innerHTML = 
        '<p>创建成功！ID: ' + result.id + '</p>';
    };
  </script>
</body>
</html>`,
    task: '添加表单验证：如果标题或内容为空，显示错误提示而不发送请求',
    check: (code) => code.html.includes('if') && (code.html.includes('!title') || code.html.includes('=== ""') || code.html.includes("=== ''")),
    hints: ['在发送请求前检查 title 和 body 是否为空', '使用 if 语句进行判断']
  },

  {
    title: '请求头和响应头',
    desc: '了解 HTTP 头部信息',
    theory: `
      <p><strong>HTTP 头部</strong>包含请求和响应的元信息：</p>
      <ul>
        <li><code>Content-Type</code> - 数据类型</li>
        <li><code>Authorization</code> - 认证信息</li>
        <li><code>Accept</code> - 期望的响应类型</li>
        <li><code>Cache-Control</code> - 缓存控制</li>
      </ul>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>HTTP 头部</title></head>
<body>
  <h1>HTTP 头部信息</h1>
  <button id="fetchBtn">发送请求</button>
  <div id="result"></div>
  <script>
    document.getElementById('fetchBtn').onclick = async function() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        headers: {
          'Accept': 'application/json',
          'X-Custom-Header': 'test-value'
        }
      });
      
      // 获取响应头
      const contentType = response.headers.get('Content-Type');
      const data = await response.json();
      
      document.getElementById('result').innerHTML = 
        '<p>Content-Type: ' + contentType + '</p>' +
        '<p>状态码: ' + response.status + '</p>' +
        '<p>数据: ' + data.title + '</p>';
    };
  </script>
</body>
</html>`,
    task: '添加显示 response.ok 和 response.statusText 的信息',
    check: (code) => code.html.includes('response.ok') && code.html.includes('statusText'),
    hints: ['response.ok 是布尔值，表示请求是否成功', 'response.statusText 是状态描述文本']
  },
  {
    title: '错误处理',
    desc: '学习处理网络请求错误',
    theory: `
      <p>网络请求可能出现多种错误：</p>
      <ul>
        <li><strong>网络错误</strong>：无法连接服务器</li>
        <li><strong>HTTP 错误</strong>：4xx、5xx 状态码</li>
        <li><strong>解析错误</strong>：响应格式不正确</li>
      </ul>
      <p>注意：fetch 只在网络错误时 reject，HTTP 错误需要手动检查。</p>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>错误处理</title></head>
<body>
  <h1>请求错误处理</h1>
  <button id="btn1">正常请求</button>
  <button id="btn2">404 错误</button>
  <button id="btn3">网络错误</button>
  <div id="result"></div>
  <script>
    async function fetchData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('HTTP 错误: ' + response.status);
        }
        const data = await response.json();
        document.getElementById('result').innerHTML = '<p style="color:green">成功: ' + data.title + '</p>';
      } catch (error) {
        document.getElementById('result').innerHTML = '<p style="color:red">错误: ' + error.message + '</p>';
      }
    }
    
    document.getElementById('btn1').onclick = () => fetchData('https://jsonplaceholder.typicode.com/posts/1');
    document.getElementById('btn2').onclick = () => fetchData('https://jsonplaceholder.typicode.com/posts/9999');
    document.getElementById('btn3').onclick = () => fetchData('https://invalid-url-test.com/api');
  </script>
</body>
</html>`,
    task: '添加 finally 块，在请求结束后（无论成功失败）显示"请求完成"',
    check: (code) => code.html.includes('finally'),
    hints: ['try-catch-finally 结构', 'finally 块总是会执行']
  },
  {
    title: '请求超时',
    desc: '实现请求超时控制',
    theory: `
      <p>使用 <strong>AbortController</strong> 可以取消请求：</p>
      <pre>
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);

fetch(url, { signal: controller.signal })
      </pre>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>请求超时</title></head>
<body>
  <h1>请求超时控制</h1>
  <button id="fetchBtn">发送请求（3秒超时）</button>
  <button id="cancelBtn">取消请求</button>
  <div id="result"></div>
  <script>
    let controller;
    
    document.getElementById('fetchBtn').onclick = async function() {
      controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      document.getElementById('result').innerHTML = '请求中...';
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        const data = await response.json();
        document.getElementById('result').innerHTML = '成功: ' + data.title;
      } catch (error) {
        if (error.name === 'AbortError') {
          document.getElementById('result').innerHTML = '请求已取消或超时';
        } else {
          document.getElementById('result').innerHTML = '错误: ' + error.message;
        }
      }
    };
    
    document.getElementById('cancelBtn').onclick = function() {
      if (controller) controller.abort();
    };
  </script>
</body>
</html>`,
    task: '将超时时间改为 5 秒，并在超时时显示具体的超时时间',
    check: (code) => code.html.includes('5000') && code.html.includes('5'),
    hints: ['修改 setTimeout 的延迟时间', '在错误提示中显示超时秒数']
  },

  {
    title: '并发请求',
    desc: '同时发送多个请求',
    theory: `
      <p>使用 <strong>Promise.all</strong> 并发请求：</p>
      <pre>
const [users, posts] = await Promise.all([
  fetch('/users').then(r => r.json()),
  fetch('/posts').then(r => r.json())
]);
      </pre>
      <p><code>Promise.allSettled</code> 可以获取所有结果，即使部分失败。</p>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>并发请求</title></head>
<body>
  <h1>并发请求演示</h1>
  <button id="fetchBtn">获取用户和帖子</button>
  <div id="result"></div>
  <script>
    document.getElementById('fetchBtn').onclick = async function() {
      document.getElementById('result').innerHTML = '加载中...';
      const start = Date.now();
      
      try {
        const [user, post] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
          fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json())
        ]);
        
        const time = Date.now() - start;
        document.getElementById('result').innerHTML = 
          '<p>用户: ' + user.name + '</p>' +
          '<p>帖子: ' + post.title + '</p>' +
          '<p>耗时: ' + time + 'ms</p>';
      } catch (error) {
        document.getElementById('result').innerHTML = '错误: ' + error.message;
      }
    };
  </script>
</body>
</html>`,
    task: '添加第三个请求获取评论（/comments/1），并显示评论内容',
    check: (code) => code.html.includes('comments') && code.html.includes('comment'),
    hints: ['在 Promise.all 数组中添加第三个 fetch', '解构时添加第三个变量']
  },
  {
    title: 'JSON 数据处理',
    desc: '学习 JSON 的序列化和解析',
    theory: `
      <p><strong>JSON</strong> 是最常用的数据交换格式：</p>
      <ul>
        <li><code>JSON.stringify(obj)</code> - 对象转 JSON 字符串</li>
        <li><code>JSON.parse(str)</code> - JSON 字符串转对象</li>
        <li><code>response.json()</code> - 解析响应体</li>
      </ul>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>JSON 处理</title>
<style>pre{background:#f5f5f5;padding:1rem;border-radius:8px;overflow-x:auto}</style>
</head>
<body>
  <h1>JSON 数据处理</h1>
  <div id="result"></div>
  <script>
    const user = {
      name: '张三',
      age: 25,
      skills: ['JavaScript', 'Vue', 'Node.js'],
      address: { city: '北京', district: '朝阳区' }
    };
    
    // 序列化
    const jsonStr = JSON.stringify(user, null, 2);
    
    // 解析
    const parsed = JSON.parse(jsonStr);
    
    document.getElementById('result').innerHTML = 
      '<h3>原始对象:</h3><pre>' + JSON.stringify(user, null, 2) + '</pre>' +
      '<h3>解析后访问:</h3>' +
      '<p>姓名: ' + parsed.name + '</p>' +
      '<p>城市: ' + parsed.address.city + '</p>' +
      '<p>技能: ' + parsed.skills.join(', ') + '</p>';
  </script>
</body>
</html>`,
    task: '给 user 对象添加 email 属性，并在下方显示',
    check: (code) => code.html.includes('email') && code.html.includes('@'),
    hints: ['在 user 对象中添加 email 属性', '在显示部分添加 parsed.email']
  },
  {
    title: 'FormData 表单数据',
    desc: '学习处理表单和文件上传',
    theory: `
      <p><strong>FormData</strong> 用于构建表单数据：</p>
      <ul>
        <li><code>new FormData(form)</code> - 从表单创建</li>
        <li><code>formData.append(key, value)</code> - 添加数据</li>
        <li><code>formData.get(key)</code> - 获取数据</li>
      </ul>
      <p>适合文件上传和 multipart/form-data 请求。</p>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>FormData</title></head>
<body>
  <h1>FormData 演示</h1>
  <form id="myForm">
    <input name="username" placeholder="用户名" style="display:block;margin:10px 0;padding:8px">
    <input name="email" placeholder="邮箱" style="display:block;margin:10px 0;padding:8px">
    <button type="submit">提交</button>
  </form>
  <div id="result"></div>
  <script>
    document.getElementById('myForm').onsubmit = function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      
      // 添加额外数据
      formData.append('timestamp', Date.now());
      
      // 显示所有数据
      let output = '<h3>表单数据:</h3>';
      for (let [key, value] of formData.entries()) {
        output += '<p>' + key + ': ' + value + '</p>';
      }
      
      document.getElementById('result').innerHTML = output;
    };
  </script>
</body>
</html>`,
    task: '添加一个 age 输入框，并在 FormData 中添加一个固定的 role 字段值为 "user"',
    check: (code) => code.html.includes('age') && code.html.includes('role') && code.html.includes('user'),
    hints: ['添加新的 input 元素', '使用 formData.append 添加固定值']
  },
  {
    title: 'RESTful API',
    desc: '了解 RESTful 接口规范',
    theory: `
      <p><strong>RESTful</strong> 是一种 API 设计风格：</p>
      <ul>
        <li><code>GET /users</code> - 获取列表</li>
        <li><code>GET /users/1</code> - 获取单个</li>
        <li><code>POST /users</code> - 创建</li>
        <li><code>PUT /users/1</code> - 更新</li>
        <li><code>DELETE /users/1</code> - 删除</li>
      </ul>
    `,
    html: `<!DOCTYPE html>
<html>
<head><title>RESTful API</title>
<style>button{margin:5px;padding:8px 16px}</style>
</head>
<body>
  <h1>RESTful API 演示</h1>
  <div>
    <button onclick="getUsers()">GET 列表</button>
    <button onclick="getUser(1)">GET 单个</button>
    <button onclick="createUser()">POST 创建</button>
    <button onclick="updateUser(1)">PUT 更新</button>
    <button onclick="deleteUser(1)">DELETE 删除</button>
  </div>
  <pre id="result"></pre>
  <script>
    const API = 'https://jsonplaceholder.typicode.com/users';
    
    async function getUsers() {
      const res = await fetch(API);
      const data = await res.json();
      showResult('GET /users', data.slice(0, 3));
    }
    
    async function getUser(id) {
      const res = await fetch(API + '/' + id);
      const data = await res.json();
      showResult('GET /users/' + id, data);
    }
    
    async function createUser() {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '新用户', email: 'new@test.com' })
      });
      const data = await res.json();
      showResult('POST /users', data);
    }
    
    async function updateUser(id) {
      const res = await fetch(API + '/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '更新用户' })
      });
      const data = await res.json();
      showResult('PUT /users/' + id, data);
    }
    
    async function deleteUser(id) {
      const res = await fetch(API + '/' + id, { method: 'DELETE' });
      showResult('DELETE /users/' + id, { success: true });
    }
    
    function showResult(method, data) {
      document.getElementById('result').textContent = 
        method + '\\n\\n' + JSON.stringify(data, null, 2);
    }
  </script>
</body>
</html>`,
    task: '添加一个 PATCH 方法的 patchUser 函数，只更新用户的 email 字段',
    check: (code) => code.html.includes('PATCH') && code.html.includes('patchUser'),
    hints: ['PATCH 方法用于部分更新', '只发送需要更新的字段']
  }
]
