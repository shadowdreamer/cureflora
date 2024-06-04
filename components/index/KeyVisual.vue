<template lang="pug">
.flex
  .flora-kv(ref="warp")
    .kv-cover
    .shadow-container
  .kv-text.flex-1
    .text-4xl 強く　優しく　美しく

</template>
<script setup lang="ts">
import bgImg from '@/assets/images/54747876_p0.webp';
const warp = ref<any>(null);
onMounted(()=>{
  imageLoaded()
})
const imageLoaded = () => {
  const img = new Image();
  img.src = bgImg;
  img.onload = () => {
    warp.value.classList.add("loaded");
    let {height,width} = img;
    console.log(height,width);
    warp.value.style.aspectRatio = width/height;
  }
}
</script>
<style scoped lang="scss">
.flora-kv {
  @apply h-[30vw] rounded relative aspect-square bg-white;
  transition-duration: 1.5s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: scale(1.1);

  .kv-cover{
    @apply w-full h-full relative opacity-0 rounded bg-center bg-no-repeat;
    background-image: url('@/assets/images/54747876_p0.webp');
    z-index: 10;
    background-size: 200% auto;
    transition-duration: 1s;
    transition-property: background-size opacity;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .shadow-container {
    @apply absolute  left-0 right-0 bottom-[7%] m-auto w-[50%];
    color: rgba(97, 4, 50, 0.935);
    height: 0;
    box-shadow: 0px 0px 60px 20px;
    transition: all 1s;
    z-index: 1;
    opacity: 0;

  }
  &.loaded{
    transform: scale(1);
    .kv-cover{
      opacity: 1;
      background-size: 100% auto;
    }
    .shadow-container{
      opacity: 1;
    }
  }
  &:hover{
    transform: translateY(8px);
    .kv-cover{
      background-size: 108% auto;
    }
    .shadow-container{
      @apply bottom-[12%]
    }
  }
}
.kv-text{
  @apply  flex flex-col items-center justify-center px-5 font-pearl;
}
</style>