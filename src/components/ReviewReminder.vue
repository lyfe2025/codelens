<template>
  <n-card v-if="hasReviewItems" class="review-reminder" :bordered="false">
    <template #header>
      <div class="card-header">
        <n-icon :component="RefreshOutline" />
        <span>建议复习</span>
        <n-tag size="tiny" type="warning" round>{{ reviewLessons.length }}</n-tag>
      </div>
    </template>
    <template #header-extra>
      <n-button quaternary size="tiny" @click="dismissAll">
        全部忽略
      </n-button>
    </template>
    
    <div class="review-list">
      <div 
        v-for="item in reviewLessons.slice(0, 3)" 
        :key="item.key"
        class="review-item"
        @click="$router.push(item.path)"
      >
        <div class="review-info">
          <span class="review-title">{{ item.title }}</span>
          <span class="review-meta">
            <n-tag size="tiny" :bordered="false">{{ item.moduleName }}</n-tag>
            <span class="review-time">{{ item.intervalLabel }}</span>
          </span>
        </div>
        <n-button 
          quaternary 
          circle 
          size="tiny" 
          @click.stop="dismissReview(item.key, item.intervalDays)"
        >
          <template #icon><n-icon :component="CloseOutline" size="14" /></template>
        </n-button>
      </div>
    </div>
    
    <n-button 
      v-if="reviewLessons.length > 3" 
      text 
      size="small" 
      class="view-all"
      @click="showAll = true"
    >
      查看全部 {{ reviewLessons.length }} 个
    </n-button>
  </n-card>

  <!-- 全部复习列表弹窗 -->
  <n-modal v-model:show="showAll" preset="card" title="建议复习" style="max-width: 500px;">
    <div class="review-list-full">
      <div 
        v-for="item in reviewLessons" 
        :key="item.key"
        class="review-item"
        @click="$router.push(item.path); showAll = false"
      >
        <div class="review-info">
          <span class="review-title">{{ item.title }}</span>
          <span class="review-meta">
            <n-tag size="tiny" :bordered="false">{{ item.moduleName }}</n-tag>
            <span class="review-time">{{ item.intervalLabel }}</span>
          </span>
        </div>
        <n-button 
          quaternary 
          circle 
          size="tiny" 
          @click.stop="dismissReview(item.key, item.intervalDays)"
        >
          <template #icon><n-icon :component="CloseOutline" size="14" /></template>
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import { NCard, NTag, NButton, NIcon, NModal } from 'naive-ui'
import { RefreshOutline, CloseOutline } from '@vicons/ionicons5'
import { useSpacedReview } from '../composables/useSpacedReview'

const { reviewLessons, hasReviewItems, dismissReview, dismissAll } = useSpacedReview()
const showAll = ref(false)
</script>

<style scoped>
.review-reminder {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-left: 3px solid #f97316;
}

.dark .review-reminder {
  background: linear-gradient(135deg, #431407 0%, #7c2d12 100%);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #ea580c;
}

.card-header span {
  flex: 1;
}

.review-list,
.review-list-full {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.review-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  background: rgba(255, 255, 255, 0.5);
}

.dark .review-item {
  background: rgba(0, 0, 0, 0.2);
}

.review-item:hover {
  background: rgba(255, 255, 255, 0.8);
}

.dark .review-item:hover {
  background: rgba(0, 0, 0, 0.3);
}

.review-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.review-title {
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.review-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.review-time {
  color: var(--text-muted);
}

.view-all {
  margin-top: 0.5rem;
}
</style>
