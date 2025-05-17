<template lang="pug">
.index_kv
  .greeting ごきげんよう
.kv-2
  NuxtImg.kv2-img(src="/images/53568697_p0.png")
.flex.items-center(v-for="item in sections" class=" even:flex-row-reverse" ref="sectionRefs")
  .text1.font-pearl.text-2xl.flex.justify-center(class=' w-[50vw] text-[5vw] text-[#F38BC4]') {{ item.text  }}
  .flex.justify-center
    NuxtImg.kv3-image(:src="item.img")
div(class="h-[100vh]")
div(class="h-[100vh]")
</template>
<script setup lang="ts">
import gsap, { Power1 } from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
useLenis();
const sectionRefs = useTemplateRef('sectionRefs')
const sections = [
  {img:'/images/54747876_p0.webp', text:'強く'},
  {img:'/images/54747876_p0.webp', text:'優しく'},
  {img:'/images/54747876_p0.webp', text:'美しく'},
]
onMounted(() => {
  if (import.meta.client) {
    initAnimete()
  }
})
let trigger: Record<string, any> = {};

function initAnimete() {
  gsap.to('.greeting', {
    duration: 1.5,
    ease: Power1.easeOut,
    opacity: 1,
    ["--process"]: 0,

  })
  trigger.kv = ScrollTrigger.create({
    trigger: ".index_kv",
    pin: true,
    pinSpacing: false,
    start: "top top",
    end: "0%+=100px"
  })
  trigger.kv2 = gsap.to('.kv2-img', {
    scale: 1,
    scrollTrigger: {
      trigger: '.kv2-img',
      start: "top bottom",
      end: "top-300 bottom+300",
      scrub: 1,

    }
  })
 
  // const kv3_image = gsap.to('.kv3-image', {
  //   scale: 1.3,
  //   scrollTrigger: {
  //     trigger: '.kv3-image',
  //     start: "top bottom",
  //     end: "top-300 bottom+300",
  //     scrub: 1,
  //   } 
  // })
  // trigger.kv3_image = kv3_image;
 
}

onUnmounted(() => {
  for (let k in trigger) {
    trigger?.[k]?.kill(true)
  }

})

</script>
<style scoped lang="postcss">
.index_kv {
  @apply h-[100vh] bg-neutral-900 flex items-center justify-center relative z-0;

  .greeting {
    @apply font-pearl opacity-25 text-yellow-300 scale-100 text-[5vw] blur-[calc(var(--process)*12px)];
    --process: 1;
  }
}

.kv-2 {
  @apply w-full pt-[60px];

  .kv2-img {
    @apply w-[100vw] h-[100vh] origin-top scale-75 object-cover mx-auto z-10 overflow-hidden  ;
    --progress: 0;
    clip-path: circle(calc(150% - var(--progress) * 50%) at center calc(-100% - var(--progress) * 150%));
  }
}
</style>
