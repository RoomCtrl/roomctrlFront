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
  ],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'RoomCtrl',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },
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
  runtimeConfig: {
    public: {
      apiBase: 'http://185.25.151.154:8080/api/v1',
    },
  },
  compatibilityDate: '2025-05-15',
  nitro: {
    compressPublicAssets: true,
    devProxy: {
      '/api': {
        target: 'http://185.25.151.154:8080/api/',
        changeOrigin: true,
      },
    },
    routeRules: {
      '/api/**': {
        proxy: 'http://185.25.151.154:8080/api/**',
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
