<template>
  <n-collapse
    v-model:expanded-names="expandedValue"
    :accordion="accordion"
    :arrow-placement="arrowPlacement"
  >
    <slot />
  </n-collapse>
</template>

<script setup>
import { computed } from 'vue'
import { NCollapse } from 'naive-ui'

const props = defineProps({
  expandedNames: { type: [Array, String], default: () => [] },
  accordion: { type: Boolean, default: false },
  arrowPlacement: { type: String, default: 'left' }
})

const emit = defineEmits(['update:expandedNames'])

const expandedValue = computed({
  get: () => props.expandedNames,
  set: (val) => emit('update:expandedNames', val)
})
</script>
