<template>
  <n-switch
    v-model:value="switchValue"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :round="round"
  >
    <template v-if="$slots.checked" #checked>
      <slot name="checked" />
    </template>
    <template v-if="$slots.unchecked" #unchecked>
      <slot name="unchecked" />
    </template>
  </n-switch>
</template>

<script setup>
import { computed } from 'vue'
import { NSwitch } from 'naive-ui'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  size: { type: String, default: 'medium' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  round: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue'])

const switchValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
