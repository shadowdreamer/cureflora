<template lang="pug">
section#collection.collection(aria-labelledby="collection-title")
  .collection-intro(data-reveal)
    p.eyebrow THE COLLECTION
    .collection-heading
      h2#collection-title.japanese-display(lang="ja") 強く　優しく　美しく
      p No grand occasions. Just little things
        br
        | that make you stop, look, and feel.
  .photo-grid
    LandingPhotoCard(v-for="(photo, index) in photos" :key="photo.id" :photo="photo" :index="index" @open="openPhoto")
  .collection-end(data-reveal)
    span.small-flower(aria-hidden="true") ✳
    p.japanese-display(lang="ja") 咲きほこる
      br
      | 花のプリンセス！
    span.eyebrow END OF THIS LITTLE WANDER
  LandingPhotoLightbox(:photos="photos" :active-index="activeIndex" @close="activeIndex = null" @change="activeIndex = $event")
</template>

<script setup lang="ts">
import { photos } from '~/data/photos'
const activeIndex = ref<number | null>(null)
function openPhoto(index: number) { activeIndex.value = index }
</script>
