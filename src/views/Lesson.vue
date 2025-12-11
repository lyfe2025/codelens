<template>
  <div class="lesson-page" v-if="lesson">
    <!-- 移动端标签切换 -->
    <div class="mobile-tabs" v-if="isMobile">
      <n-button 
        v-for="tab in mobileTabConfig" 
        :key="tab.key"
        :type="mobileView === tab.key ? 'primary' : 'default'"
        size="small"
        @click="setMobileView(tab.key)"
      >
        <template #icon><n-icon :component="tab.icon" /></template>
        {{ tab.label }}
      </n-button>
    </div>

    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ hidden: isMobile && mobileView !== 'theory' }">
      <n-button text @click="$router.push(`/?module=${module}`)" class="back-link">
        <template #icon><n-icon :component="ArrowBackOutline" /></template>
        返回目录
      </n-button>
      
      <ChallengeTimer ref="challengeTimerRef" :isChallenge="isChallenge" :isRunning="true" :code="code" />
      
      <h2>{{ lesson.title }}</h2>
      <div class="theory" v-html="lesson.theory"></div>
      
      <n-card v-if="lesson.task" class="task-card" :bordered="false">
        <template #header>
          <n-space align="center" :size="8">
            <n-icon :component="CreateOutline" />
            <span>练习任务</span>
          </n-space>
        </template>
        <p>{{ lesson.task }}</p>
      </n-card>

      <HintPanel :hints="lesson.hints" :currentIndex="currentHintIndex" @showNext="showNextHint(lesson.hints)" />

      <n-space class="actions">
        <n-button @click="handleReset" title="Cmd+R">
          <template #icon><n-icon :component="RefreshOutline" /></template>
          重置
        </n-button>
        <n-button type="success" @click="handleRun" title="Cmd+Enter">
          <template #icon><n-icon :component="PlayOutline" /></template>
          运行
        </n-button>
        <n-button v-if="lesson.check" type="primary" @click="handleCheck">
          <template #icon><n-icon :component="CheckmarkOutline" /></template>
          验证
        </n-button>
      </n-space>

      <SolutionPanel :solution="lesson.solution" :show="showSolution" @toggle="toggleSolution" />

      <n-button v-if="lesson.solution" block dashed type="info" @click="showDiffModal = true" class="action-btn">
        <template #icon><n-icon :component="GitCompareOutline" /></template>
        对比代码
      </n-button>

      <n-button block dashed @click="showShareModal = true" class="action-btn">
        <template #icon><n-icon :component="ShareSocialOutline" /></template>
        分享代码
      </n-button>

      <NotePanel :lessonKey="`${module}-${lessonId}`" />

      <n-alert v-if="checkResult" :type="checkResult.success ? 'success' : 'error'" class="result-alert">
        <template #icon>
          <n-icon :component="checkResult.success ? CheckmarkCircleOutline : CloseCircleOutline" />
        </template>
        {{ checkResult.success ? '正确！做得好！' : (checkResult.message || '还不对，再试试') }}
      </n-alert>

      <n-space class="nav-btns">
        <n-button v-if="prevLesson" @click="$router.push(prevLesson)">
          <template #icon><n-icon :component="ChevronBackOutline" /></template>
          上一课
        </n-button>
        <n-button v-if="nextLesson" type="primary" @click="$router.push(nextLesson)">
          下一课
          <template #icon><n-icon :component="ChevronForwardOutline" /></template>
        </n-button>
      </n-space>

      <n-space class="shortcuts-hint" v-if="!isMobile">
        <n-tag size="tiny" :bordered="false">⌘+Enter 运行</n-tag>
        <n-tag size="tiny" :bordered="false">⌘+S 保存</n-tag>
        <n-tag size="tiny" :bordered="false">⌘+R 重置</n-tag>
      </n-space>
    </aside>

    <!-- 代码编辑器 -->
    <div class="editor-area" :class="{ hidden: isMobile && mobileView !== 'code' }">
      <div class="tabs">
        <n-button 
          v-for="tab in availableTabs" 
          :key="tab"
          size="small"
          :type="activeTab === tab ? 'primary' : 'default'"
          @click="handleTabSwitch(tab)"
        >
          {{ tab.toUpperCase() }}
        </n-button>
        <n-tag v-if="autoSaved" size="small" type="success" class="auto-save">
          <template #icon><n-icon :component="CheckmarkOutline" /></template>
          已保存
        </n-tag>
      </div>
      <div class="code-editor" ref="editorContainer"></div>
    </div>

    <!-- 预览区域 -->
    <div class="preview-area" :class="{ hidden: isMobile && mobileView !== 'preview' }">
      <div class="preview-header">
        <span>预览</span>
        <n-button size="small" type="primary" @click="showConsole = !showConsole">
          <template #icon><n-icon :component="TerminalOutline" /></template>
          Console ({{ consoleLogs.length }})
        </n-button>
      </div>
      <iframe ref="previewFrame" sandbox="allow-scripts allow-modals"></iframe>
      <ConsolePanel :logs="consoleLogs" :show="showConsole" @clear="clearConsole" />
    </div>

    <CodeDiffModal v-model:show="showDiffModal" :userCode="code" :solutionCode="lesson?.solution" />
    <ShareModal v-model:show="showShareModal" :code="code" :module="module" :lessonId="lessonId" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { NButton, NCard, NSpace, NTag, NAlert, NIcon } from 'naive-ui'
