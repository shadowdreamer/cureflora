import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import { onMounted, onUnmounted, ref } from 'vue';
declare global {
  interface Window {
    lenis:  any
  }
  
}

export const useLenis = () => {
  if(!import.meta.client)return {};
  gsap.registerPlugin(ScrollTrigger);
  let lenis = window.lenis;
  const tick = (time) => {
    lenis?.raf(time * 1000); // Convert time from seconds to milliseconds
  }
  onMounted(() => {
    if(lenis){lenis.destroy()};
    lenis = new Lenis({
      duration: 1.2,
    });
    
    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add(tick);

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis
  });
  onUnmounted(() => {
    lenis?.destroy();
    gsap.ticker.remove(tick);
  })
  return { gsap,lenis }
}