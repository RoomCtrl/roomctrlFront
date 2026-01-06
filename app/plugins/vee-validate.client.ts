import { configure, defineRule } from 'vee-validate'
import * as rules from '@vee-validate/rules'

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(rules).forEach(([name, rule]) => {
    if (typeof rule === 'function') {
      defineRule(name, rule as any)
    }
  })

  defineRule('accepted', (value: any) => {
    if (value === true) {
      return true
    }
  })
  configure({
    generateMessage: (ctx) => {
      const { t } = nuxtApp.$i18n || { t: (key: string) => key }

      const fieldNames = {
        name: t('forms.fields.room.name'),
        email: t('forms.fields.email'),
        subject: t('forms.fields.subject'),
        message: t('forms.fields.message'),
        login: t('forms.fields.user.login'),
        username: t('forms.fields.user.username'),
        password: t('forms.fields.user.password'),
        phone: t('forms.fields.phone'),
        firstName: t('forms.fields.user.firstName'),
        lastName: t('forms.fields.user.lastName'),
        regon: t('forms.fields.regon'),
        organizationName: t('forms.fields.organizationName'),
        organizationEmail: t('forms.fields.organizationEmail'),
        confirmPassword: t('forms.fields.user.confirmPassword'),
        acceptTerms: t('forms.fields.acceptTerms'),
      }

      const fieldName = fieldNames[ctx.field] || ctx.field

      const messages = {
        email: t('forms.fieldMessages.error.email'),
        required: t('forms.fieldMessages.error.required', { fieldName }),
        accepted: t('forms.fieldMessages.error.acceptTerms'),
        min: t('forms.fieldMessages.error.min', { fieldName, length: ctx.rule.params[0] }),
      }

      return messages[ctx.rule.name] || t('forms.fieldMessages.error.invalidField', { fieldName })
    },
  })
})
