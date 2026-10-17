import type gsap from 'gsap'
import type { Ref } from 'vue'

export function usePhotoWallMotion(root: Ref<HTMLElement | null>) {
  let context: gsap.Context | undefined
  let media: gsap.MatchMedia | undefined
  let observer: ResizeObserver | undefined
  let frame = 0
  let disposed = false
  const { $motion } = useNuxtApp()
  const introReady = useState('intro-ready', () => false)
  let stopWaiting: (() => void) | undefined

  onMounted(() => {
    stopWaiting = watch(introReady, ready => {
      if (ready) initialize()
    }, { immediate: true })
  })

  function initialize() {
    if (context || disposed) return
    if (!root.value || !$motion) return
    const { gsap, ScrollTrigger } = $motion
    const refresh = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh() })
    }
    context = gsap.context(() => {
      media = gsap.matchMedia()
      media.add({ desktop: '(min-width: 769px)', mobile: '(max-width: 768px)', reduce: '(prefers-reduced-motion: reduce)' }, match => {
        if (match.conditions?.reduce) return
        const desktop = match.conditions?.desktop
        gsap.utils.toArray<HTMLElement>('.photo-card').forEach((card, index) => {
          // Measure the stationary figure; move its frame and caption together.
          // One scrub tween follows the latest scroll position in either direction.
          gsap.fromTo(card.querySelectorAll<HTMLElement>('[data-photo-float]'), {
            y: () => Math.min(desktop ? 96 + index % 2 * 16 : 36 + index % 2 * 8, window.innerHeight * (desktop ? 0.13 : 0.07)),
          }, {
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: desktop ? 'top 62%' : 'top 72%',
              scrub: desktop ? 0.4 : 0.3,
              invalidateOnRefresh: true,
            },
          })
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.from(element, { y: 28, opacity: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: {
            trigger: element, start: 'top 94%', once: true,
          } })
        })
        gsap.to('.reading-progress', { scaleX: 1, ease: 'none', scrollTrigger: {
          trigger: root.value, start: 'top top', end: 'bottom bottom', scrub: true,
        } })
      })
    }, root.value)
    observer = new ResizeObserver(refresh)
    observer.observe(root.value)
    void document.fonts.ready.then(() => { if (!disposed) refresh() })
  }
  onBeforeUnmount(() => {
    stopWaiting?.()
    disposed = true
    cancelAnimationFrame(frame)
    observer?.disconnect()
    media?.revert()
    context?.revert()
  })
}
