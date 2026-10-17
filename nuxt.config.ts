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
    script: [{
      key: 'princess-loading-boot',
      innerHTML: "document.documentElement.classList.add('princess-loading-active');setTimeout(function(){document.documentElement.classList.remove('princess-loading-active')},7500)",
    }],
    style: [{
      key: 'princess-loading-critical',
      innerHTML: 'html.princess-loading-active{overflow:hidden}html.princess-loading-active .princess-loader{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;overflow:hidden;color:#794652}html.princess-loading-active .princess-curtain{position:absolute;inset:0;background:#ead5d2}.princess-loading-text{position:relative;font-family:Georgia,serif;font-size:clamp(18px,2vw,28px);text-align:center;display:flex;align-items:center;justify-content:center;gap:14px}.princess-loading-flower{width:1em;height:1em;fill:currentColor}.princess-loader{display:none}',
    }],
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
