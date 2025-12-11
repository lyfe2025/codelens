<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <div class="app" :class="{ dark: isDark }">
          <header class="header">
            <router-link to="/" class="logo">
              <n-icon :component="SchoolOutline" size="24" />
              <span>CodeLens</span>
            </router-link>
            <nav class="nav">
              <router-link to="/?module=html">HTML</router-link>
              <router-link to="/?module=css">CSS</router-link>
              <router-link to="/?module=js">JS</router-link>
              <router-link to="/?module=nodejs">Node</router-link>
              <router-link to="/?module=ajax">Ajax</router-link>
              <router-link to="/?module=vue">Vue</router-link>
            </nav>
            <div class="header-actions">
              <n-button quaternary @click="openSearch" class="search-btn-naive">
                <template #icon>
                  <n-icon :component="SearchOutline" />
                </template>
                速查 <n-tag size="tiny" :bordered="false">⌘K</n-tag>
              </n-button>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button quaternary circle @click="toggleTheme">
                    <template #icon>
                      <n-icon :component="isDark ? SunnyOutline : MoonOutline" />
                    </template>
                  </n-button>
                </template>
                {{ isDark ? '切换浅色' : '切换深色' }}
              </n-tooltip>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button quaternary circle @click="showSettings = true">
                    <template #icon>
                      <n-icon :component="SettingsOutline" />
                    </template>
                  </n-button>
                </template>
                设置
              </n-tooltip>
            </div>
          </header>
          <main class="main">
            <router-view />
          </main>
          
          <QuickSearch ref="quickSearchRef" />
          <NotesSidebar />
          <AchievementToast 
            :achievement="newAchievement"
            @close="clearNewAchievement"
          />
          <SettingsPanel 
            :show="showSettings"
            @close="showSettings = false"
          />
        </div>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NConfigProvider, NMessageProvider, NDialogProvider, NButton, NTooltip, NTag, NIcon } from 'naive-ui'
import { SearchOutline, SettingsOutline, SunnyOutline, MoonOutline, SchoolOutline } from '@vicons/ionicons5'
import QuickSearch from './components/QuickSearch.vue'
import NotesSidebar from './components/NotesSidebar.vue'
import AchievementToast from './components/AchievementToast.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import { useTheme } from './composables/useTheme'
import { useNaiveTheme } from './plugins/theme'
import { useAchievements } from './composables/useAchievements'
import { setProgressChangeCallback } from './composables/useProgress'
import { setStatsChangeCallback } from './composables/useStudyStats'

const quickSearchRef = ref(null)
const showSettings = ref(false)

const { isDark, toggleTheme, primaryColor, primaryHover } = useTheme()
const { theme, themeOverrides } = useNaiveTheme(isDark, primaryColor, primaryHover)
const { newAchievement, clearNewAchievement, refreshStats, init: initAchievements } = useAchievements()

const openSearch = () => {
  quickSearchRef.value?.open()
}

onMounted(() => {
  // 连接成就系统回调
  setProgressChangeCallback(refreshStats)
  setStatsChangeCallback(refreshStats)
  
  initAchievements()
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--primary-color, #3b82f6);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav a:hover, .nav a.router-link-active {
  background: rgba(255,255,255,0.2);
  color: white;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-actions :deep(.n-button) {
  color: white;
}

.header-actions :deep(.n-button:hover) {
  background: rgba(255,255,255,0.15);
}

.search-btn-naive {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-btn-naive :deep(.n-tag) {
  background: rgba(255,255,255,0.2);
  color: white;
}

.main {
  flex: 1;
  background: var(--bg-primary);
}

@media (max-width: 768px) {
  .header {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .logo span {
    display: none;
  }
  .nav {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
  }
  .nav a {
    padding: 0.35rem 0.6rem;
    font-size: 0.85rem;
  }
}
</style>
