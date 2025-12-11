<template>
  <n-card
    :title="title"
    :size="size"
    :bordered="bordered"
    :hoverable="hoverable"
    :segmented="segmented"
    :closable="closable"
    :header-style="headerStyle"
    :content-style="contentStyle"
    @close="$emit('close')"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots['header-extra']" #header-extra>
      <slot name="header-extra" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action" />
    </template>
  </n-card>
</template>

<script setup>
import { NCard } from 'naive-ui'

defineProps({
  title: { type: String, default: '' },
  size: { type: String, default: 'medium' }, // small, medium, large
  bordered: { type: Boolean, default: true },
  hoverable: { type: Boolean, default: false },
  segmented: { type: [Boolean, Object], default: false },
  closable: { type: Boolean, default: false },
  headerStyle: { type: [String, Object], default: '' },
  contentStyle: { type: [String, Object], default: '' }
})

defineEmits(['close'])
</script>
