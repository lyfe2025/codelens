<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width="size" 
    :height="size" 
    viewBox="0 0 512 512"
    class="codelens-logo"
  >
    <!-- 代码括号 < > -->
    <path 
      d="M140 140 L60 256 L140 372" 
      stroke="currentColor" 
      stroke-width="48" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      fill="none"
    />
    <path 
      d="M372 140 L452 256 L372 372" 
      stroke="currentColor" 
      stroke-width="48" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      fill="none"
    />
    <!-- 中间镜头/放大镜 -->
    <circle 
      cx="256" 
      cy="230" 
      r="70" 
      stroke="currentColor" 
      stroke-width="40" 
      fill="none"
    />
    <line 
      x1="306" 
      y1="280" 
      x2="360" 
      y2="334" 
      stroke="currentColor" 
      stroke-width="40" 
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 24
  }
})
</script>

<style scoped>
.codelens-logo {
  display: block;
}
</style>
