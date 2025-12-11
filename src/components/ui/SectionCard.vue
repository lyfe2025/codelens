<template>
  <n-card
    :title="title"
    :bordered="bordered"
    :hoverable="hoverable"
    :segmented="{ content: true }"
    class="section-card"
    :class="{ 'section-card--compact': compact }"
  >
    <template v-if="icon || $slots.icon" #header>
      <div class="section-header">
        <span v-if="icon" class="section-icon">{{ icon }}</span>
        <slot v-else name="icon" />
        <span class="section-title">{{ title }}</span>
      </div>
    </template>
    <template v-if="$slots['header-extra']" #header-extra>
      <slot name="header-extra" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </n-card>
</template>

<script setup>
import { NCard } from 'naive-ui'

defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  bordered: { type: Boolean, default: true },
  hoverable: { type: Boolean, default: false },
  compact: { type: Boolean, default: false }
})
</script>

<style scoped>
.section-card {
  margin-bottom: 1rem;
}

.section-card--compact :deep(.n-card__content) {
  padding: 0.75rem 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  font-size: 1.25rem;
}

.section-title {
  font-weight: 600;
}
</style>
