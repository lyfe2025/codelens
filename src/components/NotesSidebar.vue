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

        <n-empty v-else description="还没有笔记">
          <template #icon><n-icon :component="DocumentTextOutline" size="48" /></template>
          <template #extra>
            <span class="empty-hint">在学习过程中点击"我的笔记"记录心得</span>
          </template>
        </n-empty>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NDrawer, NDrawerContent, NCard, NTag, NSpace, NEmpty, NBadge, NScrollbar, NIcon } from 'naive-ui'
import { CreateOutline, DocumentTextOutline, DownloadOutline, TrashOutline, ChevronForwardOutline } from '@vicons/ionicons5'
import { useNotes } from '../composables/useNotes'

const router = useRouter()
const { notes, notesCount, loadNotes, removeNote, exportAllNotes } = useNotes()
const isOpen = ref(false)

const moduleType = { html: 'error', css: 'info', js: 'warning', vue: 'success', nodejs: 'success', ajax: 'info', advanced: 'primary', typescript: 'info', golang: 'info', linux: 'warning', mobile: 'primary' }

const truncate = (text, length) => text.length <= length ? text : text.slice(0, length) + '...'
const handleDelete = (key) => { if (confirm('确定删除这条笔记吗？')) removeNote(key) }
const goToLesson = (path) => { router.push(path); isOpen.value = false }

watch(isOpen, (val) => { if (val) loadNotes() })
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

@media (max-width: 480px) {
  .notes-trigger { right: 15px; bottom: 15px; }
  .notes-badge { right: 10px; bottom: 55px; }
}
</style>
