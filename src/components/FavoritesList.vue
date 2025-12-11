<template>
  <div class="favorites-section" v-if="favorites.length">
    <h2>⭐ 我的收藏</h2>
    <n-space>
      <n-tag 
        v-for="fav in favorites" 
        :key="fav.path"
        closable
        round
        size="medium"
        :type="moduleType[fav.module] || 'default'"
        @close="$emit('remove', fav.path)"
        @click="$router.push(fav.path)"
        class="favorite-tag"
      >
        {{ fav.title }}
      </n-tag>
    </n-space>
  </div>
</template>

<script setup>
import { NTag, NSpace } from 'naive-ui'

defineProps({
  favorites: { type: Array, default: () => [] }
})

defineEmits(['remove'])

const moduleType = {
  html: 'error',
  css: 'info',
  js: 'warning',
  vue: 'success',
  advanced: 'primary'
}
</script>

<style scoped>
.favorites-section {
  margin-bottom: 2rem;
}

.favorites-section h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.favorite-tag {
  cursor: pointer;
  transition: transform 0.2s;
}

.favorite-tag:hover {
  transform: translateY(-2px);
}
</style>
