<template>
  <div class="hints" v-if="hints && hints.length">
    <n-button 
      v-if="currentIndex < hints.length"
      block 
      dashed
      type="info"
      @click="$emit('showNext')"
    >
      <template #icon><n-icon :component="BulbOutline" /></template>
      查看提示 ({{ currentIndex }}/{{ hints.length }})
    </n-button>
    
    <n-collapse-transition :show="currentIndex > 0">
      <n-space vertical size="small" class="hint-list">
        <n-card 
          v-for="(hint, i) in hints.slice(0, currentIndex)" 
          :key="i"
          size="small"
          :bordered="false"
          class="hint-item"
        >
          <n-tag type="info" size="small">提示 {{ i + 1 }}</n-tag>
          <span class="hint-text">{{ hint }}</span>
        </n-card>
      </n-space>
    </n-collapse-transition>
  </div>
</template>

<script setup>
import { NButton, NCard, NTag, NSpace, NCollapseTransition, NIcon } from 'naive-ui'
import { BulbOutline } from '@vicons/ionicons5'

defineProps({
  hints: { type: Array, default: () => [] },
  currentIndex: { type: Number, default: 0 }
})

defineEmits(['showNext'])
</script>

<style scoped>
.hints { margin: 1rem 0; }
.hint-list { margin-top: 0.75rem; }
.hint-item { background: var(--bg-tertiary); }
.hint-item :deep(.n-card__content) { display: flex; align-items: flex-start; gap: 0.5rem; }
.hint-text { flex: 1; font-size: 0.9rem; line-height: 1.5; }
</style>
