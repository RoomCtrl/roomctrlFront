import MyCustomPreset from './theme/primevue-preset'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@vee-validate/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],
  devtools: { enabled: true },
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/main.css',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  compatibilityDate: '2025-05-15',
  nitro: {
    compressPublicAssets: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
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
    strategy: 'prefix',
  },
  primevue: {
    options: {
      theme: {
        preset: MyCustomPreset,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities',
          },
        },
      },
    },
  },
  veeValidate: {
    autoImports: false,
  },
})
