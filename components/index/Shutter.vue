<template lang="pug">
.shutter
  .skyline
.blur_image_warp(ref="warp")
.flex(class="pt-[12vh]")
  .flora-kv(ref="kv_warp")
    .kv-cover
    .shadow-container
  .kv-text.flex-1
    .text-4xl 強く　優しく　美しく
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from 'vue';
// const { $bus } = useNuxtApp() as any
const kvImg = '/images/54747876_p0.webp';
const kv_warp = ref<any>(null);
const tl = gsap.timeline();

onMounted(() => {
  initalize()
  imageResize()
  initAnimate()
})
function initalize() {
  gsap.set('.flora-kv', {
    opacity: 0,
    y:-50
  })
  gsap.set('.kv-cover', {
    backgroundSize: '150% 150%',
  })
  gsap.set('.shadow-container', {
    opacity: 0,
  })
  gsap.set('.kv-text', {
    opacity: 0,
  })
}
async function initAnimate() {
  gsap.set('.blur_image_warp', {
    opacity: 0.3,
    filter: 'blur(500px)',
    backgroundSize: '150% 150%',
  })
  const tl = gsap.timeline();
  tl.to(".skyline", {
    height: '100%',
    duration: 0.4
  })
    .to(".skyline", {
      width: '100%',
      duration: 0.8,
      backgroundColor: '#ffffff',
    }, ">")
    .to(".shutter", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        document.querySelector(".shutter")?.remove();
      }
    }, "shutter_end-=0.3")
    .to('.blur_image_warp', {
      filter: 'blur(5px)',
      backgroundSize: '100% 100%',
      duration: 2
    }, "shutter_end-=0.3")
    .to('.flora-kv', {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      y: 0,
    }, "shutter_end")
    .to('.kv-cover', {
      backgroundSize: '100% 100%',
      duration: 0.8,
    }, "shutter_end")
    .to('.shadow-container', {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        initHover()
      }
    }, "shutter_end")
    .to('.kv-text', {
      y: -80,
      x:30,
      duration: 0.5,
      opacity: 1,
    }, "shutter_end+=0.8")
}
function initHover() {
  let hoverTl = gsap.timeline({
    paused: true
  });
  hoverTl.to('.shadow-container', {
    opacity: 1,
    bottom: '+=3%',
    duration: 0.28,
  }, 0)
    .to('.kv-cover', {
      backgroundSize: '110% 110%',
      duration: 0.28,
    }, 0)
    .to('.flora-kv', {
      y: 15,
      duration: 0.28,
    }, 0)

  kv_warp.value.addEventListener('mouseenter', () => {
    hoverTl.timeScale(1).play();
  })

  kv_warp.value.addEventListener('mouseleave', () => {
    hoverTl.timeScale(0.5).reverse();
  })
}
const imageResize = () => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = kvImg;
    img.onload = () => {
      let { height, width } = img;
      let ratio = width / height;
      ratio = Math.min(1.5, ratio);
      kv_warp.value.style.aspectRatio = ratio;
      resolve(true);
    };

  })
}
</script>
<style scoped lang="scss">
.shutter {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1e1e1e;
  z-index: 9999;
  opacity: 1;

  .skyline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #fff1a8;
    width: 1px;
    height: 0px;
  }
}

.blur_image_warp {
  @apply absolute left-0 w-[100%] h-[100vh] pointer-events-none bg-cover bg-no-repeat;
  background-image: url('/images/ai_sky_bg.webp');
}

.flora-kv {
  @apply h-[30vw] rounded relative aspect-square bg-white cursor-pointer;

  .kv-cover {
    @apply w-full h-full relative rounded bg-center bg-no-repeat;
    background-image: url('/images/54747876_p0.webp');
    z-index: 10;
  }

  .shadow-container {
    @apply absolute left-0 right-0 bottom-[7%] m-auto w-[50%];
    color: rgba(97, 4, 50, 0.935);
    height: 0;
    box-shadow: 0px 0px 60px 20px;
    z-index: 1;
  }
}

.kv-text {
  @apply flex flex-col items-center justify-center px-5 font-pearl;
}
</style>