<template lang="pug">
footer.site-footer
  .footer-top
    div
      p.eyebrow A SMALL REMINDER
      p.footer-invitation.japanese-display(lang="ja") 強く　優しく　美しく
    a.round-link(href="#top" aria-label="Back to top") ↑
  .footer-bottom
    NuxtLink.wordmark(to="/") cureflora✳
    p An independent visual journal. © {{ year }}
    NuxtLink(to="/about#credits") Image credits ↗
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
