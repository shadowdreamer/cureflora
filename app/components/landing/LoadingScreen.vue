<template lang="pug">
.princess-loader(v-if="visible" ref="screen" role="status" aria-label="Loading" aria-live="polite")
  .princess-curtain(ref="curtain" aria-hidden="true")
    svg.princess-wave(viewBox="0 0 2880 140" preserveAspectRatio="none")
      path(d="M0 0H2880V70C2640 160 2400 -20 2160 70S1680 160 1440 70S960 -20 720 70S240 160 0 70Z")
  p.princess-loading-text(ref="label")
    svg.princess-loading-flower(viewBox="0 0 64 64" aria-hidden="true" focusable="false")
      ellipse(cx="32" cy="18" rx="8" ry="14")
      ellipse(cx="46" cy="32" rx="14" ry="8")
      ellipse(cx="32" cy="46" rx="8" ry="14")
      ellipse(cx="18" cy="32" rx="14" ry="8")
    span Princess Engage
</template>

<script setup lang="ts">
const introReady = useState('intro-ready', () => false)
const visible = ref(true)
const screen = ref<HTMLElement | null>(null)
const curtain = ref<HTMLElement | null>(null)
const label = ref<HTMLElement | null>(null)
const { $motion } = useNuxtApp()
let timeline: ReturnType<typeof $motion.gsap.timeline> | undefined
let timeout: ReturnType<typeof setTimeout> | undefined
let minimum: ReturnType<typeof setTimeout> | undefined
let disposed = false
let preference: MediaQueryList | undefined

const finish = () => {
  if (disposed) return
  timeline?.kill()
  clearTimeout(timeout)
  clearTimeout(minimum)
  document.documentElement.classList.remove('princess-loading-active')
  visible.value = false
  introReady.value = true
  $motion.setScrollLocked(false)
  $motion.ScrollTrigger.refresh()
}
const onPreferenceChange = () => { if (preference?.matches) finish() }

onMounted(async () => {
  // The early head script also removes the curtain if hydration never completes.
  if (!document.documentElement.classList.contains('princess-loading-active')) {
    finish()
    return
  }
  $motion.setScrollLocked(true)
  preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', onPreferenceChange)
  const fonts = async () => {
    await document.fonts.load('400 16px "FOT Pearl"', '咲きほこる花 Princess Engage')
    await document.fonts.ready
  }
  const image = document.querySelector<HTMLImageElement>('img[fetchpriority="high"]')
  // decode() rejects on image failure; neither failure should hold the page closed.
  const resources = Promise.allSettled([fonts(), image?.decode() ?? Promise.resolve()])
  await Promise.all([
    Promise.race([resources, new Promise<void>(resolve => { timeout = setTimeout(resolve, 4000) })]),
    new Promise<void>(resolve => { minimum = setTimeout(resolve, preference?.matches ? 0 : 900) }),
  ])
  clearTimeout(timeout)
  if (disposed) return
  if (introReady.value) return
  if (preference.matches) { finish(); return }
  timeline = $motion.gsap.timeline({ onComplete: finish })
    .to(label.value, { opacity: 0, y: -16, duration: 0.28, ease: 'power2.in' })
    .to(curtain.value, { yPercent: -100, y: -160, duration: 1.35, ease: 'power3.inOut' }, 0.12)
})

onBeforeUnmount(() => {
  finish()
  disposed = true
  preference?.removeEventListener('change', onPreferenceChange)
})
</script>

<style>
.princess-loader { display: none; }
html.princess-loading-active { overflow: hidden; }
html.princess-loading-active .princess-loader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
  color: #794652;
}
.princess-curtain {
  position: absolute;
  inset: 0;
  background: #ead5d2;
  will-change: transform;
}
.princess-wave {
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  width: 200%;
  height: 140px;
  fill: #ead5d2;
  animation: princess-wave-drift 7.5s linear infinite;
}
.princess-loading-text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 0;
  padding: 24px;
  font-family: var(--font-body, Georgia, serif);
  font-size: clamp(18px, 2vw, 28px);
  font-weight: 400;
  letter-spacing: 0.08em;
  text-align: center;
}
.princess-loading-flower {
  width: 1em;
  height: 1em;
  flex: none;
  fill: currentColor;
  animation: princess-flower-spin 4s linear infinite;
}
@keyframes princess-flower-spin {
  to { transform: rotate(360deg); }
}
@keyframes princess-wave-drift {
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .princess-wave, .princess-loading-flower { animation: none; }
}
</style>
