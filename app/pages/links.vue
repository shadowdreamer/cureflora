<template lang="pug">
main#main.links-page
  #top
  p.eyebrow LINKS
  h1.japanese-display(lang="ja") 関連リンク
  ul.links-list
    li
      a(href="/qr-catalog.html")
        span(lang="zh-CN") 『Go！プリンセスプリキュア シュガー王国と6人のプリンセス！』のQRコード
        span(aria-hidden="true") ↗
</template>

<script setup lang="ts">
useSeoMeta({
  title: '関連リンク',
  description: 'Go！プリンセスプリキュアのQRコード図鑑など、関連ページへのリンク。',
})
</script>

<style scoped>
.links-page { min-height: 60svh; padding: clamp(48px, 8vw, 100px) 6%; }
h1 { font-size: clamp(36px, 6vw, 80px); margin: 24px 0 48px; }
.links-list { list-style: none; padding: 0; margin: 0; max-width: 1280px; }
.links-list a { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 24px 0; border-block: 1px solid var(--line); font-size: clamp(16px, 1vw, 22px); }
.links-list a:hover { color: var(--muted); }
</style>
