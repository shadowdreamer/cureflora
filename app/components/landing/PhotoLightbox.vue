<template lang="pug">
dialog.photo-lightbox(ref="dialog" aria-labelledby="lightbox-title" @cancel.prevent="close" @click="onBackdrop" @keydown="onKeydown")
  .lightbox-toolbar
    span.eyebrow CUREFLORA / A CLOSER LOOK
    button.lightbox-close(type="button" autofocus aria-label="Close photo" @click="close") Close ×
  .lightbox-content(v-if="photo")
    button.lightbox-arrow(type="button" aria-label="Previous photo" @click="move(-1)") ←
    figure.lightbox-figure
      img(:key="photo.id" :src="photo.src" :alt="photo.alt" :width="photo.width" :height="photo.height" decoding="async")
      figcaption
        div
          h2#lightbox-title {{ photo.title }}
          p(v-if="photo.note") {{ photo.note }}
          p(v-if="photo.artist") {{ photo.artist }}
          a.lightbox-source(v-if="photo.sourceUrl" :href="photo.sourceUrl" target="_blank" rel="noopener noreferrer") View on Pixiv ↗
        span {{ String((activeIndex ?? 0) + 1).padStart(2, '0') }} / {{ String(photos.length).padStart(2, '0') }}
    button.lightbox-arrow(type="button" aria-label="Next photo" @click="move(1)") →
  p.lightbox-hint ← → to wander · Esc to return
</template>

<script setup lang="ts">
import type { Photo } from '~/types/photo'
const props = defineProps<{ photos: Photo[]; activeIndex: number | null }>()
const emit = defineEmits<{ close: []; change: [index: number] }>()
const dialog = ref<HTMLDialogElement | null>(null)
const photo = computed(() => props.activeIndex === null ? undefined : props.photos[props.activeIndex])
const { $motion } = useNuxtApp()
let previousFocus: HTMLElement | null = null
let previousOverflow: string | undefined
function unlock() {
  if (previousOverflow === undefined) return
  document.documentElement.style.overflow = previousOverflow
  previousOverflow = undefined
  $motion?.setScrollLocked(false)
}
function close() { emit('close') }
function move(direction: number) {
  if (props.activeIndex !== null) emit('change', (props.activeIndex + direction + props.photos.length) % props.photos.length)
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault()
    move(event.key === 'ArrowRight' ? 1 : -1)
  }
}
function onBackdrop(event: MouseEvent) { if (event.target === dialog.value) close() }
watch(() => props.activeIndex !== null, async open => {
  await nextTick()
  if (!dialog.value) return
  if (open && !dialog.value.open) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    previousOverflow = document.documentElement.style.overflow
    $motion?.setScrollLocked(true)
    document.documentElement.style.overflow = 'hidden'
    dialog.value.showModal()
  } else if (!open) {
    dialog.value.close()
    unlock()
    previousFocus?.focus({ preventScroll: true })
  }
})
onBeforeUnmount(() => { dialog.value?.close(); unlock() })
</script>
