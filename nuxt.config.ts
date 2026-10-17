export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2026-10-17',
  devtools: { enabled: false },
  vite: { optimizeDeps: { include: ['gsap', 'gsap/ScrollTrigger', 'lenis'] } },
  app: { head: {
    htmlAttrs: { lang: 'en' },
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1',
    meta: [{ name: 'theme-color', content: '#f6f2e9' }],
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  } },
  image: { format: ['webp'], quality: 82 },
  runtimeConfig: { public: { siteUrl: '' } },
  typescript: { strict: true },
  hooks: {
    'prepare:types'({ tsConfig }) {
      tsConfig.vueCompilerOptions ||= {}
      tsConfig.vueCompilerOptions.plugins ||= []
      tsConfig.vueCompilerOptions.plugins.push('@vue/language-plugin-pug')
    },
  },
  nitro: { prerender: { routes: ['/', '/about'], crawlLinks: true } },
})
