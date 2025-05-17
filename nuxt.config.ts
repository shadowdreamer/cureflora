// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", '@nuxt/image'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  css: ["~/style/index.css"],
  devtools: {
    enabled: false
  },

  tailwindcss: {
    viewer: false
  },

  compatibilityDate: '2025-01-04'
})