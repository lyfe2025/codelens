<template>
  <Transition name="toast">
    <n-card v-if="achievement" class="achievement-toast" :bordered="false">
      <div class="toast-content">
        <div class="toast-icon-wrapper">
          <n-icon :component="achievement.icon" size="28" />
        </div>
        <div class="toast-info">
          <n-tag size="tiny" type="warning">
            <template #icon><n-icon :component="SparklesOutline" /></template>
            成就解锁！
          </n-tag>
          <div class="toast-name">{{ achievement.name }}</div>
          <div class="toast-desc">{{ achievement.desc }}</div>
        </div>
        <n-button quaternary circle size="small" @click="$emit('close')">
          <template #icon><n-icon :component="CloseOutline" /></template>
        </n-button>
      </div>
    </n-card>
  </Transition>
</template>

<script setup>
import { NCard, NTag, NButton, NIcon } from 'naive-ui'
import { CloseOutline, SparklesOutline } from '@vicons/ionicons5'

defineProps({ achievement: Object })
defineEmits(['close'])
</script>

<style scoped>
.achievement-toast { position: fixed; top: 80px; right: 20px; background: var(--primary-color); color: white; z-index: 10000; max-width: 320px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); }
.toast-content { display: flex; align-items: center; gap: 1rem; }
.toast-icon-wrapper { width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; animation: bounce 0.5s ease; }
@keyframes bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
.toast-info { flex: 1; }
.toast-info :deep(.n-tag) { background: rgba(255, 255, 255, 0.2); color: white; border: none; }
.toast-name { font-size: 1.1rem; font-weight: bold; margin: 0.25rem 0; }
.toast-desc { font-size: 0.85rem; opacity: 0.9; }
.toast-content :deep(.n-button) { color: white; }
.toast-enter-active { animation: slideIn 0.4s ease; }
.toast-leave-active { animation: slideOut 0.3s ease; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
</style>