import { 
  ArrowBackOutline, PlayOutline, RefreshOutline, CheckmarkOutline, CheckmarkCircleOutline,
  CloseCircleOutline, ChevronBackOutline, ChevronForwardOutline, ShareSocialOutline,
  GitCompareOutline, TerminalOutline, CreateOutline, BookOutline, CodeSlashOutline, EyeOutline
} from '@vicons/ionicons5'
import { lessons } from '../data/lessons/index'
import { useCodeEditor } from '../composables/useCodeEditor'
import { useConsole } from '../composables/useConsole'
import { useLessonCheck } from '../composables/useLessonCheck'
import { useResponsive } from '../composables/useResponsive'
import { useProgress } from '../composables/useProgress'
import { useErrorHighlight } from '../composables/useErrorHighlight'
import { runInIframe } from '../utils/codeRunner'
import ConsolePanel from '../components/ConsolePanel.vue'
import HintPanel from '../components/HintPanel.vue'
import SolutionPanel from '../components/SolutionPanel.vue'
import CodeDiffModal from '../components/CodeDiffModal.vue'
import NotePanel from '../components/NotePanel.vue'
import ChallengeTimer from '../components/ChallengeTimer.vue'
import ShareModal from '../components/ShareModal.vue'
import { useAchievements } from '../composables/useAchievements'

const route = useRoute()
const showDiffModal = ref(false)
const challengeTimerRef = ref(null)
const previewFrame = ref(null)

const mobileTabConfig = [
  { key: 'theory', label: '理论', icon: BookOutline },
  { key: 'code', label: '代码', icon: CodeSlashOutline },
  { key: 'preview', label: '预览', icon: EyeOutline }
]

const module = computed(() => route.params.module)
const lessonId = computed(() => parseInt(route.params.id))
const lesson = computed(() => lessons[module.value]?.[lessonId.value])
const prevLesson = computed(() => lessonId.value > 0 ? `/lesson/${module.value}/${lessonId.value - 1}` : null)
const nextLesson = computed(() => lessonId.value < lessons[module.value]?.length - 1 ? `/lesson/${module.value}/${lessonId.value + 1}` : null)

const availableTabs = computed(() => {
  if (!lesson.value) return ['html']
  const tabs = ['html']
  if (lesson.value.css !== undefined) tabs.push('css')
  if (lesson.value.js !== undefined) tabs.push('js')
  return tabs
})

const { editorContainer, activeTab, code, autoSaved, initEditor, onContentChange, addCommand, getMonaco, switchTab, setCode, dispose, loadSavedCode, clearSavedCode, autoSave } = useCodeEditor()
const { consoleLogs, showConsole, clearConsole, getConsoleInterceptScript, startListening, stopListening } = useConsole()
const { checkResult, showSolution, currentHintIndex, resetCheckState, showNextHint, toggleSolution, checkAnswer } = useLessonCheck()
const { isMobile, mobileView, setMobileView } = useResponsive()
const { markCompleted } = useProgress()
const { highlightFromError, clearHighlights, injectStyles, setEditor: setErrorEditor } = useErrorHighlight()
const { incrementRunCount, checkStudyTime } = useAchievements()

