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
    '@hypernym/nuxt-anime',
    'nuxt-qrcode',
  ], pages: true,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'RoomCtrl',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/main.css',
    '~/assets/css/buttons.css',
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
  runtimeConfig: {
    public: {
      apiBase: 'https://roomctrl-backend.madeinpila.pl/api/',
    },
  },
  compatibilityDate: '2025-05-15',
  nitro: {
    compressPublicAssets: true,
    devProxy: {
      '/api': {
        target: 'https://roomctrl-backend.madeinpila.pl/api/',
        changeOrigin: true,
      },
    },
    routeRules: {
      '/api/**': {
        proxy: 'https://roomctrl-backend.madeinpila.pl/api/**',
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
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
        },
      },
    },
  },
  veeValidate: {
    autoImports: false,
  },
})
