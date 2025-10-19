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

        firstDayOfWeek: 1,
        dayNames: [
          t('date.dayNames.sunday'),
          t('date.dayNames.monday'),
          t('date.dayNames.tuesday'),
          t('date.dayNames.wednesday'),
          t('date.dayNames.thursday'),
          t('date.dayNames.friday'),
          t('date.dayNames.saturday'),
        ],
        dayNamesShort: [
          t('date.dayShortNames.sunday'),
          t('date.dayShortNames.monday'),
          t('date.dayShortNames.tuesday'),
          t('date.dayShortNames.wednesday'),
          t('date.dayShortNames.thursday'),
          t('date.dayShortNames.friday'),
          t('date.dayShortNames.saturday'),
        ],
        dayNamesMin: [
          t('date.dayMinNames.sunday'),
          t('date.dayMinNames.monday'),
          t('date.dayMinNames.tuesday'),
          t('date.dayMinNames.wednesday'),
          t('date.dayMinNames.thursday'),
          t('date.dayMinNames.friday'),
          t('date.dayMinNames.saturday'),
        ],
        monthNames: [
          t('date.monthNames.january'),
          t('date.monthNames.february'),
          t('date.monthNames.march'),
          t('date.monthNames.april'),
          t('date.monthNames.may'),
          t('date.monthNames.june'),
          t('date.monthNames.july'),
          t('date.monthNames.august'),
          t('date.monthNames.september'),
          t('date.monthNames.october'),
          t('date.monthNames.november'),
          t('date.monthNames.december'),
        ],
        monthNamesShort: [
          t('date.monthShortNames.january'),
          t('date.monthShortNames.february'),
          t('date.monthShortNames.march'),
          t('date.monthShortNames.april'),
          t('date.monthShortNames.may'),
          t('date.monthShortNames.june'),
          t('date.monthShortNames.july'),
          t('date.monthShortNames.august'),
          t('date.monthShortNames.september'),
          t('date.monthShortNames.october'),
          t('date.monthShortNames.november'),
          t('date.monthShortNames.december'),
        ],
        today: t('date.today'),
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
