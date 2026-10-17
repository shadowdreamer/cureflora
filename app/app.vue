<template lang="pug">
.site-content(:inert="mounted && !introReady")
  NuxtLayout
    NuxtPage
LandingLoadingScreen
</template>

<script setup lang="ts">
const introReady = useState('intro-ready', () => false)
const mounted = ref(false)
onMounted(() => { mounted.value = true })
</script>
