<template>
  <n-card class="note-card" :bordered="true">
    <template #header>
      <n-space align="center" :size="8">
        <n-icon :component="CreateOutline" color="#f59e0b" />
        <span>我的笔记</span>
      </n-space>
    </template>
    <template #header-extra>
      <n-space :size="8">
        <n-tag v-if="saved" size="small" type="success" :bordered="false">
          <template #icon><n-icon :component="CheckmarkOutline" /></template>
          已保存
        </n-tag>
        <n-tag size="small" :bordered="false">{{ noteContent.length }} 字</n-tag>
      </n-space>
    </template>
    <n-input
      v-model:value="noteContent"
      type="textarea"
      placeholder="在这里记录学习心得、疑问、灵感..."
      :autosize="{ minRows: 3, maxRows: 6 }"
      @input="saveNote"
    />
  </n-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { NCard, NInput, NSpace, NTag, NIcon } from 'naive-ui'
import { CreateOutline, CheckmarkOutline } from '@vicons/ionicons5'
import { useAchievements } from '../composables/useAchievements'

const props = defineProps({ lessonKey: { type: String, required: true } })

const noteContent = ref('')
const saved = ref(false)
let saveTimeout = null

const { refreshStats } = useAchievements()

const getStorageKey = () => `lesson-note-${props.lessonKey}`

const loadNote = () => {
  const savedNote = localStorage.getItem(getStorageKey())
  noteContent.value = savedNote || ''
}

const saveNote = () => {
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    localStorage.setItem(getStorageKey(), noteContent.value)
    saved.value = true
    setTimeout(() => saved.value = false, 2000)
    // 触发成就检查
    refreshStats()
  }, 500)
}

watch(() => props.lessonKey, () => loadNote())
onMounted(() => loadNote())
</script>

<style scoped>
.note-card {
  margin: 1rem 0;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.3);
}
.note-card :deep(.n-card-header) {
  padding-bottom: 0.5rem;
}
.note-card :deep(.n-input) {
  background: var(--bg-primary);
}
</style>
