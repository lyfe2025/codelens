/**
 * 进阶课程数据
 */
export const advancedLessons = [
  {
    title: 'Vue Router 路由',
    desc: '学习单页应用路由配置',
    theory: `
      <p><strong>Vue Router</strong> 实现单页应用的页面切换</p>
      <ul>
        <li><code>&lt;router-link to="/path"&gt;</code> - 导航链接</li>
        <li><code>&lt;router-view&gt;</code> - 路由出口</li>
        <li><code>useRouter()</code> - 编程式导航</li>
        <li><code>useRoute()</code> - 获取路由参数</li>
      </ul>
    `,
    html: `<div id="app">
  <nav>
    <router-link to="/">首页</router-link> |
    <router-link to="/about">关于</router-link> |
    <router-link to="/user/123">用户详情</router-link>
  </nav>
  <router-view></router-view>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>`,
    css: `#app { padding: 20px; }
nav { margin-bottom: 20px; }
nav a { margin-right: 15px; color: #42b883; text-decoration: none; }
nav a.router-link-active { font-weight: bold; border-bottom: 2px solid #42b883; }
.page { padding: 20px; background: #f5f5f5; border-radius: 8px; }`,
    js: `const { createApp, ref } = Vue;
const { createRouter, createWebHashHistory, useRoute } = VueRouter;

const Home = { template: '<div class="page"><h2>🏠 首页</h2><p>欢迎来到首页</p></div>' };
const About = { template: '<div class="page"><h2>📖 关于</h2><p>这是关于页面</p></div>' };
const User = {
  setup() {
    const route = useRoute();
    return { route };
  },
  template: '<div class="page"><h2>👤 用户详情</h2><p>用户 ID: {{ route.params.id }}</p></div>'
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/user/:id', component: User }
  ]
});

createApp({}).use(router).mount('#app');`,
    task: '添加一个 /contact 路由和对应组件',
    hints: [
      '创建一个 Contact 组件',
      '在 routes 数组中添加新路由',
      '在 nav 中添加链接'
    ],
    solution: {
      html: `<div id="app">
  <nav>
    <router-link to="/">首页</router-link> |
    <router-link to="/about">关于</router-link> |
    <router-link to="/contact">联系</router-link> |
    <router-link to="/user/123">用户详情</router-link>
  </nav>
  <router-view></router-view>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>`,
      js: `const { createApp, ref } = Vue;
const { createRouter, createWebHashHistory, useRoute } = VueRouter;

const Home = { template: '<div class="page"><h2>🏠 首页</h2><p>欢迎来到首页</p></div>' };
const About = { template: '<div class="page"><h2>📖 关于</h2><p>这是关于页面</p></div>' };
const Contact = { template: '<div class="page"><h2>📞 联系我们</h2><p>这是联系页面</p></div>' };
const User = {
  setup() {
    const route = useRoute();
    return { route };
  },
  template: '<div class="page"><h2>👤 用户详情</h2><p>用户 ID: {{ route.params.id }}</p></div>'
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/user/:id', component: User }
  ]
});

createApp({}).use(router).mount('#app');`
    },
    check: (code) => code.js.includes('/contact') && code.js.includes('Contact')
  },
  {
    title: 'Pinia 状态管理',
    desc: '学习全局状态管理',
    theory: `
      <p><strong>Pinia</strong> 是 Vue 官方推荐的状态管理库</p>
      <ul>
        <li><code>defineStore</code> - 定义 store</li>
        <li><code>state</code> - 状态数据</li>
        <li><code>getters</code> - 计算属性</li>
        <li><code>actions</code> - 修改状态的方法</li>
      </ul>
    `,
    html: `<div id="app">
  <h2>🛒 购物车</h2>
  <div class="products">
    <div v-for="p in products" :key="p.id" class="product">
      <span>{{ p.name }} - ¥{{ p.price }}</span>
      <button @click="cartStore.addItem(p)">加入购物车</button>
    </div>
  </div>
  <hr>
  <h3>购物车 ({{ cartStore.itemCount }} 件)</h3>
  <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
    {{ item.name }} x {{ item.qty }} = ¥{{ item.price * item.qty }}
    <button @click="cartStore.removeItem(item.id)">删除</button>
  </div>
  <p><strong>总计: ¥{{ cartStore.total }}</strong></p>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/pinia@2/dist/pinia.iife.js"></script>`,
    css: `#app { padding: 20px; }
.products { display: flex; gap: 10px; flex-wrap: wrap; }
.product { padding: 15px; background: #e3f2fd; border-radius: 8px; }
.product button { margin-left: 10px; background: #42b883; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
.cart-item { padding: 10px; background: #f5f5f5; margin: 5px 0; border-radius: 6px; display: flex; justify-content: space-between; }
.cart-item button { background: #e91e63; color: white; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; }
hr { margin: 20px 0; }`,
    js: `const { createApp, ref } = Vue;
const { createPinia, defineStore } = Pinia;

const useCartStore = defineStore('cart', {
  state: () => ({ items: [] }),
  getters: {
    itemCount: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    total: (state) => state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  },
  actions: {
    addItem(product) {
      const existing = this.items.find(i => i.id === product.id);
      if (existing) existing.qty++;
      else this.items.push({ ...product, qty: 1 });
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id);
    }
  }
});

const pinia = createPinia();

createApp({
  setup() {
    const cartStore = useCartStore();
    const products = ref([
      { id: 1, name: '苹果', price: 5 },
      { id: 2, name: '香蕉', price: 3 },
      { id: 3, name: '橙子', price: 4 }
    ]);
    return { cartStore, products };
  }
}).use(pinia).mount('#app');`,
    task: '在 products 中添加一个新商品',
    hints: [
      '找到 products 的 ref 定义',
      '在数组中添加新对象',
      '格式：{ id: 4, name: "xxx", price: xx }'
    ],
    solution: {
      js: `const { createApp, ref } = Vue;
const { createPinia, defineStore } = Pinia;

const useCartStore = defineStore('cart', {
  state: () => ({ items: [] }),
  getters: {
    itemCount: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    total: (state) => state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  },
  actions: {
    addItem(product) {
      const existing = this.items.find(i => i.id === product.id);
      if (existing) existing.qty++;
      else this.items.push({ ...product, qty: 1 });
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id);
    }
  }
});

const pinia = createPinia();

createApp({
  setup() {
    const cartStore = useCartStore();
    const products = ref([
      { id: 1, name: '苹果', price: 5 },
      { id: 2, name: '香蕉', price: 3 },
      { id: 3, name: '橙子', price: 4 },
      { id: 4, name: '葡萄', price: 8 }
    ]);
    return { cartStore, products };
  }
}).use(pinia).mount('#app');`
    },
    check: (code) => (code.js.match(/id:/g) || []).length >= 4
  },
  {
    title: 'Axios 网络请求',
    desc: '学习与后端 API 交互',
    theory: `
      <p><strong>Axios</strong> 是流行的 HTTP 请求库</p>
      <ul>
        <li><code>axios.get(url)</code> - GET 请求</li>
        <li><code>axios.post(url, data)</code> - POST 请求</li>
        <li>支持拦截器、取消请求等</li>
      </ul>
    `,
    html: `<div id="app">
  <h2>📡 用户列表（来自 API）</h2>
  <button @click="fetchUsers" :disabled="loading">{{ loading ? '加载中...' : '获取用户' }}</button>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-for="user in users" :key="user.id" class="user-card">
    <img :src="user.avatar" :alt="user.first_name">
    <div>
      <h3>{{ user.first_name }} {{ user.last_name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  </div>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`,
    css: `#app { padding: 20px; }
button { padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 20px; }
button:disabled { background: #ccc; }
.error { color: #e91e63; padding: 10px; background: #ffebee; border-radius: 6px; margin: 10px 0; }
.user-card { display: flex; align-items: center; gap: 15px; padding: 15px; background: #f5f5f5; border-radius: 8px; margin: 10px 0; }
.user-card img { width: 60px; height: 60px; border-radius: 50%; }
.user-card h3 { margin: 0 0 5px; }
.user-card p { margin: 0; color: #666; }`,
    js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const users = ref([]);
    const loading = ref(false);
    const error = ref(null);
    
    const fetchUsers = async () => {
      loading.value = true;
      error.value = null;
      try {
        const res = await axios.get('https://reqres.in/api/users?page=1');
        users.value = res.data.data;
      } catch (e) {
        error.value = '请求失败: ' + e.message;
      } finally {
        loading.value = false;
      }
    };
    
    return { users, loading, error, fetchUsers };
  }
}).mount('#app');`,
    task: '点击按钮获取用户数据，观察请求过程',
    hints: [
      '点击"获取用户"按钮',
      '观察加载状态的变化',
      '查看 Console 中的网络请求'
    ],
    solution: {},
    check: () => true
  },
  {
    title: 'Element Plus 组件库',
    desc: '学习使用 UI 组件库',
    theory: `
      <p><strong>Element Plus</strong> 是 Vue 3 最流行的 UI 组件库</p>
      <ul>
        <li>提供丰富的预制组件</li>
        <li>统一的设计风格</li>
        <li>完善的文档和示例</li>
      </ul>
    `,
    html: `<div id="app">
  <el-card>
    <template #header>
      <span>Element Plus 示例</span>
    </template>
    <el-form :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio value="male">男</el-radio>
          <el-radio value="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="爱好">
        <el-checkbox-group v-model="form.hobbies">
          <el-checkbox value="coding">编程</el-checkbox>
          <el-checkbox value="music">音乐</el-checkbox>
          <el-checkbox value="game">游戏</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
