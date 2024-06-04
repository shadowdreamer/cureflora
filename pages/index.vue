<template lang="pug">
Shutter
BlurBackImage
.page-warp

  KeyVisual

  div(class="h-[100vh]")
  div(class="h-[100vh]")
</template>
<script setup>
import BlurBackImage from '@/components/index/BlurBackImage.vue'
import KeyVisual from '@/components/index/KeyVisual.vue'
import Shutter from '@/components/index/Shutter.vue'
</script>
<style scoped lang="scss">
.page-warp{
  @apply xl:w-[1280px] max-xl:w-full px-4 pt-[12vh]
}
</style>