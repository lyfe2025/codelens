/**
 * Vue 课程数据
 */
export const vueLessons = [
  {
    title: 'Vue 初体验',
    desc: '了解 Vue 的响应式特性',
    theory: `
      <p><strong>Vue</strong> 核心特性：响应式、组件化、声明式渲染</p>
      <p>数据变化自动更新视图</p>
    `,
    html: `<div id="app">
  <h2>{{ message }}</h2>
  <p>计数：{{ count }}</p>
  <button @click="count++">+1</button>
  <button @click="count--">-1</button>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`,
    css: `#app { padding: 20px; }
button { padding: 8px 16px; margin: 5px; cursor: pointer; background: #42b883; color: white; border: none; border-radius: 4px; }`,
    js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const message = ref("Hello Vue!");
    const count = ref(0);
    return { message, count };
  }
}).mount("#app");`,
    task: '把 message 改成 "我正在学习 Vue！"',
    hints: [
      '找到 ref("Hello Vue!") 这一行',
      '修改引号内的文字',
      '改成 "我正在学习 Vue！"'
    ],
    solution: {
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const message = ref("我正在学习 Vue！");
    const count = ref(0);
    return { message, count };
  }
}).mount("#app");`
    },
    check: (code) => code.js.includes('学习')
  },
  {
    title: '模板语法',
    desc: '学习插值、指令和事件绑定',
    theory: `
      <p>{{ }} - 文本插值</p>
      <p>:属性 - 属性绑定（v-bind）</p>
      <p>@事件 - 事件监听（v-on）</p>
      <p>v-model - 双向绑定</p>
    `,
    html: `<div id="app">
  <input v-model="name" placeholder="输入你的名字">
  <p>你好，<strong>{{ name || '陌生人' }}</strong>！</p>
  <input type="color" v-model="color">
  <p :style="{ color: color }">这段文字的颜色会变化</p>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`,
    css: `#app { padding: 20px; }
input { padding: 8px; margin: 5px 0; border: 1px solid #ddd; border-radius: 4px; }`,
    js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const name = ref("");
    const color = ref("#42b883");
    return { name, color };
  }
}).mount("#app");`,
    task: '添加一个按钮，点击后把 name 清空',
    hints: [
      '在 HTML 中添加一个 button',
      '使用 @click 绑定点击事件',
      '在事件中设置 name = ""'
    ],
    solution: {
      html: `<div id="app">
  <input v-model="name" placeholder="输入你的名字">
  <button @click="name = ''">清空</button>
  <p>你好，<strong>{{ name || '陌生人' }}</strong>！</p>
  <input type="color" v-model="color">
  <p :style="{ color: color }">这段文字的颜色会变化</p>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const name = ref("");
    const color = ref("#42b883");
    return { name, color };
  }
}).mount("#app");`
    },
    check: (code) => code.js.includes('name.value = ""') || code.js.includes("name.value = ''") || code.html.includes("name = ''") || code.html.includes('name = ""')
  },
  {
    title: '条件与列表渲染',
    desc: '学习 v-if 和 v-for 指令',
    theory: `
      <p>v-if / v-else - 条件渲染</p>
      <p>v-for="item in list" - 列表渲染</p>
      <p>需要绑定 :key 属性</p>
    `,
    html: `<div id="app">
  <button @click="showList = !showList">{{ showList ? '隐藏' : '显示' }}列表</button>
  <ul v-if="showList">
    <li v-for="(item, index) in items" :key="index">
      {{ index + 1 }}. {{ item }}
      <button @click="items.splice(index, 1)">删除</button>
    </li>
  </ul>
  <p v-else>列表已隐藏</p>
  <input v-model="newItem" @keyup.enter="addItem" placeholder="添加项目">
  <button @click="addItem">添加</button>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`,
    css: `#app { padding: 20px; }
