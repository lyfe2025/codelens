<template>
  <n-drawer
    v-model:show="visible"
    :width="width"
    :height="height"
    :placement="placement"
    :mask-closable="maskClosable"
    :close-on-esc="closeOnEsc"
    :show-mask="showMask"
    @after-leave="$emit('closed')"
  >
    <n-drawer-content :title="title" :closable="closable">
      <template v-if="$slots.header" #header>
        <slot name="header" />
      </template>
      <slot />
      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { NDrawer, NDrawerContent } from 'naive-ui'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  width: { type: [String, Number], default: 400 },
  height: { type: [String, Number], default: 280 },
  placement: { type: String, default: 'right' }, // top, right, bottom, left
  maskClosable: { type: Boolean, default: true },
  closeOnEsc: { type: Boolean, default: true },
  closable: { type: Boolean, default: true },
  showMask: { type: Boolean, default: true }
})

const emit = defineEmits(['update:show', 'closed'])

const visible = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const close = () => {
  visible.value = false
}

defineExpose({ close })
</script>
