<template lang="pug">
section.hero(aria-labelledby="hero-title")
  .hero-kicker
    span A VISUAL JOURNAL OF SMALL WONDERS
    span EST. IN THE EVERYDAY
  .hero-main
    .hero-copy
      .hero-title-wrap
        h1#hero-title.hero-title.japanese-display(lang="ja")
          span.hero-title-first 咲きほこる
          span.hero-title-second 花のプリンセス！
      .hero-description
        p Flowers. Fleeting light.
          br
          | And the beauty in between.
        a.text-link(href="#collection") Explore the collection
          span(aria-hidden="true") ↘
    .hero-art
      LandingAlstroemeria.hero-flower
      figure.hero-photo-frame
        .hero-photo
          NuxtImg(:src="heroPhoto.src" :alt="heroPhoto.alt" :width="heroPhoto.width" :height="heroPhoto.height" sizes="100vw lg:48vw" loading="eager" fetchpriority="high")
        figcaption.hero-photo-label A MOMENT, HELD STILL.
      p.hero-side-note
        span(lang="ja") ごきげんよう。
        span A gentler way of seeing.
  .hero-footnote
    span SCROLL SLOWLY. STAY A WHILE.
    span(aria-hidden="true") ↓
    span 01 — THE COLLECTION
</template>

<script setup lang="ts">
import { heroPhoto } from '~/data/photos'
</script>
