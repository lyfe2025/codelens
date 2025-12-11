<template>
  <div :class="['achievements-panel', { inline: props.inline }]">
    <n-card v-if="!props.inline" :bordered="false">
      <template #header>
        <div class="panel-header">
          <n-space align="center" :size="8">
            <n-icon :component="TrophyOutline" />
            <span>成就系统</span>
          </n-space>
          <n-tag type="primary" round>
            {{ unlockedAchievements.length }} / {{ achievements.length }}
          </n-tag>
        </div>
      </template>
      <div class="achievements-grid">
        <div 
          v-for="achievement in achievements" 
          :key="achievement.id"
          class="achievement-card"
          :class="{ unlocked: achievement.unlocked, locked: !achievement.unlocked }"
        >
          <div class="achievement-icon-wrapper" :class="{ unlocked: achievement.unlocked }">
            <n-icon :component="achievement.icon" size="24" />
          </div>
          <div class="achievement-info">
            <div class="achievement-name">{{ achievement.unlocked ? achievement.name : '???' }}</div>
            <div class="achievement-desc">{{ achievement.desc }}</div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- inline 模式 -->
    <div v-else class="achievements-grid">
      <div 
        v-for="achievement in achievements" 
        :key="achievement.id"
        class="achievement-card"
        :class="{ unlocked: achievement.unlocked, locked: !achievement.unlocked }"
      >
        <div class="achievement-icon-wrapper" :class="{ unlocked: achievement.unlocked }">
          <n-icon :component="achievement.icon" size="24" />
        </div>
        <div class="achievement-info">
          <div class="achievement-name">{{ achievement.unlocked ? achievement.name : '???' }}</div>
          <div class="achievement-desc">{{ achievement.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NCard, NTag, NSpace, NIcon } from 'naive-ui'
import { TrophyOutline } from '@vicons/ionicons5'
import { useAchievements } from '../composables/useAchievements'

const props = defineProps({
  inline: { type: Boolean, default: false }
})

const { achievements, unlockedAchievements } = useAchievements()
</script>

<style scoped>
.achievements-panel:not(.inline) :deep(.n-card) { background: var(--bg-secondary); margin-bottom: 2rem; }
.panel-header { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.achievements-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; }
.achievement-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 10px; transition: all 0.2s; }
.achievement-card.unlocked { background: color-mix(in srgb, var(--primary-color) 10%, transparent); }
.achievement-card.locked { background: var(--bg-tertiary); opacity: 0.6; }
.achievement-icon-wrapper { 
  width: 44px; 
  height: 44px; 
  border-radius: 10px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  background: var(--bg-primary);
  color: var(--text-muted);
  flex-shrink: 0;
}
.achievement-icon-wrapper.unlocked { 
  background: var(--primary-color); 
  color: white; 
}
.achievement-info { flex: 1; min-width: 0; }
.achievement-name { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.15rem; }
.achievement-desc { font-size: 0.75rem; color: var(--text-secondary); }

@media (max-width: 768px) { .achievements-grid { grid-template-columns: 1fr; } }
</style>
