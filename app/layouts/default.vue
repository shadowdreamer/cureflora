<template lang="pug">
.site-shell
  a.skip-link(href="#main") Skip to content
  LandingSiteHeader
  slot
  LandingSiteFooter
</template>

<script setup lang="ts">
import { heroPhoto } from '~/data/photos'
const route = useRoute()
const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/+$/, '')
const canonical = computed(() => siteUrl ? `${siteUrl}${route.path}` : undefined)
const shareImage = siteUrl ? `${siteUrl}${heroPhoto.src}` : heroPhoto.src
useHead({
  titleTemplate: title => title ? `${title} — CureFlora` : 'CureFlora — A little closer to wonder',
  link: () => canonical.value ? [{ rel: 'canonical', href: canonical.value }] : [],
})
useSeoMeta({
  description: 'A quiet collection of flowers, fleeting light, and the beauty in between. An independent visual journal by CureFlora.',
  ogSiteName: 'CureFlora',
  ogType: 'website',
  ogUrl: () => canonical.value,
  ogImage: shareImage,
  twitterCard: 'summary_large_image',
  twitterImage: shareImage,
})
</script>
