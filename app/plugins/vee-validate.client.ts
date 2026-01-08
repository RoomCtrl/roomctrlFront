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

  defineRule('phone', (value: string) => {
    if (!value) {
      return true
    }
    // Usuwa wszystkie znaki oprócz cyfr i +
    const cleaned = value.replace(/[^\d+]/g, '')
    // Sprawdza czy zaczyna się od + i ma 10-15 cyfr lub ma 9-15 cyfr bez +
    const phoneRegex = /^(\+?\d{9,15})$/
    return phoneRegex.test(cleaned)
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
        capacity: t('forms.fields.room.capacity'),
        size: t('forms.fields.room.size'),
        location: t('forms.fields.room.location'),
        roomName: t('forms.fields.room.name'),
        access: t('forms.fields.room.access'),
        description: t('forms.fields.description'),
        airConditioningMin: t('forms.fields.room.airConditioningMin'),
        airConditioningMax: t('forms.fields.room.airConditioningMax'),
      }

      const fieldName = fieldNames[ctx.field] || ctx.field

      const messages = {
        email: t('forms.fieldMessages.error.email'),
        required: t('forms.fieldMessages.error.required', { fieldName }),
        accepted: t('forms.fieldMessages.error.acceptTerms'),
        min: t('forms.fieldMessages.error.min', { fieldName, length: ctx.rule.params[0] }),
        max: t('forms.fieldMessages.error.max', { fieldName, length: ctx.rule.params[0] }),
        min_value: t('forms.fieldMessages.error.minValue', { fieldName, length: ctx.rule.params[0] }),
        max_value: t('forms.fieldMessages.error.maxValue', { fieldName, length: ctx.rule.params[0] }),
        integer: t('forms.fieldMessages.error.integer', { fieldName }),
        phone: t('forms.fieldMessages.error.phone'),
      }

      return messages[ctx.rule.name] || t('forms.fieldMessages.error.invalidField', { fieldName })
    },
  })
})
