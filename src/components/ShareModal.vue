<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    :style="{ width: '500px', maxWidth: '90vw' }"
    :bordered="false"
  >
    <template #header>
      <n-space align="center">
        <n-icon :component="ShareSocialOutline" size="20" />
        <span>分享代码</span>
      </n-space>
    </template>

    <n-space vertical size="large">
      <p class="share-desc">复制下方链接分享给朋友，他们可以直接查看你的代码</p>
      
      <n-input-group>
        <n-input :value="shareUrl" readonly @focus="$event.target.select()" />
        <n-button type="primary" @click="handleCopy">
          <template #icon><n-icon :component="copied ? CheckmarkOutline : CopyOutline" /></template>
          {{ copied ? '已复制' : '复制' }}
        </n-button>
      </n-input-group>

      <n-space>
        <n-button @click="shareToTwitter" class="twitter-btn">
          <template #icon><n-icon :component="LogoTwitter" /></template>
          Twitter
        </n-button>
        <n-button type="error" @click="shareToWeibo">
          <template #icon><n-icon :component="ShareSocialOutline" /></template>
          微博
        </n-button>
      </n-space>
    </n-space>
  </n-modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { NModal, NSpace, NInput, NInputGroup, NButton, NIcon } from 'naive-ui'
import { ShareSocialOutline, CopyOutline, CheckmarkOutline, LogoTwitter } from '@vicons/ionicons5'
import { useShare } from '../composables/useShare'

const props = defineProps({ show: Boolean, code: Object, module: String, lessonId: Number })
const emit = defineEmits(['close', 'update:show'])

const visible = computed({
  get: () => props.show,
  set: (val) => { emit('update:show', val); if (!val) emit('close') }
})

const { generateShareUrl, copyToClipboard } = useShare()
const shareUrl = ref('')
const copied = ref(false)

watch(() => props.show, (val) => {
  if (val && props.code) {
    shareUrl.value = generateShareUrl(props.code, props.module, props.lessonId) || ''
    copied.value = false
  }
})

const handleCopy = async () => {
  const success = await copyToClipboard(shareUrl.value)
  if (success) { copied.value = true; setTimeout(() => copied.value = false, 2000) }
}

const shareToTwitter = () => {
  const text = encodeURIComponent('来看看我在编程学习平台写的代码！')
  const url = encodeURIComponent(shareUrl.value)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

const shareToWeibo = () => {
  const text = encodeURIComponent('来看看我在编程学习平台写的代码！')
  const url = encodeURIComponent(shareUrl.value)
  window.open(`https://service.weibo.com/share/share.php?title=${text}&url=${url}`, '_blank')
}
</script>

<style scoped>
.share-desc { color: var(--text-secondary); font-size: 0.9rem; margin: 0; }
.twitter-btn { background: #1da1f2; color: white; border: none; }
.twitter-btn:hover { background: #1a91da; }
</style>
