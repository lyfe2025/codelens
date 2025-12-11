<template>
  <div class="home">
    <!-- 首页主视图 -->
    <template v-if="!currentModule">
      <!-- 顶部欢迎区 -->
      <div class="welcome-section">
        <div class="welcome-content">
          <div class="welcome-text">
            <h1>AI 写代码，你来掌控</h1>
            <p>核心模块不能只靠 AI，逐行理解代码逻辑，关键时刻自己能改</p>
            <n-button size="large" class="start-btn" @click="scrollToModules">
              <template #icon><n-icon :component="PlayOutline" /></template>
              开始学习
            </n-button>
          </div>
          <div class="welcome-stats">
            <div class="stat-item">
              <n-icon :component="TrophyOutline" size="24" />
              <div class="stat-info">
                <span class="stat-value">{{ completedCount }}/{{ totalCount }}</span>
                <span class="stat-label">已完成课程</span>
              </div>
            </div>
            <div class="stat-item">
              <n-icon :component="FlameOutline" size="24" />
              <div class="stat-info">
                <span class="stat-value">{{ streakDays }}</span>
                <span class="stat-label">连续学习天数</span>
              </div>
            </div>
            <div class="stat-item">
              <n-icon :component="TimeOutline" size="24" />
              <div class="stat-info">
                <span class="stat-value">{{ todayMinutes }}</span>
                <span class="stat-label">今日学习(分钟)</span>
              </div>
            </div>
            <n-progress 
              type="line" 
              :percentage="totalProgress" 
              :height="8" 
              :border-radius="4"
              :indicator-placement="'inside'"
              class="total-progress"
            />
          </div>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 左侧：模块列表（按分类） -->
        <div class="modules-section" ref="modulesRef">
          <div v-for="(category, categoryId) in moduleCategories" :key="categoryId" class="category-section">
            <div class="section-header">
              <h2><n-icon :component="categoryIcons[categoryId]" /> {{ category.name }}</h2>
              <n-tag size="small" :bordered="false">{{ getModulesByCategory(categoryId).length }} 个模块</n-tag>
            </div>
            <div class="modules-grid">
              <n-card 
                v-for="mod in getModulesByCategory(categoryId)" 
                :key="mod.id" 
                class="module-card"
                :class="{ 'coming-soon': mod.comingSoon }"
                hoverable
                @click="!mod.comingSoon && selectModule(mod.id)"
              >
                <div class="module-icon" :style="{ background: moduleColors[mod.id] || '#999' }">
                  <n-icon :component="moduleIcons[mod.id] || RocketOutline" size="32" color="#fff" />
                </div>
                <div class="module-info">
                  <h3>
                    {{ mod.name }}
                    <n-tag v-if="mod.comingSoon" size="tiny" type="warning" round>即将上线</n-tag>
                  </h3>
                  <p>{{ mod.desc }}</p>
                  <template v-if="!mod.comingSoon">
                    <div class="module-meta">
                      <n-tag size="tiny" :bordered="false">{{ mod.lessons.length }} 课时</n-tag>
                      <span class="progress-text">{{ getModuleProgress(mod.id) }}%</span>
                    </div>
                    <n-progress 
                      type="line" 
                      :percentage="getModuleProgress(mod.id)" 
                      :show-indicator="false" 
                      :height="4" 
                      :border-radius="2"
                    />
                  </template>
                </div>
              </n-card>
            </div>
          </div>
        </div>

        <!-- 右侧：收藏和成就 -->
        <div class="sidebar-section">
          <!-- 复习提醒 -->
          <ReviewReminder />

          <!-- 快捷操作 -->
          <n-card class="quick-actions" :bordered="false">
            <div class="action-item" @click="openSearch">
              <n-icon :component="SearchOutline" size="20" />
              <span>快速搜索</span>
              <n-tag size="tiny" :bordered="false">⌘K</n-tag>
            </div>
          </n-card>

          <!-- 收藏列表 -->
          <n-card class="sidebar-card" :bordered="false" v-if="favorites.length > 0">
            <template #header>
              <div class="card-header">
                <n-icon :component="StarOutline" />
                <span>我的收藏</span>
                <n-tag size="tiny" round>{{ favorites.length }}</n-tag>
              </div>
            </template>
            <div class="favorites-list">
              <div 
                v-for="fav in favorites.slice(0, 5)" 
                :key="fav.path" 
                class="favorite-item"
                @click="$router.push(fav.path)"
              >
                <n-icon :component="moduleIcons[fav.module]" size="16" />
                <span class="fav-title">{{ fav.title }}</span>
                <n-button quaternary circle size="tiny" @click.stop="removeFavorite(fav.path)">
                  <template #icon><n-icon :component="CloseOutline" size="14" /></template>
                </n-button>
              </div>
              <n-button v-if="favorites.length > 5" text size="small" class="view-all">
                查看全部 {{ favorites.length }} 个收藏
              </n-button>
            </div>
          </n-card>

          <!-- 成就预览 -->
          <n-card class="sidebar-card achievements-preview" :bordered="false">
            <template #header>
              <div class="card-header">
                <n-icon :component="RibbonOutline" />
                <span>成就</span>
                <n-tag size="tiny" round type="success">{{ unlockedCount }}/{{ totalAchievements }}</n-tag>
              </div>
            </template>
            <div class="achievements-grid">
              <n-tooltip v-for="a in recentAchievements" :key="a.id" trigger="hover">
                <template #trigger>
                  <div class="achievement-icon" :class="{ unlocked: a.unlocked, locked: !a.unlocked }">
                    <n-icon :component="a.icon" size="20" />
                  </div>
                </template>
                <div>
                  <strong>{{ a.unlocked ? a.name : '???' }}</strong>
                  <p style="margin: 0; font-size: 12px;">{{ a.desc }}</p>
                </div>
              </n-tooltip>
            </div>
            <n-button text size="small" class="view-all" @click="showAchievements = true">
              查看全部成就
            </n-button>
          </n-card>
        </div>
      </div>
    </template>

    <!-- 课程列表视图 -->
    <template v-else>
      <div class="lessons-view">
        <div class="lessons-header">
          <n-button text @click="currentModule = null" class="back-btn">
            <template #icon><n-icon :component="ArrowBackOutline" /></template>
            返回
          </n-button>
          <div class="module-title">
            <div class="module-icon-sm" :style="{ background: moduleColors[currentModule] }">
              <n-icon :component="moduleIcons[currentModule]" size="24" color="#fff" />
            </div>
            <div>
              <h2>{{ currentModuleData.name }}</h2>
              <p>{{ currentModuleData.desc }}</p>
            </div>
          </div>
          <div class="module-progress-bar">
            <n-progress 
              type="line" 
              :percentage="getModuleProgress(currentModule)" 
              :height="8" 
              :border-radius="4"
            />
            <span>{{ getModuleCompletedCount(currentModule) }}/{{ currentModuleData.lessons.length }} 已完成</span>
          </div>
        </div>

        <div class="lesson-list">
          <n-card 
            v-for="(lesson, idx) in currentModuleData.lessons" 
            :key="idx"
            class="lesson-item"
            hoverable
            :bordered="false"
            @click="$router.push(`/lesson/${currentModule}/${idx}`)"
          >
            <div class="lesson-content">
              <div class="lesson-num" :class="{ completed: isCompleted(currentModule, idx) }">
                <n-icon v-if="isCompleted(currentModule, idx)" :component="CheckmarkOutline" size="18" />
                <span v-else>{{ idx + 1 }}</span>
              </div>
              <div class="lesson-info">
                <h3>{{ lesson.title }}</h3>
                <p>{{ lesson.desc }}</p>
                <n-tag v-if="lesson.difficulty" size="tiny" :type="difficultyType[lesson.difficulty]" round>
                  {{ difficultyText[lesson.difficulty] }}
                </n-tag>
              </div>
              <div class="lesson-actions">
                <n-button 
                  quaternary circle
                  :type="isFavorite(`/lesson/${currentModule}/${idx}`) ? 'warning' : 'default'"
                  @click.stop="toggleFavorite(currentModule, idx, lesson.title)"
                >
                  <template #icon>
                    <n-icon :component="isFavorite(`/lesson/${currentModule}/${idx}`) ? Star : StarOutline" />
                  </template>
                </n-button>
                <n-icon :component="ChevronForwardOutline" size="20" color="var(--text-muted)" />
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </template>

    <!-- 成就弹窗 -->
    <n-modal v-model:show="showAchievements" preset="card" title="全部成就" style="max-width: 600px;">
      <AchievementsPanel :inline="true" />
    </n-modal>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NCard, NProgress, NTag, NButton, NIcon, NTooltip, NModal } from 'naive-ui'
