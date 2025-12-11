<template>
  <!-- 触发按钮 -->
  <n-button
    class="notes-trigger"
    :class="{ hidden: isOpen }"
    circle
    type="primary"
    size="large"
    @click="isOpen = true"
  >
    <template #icon><n-icon :component="CreateOutline" /></template>
  </n-button>
  <n-badge v-if="notesCount > 0" :value="notesCount" class="notes-badge" :class="{ hidden: isOpen }" />

  <!-- 侧边栏 -->
  <n-drawer v-model:show="isOpen" :width="380" placement="right">
    <n-drawer-content closable>
      <template #header>
        <n-space align="center">
          <n-icon :component="DocumentTextOutline" size="20" />
          <span>我的笔记</span>
        </n-space>
      </template>
      <template #header-extra>
        <n-button v-if="notes.length" type="primary" size="small" @click="exportAllNotes">
          <template #icon><n-icon :component="DownloadOutline" /></template>
          导出 ({{ notes.length }})
        </n-button>
      </template>

      <n-scrollbar style="max-height: calc(100vh - 120px)">
        <!-- 当前课程笔记编辑区 -->
        <n-card v-if="currentLesson" size="small" class="current-note-card">
          <template #header>
            <n-space align="center" :size="8">
              <n-icon :component="CreateOutline" color="#f59e0b" />
              <span>当前课程笔记</span>
            </n-space>
          </template>
          <template #header-extra>
            <n-space :size="8">
              <n-tag v-if="saved" size="small" type="success" :bordered="false">
                <template #icon><n-icon :component="CheckmarkOutline" /></template>
                已保存
              </n-tag>
              <n-tag size="small" :bordered="false">{{ currentNoteContent.length }} 字</n-tag>
            </n-space>
          </template>
          <div class="current-lesson-info">
            <n-tag size="tiny" :type="moduleType[currentLesson.module]">{{ currentLesson.moduleName }}</n-tag>
            <span>{{ currentLesson.title }}</span>
          </div>
          <n-input
            v-model:value="currentNoteContent"
            type="textarea"
            placeholder="在这里记录学习心得、疑问、灵感..."
            :autosize="{ minRows: 3, maxRows: 6 }"
            @input="saveCurrentNote"
          />
        </n-card>

        <n-divider v-if="currentLesson && notes.length">全部笔记</n-divider>

        <n-space vertical v-if="notes.length">
          <n-card v-for="note in notes" :key="note.key" size="small" hoverable>
            <template #header>
              <div class="note-meta">
                <n-tag size="tiny" :type="moduleType[note.module]">{{ note.moduleName }}</n-tag>
                <span class="note-lesson" @click="goToLesson(note.path)">{{ note.lessonTitle }}</span>
              </div>
            </template>
            <template #header-extra>
              <n-button text size="tiny" type="error" @click="handleDelete(note.key)">
                <template #icon><n-icon :component="TrashOutline" /></template>
              </n-button>
            </template>
            <p class="note-content">{{ truncate(note.content, 120) }}</p>
            <template #footer>
              <n-button text type="primary" size="small" @click="goToLesson(note.path)">
                查看
                <template #icon><n-icon :component="ChevronForwardOutline" /></template>
              </n-button>
            </template>
          </n-card>
        </n-space>

        <n-empty v-else-if="!currentLesson" description="还没有笔记">
          <template #icon><n-icon :component="DocumentTextOutline" size="48" /></template>
          <template #extra>
            <span class="empty-hint">进入课程后可以在这里记录笔记</span>
          </template>
        </n-empty>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NButton, NDrawer, NDrawerContent, NCard, NTag, NSpace, NEmpty, NBadge, NScrollbar, NIcon, NInput, NDivider } from 'naive-ui'
import { CreateOutline, DocumentTextOutline, DownloadOutline, TrashOutline, ChevronForwardOutline, CheckmarkOutline } from '@vicons/ionicons5'
import { useNotes } from '../composables/useNotes'
import { lessons } from '../data/lessons/index'
import { MODULE_NAMES } from '../utils/constants'

const router = useRouter()
const route = useRoute()
const { notes, notesCount, loadNotes, removeNote, exportAllNotes } = useNotes()
const isOpen = ref(false)

// 当前课程笔记
const currentNoteContent = ref('')
const saved = ref(false)
let saveTimeout = null

const moduleType = { html: 'error', css: 'info', js: 'warning', vue: 'success', nodejs: 'success', ajax: 'info', advanced: 'primary', typescript: 'info', golang: 'info', linux: 'warning', mobile: 'primary' }

// 获取当前课程信息
const currentLesson = computed(() => {
  // 通过路径匹配判断是否在课程页面
  if (!route.path.startsWith('/lesson/')) return null
  const module = route.params.module
  const id = parseInt(route.params.id)
  const lesson = lessons[module]?.[id]
  if (!lesson) return null
  return {
    module,
    moduleName: MODULE_NAMES[module] || module,
    id,
    title: lesson.title,
    key: `${module}-${id}`
  }
})

const currentNoteKey = computed(() => currentLesson.value ? `lesson-note-${currentLesson.value.key}` : null)

// 加载当前课程笔记
const loadCurrentNote = () => {
  if (currentNoteKey.value) {
    currentNoteContent.value = localStorage.getItem(currentNoteKey.value) || ''
  } else {
    currentNoteContent.value = ''
  }
}

// 保存当前课程笔记
const saveCurrentNote = () => {
  if (!currentNoteKey.value) return
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    localStorage.setItem(currentNoteKey.value, currentNoteContent.value)
    saved.value = true
    setTimeout(() => saved.value = false, 2000)
    loadNotes() // 刷新笔记列表
  }, 500)
}

const truncate = (text, length) => text.length <= length ? text : text.slice(0, length) + '...'
const handleDelete = (key) => { if (confirm('确定删除这条笔记吗？')) removeNote(key) }
const goToLesson = (path) => { router.push(path); isOpen.value = false }

watch(isOpen, (val) => { if (val) { loadNotes(); loadCurrentNote() } })
watch(() => route.fullPath, () => { if (isOpen.value) loadCurrentNote() })
onMounted(() => loadNotes())

defineExpose({ open: () => { isOpen.value = true }, close: () => { isOpen.value = false } })
</script>

<style scoped>
.notes-trigger { position: fixed; right: 20px; bottom: 20px; z-index: 100; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); }
.notes-trigger.hidden { opacity: 0; pointer-events: none; }
.notes-badge { position: fixed; right: 15px; bottom: 60px; z-index: 101; }
.notes-badge.hidden { opacity: 0; }
.note-meta { display: flex; align-items: center; gap: 0.5rem; }
.note-lesson { font-size: 0.9rem; font-weight: 500; cursor: pointer; color: var(--text-primary); }
.note-lesson:hover { color: var(--primary-color); }
.note-content { color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin: 0; white-space: pre-wrap; }
.empty-hint { font-size: 0.85rem; color: var(--text-muted); }

.current-note-card {
  margin-bottom: 1rem;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.3);
}
.current-lesson-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@media (max-width: 480px) {
  .notes-trigger { right: 15px; bottom: 15px; }
  .notes-badge { right: 10px; bottom: 55px; }
}
</style>
