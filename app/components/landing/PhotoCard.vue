<template lang="pug">
figure.photo-card(:class="'photo-card--' + index % 4" :data-parallax="index % 2 ? -45 : 60")
  .photo-mat
    button.photo-open(type="button" :aria-label="'View ' + photo.title" @click="$emit('open', index)")
      NuxtImg(:src="photo.src" :alt="photo.alt" :width="photo.width" :height="photo.height" sizes="90vw sm:45vw lg:46vw" loading="lazy" @error="failed = true" @load="failed = false")
      span.photo-error(v-if="failed") {{ photo.title }} — image unavailable
      span.photo-view(aria-hidden="true") View moment ↗
  figcaption.photo-caption
    div
      h3 {{ photo.title }}
      p(v-if="photo.note") {{ photo.note }}
</template>

<script setup lang="ts">
import type { Photo } from '~/types/photo'
defineProps<{ photo: Photo; index: number }>()
defineEmits<{ open: [index: number] }>()
const failed = ref(false)
</script>
