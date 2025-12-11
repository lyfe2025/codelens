<template>
  <n-spin :show="show" :size="size" :description="description">
    <slot />
  </n-spin>
</template>

<script setup>
import { NSpin } from 'naive-ui'

defineProps({
  show: { type: Boolean, default: true },
  size: { type: String, default: 'medium' }, // small, medium, large
  description: { type: String, default: '' }
})
</script>
