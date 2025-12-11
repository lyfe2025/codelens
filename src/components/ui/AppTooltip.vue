<template>
  <n-tooltip
    :trigger="trigger"
    :placement="placement"
    :show-arrow="showArrow"
    :delay="delay"
    :duration="duration"
    :disabled="disabled"
  >
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot />
  </n-tooltip>
</template>

<script setup>
import { NTooltip } from 'naive-ui'

defineProps({
  trigger: { type: String, default: 'hover' }, // hover, click, focus, manual
  placement: { type: String, default: 'top' },
  showArrow: { type: Boolean, default: true },
  delay: { type: Number, default: 100 },
  duration: { type: Number, default: 100 },
  disabled: { type: Boolean, default: false }
})
</script>
