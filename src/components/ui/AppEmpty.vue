<template>
  <n-empty :description="description" :size="size">
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </n-empty>
</template>

<script setup>
import { NEmpty } from 'naive-ui'

defineProps({
  description: { type: String, default: '暂无数据' },
  size: { type: String, default: 'medium' } // small, medium, large, huge
})
</script>
