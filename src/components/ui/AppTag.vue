<template>
  <n-tag
    :type="type"
    :size="size"
    :round="round"
    :bordered="bordered"
    :closable="closable"
    :disabled="disabled"
    :checkable="checkable"
    :checked="checked"
    @close="$emit('close')"
    @update:checked="$emit('update:checked', $event)"
  >
    <slot />
  </n-tag>
</template>

<script setup>
import { NTag } from 'naive-ui'

defineProps({
  type: { type: String, default: 'default' }, // default, primary, info, success, warning, error
  size: { type: String, default: 'medium' },
  round: { type: Boolean, default: false },
  bordered: { type: Boolean, default: true },
  closable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  checkable: { type: Boolean, default: false },
  checked: { type: Boolean, default: false }
})

defineEmits(['close', 'update:checked'])
</script>
