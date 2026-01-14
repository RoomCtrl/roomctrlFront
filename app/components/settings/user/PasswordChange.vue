<template>
  <div>
    <Card pt:title:class="flex justify-between">
      <template #title>
        <div>
          <h2 class="text-2xl font-semibold mb-1">
            {{ $t('pages.settings.changePassword.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6 text-base">
            {{ $t('pages.settings.changePassword.description') }}
          </p>
        </div>
        <div class="self-center">
          <Button
            :label="$t('common.buttons.sendToken')"
            severity="help"
            @click="handleSendCode"
          />
        </div>
      </template>
      <template #content>
        <div class="flex flex-col items-center">
          <form
            class="flex flex-col"
            @submit.prevent="submitForm"
          >
            <div class="w-[70vw] md:w-[23rem]">
              <CommonFormsTextField
                id="token"
                v-model="token"
                :label="$t('forms.fields.user.resetToken')"
                :errorMessage="tokenError"
                fluid
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
                fluid
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
                fluid
                icon="pi pi-lock"
                @blur="confirmPasswordBlur"
              />
            </div>

            <div class="flex flex-col gap-2 items-center text-center">
              <Button
                type="submit"
                severity="success"
                :label="$t('common.buttons.resetPassword')"
                :loading="loading"
                class="w-[65vw] md:w-[15rem]"
              />
            </div>
          </form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import type { IChangePasswordForm } from '~/interfaces/UsersInterfaces'
import { AuthRepository } from '~/repositories/AuthRepository'

const { user } = useAuth()
const authRepository = new AuthRepository()

const { t } = useI18n()
const toast = useToast()
const loading = ref(false)
const { handleSubmit, resetForm } = useForm<IChangePasswordForm>({
  validationSchema: {
    token: 'required',
    newPassword: 'required|min:8',
    confirmPassword: 'required|min:8',
  },
})

const { value: token, errorMessage: tokenError, handleBlur: tokenBlur } = useField<string>('token')
const { value: newPassword, errorMessage: newPasswordError, handleBlur: newPasswordBlur } = useField<string>('newPassword')
const { value: confirmPassword, errorMessage: confirmPasswordError, handleBlur: confirmPasswordBlur } = useField<string>('confirmPassword')

const handleSendCode = async () => {
  await authRepository.passwordResetRequest({ email: user.value.email })
  toast.add({
    severity: 'info',
    summary: t('toast.summary.codeSent'),
    detail: t('toast.details.checkEmail'),
    life: 3000,
  })
}

const submitForm = handleSubmit(async (formValues: IChangePasswordForm) => {
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
      summary: t('toast.summary.success'),
      detail: t('toast.messages.passwordResetSuccess'),
      life: 5000,
    })

    resetForm()

    setTimeout(async () => {
      await navigateTo('/login')
    }, 2000)
  }
  catch (error) {
    const errorResponse = error
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
})
</script>
