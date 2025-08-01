import { configure, defineRule } from 'vee-validate'
import * as rules from '@vee-validate/rules'

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(rules).forEach(([name, rule]) => {
    if (typeof rule === 'function') {
      defineRule(name, rule as any)
    }
  })

  configure({
    generateMessage: (ctx) => {
      const { t } = nuxtApp.$i18n || { t: (key: string) => key }

      const fieldNames = {
        name: t('forms.fields.name'),
        email: t('forms.fields.email'),
        subject: t('forms.fields.subject'),
        message: t('forms.fields.message'),
        login: t('forms.fields.login'),
        username: t('forms.fields.login'),
        password: t('forms.fields.password'),
      }

      const fieldName = fieldNames[ctx.field] || ctx.field

      const messages = {
        email: t('forms.fieldMessages.error.email'),
        required: t('forms.fieldMessages.error.required', { fieldName }),
      }

      return messages[ctx.rule.name] || t('forms.fieldMessages.error.invalidField', { fieldName })
    },
  })
})
