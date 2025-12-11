<template>
  <n-modal
    v-model:show="visible"
    :preset="preset"
    :title="title"
    :mask-closable="maskClosable"
    :close-on-esc="closeOnEsc"
    :style="modalStyle"
    :transform-origin="transformOrigin"
    @after-leave="$emit('closed')"
  >
    <template v-if="preset === 'card'">
      <n-card
        :title="title"
        :bordered="false"
        :style="cardStyle"
        :closable="closable"
        @close="close"
      >
        <template v-if="$slots.header" #header>
          <slot name="header" />
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
    <template v-else>
      <slot />
    </template>
  </n-modal>
</template>

<script setup>
import { computed } from 'vue'
import { NModal, NCard } from 'naive-ui'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  preset: { type: String, default: 'card' }, // card, dialog, default
  width: { type: [String, Number], default: 500 },
  maskClosable: { type: Boolean, default: true },
  closeOnEsc: { type: Boolean, default: true },
  closable: { type: Boolean, default: true },
  transformOrigin: { type: String, default: 'center' }
})

const emit = defineEmits(['update:show', 'closed'])

const visible = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const modalStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width
}))

const cardStyle = computed(() => ({
  width: '100%'
}))

const close = () => {
  visible.value = false
}

defineExpose({ close })
</script>
