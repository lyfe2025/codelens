<template>
  <n-input
    v-model:value="inputValue"
    :type="type"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :show-count="showCount"
    :maxlength="maxlength"
    :rows="rows"
    :round="round"
    :autosize="autosize"
    :loading="loading"
    :passively-activated="passivelyActivated"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @keyup.enter="$emit('enter', $event)"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
  </n-input>
</template>

<script setup>
import { computed } from 'vue'
import { NInput } from 'naive-ui'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' }, // text, password, textarea
  size: { type: String, default: 'medium' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  showCount: { type: Boolean, default: false },
  maxlength: { type: Number, default: undefined },
  rows: { type: Number, default: 3 },
  round: { type: Boolean, default: false },
  autosize: { type: [Boolean, Object], default: false },
  loading: { type: Boolean, default: false },
  passivelyActivated: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'enter'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
