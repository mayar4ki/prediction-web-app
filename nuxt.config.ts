// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@wagmi/vue/nuxt'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    '/info/**': { prerender: true },

    '/bet/show/**': { swr: 60 },
    '/bet/show2/**': { isr: 60 },


    // Blog post page generated on demand once until next deployment, cached on CDN
    // '/blog/**': { isr: true },


    // Admin dashboard renders only on client-side
    // '/admin/**': { ssr: false },

    // Add cors headers on API routes
    // '/api/**': { cors: true },


  }
})