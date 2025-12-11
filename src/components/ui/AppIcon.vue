<template>
  <n-icon :size="size" :color="color" :depth="depth">
    <component :is="icon" />
  </n-icon>
</template>

<script setup>
import { NIcon } from 'naive-ui'

defineProps({
  icon: { type: Object, required: true },
  size: { type: [String, Number], default: 20 },
  color: { type: String, default: undefined },
  depth: { type: [Number, String], default: undefined }
})
</script>
