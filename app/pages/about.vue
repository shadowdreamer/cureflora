<template lang="pug">
main#main.about-page
  #top
  .about-kv
    .about-kv-heading
      p.eyebrow A LITTLE ABOUT CUREFLORA
      h1.japanese-display(lang="ja") 花とともに、
        br
        | 美しく。
    .about-kv-image
      NuxtImg(src="/photos/GKzSRHeagAAWDmH.webp" alt="Cure Flora smiling with flowing golden hair, illustrated on pink and yellow torn notebook paper" width="666" height="900" sizes="88vw md:40vw lg:480px" loading="eager" fetchpriority="high")
  .about-copy
    p 『ノーブル学園』に通う中学１年生。 元気いっぱいで笑顔がステキな女の子。 夢を叶えるためにがんばる気持ちはだれにも負けない。
    p 大事にしている絵本に出てくるプリンセスにあこがれており、今でも「プリンセスになる」という夢を大切にしている。
    p 花のプリンセス『キュアフローラ』に変身
    p 誕生日：4月10日
    p 好きなもの：お花・動物・『花のプリンセス』という絵本
    p Floraはラテン語で「花」「春」の意。英語では、ある地域もしくは時代における全ての植物の種の総体を表す学術用語「植物相」の意。
    NuxtLink.text-link(to="/#collection") Back to the collection ↗
  section#credits.image-credits(aria-labelledby="credits-title")
    p.eyebrow WITH THANKS
    h2#credits-title.japanese-display(lang="ja") イラストについて
    ul
      li(v-for="photo in photos" :key="photo.id")
        a(v-if="photo.sourceUrl" :href="photo.sourceUrl" target="_blank" rel="noopener noreferrer") {{ photo.title }} ↗
        span(v-else) {{ photo.title }}
        small.credit-reference(v-if="photo.artist") {{ photo.artist }}
</template>

<script setup lang="ts">
import { photos } from '~/data/photos'
useSeoMeta({ title: 'A little about us', description: 'A visual journal about slowing down, looking closer, and noticing the beautifully ordinary. Explore CureFlora and our image credits.' })
</script>