import { 
  RocketOutline, ArrowBackOutline, StarOutline, Star, PlayOutline,
  CheckmarkOutline, LogoHtml5, LogoCss3, LogoJavascript, ChevronForwardOutline,
  LogoNodejs, CloudOutline, LogoVue, TrophyOutline, FlameOutline, TimeOutline,
  GridOutline, SearchOutline, CloseOutline, RibbonOutline,
  CodeSlashOutline, TerminalOutline, PhonePortraitOutline,
  GlobeOutline, ServerOutline, DesktopOutline
} from '@vicons/ionicons5'
import { lessons } from '../data/lessons/index'
import { useProgress } from '../composables/useProgress'
import { useStudyStats } from '../composables/useStudyStats'
import { useAchievements } from '../composables/useAchievements'
import { MODULE_CONFIG, MODULE_CATEGORIES, DIFFICULTY_TEXT } from '../utils/constants'
import AchievementsPanel from '../components/AchievementsPanel.vue'
import ReviewReminder from '../components/ReviewReminder.vue'

const route = useRoute()
const currentModule = ref(null)
const showAchievements = ref(false)
const modulesRef = ref(null)

const moduleIcons = {
  html: LogoHtml5,
  css: LogoCss3,
  js: LogoJavascript,
  nodejs: LogoNodejs,
  ajax: CloudOutline,
  vue: LogoVue,
  advanced: RocketOutline,
  typescript: CodeSlashOutline,
  golang: CodeSlashOutline,
  linux: TerminalOutline,
  mobile: PhonePortraitOutline
}

