<template>
  <n-progress
    :type="type"
    :percentage="percentage"
    :status="status"
    :indicator-placement="indicatorPlacement"
    :show-indicator="showIndicator"
    :processing="processing"
    :color="color"
    :rail-color="railColor"
    :height="height"
    :border-radius="borderRadius"
    :circle-gap="circleGap"
    :stroke-width="strokeWidth"
  >
    <slot />
  </n-progress>
</template>

<script setup>
import { NProgress } from 'naive-ui'

defineProps({
  type: { type: String, default: 'line' }, // line, circle, multiple-circle, dashboard
  percentage: { type: Number, default: 0 },
  status: { type: String, default: 'default' }, // default, success, error, warning, info
  indicatorPlacement: { type: String, default: 'outside' }, // inside, outside
  showIndicator: { type: Boolean, default: true },
  processing: { type: Boolean, default: false },
  color: { type: [String, Array], default: undefined },
  railColor: { type: [String, Array], default: undefined },
  height: { type: Number, default: undefined },
  borderRadius: { type: [String, Number], default: undefined },
  circleGap: { type: Number, default: 1 },
  strokeWidth: { type: Number, default: 7 }
})
</script>
