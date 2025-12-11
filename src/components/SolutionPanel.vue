<template>
  <div class="solution-area" v-if="solution">
    <n-button 
      v-if="!show"
      block 
      dashed
      type="warning"
      @click="$emit('toggle')"
    >
      <template #icon><n-icon :component="KeyOutline" /></template>
      查看参考答案
    </n-button>
    
    <n-collapse-transition :show="show">
      <n-card size="small" :bordered="false" class="solution-content">
        <template #header>
          <n-space justify="space-between" align="center" style="width: 100%">
            <span>参考答案</span>
            <n-button text size="small" @click="$emit('toggle')">
              <template #icon><n-icon :component="ChevronUpOutline" /></template>
              收起
            </n-button>
          </n-space>
        </template>
        
        <n-space vertical>
          <div v-if="solution.html" class="solution-code">
            <n-tag size="small" type="error">HTML</n-tag>
            <n-scrollbar style="max-height: 150px">
              <pre>{{ solution.html }}</pre>
            </n-scrollbar>
          </div>
          <div v-if="solution.css" class="solution-code">
            <n-tag size="small" type="info">CSS</n-tag>
            <n-scrollbar style="max-height: 150px">
              <pre>{{ solution.css }}</pre>
            </n-scrollbar>
          </div>
          <div v-if="solution.js" class="solution-code">
            <n-tag size="small" type="warning">JS</n-tag>
            <n-scrollbar style="max-height: 150px">
              <pre>{{ solution.js }}</pre>
            </n-scrollbar>
          </div>
        </n-space>
      </n-card>
    </n-collapse-transition>
  </div>
</template>

<script setup>
import { NButton, NCard, NTag, NSpace, NCollapseTransition, NScrollbar, NIcon } from 'naive-ui'
import { KeyOutline, ChevronUpOutline } from '@vicons/ionicons5'

defineProps({
  solution: { type: Object, default: null },
  show: { type: Boolean, default: false }
})

defineEmits(['toggle'])
</script>

<style scoped>
.solution-area { margin: 1rem 0; }
.solution-content { margin-top: 0.5rem; background: var(--bg-tertiary); }
.solution-code { margin-bottom: 0.5rem; }
.solution-code pre { background: #2d2d2d; color: #f8f8f2; padding: 0.75rem; border-radius: 6px; overflow-x: auto; font-size: 0.8rem; margin: 0.5rem 0 0; font-family: Monaco, Consolas, monospace; }
</style>