const moduleColors = {
  html: '#e34c26',
  css: '#264de4',
  js: '#f7df1e',
  nodejs: '#339933',
  ajax: '#6366f1',
  vue: '#42b883',
  advanced: '#8b5cf6',
  typescript: '#3178c6',
  golang: '#00add8',
  linux: '#fcc624',
  mobile: '#61dafb'
}

const moduleCategories = MODULE_CATEGORIES

const categoryIcons = {
  frontend: GlobeOutline,
  backend: ServerOutline,
  devops: DesktopOutline,
  mobile: PhonePortraitOutline
}

const getModulesByCategory = (categoryId) => {
  return modules.filter(mod => mod.category === categoryId)
}

const { 
  favorites, loadProgress, isCompleted, getModuleProgress, getModuleCompletedCount,
  getTotalCount, getCompletedCount, getTotalProgress, isFavorite, toggleFavorite, removeFavorite
} = useProgress()

const { streakDays, todayMinutes } = useStudyStats()
const { achievements } = useAchievements()

const difficultyText = DIFFICULTY_TEXT
const difficultyType = { easy: 'success', medium: 'warning', hard: 'error' }

const modules = MODULE_CONFIG.map(mod => ({ ...mod, lessons: lessons[mod.id] || [] }))
const currentModuleData = computed(() => modules.find(m => m.id === currentModule.value))
const totalCount = computed(() => getTotalCount())
const completedCount = computed(() => getCompletedCount())
const totalProgress = computed(() => getTotalProgress())

// 成就相关
const unlockedCount = computed(() => achievements.value.filter(a => a.unlocked).length)
const totalAchievements = computed(() => achievements.value.length)
// 优先显示已点亮的成就
const recentAchievements = computed(() => {
  const unlocked = achievements.value.filter(a => a.unlocked)
  const locked = achievements.value.filter(a => !a.unlocked)
  return [...unlocked, ...locked].slice(0, 8)
})

const selectModule = (id) => { currentModule.value = id }

