<template>
  <n-collapse-transition :show="show">
    <div class="console-panel">
      <div class="console-header">
        <n-space align="center" :size="8">
          <n-icon :component="TerminalOutline" />
          <span>Console</span>
        </n-space>
        <n-button text size="tiny" @click="$emit('clear')">
          <template #icon><n-icon :component="TrashOutline" /></template>
          清空
        </n-button>
      </div>
      <n-scrollbar style="max-height: 150px" ref="scrollRef">
        <div class="console-logs">
          <div 
            v-for="(log, i) in logs" 
            :key="i" 
            class="console-log"
            :class="log.type"
          >
            <n-tag size="tiny" :type="logType[log.type]">{{ log.type }}</n-tag>
            <span class="log-content">{{ log.content }}</span>
          </div>
          <n-empty v-if="!logs.length" size="small" description="暂无输出" />
        </div>
      </n-scrollbar>
    </div>
  </n-collapse-transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { NCollapseTransition, NButton, NTag, NEmpty, NScrollbar, NSpace, NIcon } from 'naive-ui'
import { TerminalOutline, TrashOutline } from '@vicons/ionicons5'

const props = defineProps({
  logs: { type: Array, default: () => [] },
  show: { type: Boolean, default: true }
})

defineEmits(['clear'])

const scrollRef = ref(null)
const logType = { log: 'default', error: 'error', warn: 'warning', info: 'info' }

watch(() => props.logs.length, () => {
  nextTick(() => scrollRef.value?.scrollTo({ top: 9999 }))
})
</script>

<style scoped>
.console-panel { border-top: 1px solid var(--border-color); background: #1e1e1e; }
.console-header { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; background: #252526; color: #ccc; font-size: 0.85rem; }
.console-logs { padding: 0.5rem; font-family: Monaco, Consolas, monospace; font-size: 0.85rem; }
.console-log { padding: 0.35rem 0.5rem; border-bottom: 1px solid #333; display: flex; align-items: flex-start; gap: 0.75rem; }
.console-log.log { color: #d4d4d4; }
.console-log.error { color: #f44336; background: rgba(244, 67, 54, 0.1); }
.console-log.warn { color: #ff9800; background: rgba(255, 152, 0, 0.1); }
.console-log.info { color: #2196f3; }
.log-content { flex: 1; word-break: break-all; white-space: pre-wrap; }
.console-logs :deep(.n-empty) { padding: 1rem; }
</style>
