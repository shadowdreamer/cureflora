<template lang="pug">
main#main.about-page
  #top
  p.eyebrow A LITTLE ABOUT CUREFLORA
  h1.japanese-display(lang="ja") 花とともに、
    br
    | 美しく。
  .about-copy
    p floraはラテン語で「花」「春」の意。英語では、ある地域もしくは時代における全ての植物の種の総体を表す学術用語「植物相」の意。
    p またはローマ神話の花の女神・フロラ(フローラ)から。
    p 「花」を意味する単語を使ったプリキュア名は、キュアブルーム(bloom)、キュアブロッサム(blossom)、キュアフラワー(flower)と過去作でほぼ出尽くしていたので多少ひねりを加えたネーミングといえるが、花のイメージを残しつつもよりスケールアップした形となった。.
    NuxtLink.text-link(to="/#collection") Back to the collection ↗
  section#credits.image-credits(aria-labelledby="credits-title")
    p.eyebrow WITH THANKS
    h2#credits-title.japanese-display(lang="ja") イラストについて
    p Illustration titles, captions and artist names are sourced from the linked Pixiv works. Reference numbers are preserved from the original filenames. The illustration without a reference number has no confirmed source.
    ul
      li(v-for="photo in photos" :key="photo.id")
        a(v-if="photo.sourceUrl" :href="photo.sourceUrl" target="_blank" rel="noopener noreferrer") {{ photo.title }} ↗
        span(v-else) {{ photo.title }}
        small.credit-reference(v-if="photo.artist") {{ photo.artist }}
        small.credit-reference {{ photo.artworkNumber ? 'No. ' + photo.artworkNumber : photo.originalFilename }}
</template>

<script setup lang="ts">
import { photos } from '~/data/photos'
useSeoMeta({ title: 'A little about us', description: 'A visual journal about slowing down, looking closer, and noticing the beautifully ordinary. Explore CureFlora and our image credits.' })
</script>
