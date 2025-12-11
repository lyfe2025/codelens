<template>
  <n-collapse :default-expanded-names="[]">
    <n-collapse-item name="note">
      <template #header>
        <n-space align="center" :size="8">
          <n-icon :component="CreateOutline" />
          <span>我的笔记</span>
        </n-space>
      </template>
      <n-input
        v-model:value="noteContent"
        type="textarea"
        placeholder="在这里记录学习心得..."
        :autosize="{ minRows: 4, maxRows: 8 }"
        @input="saveNote"
      />
      <n-space justify="space-between" align="center" class="note-footer">
        <n-tag size="small" :bordered="false">{{ noteContent.length }} 字</n-tag>
        <n-tag v-if="saved" size="small" type="success" :bordered="false">
          <template #icon><n-icon :component="CheckmarkOutline" /></template>
          已保存
        </n-tag>
      </n-space>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { NCollapse, NCollapseItem, NInput, NSpace, NTag, NIcon } from 'naive-ui'
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
.note-footer { margin-top: 0.5rem; }
</style>
