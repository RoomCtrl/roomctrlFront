<template>
  <div>
    <div>
      <h2 class="text-2xl font-semibold mb-1">
        {{ $t('pages.settings.changePassword.title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        {{ $t('pages.settings.changePassword.description') }}
      </p>
    </div>
    <Card>
      <template #content>
        <div class="flex flex-col items-center gap-6">
          <div class="self-start">
            <Button
              label="Wyslij token na maila"
              severity="help"
              @click="handleSendCode"
            />
          </div>
          <form
            class="flex flex-col gap-4"
            @submit.prevent="submitForm"
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
    summary: t('pages.settings.info.codeSent'),
    detail: t('pages.settings.info.checkEmail'),
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
      summary: t('toast.success'),
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
