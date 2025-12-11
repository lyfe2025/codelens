<template>
  <div class="stats-panel">
    <n-card class="stat-card">
      <div class="stat-content">
        <n-progress
          type="circle"
          :percentage="progress"
          :stroke-width="10"
          :show-indicator="true"
        >
          <span class="ring-text">{{ progress }}%</span>
        </n-progress>
        <div class="stat-info">
          <h3>总体进度</h3>
          <p>{{ completedCount }}/{{ totalCount }} 课时</p>
        </div>
      </div>
    </n-card>
    
    <n-card class="stat-card">
      <div class="stat-content">
        <n-icon :component="FlameOutline" size="40" color="var(--primary-color)" />
        <div class="stat-info">
          <h3>连续学习</h3>
          <n-statistic :value="streakDays">
            <template #suffix>天</template>
          </n-statistic>
        </div>
      </div>
    </n-card>
    
    <n-card class="stat-card">
      <div class="stat-content">
        <n-icon :component="TimeOutline" size="40" color="var(--primary-color)" />
        <div class="stat-info">
          <h3>今日学习</h3>
          <n-statistic :value="todayMinutes">
            <template #suffix>分钟</template>
          </n-statistic>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { NCard, NProgress, NStatistic, NIcon } from 'naive-ui'
import { FlameOutline, TimeOutline } from '@vicons/ionicons5'

defineProps({
  progress: { type: Number, default: 0 },
  completedCount: { type: Number, default: 0 },
  totalCount: { type: Number, default: 0 },
  streakDays: { type: Number, default: 0 },
  todayMinutes: { type: Number, default: 0 }
})
</script>

<style scoped>
.stats-panel { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
.stat-card { background: var(--bg-secondary); }
.stat-content { display: flex; align-items: center; gap: 1rem; }
.stat-content :deep(.n-progress) { width: 70px; flex-shrink: 0; }
.ring-text { font-size: 0.9rem; font-weight: bold; color: var(--primary-color); }
.stat-info h3 { font-size: 0.9rem; color: var(--text-secondary); margin: 0 0 0.25rem; font-weight: normal; }
.stat-info p { font-size: 1.25rem; font-weight: bold; margin: 0; color: var(--text-primary); }
.stat-info :deep(.n-statistic-value) { font-size: 1.25rem; }

@media (max-width: 768px) { .stats-panel { grid-template-columns: 1fr; } }
</style>
