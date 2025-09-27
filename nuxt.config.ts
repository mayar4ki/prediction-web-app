// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "nuxt-file-storage",
    "@nuxtjs/i18n",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "@/components/ui",
  },
  routeRules: {
    // pages pre-rendered at build time
    "/": { prerender: true },
    "/info/**": { prerender: true },

    //  Client-side rendering only (no SSR)
    "/dashboard/**": { ssr: false },
    "/profile/**": { ssr: false },
  },
  fileStorage: {
    mount: process.env.FILE_STORAGE_MOUNT,
  },

  i18n: {
    defaultLocale: "en",
    strategy: "prefix",
    locales: [
      { code: "en", name: "English", file: "./en.json" },
      { code: "zh-CN", name: "简体中文", file: "./zh-CN.json" },
      { code: "ja", name: "日本語", file: "./ja.json" },
      // { code: "it", name: "Italiano", file: "./it.json" },
      // { code: "de", name: "Deutsch", file: "./de.json" },
      // { code: "fr", name: "Français", file: "./fr.json" },
      // { code: "es", name: "Español", file: "./es.json" },
      // { code: "ru", name: "Русский", file: "./ru.json" },
      { code: "vi", name: "Tiếng Việt", file: "./vi.json" },
    ],
  },
});
