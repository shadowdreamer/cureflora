<template lang="pug">
.index_kv
  .greeting ごきげんよう
  
</template>
<script setup lang="ts">
import gsap,{Power1} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

onMounted(()=>{
initGsap();
})
let trigger:Record<string,any> = {};
function initGsap(){
   gsap.to('.greeting',{
    duration:1.5,
    ease:Power1.easeOut,
    y: -100,
    opacity:1,
    ["--process"]:0,
   })
  trigger.kv = ScrollTrigger.create({
    trigger:".index_kv",
    pin:true,
    pinSpacing:false,
    start:"top top",
    end:"center"
   })
}
onUnmounted(()=>{
  trigger.kv?.kill(true)
})

</script>
<style lang="postcss">
.index_kv{
  @apply h-[100vh] bg-neutral-900 flex items-center justify-center relative z-0;
  .greeting{
    @apply font-pearl opacity-25 text-yellow-300 scale-100 text-[5vw] blur-[calc(var(--process)*12px)];
    --process:1;
  }
}
</style>