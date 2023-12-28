// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      title: "T-rex Multiplayer",
      htmlAttrs: {
        lang: 'en'
      },
    }
  },
})
