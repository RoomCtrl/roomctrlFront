<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col gap-8 items-center">
      <h1 class="text-3xl font-bold pt-[3vh]">
        {{ currentStep === 'email' ? $t('forms.titles.passwordResetRequest') : $t('forms.titles.passwordResetConfirm') }}
      </h1>

      <div
        v-if="currentStep === 'email'"
        class="flex flex-col gap-4"
      >
        <div class="w-[70vw] md:w-[23rem]">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-envelope" />
            </InputGroupAddon>
            <FloatLabel variant="on">
              <InputText
                id="email"
                v-model="email"
                :class="{ 'p-invalid': emailError }"
                type="email"
                autofocus
                @blur="emailBlur"
              />
              <label for="email">{{ $t('forms.fields.email') }}</label>
            </FloatLabel>
          </InputGroup>
          <Message
            v-if="emailError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ emailError }}
          </Message>
        </div>

        <div class="flex justify-center">
          <Button
            type="submit"
            :label="$t('common.buttons.sendCode')"
            :loading="loading"
            class="w-[65vw] md:w-[15rem]"
          />
        </div>

        <div class="text-center">
          <NuxtLink
            to="/login"
          >
            <Button
              type="button"
              :label="$t('common.buttons.backToEmailStep')"
              icon="pi pi-arrow-circle-left"
              text
            />
          </NuxtLink>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col gap-4"
      >
        <div class="w-[70vw] md:w-[23rem]">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-key" />
            </InputGroupAddon>
            <FloatLabel variant="on">
              <InputText
                id="token"
                v-model="token"
                :class="{ 'p-invalid': tokenError }"
                type="text"
                @blur="tokenBlur"
              />
              <label for="token">{{ $t('forms.fields.resetToken') }}</label>
            </FloatLabel>
          </InputGroup>
          <Message
            v-if="tokenError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ tokenError }}
          </Message>
        </div>

        <div class="w-[70vw] md:w-[23rem]">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-lock" />
            </InputGroupAddon>
            <FloatLabel variant="on">
              <Password
                id="newPassword"
                v-model="newPassword"
                :class="{ 'p-invalid': newPasswordError }"
                type="password"
                toggleMask
                fluid
                @blur="newPasswordBlur"
              />
              <label for="newPassword">{{ $t('forms.fields.newPassword') }}</label>
            </FloatLabel>
          </InputGroup>
          <Message
            v-if="newPasswordError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ newPasswordError }}
          </Message>
        </div>

        <div class="w-[70vw] md:w-[23rem]">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-lock" />
            </InputGroupAddon>
            <FloatLabel variant="on">
              <Password
                id="confirmPassword"
                v-model="confirmPassword"
                :class="{ 'p-invalid': confirmPasswordError }"
                type="password"
                toggleMask
                fluid
                :feedback="false"
                @blur="confirmPasswordBlur"
              />
              <label for="confirmPassword">{{ $t('forms.fields.confirmPassword') }}</label>
            </FloatLabel>
          </InputGroup>
          <Message
            v-if="confirmPasswordError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ confirmPasswordError }}
          </Message>
        </div>

        <div class="flex flex-col gap-2 items-center text-center">
          <Button
            type="submit"
            :label="$t('common.buttons.resetPassword')"
            :loading="loading"
            class="w-[65vw] md:w-[15rem]"
          />
          <Button
            type="button"
            :label="$t('common.buttons.backToEmailStep')"
            icon="pi pi-arrow-circle-left"
            text
            @click="goBackToEmail"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField, defineRule } from 'vee-validate'
import { required, email as emailRule } from '@vee-validate/rules'
import { AuthRepository } from '~/repositories/AuthRepository'
import { useToast } from 'primevue/usetoast'

interface ErrorResponse {
  data?: {
    message?: string
  }
}

defineRule('required', required)
defineRule('email', emailRule)

const authRepository = new AuthRepository()
const toast = useToast()
const { t } = useI18n()

const currentStep = ref<'email' | 'confirm'>('email')
const loading = ref<boolean>(false)

// Formularz dla emaila
const emailSchema = {
  email: 'required|email',
}

const { handleSubmit: handleEmailSubmit, resetForm: resetEmailForm } = useForm({
  validationSchema: emailSchema,
})

const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')

// Formularz dla potwierdzenia
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
          summary: t('messages.success'),
          detail: t('messages.passwordResetCodeSent'),
          life: 5000,
        })

        currentStep.value = 'confirm'
      }
      catch (error) {
        const errorResponse = error as ErrorResponse
        toast.add({
          severity: 'error',
          summary: t('messages.error'),
          detail: errorResponse?.data?.message || t('messages.passwordResetRequestFailed'),
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
          summary: t('messages.error'),
          detail: t('messages.passwordsDoNotMatch'),
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
          summary: t('messages.success'),
          detail: t('messages.passwordResetSuccess'),
          life: 5000,
        })

        resetEmailForm()
        resetConfirmForm()

        await navigateTo('/login')
      }
      catch (error) {
        const errorResponse = error as ErrorResponse
        toast.add({
          severity: 'error',
          summary: t('messages.error'),
          detail: errorResponse?.data?.message || t('messages.passwordResetFailed'),
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
