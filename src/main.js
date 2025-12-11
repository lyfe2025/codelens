import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import naive from './plugins/naive'
import './style.css'

import Home from './views/Home.vue'
import Lesson from './views/Lesson.vue'

const router = createRouter({
  // 使用 hash 模式，兼容 GitHub Pages
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/lesson/:module/:id', component: Lesson }
  ]
})

const app = createApp(App)
app.use(router)
app.use(naive)
app.mount('#app')