ul { list-style: none; padding: 0; }
li { padding: 10px; background: #f5f5f5; margin: 5px 0; border-radius: 6px; display: flex; justify-content: space-between; }
input { padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-right: 5px; }
button { padding: 6px 12px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 2px; }
li button { background: #e91e63; padding: 4px 8px; }`,
    js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const showList = ref(true);
    const items = ref(["学习 HTML", "学习 CSS", "学习 JavaScript"]);
    const newItem = ref("");
    
    const addItem = () => {
      if (newItem.value.trim()) {
        items.value.push(newItem.value);
        newItem.value = "";
      }
    };
    
    return { showList, items, newItem, addItem };
  }
}).mount("#app");`,
    task: '在 items 初始数组中添加 "学习 Vue"',
    hints: [
      '找到 items 的 ref 定义',
      '在数组中添加新元素',
      '格式：["...", "...", "学习 Vue"]'
    ],
    solution: {
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const showList = ref(true);
    const items = ref(["学习 HTML", "学习 CSS", "学习 JavaScript", "学习 Vue"]);
    const newItem = ref("");
    
    const addItem = () => {
      if (newItem.value.trim()) {
        items.value.push(newItem.value);
        newItem.value = "";
      }
    };
    
    return { showList, items, newItem, addItem };
  }
}).mount("#app");`
    },
    check: (code) => code.js.includes('学习 Vue')
  },
  {
    title: '计算属性与侦听器',
    desc: '学习 computed 和 watch',
    theory: `
      <p>computed - 基于响应式数据计算，有缓存</p>
      <p>watch - 监听数据变化执行副作用</p>
    `,
    html: `<div id="app">
  <p>价格：<input type="number" v-model.number="price"> 元</p>
  <p>数量：<input type="number" v-model.number="quantity"></p>
  <p>总价：<strong>{{ total }}</strong> 元</p>
  <p v-if="total > 100" style="color: #e91e63;">🎉 满100减10！实付：{{ total - 10 }} 元</p>
  <p style="color: #666;">{{ message }}</p>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`,
    css: `#app { padding: 20px; }
input { padding: 8px; margin: 5px; border: 1px solid #ddd; border-radius: 4px; width: 80px; }`,
    js: `const { createApp, ref, computed, watch } = Vue;

createApp({
  setup() {
    const price = ref(50);
    const quantity = ref(1);
    const message = ref("");
    
    const total = computed(() => price.value * quantity.value);
    
    watch(quantity, (newVal, oldVal) => {
      message.value = \`数量从 \${oldVal} 变成 \${newVal}\`;
    });
    
    return { price, quantity, total, message };
  }
}).mount("#app");`,
    task: '添加 watch 监听 price 变化',
    hints: [
      '参考 watch(quantity, ...) 的写法',
      '添加 watch(price, ...) 监听价格',
      '在回调中更新 message'
    ],
    solution: {
      js: `const { createApp, ref, computed, watch } = Vue;

createApp({
  setup() {
    const price = ref(50);
    const quantity = ref(1);
    const message = ref("");
    
    const total = computed(() => price.value * quantity.value);
    
    watch(quantity, (newVal, oldVal) => {
      message.value = \`数量从 \${oldVal} 变成 \${newVal}\`;
    });
    
    watch(price, (newVal, oldVal) => {
      message.value = \`价格从 \${oldVal} 变成 \${newVal}\`;
    });
    
    return { price, quantity, total, message };
  }
}).mount("#app");`
    },
    check: (code) => code.js.includes('watch(price')
  },
  {
    title: '组件基础',
    desc: '学习如何创建和使用组件',
    theory: `
      <p>组件是可复用的 Vue 实例</p>
      <p>props - 父传子</p>
      <p>emit - 子传父</p>
    `,
    html: `<div id="app">
  <h2>任务列表</h2>
  <task-item v-for="(task, i) in tasks" :key="i" :task="task"
    @toggle="tasks[i].done = !tasks[i].done"
    @remove="tasks.splice(i, 1)">
  </task-item>
  <input v-model="newTask" @keyup.enter="addTask" placeholder="添加任务">
  <button @click="addTask">添加</button>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`,
    css: `#app { padding: 20px; max-width: 400px; }
.task-item { display: flex; align-items: center; padding: 12px; background: #f5f5f5; margin: 8px 0; border-radius: 8px; }
.task-item.done { background: #e8f5e9; }
.task-item.done span { text-decoration: line-through; color: #999; }
.task-item span { flex: 1; margin-left: 10px; }
.task-item button { background: #e91e63; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
input { padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-right: 5px; }
button { padding: 10px 15px; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; }`,
    js: `const { createApp, ref } = Vue;

const TaskItem = {
  props: ['task'],
  emits: ['toggle', 'remove'],
  template: \`
    <div class="task-item" :class="{ done: task.done }">
      <input type="checkbox" :checked="task.done" @change="$emit('toggle')">
      <span>{{ task.text }}</span>
      <button @click="$emit('remove')">删除</button>
    </div>
  \`
};

createApp({
  components: { TaskItem },
  setup() {
    const tasks = ref([
      { text: "学习 Vue 组件", done: false },
      { text: "完成练习", done: true }
    ]);
    const newTask = ref("");
    
    const addTask = () => {
      if (newTask.value.trim()) {
        tasks.value.push({ text: newTask.value, done: false });
        newTask.value = "";
      }
    };
    
    return { tasks, newTask, addTask };
  }
}).mount("#app");`,
    task: '在 tasks 初始数组中添加一个新任务',
    hints: [
      '找到 tasks 的 ref 定义',
      '在数组中添加新对象',
      '格式：{ text: "任务内容", done: false }'
    ],
    solution: {
      js: `const { createApp, ref } = Vue;

const TaskItem = {
  props: ['task'],
  emits: ['toggle', 'remove'],
  template: \`
    <div class="task-item" :class="{ done: task.done }">
      <input type="checkbox" :checked="task.done" @change="$emit('toggle')">
      <span>{{ task.text }}</span>
      <button @click="$emit('remove')">删除</button>
    </div>
  \`
};

createApp({
  components: { TaskItem },
  setup() {
    const tasks = ref([
      { text: "学习 Vue 组件", done: false },
      { text: "完成练习", done: true },
      { text: "阅读文档", done: false }
    ]);
    const newTask = ref("");
    
    const addTask = () => {
      if (newTask.value.trim()) {
        tasks.value.push({ text: newTask.value, done: false });
        newTask.value = "";
      }
    };
    
    return { tasks, newTask, addTask };
  }
}).mount("#app");`
    },
    check: (code) => (code.js.match(/text:/g) || []).length >= 3
  },
  {
    title: '生命周期钩子',
    desc: '了解组件的生命周期',
    theory: `
      <p>onMounted - 组件挂载后</p>
      <p>onUpdated - 组件更新后</p>
      <p>onUnmounted - 组件卸载前（清理定时器等）</p>
    `,
    html: `<div id="app">
  <h2>⏱️ 计时器：{{ time }} 秒</h2>
  <button @click="isRunning = !isRunning">{{ isRunning ? '暂停' : '开始' }}</button>
  <button @click="time = 0; isRunning = false">重置</button>
  <p style="color: #666;">{{ status }}</p>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`,
    css: `#app { padding: 20px; text-align: center; }
h2 { font-size: 48px; color: #42b883; }
button { padding: 12px 24px; margin: 5px; font-size: 16px; background: #42b883; color: white; border: none; border-radius: 8px; cursor: pointer; }`,
    js: `const { createApp, ref, watch, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const time = ref(0);
    const isRunning = ref(false);
    const status = ref("");
    let timer = null;
    
    watch(isRunning, (running) => {
      if (running) {
        timer = setInterval(() => time.value++, 1000);
        status.value = "计时中...";
      } else {
        clearInterval(timer);
        status.value = "已暂停";
      }
    });
    
    onMounted(() => status.value = "点击开始计时");
    onUnmounted(() => clearInterval(timer));
    
    return { time, isRunning, status };
  }
}).mount("#app");`,
    task: '当 time 超过 10 秒时，自动暂停',
    hints: [
      '添加 watch 监听 time',
      '判断 time.value > 10',
      '设置 isRunning.value = false'
    ],
    solution: {
      js: `const { createApp, ref, watch, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const time = ref(0);
    const isRunning = ref(false);
    const status = ref("");
    let timer = null;
    
    watch(isRunning, (running) => {
      if (running) {
        timer = setInterval(() => time.value++, 1000);
        status.value = "计时中...";
      } else {
        clearInterval(timer);
        status.value = "已暂停";
      }
    });
    
    watch(time, (val) => {
      if (val > 10) {
        isRunning.value = false;
        status.value = "超过10秒，自动暂停";
      }
    });
    
    onMounted(() => status.value = "点击开始计时");
    onUnmounted(() => clearInterval(timer));
    
    return { time, isRunning, status };
  }
}).mount("#app");`
    },
    check: (code) => code.js.includes('10') && code.js.includes('isRunning')
  }
]
