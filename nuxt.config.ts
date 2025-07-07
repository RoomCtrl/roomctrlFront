import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@vee-validate/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2025-05-15',
  nitro: {
    compressPublicAssets: true,
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { code: 'en', iso: 'en-US', file: 'en/index.js' },
      { code: 'pl', iso: 'pl-PL', file: 'pl/index.js' },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'pl',
  },
  primevue: {
    autoImport: false,
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    },
  },
  veeValidate: {
    autoImports: false,
  },
})
