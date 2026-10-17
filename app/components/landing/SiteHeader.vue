<template lang="pug">
header.site-header
  NuxtLink.wordmark(to="/" aria-label="CureFlora home") cureflora
    span.wordmark-star(aria-hidden="true") ✳
  nav.header-nav(aria-label="Main navigation")
    NuxtLink(to="/#collection") フローラル・トルビヨン
    NuxtLink(to="/about") フォームチェンジ
  a.header-cta(href="/#collection") Take a look
    span(aria-hidden="true") ↗
</template>
