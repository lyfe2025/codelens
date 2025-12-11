<template>
  <n-select
    v-model:value="selectValue"
    :options="options"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    :multiple="multiple"
    :max-tag-count="maxTagCount"
    :loading="loading"
    :remote="remote"
    :render-label="renderLabel"
    @search="$emit('search', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script setup>
import { computed } from 'vue'
import { NSelect } from 'naive-ui'

const props = defineProps({
  modelValue: { type: [String, Number, Array], default: null },
  options: { type: Array, default: () => [] },
  size: { type: String, default: 'medium' },
  placeholder: { type: String, default: '请选择' },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  filterable: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  maxTagCount: { type: [Number, String], default: 'responsive' },
  loading: { type: Boolean, default: false },
  remote: { type: Boolean, default: false },
  renderLabel: { type: Function, default: undefined }
})

const emit = defineEmits(['update:modelValue', 'search', 'focus', 'blur'])

const selectValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
