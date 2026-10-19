<template lang="pug">
header.site-header
  NuxtLink.wordmark.japanese-display.journal-quote(to="/" aria-label="CureFlora home") キュアフローラ
    LandingAlstroemeria.wordmark-star
  nav.header-nav(aria-label="Main navigation")
    NuxtLink(to="/#collection") フローラル・トルビヨン
    NuxtLink(to="/about") フォームチェンジ
    NuxtLink(to="/links") 関連リンク
  a.header-cta(href="/#collection") Take a look ↘
    span(aria-hidden="true")
</template>
