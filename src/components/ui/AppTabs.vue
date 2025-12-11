<template>
  <n-tabs
    v-model:value="activeValue"
    :type="type"
    :size="size"
    :animated="animated"
    :justify-content="justifyContent"
    :pane-style="paneStyle"
  >
    <slot />
  </n-tabs>
</template>

<script setup>
import { computed } from 'vue'
import { NTabs } from 'naive-ui'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'line' }, // line, card, segment, bar
  size: { type: String, default: 'medium' },
  animated: { type: Boolean, default: true },
  justifyContent: { type: String, default: undefined },
  paneStyle: { type: [String, Object], default: '' }
})

const emit = defineEmits(['update:modelValue'])

const activeValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
