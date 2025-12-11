<template>
  <n-badge
    :value="value"
    :max="max"
    :dot="dot"
    :type="type"
    :show="show"
    :processing="processing"
    :color="color"
    :offset="offset"
  >
    <slot />
  </n-badge>
</template>

<script setup>
import { NBadge } from 'naive-ui'

defineProps({
  value: { type: [String, Number], default: undefined },
  max: { type: Number, default: undefined },
  dot: { type: Boolean, default: false },
  type: { type: String, default: 'default' }, // default, success, error, warning, info
  show: { type: Boolean, default: true },
  processing: { type: Boolean, default: false },
  color: { type: String, default: undefined },
  offset: { type: Array, default: undefined }
})
</script>
