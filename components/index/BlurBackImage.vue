<template lang="pug">
.blur_image_warp(ref="warp")
  .layar-white
  .cover

</template>
<script setup lang="ts">
import bgurl from "@/assets/images/ai_sky_bg.webp"
const warp = ref<any>(null);
onMounted(() => {
  imageLoaded()
})
const imageLoaded = () => {
  const img = new Image();
  img.src = bgurl;
  img.onload = () => {
    warp.value.classList.add("loaded");
  }
}
</script>
<style scoped lang="scss">
.blur_image_warp{
  @apply absolute top-0 left-0 w-full h-full bg-center opacity-45 z-[-1] pointer-events-none transition-all duration-[3s];
  background-image: url('@/assets/images/ai_sky_bg.webp');
  background-size: 150% 150%;
   .layar-white{
    @apply absolute top-0 left-0 w-full h-full;
    background:linear-gradient(0,  #fff 0%, transparent 20%);
  }
  .cover{
    @apply w-full h-full absolute transition-all duration-[3s];
    backdrop-filter: blur(500px) brightness(200%);
    background-color: rgba(255, 255, 255, 0.58);
  }
  &.loaded{
    background-size: cover;
  }
  &.loaded .cover{
    backdrop-filter: blur(5px) brightness(90%);

  }
}
 
</style>