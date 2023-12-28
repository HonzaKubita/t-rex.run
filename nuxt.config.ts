// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  css: ["@/styles/main.css"],
  app: {
    head: {
      title: "T-rex Multiplayer",
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {rel: "preconnect", href: "https://fonts.googleapis.com"},
        {rel: "preconnect", href: "https://fonts.gstatic.com"},
        {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"}
       ],
    }
  },
})
