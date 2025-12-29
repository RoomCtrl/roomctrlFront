<template>
  <div>
    <div>
      <h2 class="text-2xl font-semibold mb-1">
        {{ $t('pages.settings.changePassword.title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        {{ $t('pages.settings.changePassword.description') || 'Update your password' }}
      </p>
    </div>
    <Card>
      <template #content>
        <form
          novalidate
          @submit.prevent="handlePasswordChange"
        >
          <div>
            <div
              id="currentPasswordLabel"
              class="block mb-2 font-semibold"
            >
              {{ t('pages.settings.changePassword.currentPassword') }}
            </div>
            <Password
              v-model="passwordForm.currentPassword"
              class="w-full"
              aria-labelledby="currentPasswordLabel"
              :feedback="false"
            />
          </div>

          <div class="mt-4">
            <div
              id="newPasswordLabel"
              class="block mb-2 font-semibold"
            >
              {{ t('pages.settings.changePassword.newPassword') }}
            </div>
            <Password
              v-model="passwordForm.newPassword"
              class="w-full"
              aria-labelledby="newPasswordLabel"
              toggle-mask
            />
          </div>

          <div class="mt-4">
            <div
              id="confirmPasswordLabel"
              class="block mb-2 font-semibold"
            >
              {{ t('pages.settings.changePassword.confirmPassword') }}
            </div>
            <Password
              v-model="passwordForm.confirmPassword"
              class="w-full"
              aria-labelledby="confirmPasswordLabel"
              :feedback="false"
            />
          </div>

          <div class="flex gap-3 mt-6">
            <Button
              type="submit"
              :label="$t('pages.settings.changePassword.change')"
            />
            <Button
              type="button"
              :label="$t('common.buttons.cancel')"
              variant="outlined"
              @click="resetPasswordForm"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { IChangePasswordForm } from '~/interfaces/UsersInterfaces'

const { t } = useI18n()
const toast = useToast()
const { handleSubmit } = useForm({
  validationSchema: {
    currentPassword: 'required',
    newPassword: 'required|min:8',
    confirmPassword: 'required|same:newPassword',
  },
})

const passwordForm = reactive<IChangePasswordForm>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const resetPasswordForm = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

const handlePasswordChange = async () => {
  if (!passwordForm.currentPassword) {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.settings.validation.currentPasswordRequired'),
      life: 3000,
    })
    return
  }

  if (!passwordForm.newPassword) {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.settings.validation.newPasswordRequired'),
      life: 3000,
    })
    return
  }

  if (passwordForm.newPassword.length < 8) {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.settings.validation.passwordTooShort'),
      life: 3000,
    })
    return
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.settings.validation.passwordMismatch'),
      life: 3000,
    })
    return
  }

  const success = await changePassword(passwordForm)
  if (success) {
    resetPasswordForm()
    toast.add({
      severity: 'success',
      summary: t('common.buttons.save'),
      detail: t('pages.settings.success.passwordChanged'),
      life: 3000,
    })
  }
  else {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.settings.error.passwordChangeFailed'),
      life: 3000,
    })
  }
}
</script>
