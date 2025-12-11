<template>
  <n-drawer
    v-model:show="visible"
    :width="380"
    placement="right"
  >
    <n-drawer-content closable>
      <template #header>
        <n-space align="center">
          <n-icon :component="SettingsOutline" size="20" />
          <span>设置</span>
        </n-space>
      </template>

      <n-space vertical size="large">
        <!-- 深色模式 -->
        <n-card size="small" :bordered="false">
          <div class="setting-item">
            <div class="setting-info">
              <n-space align="center" :size="8">
                <n-icon :component="MoonOutline" />
                <span class="setting-label">深色模式</span>
              </n-space>
              <span class="setting-desc">切换深色/浅色主题</span>
            </div>
            <n-switch v-model:value="isDark" @update:value="toggleTheme" />
          </div>
        </n-card>

        <!-- 主题色设置 -->
        <n-card size="small" :bordered="false">
          <template #header>
            <n-space align="center" :size="8">
              <n-icon :component="ColorPaletteOutline" />
              <span class="section-title">主题色</span>
            </n-space>
          </template>
          
          <div class="theme-presets">
            <div 
              v-for="preset in THEME_PRESETS" 
              :key="preset.id"
              class="preset-item"
              :class="{ active: currentTheme.id === preset.id && !customColor }"
              :style="{ '--preset-color': preset.color }"
              @click="setThemePreset(preset.id)"
            >
              <span class="preset-dot"></span>
              <span class="preset-name">{{ preset.name }}</span>
            </div>
          </div>

          <n-divider>或自定义</n-divider>
          <n-space align="center">
            <input 
              type="color" 
              :value="customColor || currentTheme.color"
              @input="handleColorChange"
              class="color-picker"
            />
            <n-input 
              :value="customColor || currentTheme.color"
              placeholder="#3b82f6"
              size="small"
              style="width: 100px"
              @update:value="setCustomColor"
            />
            <n-button v-if="customColor" size="small" @click="resetToPreset">
              <template #icon><n-icon :component="RefreshOutline" /></template>
              重置
            </n-button>
          </n-space>
        </n-card>

        <!-- 数据管理 -->
        <n-card size="small" :bordered="false">
          <template #header>
            <n-space align="center" :size="8">
              <n-icon :component="FolderOutline" />
              <span class="section-title">数据管理</span>
            </n-space>
          </template>
          
          <n-space vertical>
            <n-space>
              <n-button @click="handleExportJson">
                <template #icon><n-icon :component="DocumentOutline" /></template>
                导出 JSON
              </n-button>
              <n-button @click="handleExportMd">
                <template #icon><n-icon :component="DocumentTextOutline" /></template>
                导出 MD
              </n-button>
            </n-space>
            <input type="file" accept=".json" @change="handleImport" ref="fileInputRef" style="display: none" />
            <n-button type="info" block @click="fileInputRef?.click()">
              <template #icon><n-icon :component="CloudUploadOutline" /></template>
              导入数据
            </n-button>
          </n-space>
        </n-card>

        <!-- 关于 -->
        <n-card size="small" :bordered="false">
          <template #header>
            <n-space align="center" :size="8">
              <n-icon :component="InformationCircleOutline" />
              <span class="section-title">关于</span>
            </n-space>
          </template>
          <p class="about-text">编程学习平台 v1.0</p>
          <p class="about-text">一个帮助你学习编程开发的交互式平台</p>
        </n-card>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NDrawer, NDrawerContent, NCard, NSpace, NSwitch, NButton, NInput, NDivider, NIcon } from 'naive-ui'
import { SettingsOutline, MoonOutline, ColorPaletteOutline, RefreshOutline, FolderOutline, DocumentOutline, DocumentTextOutline, CloudUploadOutline, InformationCircleOutline } from '@vicons/ionicons5'
import { useTheme, THEME_PRESETS } from '../composables/useTheme'
import { useExport } from '../composables/useExport'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close', 'update:show', 'imported'])

const visible = computed({
  get: () => props.show,
  set: (val) => { emit('update:show', val); if (!val) emit('close') }
})

const { isDark, currentTheme, customColor, toggleTheme, setThemePreset, setCustomColor } = useTheme()
const { exportAsJson, exportAsMarkdown, importData } = useExport()
const fileInputRef = ref(null)

const handleColorChange = (e) => setCustomColor(e.target.value)
const resetToPreset = () => setThemePreset('blue')
const handleExportJson = () => exportAsJson()
const handleExportMd = () => exportAsMarkdown()

const handleImport = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  try {
    await importData(file)
    emit('imported')
    setTimeout(() => window.location.reload(), 1500)
  } catch (err) { console.error(err.message) }
  e.target.value = ''
}
</script>

<style scoped>
.setting-item { display: flex; justify-content: space-between; align-items: center; }
.setting-info { display: flex; flex-direction: column; gap: 0.25rem; }
.setting-label { font-weight: 500; }
.setting-desc { font-size: 0.8rem; color: var(--text-secondary); margin-left: 28px; }
.section-title { font-size: 0.95rem; font-weight: 500; }
.theme-presets { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-bottom: 1rem; }
.preset-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
.preset-item:hover { background: var(--bg-tertiary); }
.preset-item.active { border-color: var(--preset-color); background: var(--bg-tertiary); }
.preset-dot { width: 16px; height: 16px; border-radius: 50%; background: var(--preset-color); flex-shrink: 0; }
.preset-name { font-size: 0.85rem; }
.color-picker { width: 36px; height: 36px; border: none; border-radius: 8px; cursor: pointer; padding: 0; }
.color-picker::-webkit-color-swatch-wrapper { padding: 2px; }
.color-picker::-webkit-color-swatch { border-radius: 6px; border: none; }
.about-text { color: var(--text-secondary); font-size: 0.85rem; margin: 0.5rem 0; }
</style>
