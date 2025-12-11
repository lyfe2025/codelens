<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    :style="{ width: '1000px', maxWidth: '95vw' }"
    :bordered="false"
  >
    <template #header>
      <n-space align="center">
        <n-icon :component="GitCompareOutline" size="20" />
        <span>代码对比</span>
        <n-space size="small">
          <n-button 
            v-for="tab in availableTabs" 
            :key="tab"
            size="small"
            :type="activeTab === tab ? 'primary' : 'default'"
            @click="activeTab = tab"
          >
            {{ tab.toUpperCase() }}
          </n-button>
        </n-space>
      </n-space>
    </template>

    <div class="diff-content">
      <n-card class="diff-pane" size="small" :bordered="false">
        <template #header>
          <n-space align="center" :size="8">
            <n-icon :component="PersonOutline" />
            <span class="pane-title">你的代码</span>
          </n-space>
        </template>
        <n-scrollbar style="max-height: 400px">
          <pre class="code-block">{{ userCode[activeTab] || '(空)' }}</pre>
        </n-scrollbar>
      </n-card>
      
      <n-card class="diff-pane solution" size="small" :bordered="false">
        <template #header>
          <n-space align="center" :size="8">
            <n-icon :component="CheckmarkCircleOutline" />
            <span class="pane-title">参考答案</span>
          </n-space>
        </template>
        <n-scrollbar style="max-height: 400px">
          <pre class="code-block">{{ solutionCode?.[activeTab] || '(无参考答案)' }}</pre>
        </n-scrollbar>
      </n-card>
    </div>

    <template #footer>
      <n-tag :bordered="false">
        <template #icon><n-icon :component="BulbOutline" /></template>
        对比你的代码和参考答案，找出差异
      </n-tag>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { NModal, NCard, NSpace, NButton, NTag, NScrollbar, NIcon } from 'naive-ui'
import { GitCompareOutline, PersonOutline, CheckmarkCircleOutline, BulbOutline } from '@vicons/ionicons5'

const props = defineProps({
  show: Boolean,
  userCode: { type: Object, default: () => ({ html: '', css: '', js: '' }) },
  solutionCode: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['close', 'update:show'])

const visible = computed({
  get: () => props.show,
  set: (val) => { emit('update:show', val); if (!val) emit('close') }
})

const activeTab = ref('html')

const availableTabs = computed(() => {
  const tabs = []
  if (props.userCode.html || props.solutionCode?.html) tabs.push('html')
  if (props.userCode.css || props.solutionCode?.css) tabs.push('css')
  if (props.userCode.js || props.solutionCode?.js) tabs.push('js')
  return tabs.length ? tabs : ['html']
})

watch(() => props.show, (val) => {
  if (val && availableTabs.value.length) activeTab.value = availableTabs.value[0]
})
</script>

<style scoped>
.diff-content { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.diff-pane { background: var(--bg-tertiary); }
.diff-pane.solution { background: rgba(76, 175, 80, 0.1); }
.pane-title { font-weight: 500; font-size: 0.9rem; }
.code-block { margin: 0; font-family: Monaco, Consolas, monospace; font-size: 0.85rem; line-height: 1.5; white-space: pre-wrap; word-break: break-all; }

@media (max-width: 768px) { .diff-content { grid-template-columns: 1fr; } }
</style>
