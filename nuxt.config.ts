// https://nuxt.com/docs/api/configuration/nuxt-config
// <!--鼠标点击特效-->
// <script type="text/javascript" src="https://www.liuzehe.top/upload/bkjs/meme.js"></script>
// <canvas class="fireworks" style="position:fixed;left:0;top:0;z-index:99999999;pointer-events:none;"></canvas>
// <script type="text/javascript" src="https://www.liuzehe.top/upload/bkjs/anime.min.js"></script>
// <script type="text/javascript" src="https://www.liuzehe.top/upload/bkjs/fireworks.js"></script> 
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  devtools: {
    enabled: false // or false to disable
  }
})