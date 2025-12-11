<template>
  <n-card v-if="isChallenge" class="challenge-timer" :bordered="false">
    <div class="timer-content">
      <div class="timer-display">
        <n-icon :component="TimerOutline" size="24" />
        <span class="timer-value">{{ formatTime(elapsedTime) }}</span>
      </div>
      <n-space align="center">
        <n-tag type="warning" size="small">挑战模式</n-tag>
        <n-tag v-if="codeLines > 0" :bordered="false" size="small">
          <template #icon><n-icon :component="CodeSlashOutline" /></template>
          {{ codeLines }} 行
        </n-tag>
      </n-space>
    </div>
  </n-card>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { NCard, NTag, NSpace, NIcon } from 'naive-ui'
import { TimerOutline, CodeSlashOutline } from '@vicons/ionicons5'

const props = defineProps({
  isChallenge: Boolean,
  isRunning: Boolean,
  code: { type: Object, default: () => ({ html: '', css: '', js: '' }) }
})

const elapsedTime = ref(0)
let timer = null

const codeLines = computed(() => {
  const html = (props.code.html || '').split('\n').filter(l => l.trim()).length
  const css = (props.code.css || '').split('\n').filter(l => l.trim()).length
  const js = (props.code.js || '').split('\n').filter(l => l.trim()).length
  return html + css + js
})

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const startTimer = () => { if (timer) return; timer = setInterval(() => elapsedTime.value++, 1000) }
const stopTimer = () => { if (timer) { clearInterval(timer); timer = null } }
const resetTimer = () => { stopTimer(); elapsedTime.value = 0 }

watch(() => props.isRunning, (running) => running ? startTimer() : stopTimer())
watch(() => props.isChallenge, (challenge) => { if (challenge) { resetTimer(); startTimer() } else stopTimer() })

onMounted(() => { if (props.isChallenge && props.isRunning) startTimer() })
onUnmounted(() => stopTimer())

defineExpose({ elapsedTime, codeLines, resetTimer })
</script>

<style scoped>
.challenge-timer { background: var(--primary-color); color: white; margin-bottom: 1rem; }
.timer-content { display: flex; justify-content: space-between; align-items: center; }
.timer-display { display: flex; align-items: center; gap: 0.5rem; }
.timer-value { font-size: 1.5rem; font-weight: bold; font-family: Monaco, monospace; }
.timer-content :deep(.n-tag) { background: rgba(255, 255, 255, 0.2); color: white; border: none; }
</style>
