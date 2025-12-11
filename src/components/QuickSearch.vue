<template>
  <n-modal
    v-model:show="isOpen"
    preset="card"
    :bordered="false"
    size="large"
    :style="{ width: '600px', maxWidth: '90vw' }"
    :mask-closable="true"
    @after-leave="resetSearch"
  >
    <template #header>
      <div class="search-header">
        <n-input
          ref="inputRef"
          v-model:value="keyword"
          placeholder="搜索语法：flex、v-for、addEventListener..."
          size="large"
          clearable
          @keydown.esc="close"
        >
          <template #prefix><n-icon :component="SearchOutline" /></template>
        </n-input>
      </div>
    </template>

    <n-scrollbar style="max-height: 50vh">
      <div class="search-results" v-if="keyword">
        <div class="result-section" v-if="lessonResults.length">
          <div class="section-label">
            <n-icon :component="BookOutline" />
            站内示例
          </div>
          <div 
            v-for="item in lessonResults" 
            :key="item.path"
            class="result-item"
            @click="goToLesson(item.path)"
          >
            <n-tag size="small" :type="moduleType[item.module]">{{ item.moduleName }}</n-tag>
            <div class="info">
              <strong>{{ item.title }}</strong>
              <p>{{ item.match }}</p>
            </div>
          </div>
        </div>

        <div class="result-section" v-if="docResults.length">
          <div class="section-label">
            <n-icon :component="DocumentTextOutline" />
            官方文档
          </div>
          <a 
            v-for="doc in docResults" 
            :key="doc.url"
            :href="doc.url"
            target="_blank"
            class="result-item doc"
          >
            <n-tag size="small" :type="moduleType[doc.type]">{{ doc.typeName }}</n-tag>
            <div class="info">
              <strong>{{ doc.title }}</strong>
              <p>{{ doc.desc }}</p>
            </div>
            <n-icon :component="OpenOutline" class="external" />
          </a>
        </div>

        <n-empty v-if="!lessonResults.length && !docResults.length" description="没有找到相关内容">
          <template #icon><n-icon :component="SearchOutline" size="48" /></template>
        </n-empty>
      </div>

      <div class="search-tips" v-else>
        <p>试试搜索：</p>
        <n-space>
          <n-tag 
            v-for="tip in ['flex', 'v-for', '事件', '响应式']" 
            :key="tip"
            round
            checkable
            @click="quickSearch(tip)"
          >
            {{ tip }}
          </n-tag>
        </n-space>
      </div>
    </n-scrollbar>

    <template #footer>
      <n-space justify="space-between" align="center">
        <n-tag size="small" :bordered="false">ESC 关闭</n-tag>
        <n-tag size="small" :bordered="false">⌘K 打开</n-tag>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NModal, NInput, NTag, NSpace, NEmpty, NScrollbar, NIcon } from 'naive-ui'
import { SearchOutline, BookOutline, DocumentTextOutline, OpenOutline } from '@vicons/ionicons5'
import { lessons } from '../data/lessons/index'

const router = useRouter()
const isOpen = ref(false)
const keyword = ref('')
const inputRef = ref(null)
const lessonResults = ref([])
const docResults = ref([])

const moduleNames = { html: 'HTML', css: 'CSS', js: 'JavaScript', vue: 'Vue', nodejs: 'Node.js', ajax: 'Ajax', advanced: '进阶', typescript: 'TypeScript', golang: 'Go', linux: 'Linux', mobile: '移动开发' }
const moduleType = { html: 'error', css: 'info', js: 'warning', vue: 'success', nodejs: 'success', ajax: 'info', advanced: 'primary', typescript: 'info', golang: 'info', linux: 'warning', mobile: 'primary' }

