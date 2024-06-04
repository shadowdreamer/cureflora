<template lang="pug">
slot
</template>
<script setup lang="ts">
const route = useRoute()

useHead({
  title: `${route.meta.title || 'CureFlora'}`,
  meta: [{ property: 'og:title', content: `${route.meta.title}` }]
})
</script>