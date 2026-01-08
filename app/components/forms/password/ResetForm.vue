<template>
  <Toast />
  <form @submit.prevent="submitForm">
    <div class="flex flex-col gap-8 items-center">
      <div
        class="self-start"
      >
        <NuxtLink
          v-if="currentStep === 'email'"
          to="/login"
        >
          <Button
            type="button"
            :label="$t('common.buttons.backToLogin')"
            icon="pi pi-arrow-circle-left"
            text
          />
        </NuxtLink>
        <Button
          v-else
          type="button"
          :label="$t('common.buttons.backToEmailStep')"
          icon="pi pi-arrow-circle-left"
          text
          @click="goBackToEmail"
        />
      </div>
      <h1 class="text-3xl font-bold">
        {{ currentStep === 'email' ? $t('forms.titles.passwordResetRequest') : $t('forms.titles.passwordResetConfirm') }}
      </h1>

      <div
        v-if="currentStep === 'email'"
        class="flex flex-col gap-4"
      >
        <div class="w-[70vw] md:w-[23rem]">
          <CommonFormsTextField
            id="email"
            v-model="email"
            :label="$t('forms.fields.email')"
            :errorMessage="emailError"
            icon="pi pi-envelope"
            @blur="emailBlur"
          />
        </div>

        <div class="flex justify-center">
          <Button
            type="submit"
            :label="$t('common.buttons.sendCode')"
            :loading="loading"
            class="w-[65vw] md:w-[15rem]"
          />
        </div>
      </div>

      <div
        v-else
        class="flex flex-col"
      >
        <div class="w-[70vw] md:w-[23rem]">
          <CommonFormsTextField
            id="token"
            v-model="token"
            :label="$t('forms.fields.user.resetToken')"
            :errorMessage="tokenError"
            icon="pi pi-key"
            @blur="tokenBlur"
          />
        </div>

        <div class="w-[70vw] md:w-[23rem]">
          <CommonFormsPasswordField
            id="newPassword"
            v-model="newPassword"
            :label="$t('forms.fields.user.newPassword')"
            :errorMessage="newPasswordError"
            icon="pi pi-lock"
            @blur="newPasswordBlur"
          />
        </div>

        <div class="w-[70vw] md:w-[23rem]">
          <CommonFormsPasswordField
            id="confirmPassword"
            v-model="confirmPassword"
            :label="$t('forms.fields.user.confirmPassword')"
            :errorMessage="confirmPasswordError"
            icon="pi pi-lock"
            @blur="confirmPasswordBlur"
          />
        </div>

        <div class="flex flex-col gap-2 items-center text-center">
          <Button
            type="submit"
            :label="$t('common.buttons.resetPassword')"
            :loading="loading"
            class="w-[65vw] md:w-[15rem]"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField, defineRule } from 'vee-validate'
import { AuthRepository } from '~/repositories/AuthRepository'
import { useToast } from 'primevue/usetoast'

interface ErrorResponse {
  data?: {
    message?: string
  }
}

const authRepository = new AuthRepository()
const toast = useToast()
const { t } = useI18n()

const currentStep = ref<'email' | 'confirm'>('email')
const loading = ref<boolean>(false)

const emailSchema = {
  email: 'required|email',
}

const { handleSubmit: handleEmailSubmit, resetForm: resetEmailForm } = useForm({
  validationSchema: emailSchema,
})

const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')

const confirmSchema = {
  token: 'required',
  newPassword: 'required',
  confirmPassword: 'required',
}

const { handleSubmit: handleConfirmSubmit, resetForm: resetConfirmForm } = useForm({
  validationSchema: confirmSchema,
})

const { value: token, errorMessage: tokenError, handleBlur: tokenBlur } = useField<string>('token')
const { value: newPassword, errorMessage: newPasswordError, handleBlur: newPasswordBlur } = useField<string>('newPassword')
const { value: confirmPassword, errorMessage: confirmPasswordError, handleBlur: confirmPasswordBlur } = useField<string>('confirmPassword')

const submitForm = async () => {
  if (currentStep.value === 'email') {
    await handleEmailSubmit(async (formValues) => {
      loading.value = true

      try {
        await authRepository.passwordResetRequest({ email: formValues.email })

        toast.add({
          severity: 'success',
          summary: t('toast.success'),
          detail: t('toast.messages.passwordResetCodeSent'),
          life: 5000,
        })

        currentStep.value = 'confirm'
      }
      catch (error) {
        const errorResponse = error as ErrorResponse
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: errorResponse?.data?.message || t('toast.messages.passwordResetRequestFailed'),
          life: 5000,
        })
      }
      finally {
        loading.value = false
      }
    })()
  }
  else {
    await handleConfirmSubmit(async (formValues) => {
      if (formValues.newPassword !== formValues.confirmPassword) {
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: t('toast.messages.passwordsDoNotMatch'),
          life: 5000,
        })
        return
      }

      loading.value = true

      try {
        await authRepository.passwordResetConfirm({
          token: formValues.token,
          newPassword: formValues.newPassword,
        })

        toast.add({
          severity: 'success',
          summary: t('toast.success'),
          detail: t('toast.messages.passwordResetSuccess'),
          life: 5000,
        })

        resetEmailForm()
        resetConfirmForm()

        setTimeout(async () => {
          await navigateTo('/login')
        }, 2000)
      }
      catch (error) {
        const errorResponse = error as ErrorResponse
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: errorResponse?.data?.message || t('toast.messages.passwordResetFailed'),
          life: 5000,
        })
      }
      finally {
        loading.value = false
      }
    })()
  }
}

const goBackToEmail = () => {
  currentStep.value = 'email'
  resetConfirmForm()
}
</script>