const docIndex = [
  { keywords: ['html', '标签', 'tag'], title: 'HTML 元素参考', desc: '所有 HTML 元素的完整列表', url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element', type: 'html', typeName: 'MDN' },
  { keywords: ['flex', 'flexbox', '弹性', 'justify', 'align'], title: 'Flexbox 布局', desc: '弹性盒子完整指南', url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_flexible_box_layout', type: 'css', typeName: 'MDN' },
  { keywords: ['grid', '网格', 'grid-template'], title: 'Grid 布局', desc: '网格布局完整指南', url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_grid_layout', type: 'css', typeName: 'MDN' },
  { keywords: ['事件', 'event', 'addeventlistener', 'click', 'input'], title: '事件处理', desc: '事件监听与处理', url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener', type: 'js', typeName: 'MDN' },
  { keywords: ['promise', 'async', 'await', '异步'], title: 'Promise', desc: '异步编程', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise', type: 'js', typeName: 'MDN' },
  { keywords: ['vue', 'ref', 'reactive'], title: 'Vue 响应式基础', desc: '响应式数据原理', url: 'https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html', type: 'vue', typeName: 'Vue' },
  { keywords: ['v-model', '双向绑定', 'model'], title: 'v-model 双向绑定', desc: '表单输入绑定', url: 'https://cn.vuejs.org/guide/essentials/forms.html', type: 'vue', typeName: 'Vue' },
  { keywords: ['v-if', 'v-else', 'v-show', '条件渲染'], title: '条件渲染', desc: 'v-if 与 v-show', url: 'https://cn.vuejs.org/guide/essentials/conditional.html', type: 'vue', typeName: 'Vue' },
  { keywords: ['v-for', '列表', '循环', '遍历'], title: '列表渲染', desc: 'v-for 循环渲染', url: 'https://cn.vuejs.org/guide/essentials/list.html', type: 'vue', typeName: 'Vue' },
]

const open = () => { isOpen.value = true; nextTick(() => inputRef.value?.focus()) }
const close = () => { isOpen.value = false }
const resetSearch = () => { keyword.value = ''; lessonResults.value = []; docResults.value = [] }
const quickSearch = (kw) => { keyword.value = kw }
const goToLesson = (path) => { router.push(path); close() }

watch(keyword, (kw) => {
  const searchKw = kw.toLowerCase().trim()
  if (!searchKw) { lessonResults.value = []; docResults.value = []; return }

  const results = []
  Object.entries(lessons).forEach(([mod, list]) => {
    list.forEach((lesson, idx) => {
      const searchText = `${lesson.title} ${lesson.desc} ${lesson.html || ''} ${lesson.css || ''} ${lesson.js || ''}`.toLowerCase()
      if (searchText.includes(searchKw)) {
        let match = lesson.desc
        const allCode = `${lesson.html || ''} ${lesson.css || ''} ${lesson.js || ''}`
        const lines = allCode.split('\n')
        for (const line of lines) {
          if (line.toLowerCase().includes(searchKw)) {
            match = line.trim().substring(0, 60) + (line.length > 60 ? '...' : '')
            break
          }
        }
        results.push({ module: mod, moduleName: moduleNames[mod], title: lesson.title, match, path: `/lesson/${mod}/${idx}` })
      }
    })
  })
  lessonResults.value = results.slice(0, 5)
  docResults.value = docIndex.filter(doc => doc.keywords.some(k => k.includes(searchKw) || searchKw.includes(k))).slice(0, 5)
})

const handleKeydown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); isOpen.value ? close() : open() }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

defineExpose({ open })
</script>

<style scoped>
.search-header { width: 100%; }
.search-results { padding: 0.5rem 0; }
.result-section { margin-bottom: 1rem; }
.section-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px; }
.result-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 8px; text-decoration: none; color: inherit; cursor: pointer; transition: background 0.2s; }
.result-item:hover { background: var(--bg-tertiary); }
.info { flex: 1; min-width: 0; }
.info strong { display: block; font-size: 0.95rem; margin-bottom: 0.15rem; }
.info p { font-size: 0.8rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; }
.external { color: var(--text-muted); font-size: 0.9rem; }
.search-tips { padding: 1.5rem; text-align: center; color: var(--text-secondary); }
.search-tips p { margin-bottom: 1rem; font-size: 0.9rem; }
</style>