const scrollToModules = () => {
  modulesRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const openSearch = () => {
  // 触发全局搜索
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
}

onMounted(() => {
  loadProgress()
  if (route.query.module) currentModule.value = route.query.module
})

watch(() => route.query.module, (val) => { if (val) currentModule.value = val })
</script>


<style scoped>
.home {
  min-height: calc(100vh - 60px);
}

/* 欢迎区域 */
.welcome-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, color-mix(in srgb, var(--primary-color) 80%, #000) 100%);
  padding: 3rem 2rem;
  color: white;
}

.welcome-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
}

.welcome-text h1 {
  font-size: 1.75rem;
  margin: 0 0 0.75rem;
  font-weight: 700;
  line-height: 1.3;
}

.welcome-text p {
  opacity: 0.9;
  margin: 0 0 1.5rem;
  font-size: 1.1rem;
}

.start-btn {
  background: rgba(255,255,255,0.95) !important;
  color: var(--primary-color) !important;
  border: none !important;
  font-weight: 600;
}

.start-btn:hover {
  background: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.welcome-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  min-width: 400px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.8;
}

.total-progress {
  grid-column: 1 / -1;
}

.total-progress :deep(.n-progress-graph-line-fill) {
  background: rgba(255,255,255,0.9) !important;
}

.total-progress :deep(.n-progress-graph-line-rail) {
  background: rgba(255,255,255,0.2) !important;
}

/* 主内容区 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 分类区块 */
.category-section {
  margin-bottom: 2rem;
}

.category-section:last-child {
  margin-bottom: 0;
}

/* 模块网格 */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.module-card {
  cursor: pointer;
  transition: all 0.3s;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.module-card.coming-soon {
  opacity: 0.7;
  cursor: default;
}

.module-card.coming-soon:hover {
  transform: none;
  box-shadow: none;
}

.module-card :deep(.n-card__content) {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
}

.module-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.module-info {
  flex: 1;
  min-width: 0;
}

.module-info h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.module-info p {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.module-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.progress-text {
  font-size: 0.75rem;
  color: var(--primary-color);
  font-weight: 600;
}

/* 侧边栏 */
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quick-actions {
  background: var(--bg-secondary);
}

.action-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
}

.action-item:hover {
  background: var(--bg-primary);
}

.action-item span {
  flex: 1;
}

.sidebar-card {
  background: var(--bg-secondary);
}

.sidebar-card :deep(.n-card-header) {
  padding: 1rem 1rem 0.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.card-header span {
  flex: 1;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.favorite-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.favorite-item:hover {
  background: var(--bg-primary);
}

.fav-title {
  flex: 1;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.view-all {
  margin-top: 0.5rem;
}

/* 成就预览 */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.achievement-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-muted);
}

.achievement-icon:hover {
  transform: scale(1.1);
}

.achievement-icon.unlocked {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--primary-color) 40%, transparent);
}

.achievement-icon.locked {
  opacity: 0.5;
}


/* 课程列表视图 */
.lessons-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.lessons-header {
  margin-bottom: 2rem;
}

.back-btn {
  margin-bottom: 1rem;
}

.module-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.module-icon-sm {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.module-title h2 {
  margin: 0;
  font-size: 1.5rem;
}

.module-title p {
  margin: 0.25rem 0 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.module-progress-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 10px;
}

.module-progress-bar :deep(.n-progress) {
  flex: 1;
}

.module-progress-bar span {
  font-size: 0.85rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.lesson-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lesson-item {
  cursor: pointer;
  transition: all 0.2s;
  background: var(--bg-secondary);
}

.lesson-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.lesson-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lesson-num {
  width: 36px;
  height: 36px;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  color: var(--text-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
  transition: all 0.2s;
}

.lesson-num.completed {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.lesson-info {
  flex: 1;
  min-width: 0;
}

.lesson-info h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.lesson-info p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.lesson-actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* 响应式 */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .sidebar-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .quick-actions {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .welcome-content {
    flex-direction: column;
    text-align: center;
  }
  
  .welcome-stats {
    min-width: auto;
    width: 100%;
  }
  
  .welcome-text h1 {
    font-size: 1.25rem;
    text-align: center;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .modules-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar-section {
    grid-template-columns: 1fr;
  }
  
  .lessons-view {
    padding: 1rem;
  }
}
</style>
