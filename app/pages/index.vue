<template lang="pug">
main#main(ref="root")
  #top
  .reading-progress(aria-hidden="true")
  LandingHeroSection
  .journal-note(data-reveal)
    p.eyebrow THE ART OF PAYING ATTENTION
    p.japanese-display.journal-quote(lang="ja")
      span.quote-line 冷たい檻に閉ざされた夢、
      span.quote-line 返して頂きますわ!
      span.quote-line.quote-challenge お覚悟はよろしくて?
    span.journal-note-flower(aria-hidden="true") ✳
  LandingPhotoWall
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
usePhotoWallMotion(root)
useSeoMeta({
  title: '咲きほこる花のプリンセス！',
  description: '強く　優しく　美しく。咲きほこる花のプリンセス！花と光が織りなす、CureFloraのフォトコレクション。',
})
</script>