<link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css">
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/element-plus"></script>`,
    css: `#app { padding: 20px; max-width: 500px; }`,
    js: `const { createApp, ref, reactive } = Vue;

const app = createApp({
  setup() {
    const form = reactive({
      name: '',
      gender: 'male',
      hobbies: []
    });
    
    const submit = () => {
      ElementPlus.ElMessage.success('提交成功: ' + JSON.stringify(form));
    };
    
    const reset = () => {
      form.name = '';
      form.gender = 'male';
      form.hobbies = [];
    };
    
    return { form, submit, reset };
  }
});

app.use(ElementPlus);
app.mount('#app');`,
    task: '填写表单并点击提交，观察消息提示',
    hints: [
      '填写用户名',
      '选择性别和爱好',
      '点击提交按钮'
    ],
    solution: {},
    check: () => true
  },
  {
    title: '项目实战：Todo 应用',
    desc: '综合运用所学知识',
    theory: `
      <p>这是一个完整的 Todo 应用，综合运用：</p>
      <ul>
        <li>Vue 3 组合式 API</li>
        <li>组件化开发</li>
        <li>状态管理</li>
        <li>本地存储</li>
        <li>过滤和计算属性</li>
      </ul>
    `,
    html: `<div id="app">
  <div class="todo-app">
    <h1>📝 Todo List</h1>
    <div class="input-area">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="添加新任务...">
      <button @click="addTodo">添加</button>
    </div>
    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">全部 ({{ todos.length }})</button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">待完成 ({{ activeTodos.length }})</button>
      <button :class="{ active: filter === 'done' }" @click="filter = 'done'">已完成 ({{ doneTodos.length }})</button>
    </div>
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ done: todo.done }">
        <input type="checkbox" v-model="todo.done" @change="saveTodos">
        <span @dblclick="todo.editing = true" v-if="!todo.editing">{{ todo.text }}</span>
        <input v-else v-model="todo.text" @blur="todo.editing = false; saveTodos()" @keyup.enter="todo.editing = false; saveTodos()" class="edit-input">
        <button class="delete-btn" @click="removeTodo(todo.id)">×</button>
      </li>
    </ul>
    <div class="footer" v-if="todos.length">
      <span>{{ activeTodos.length }} 项待完成</span>
      <button v-if="doneTodos.length" @click="clearDone">清除已完成</button>
    </div>
  </div>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`,
    css: `.todo-app { max-width: 500px; margin: 0 auto; padding: 20px; }
h1 { text-align: center; color: #42b883; }
.input-area { display: flex; gap: 10px; margin-bottom: 20px; }
.input-area input { flex: 1; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 16px; }
.input-area input:focus { border-color: #42b883; outline: none; }
.input-area button { padding: 12px 24px; background: #42b883; color: white; border: none; border-radius: 8px; cursor: pointer; }
.filters { display: flex; gap: 10px; margin-bottom: 15px; }
.filters button { padding: 8px 16px; background: #f5f5f5; border: none; border-radius: 6px; cursor: pointer; }
.filters button.active { background: #42b883; color: white; }
.todo-list { list-style: none; padding: 0; }
.todo-list li { display: flex; align-items: center; padding: 15px; background: #f9f9f9; margin: 8px 0; border-radius: 8px; gap: 12px; }
.todo-list li.done { background: #e8f5e9; }
.todo-list li.done span { text-decoration: line-through; color: #999; }
.todo-list li span { flex: 1; cursor: pointer; }
.edit-input { flex: 1; padding: 5px; border: 1px solid #42b883; border-radius: 4px; }
.delete-btn { background: #ff5252; color: white; border: none; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; opacity: 0.6; }
.delete-btn:hover { opacity: 1; }
.footer { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; color: #666; }
.footer button { background: none; border: none; color: #ff5252; cursor: pointer; }`,
    js: `const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const todos = ref([]);
    const newTodo = ref('');
    const filter = ref('all');
    
    const activeTodos = computed(() => todos.value.filter(t => !t.done));
    const doneTodos = computed(() => todos.value.filter(t => t.done));
    const filteredTodos = computed(() => {
      if (filter.value === 'active') return activeTodos.value;
      if (filter.value === 'done') return doneTodos.value;
      return todos.value;
    });
    
    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({ id: Date.now(), text: newTodo.value, done: false, editing: false });
        newTodo.value = '';
        saveTodos();
      }
    };
    
    const removeTodo = (id) => {
      todos.value = todos.value.filter(t => t.id !== id);
      saveTodos();
    };
    
    const clearDone = () => {
      todos.value = todos.value.filter(t => !t.done);
      saveTodos();
    };
    
    const saveTodos = () => {
      localStorage.setItem('vue-todos', JSON.stringify(todos.value));
    };
    
    onMounted(() => {
      const saved = localStorage.getItem('vue-todos');
      if (saved) todos.value = JSON.parse(saved);
    });
    
    return { todos, newTodo, filter, activeTodos, doneTodos, filteredTodos, addTodo, removeTodo, clearDone, saveTodos };
  }
}).mount('#app');`,
    task: '添加几个任务，双击可编辑，刷新后数据还在',
    hints: [
      '在输入框输入任务并添加',
      '双击任务文字可以编辑',
      '数据会保存到 localStorage'
    ],
    solution: {},
    check: () => true
  }
]
