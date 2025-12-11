<template>
  <n-button
    :type="type"
    :size="size"
    :round="round"
    :circle="circle"
    :ghost="ghost"
    :dashed="dashed"
    :disabled="disabled"
    :loading="loading"
    :quaternary="quaternary"
    :tertiary="tertiary"
    :secondary="secondary"
    :text="text"
    :block="block"
    :strong="strong"
    :icon-placement="iconPlacement"
    @click="$emit('click', $event)"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </n-button>
</template>

<script setup>
import { NButton } from 'naive-ui'

defineProps({
  type: { type: String, default: 'default' }, // default, primary, info, success, warning, error
  size: { type: String, default: 'medium' }, // tiny, small, medium, large
  round: { type: Boolean, default: false },
  circle: { type: Boolean, default: false },
  ghost: { type: Boolean, default: false },
  dashed: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  quaternary: { type: Boolean, default: false },
  tertiary: { type: Boolean, default: false },
  secondary: { type: Boolean, default: false },
  text: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  strong: { type: Boolean, default: false },
  iconPlacement: { type: String, default: 'left' }
})

defineEmits(['click'])
</script>
