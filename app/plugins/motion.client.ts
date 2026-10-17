import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)
  let lenis: Lenis | undefined
  let scrollLocked = false
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  const tick = (seconds: number) => lenis?.raf(seconds * 1000)
  const destroy = () => {
    gsap.ticker.remove(tick)
    lenis?.off('scroll', ScrollTrigger.update)
    lenis?.destroy()
    lenis = undefined
  }
  const configure = () => {
    destroy()
    if (media.matches) return
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true, autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    if (scrollLocked) lenis.stop()
  }
  configure()
  media.addEventListener('change', configure)
  const removeHook = nuxtApp.hook('page:finish', () => {
    lenis?.resize()
    ScrollTrigger.refresh()
  })
  const cleanup = () => {
    destroy()
    media.removeEventListener('change', configure)
    removeHook()
  }
  nuxtApp.vueApp.onUnmount(cleanup)
  if (import.meta.hot) import.meta.hot.dispose(cleanup)
  return { provide: {
    motion: { gsap, ScrollTrigger, setScrollLocked(locked: boolean) {
      scrollLocked = locked
      if (locked) lenis?.stop()
      else lenis?.start()
    } },
  } }
})
