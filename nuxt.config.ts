// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],

  routeRules: {
    '/dashboard/**':{ ssr: false },
    '/':{ ssr: false },
    '/login/':{ ssr: false },
  },

    components: {
    global: true,
    dirs: ['~/components']
    },

  
})