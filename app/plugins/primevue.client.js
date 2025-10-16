import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'

export default defineNuxtPlugin({
  name: 'primevue-locale',
  dependsOn: ['i18n:plugin'],
  async setup(nuxtApp) {
    const { locale, t } = nuxtApp.$i18n

    const updatePrimeVueLocale = () => {
      return {
        startsWith: t('primevue.filters.startsWith'),
        contains: t('primevue.filters.contains'),
        notContains: t('primevue.filters.notContains'),
        endsWith: t('primevue.filters.endsWith'),
        equals: t('primevue.filters.equals'),
        notEquals: t('primevue.filters.notEquals'),
        noFilter: t('primevue.filters.noFilter'),
        lt: t('primevue.filters.lt'),
        lte: t('primevue.filters.lte'),
        gt: t('primevue.filters.gt'),
        gte: t('primevue.filters.gte'),
        dateIs: t('primevue.filters.dateIs'),
        dateIsNot: t('primevue.filters.dateIsNot'),
        dateBefore: t('primevue.filters.dateBefore'),
        dateAfter: t('primevue.filters.dateAfter'),
        clear: t('primevue.filters.clear'),
        apply: t('primevue.filters.apply'),
        matchAll: t('primevue.filters.matchAll'),
        matchAny: t('primevue.filters.matchAny'),
        addRule: t('primevue.filters.addRule'),
        removeRule: t('primevue.filters.removeRule'),
      }
    }

    await nextTick()

    nuxtApp.vueApp.use(PrimeVue, {
      locale: updatePrimeVueLocale(),
    })

    watch(locale, () => {
      const primevue = nuxtApp.vueApp.config.globalProperties.$primevue
      if (primevue?.config) {
        primevue.config.locale = updatePrimeVueLocale()
      }
    }, { immediate: true })
  },
})