const showShareModal = ref(false)
const isChallenge = computed(() => lesson.value?.type === 'challenge')

const handleRun = () => {
  clearConsole()
  clearHighlights()
  runInIframe(previewFrame.value, code.value, getConsoleInterceptScript())
  incrementRunCount()
  checkStudyTime()
}

watch(consoleLogs, (logs) => {
  const errorLog = logs.find(log => log.type === 'error')
  if (errorLog) highlightFromError(errorLog.content)
}, { deep: true })

const handleReset = () => {
  clearSavedCode(module.value, lessonId.value)
  setCode({ html: lesson.value.html || '', css: lesson.value.css || '', js: lesson.value.js || '' })
  resetCheckState()
  clearConsole()
  nextTick(() => handleRun())
}

const handleCheck = () => {
  checkAnswer(lesson.value, code.value, () => markCompleted(module.value, lessonId.value))
}

const handleTabSwitch = (tab) => switchTab(tab)

const loadLesson = async () => {
  if (!lesson.value) return
  const saved = loadSavedCode(module.value, lessonId.value)
  if (saved) setCode(saved)
  else setCode({ html: lesson.value.html || '', css: lesson.value.css || '', js: lesson.value.js || '' })
  resetCheckState()
  clearConsole()
  await switchTab('html')
  nextTick(() => handleRun())
}

const handleKeydown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'r') { e.preventDefault(); handleReset() }
}

watch(() => route.params, () => loadLesson(), { immediate: false })

onMounted(async () => {
  injectStyles()
  startListening()
  window.addEventListener('keydown', handleKeydown)
  const editor = await initEditor(isMobile.value)
  const monaco = getMonaco()
  if (editor && monaco) setErrorEditor(editor, monaco)
  onContentChange(() => { autoSave(module.value, lessonId.value); clearHighlights() })
  if (monaco) {
    addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, handleRun)
    addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => { autoSave(module.value, lessonId.value); handleRun() })
  }
  loadLesson()
})

onUnmounted(() => {
  stopListening()
  window.removeEventListener('keydown', handleKeydown)
  dispose()
})
</script>

<style scoped>
.lesson-page { display: grid; grid-template-columns: 350px 1fr 1fr; height: calc(100vh - 60px); }

@media (max-width: 768px) {
  .lesson-page { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
  .mobile-tabs { display: flex; background: var(--bg-secondary); padding: 0.5rem; gap: 0.5rem; position: sticky; top: 0; z-index: 100; }
  .mobile-tabs :deep(.n-button) { flex: 1; }
  .hidden { display: none !important; }
  .sidebar, .editor-area, .preview-area { height: calc(100vh - 120px); }
  .shortcuts-hint { display: none; }
}

@media (min-width: 769px) { .mobile-tabs { display: none; } }

.sidebar { background: var(--bg-secondary); padding: 1.5rem; overflow-y: auto; border-right: 1px solid var(--border-color); }
.back-link { margin-bottom: 1rem; }
.sidebar h2 { margin-bottom: 1rem; font-size: 1.3rem; }
.theory { color: var(--text-secondary); line-height: 1.8; }
.theory :deep(code) { background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; }
.theory :deep(ul) { padding-left: 1.5rem; margin: 0.5rem 0; }
.task-card { background: rgba(255, 193, 7, 0.1); margin: 1.5rem 0; }
.task-card p { color: var(--text-secondary); font-size: 0.95rem; margin: 0; }
.actions { margin: 1rem 0; }
.action-btn { margin-bottom: 0.75rem; }
.result-alert { margin: 1rem 0; }
.nav-btns { margin-top: 1.5rem; }
.shortcuts-hint { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color); }
.editor-area { display: flex; flex-direction: column; background: #1e1e1e; }
.tabs { display: flex; background: #252526; padding: 0.5rem; gap: 0.25rem; align-items: center; }
.auto-save { margin-left: auto; }
.code-editor { flex: 1; }
.preview-area { display: flex; flex-direction: column; background: var(--bg-secondary); }
.preview-header { padding: 0.75rem 1rem; background: var(--bg-tertiary); border-bottom: 1px solid var(--border-color); font-weight: 500; color: var(--text-secondary); display: flex; justify-content: space-between; align-items: center; }
.preview-area iframe { flex: 1; border: none; background: white; }
</style>
