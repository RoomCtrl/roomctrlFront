<template>
  <div
    class="flex-1 w-full"
  >
    <div class="w-full max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">
        {{ t('pages.settings.title') }}
      </h1>
      <Toast />

      <div
        v-if="!user"
        class="text-center py-8"
      >
        <p>{{ t('pages.settings.noAccess') }}</p>
      </div>

      <div
        v-else
        class="flex gap-8 flex-col lg:flex-row"
      >
        <div class="w-full lg:w-56 flex-shrink-0">
          <nav class="space-y-1 sticky top-20">
            <button
              v-for="item in settingsMenu"
              :key="item.id"
              class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
              :class="
                activeSection === item.id
                  ? 'bg-primary text-primary-inverse font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              "
              @click="activeSection = item.id as 'profile' | 'password' | 'preferences'"
            >
              {{ item.label }}
            </button>
          </nav>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 min-w-0">
          <div
            v-show="activeSection === 'profile'"
            class="space-y-6"
          >
            <div>
              <h2 class="text-2xl font-semibold mb-1">
                {{ t('pages.settings.personalData.title') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ t('pages.settings.personalData.description') || 'Manage your personal information' }}
              </p>
            </div>
            <Card>
              <template #content>
                <form
                  novalidate
                  @submit.prevent="handleProfileUpdate"
                >
                  <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div
                        id="firstNameLabel"
                        class="block mb-2 font-semibold"
                      >
                        {{ t('pages.settings.personalData.firstName') }}
                      </div>
                      <InputText
                        v-model="formData.firstName"
                        class="w-full"
                        aria-labelledby="firstNameLabel"
                        :disabled="profileLoading"
                      />
                    </div>
                    <div>
                      <div
                        id="lastNameLabel"
                        class="block mb-2 font-semibold"
                      >
                        {{ t('pages.settings.personalData.lastName') }}
                      </div>
                      <InputText
                        v-model="formData.lastName"
                        class="w-full"
                        aria-labelledby="lastNameLabel"
                        :disabled="profileLoading"
                      />
                    </div>
                  </div>

                  <div>
                    <div
                      id="emailLabel"
                      class="block mb-2 font-semibold"
                    >
                      {{ t('pages.settings.personalData.email') }}
                    </div>
                    <InputText
                      v-model="formData.email"
                      type="email"
                      class="w-full"
                      aria-labelledby="emailLabel"
                      :disabled="profileLoading || !isEmailEditable"
                    />
                    <small
                      v-if="!isEmailEditable"
                      class="text-gray-500"
                    >
                      {{ t('pages.settings.personalData.emailNotEditable') }}
                    </small>
                  </div>

                  <div class="mt-4">
                    <div
                      id="phoneLabel"
                      class="block mb-2 font-semibold"
                    >
                      {{ t('pages.settings.personalData.phone') }}
                    </div>
                    <InputText
                      v-model="formData.phone"
                      class="w-full"
                      aria-labelledby="phoneLabel"
                      :disabled="profileLoading"
                    />
                  </div>

                  <div class="flex gap-3 mt-6">
                    <Button
                      type="submit"
                      :label="t('common.buttons.save')"
                      :loading="profileLoading"
                    />
                    <Button
                      type="button"
                      :label="t('common.buttons.cancel')"
                      variant="outlined"
                      @click="resetProfileForm"
                    />
                  </div>
                </form>
              </template>
            </Card>
          </div>

          <div
            v-show="activeSection === 'password'"
            class="space-y-6"
          >
            <div>
              <h2 class="text-2xl font-semibold mb-1">
                {{ t('pages.settings.changePassword.title') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ t('pages.settings.changePassword.description') || 'Update your password' }}
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
                      :disabled="passwordChangeLoading"
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
                      :disabled="passwordChangeLoading"
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
                      :disabled="passwordChangeLoading"
                      :feedback="false"
                    />
                  </div>

                  <div class="flex gap-3 mt-6">
                    <Button
                      type="submit"
                      :label="t('pages.settings.changePassword.change')"
                      :loading="passwordChangeLoading"
                    />
                    <Button
                      type="button"
                      :label="t('common.buttons.cancel')"
                      variant="outlined"
                      @click="resetPasswordForm"
                    />
                  </div>
                </form>
              </template>
            </Card>
          </div>

          <div
            v-show="activeSection === 'preferences'"
            class="space-y-6"
          >
            <div>
              <h2 class="text-2xl font-semibold mb-1">
                {{ t('pages.settings.preferences.title') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ t('pages.settings.preferences.description') || 'Customize your experience' }}
              </p>
            </div>
            <Card>
              <template #content>
                <div class="space-y-6">
                  <div>
                    <div
                      id="languageLabel"
                      class="block mb-2 font-semibold"
                    >
                      {{ t('pages.settings.preferences.language') }}
                    </div>
                    <Dropdown
                      v-model="preferences.language"
                      :options="languageOptions"
                      option-label="label"
                      option-value="value"
                      class="w-full"
                      aria-labelledby="languageLabel"
                      @change="handleLanguageChange"
                    />
                  </div>

                  <div
                    class="flex items-center justify-between"
                    role="group"
                    :aria-label="t('pages.settings.preferences.darkMode')"
                  >
                    <span class="font-semibold">
                      {{ t('pages.settings.preferences.darkMode') }}
                    </span>
                    <InputSwitch
                      v-model="preferences.darkMode"
                      @change="handleDarkModeChange"
                    />
                  </div>

                  <div
                    class="flex items-center justify-between"
                    role="group"
                    :aria-label="t('pages.settings.preferences.notifications')"
                  >
                    <span class="font-semibold">
                      {{ t('pages.settings.preferences.notifications') }}
                    </span>
                    <InputSwitch
                      v-model="preferences.notifications"
                      @change="handleNotificationsChange"
                    />
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'
import type { IChangePasswordForm, IUpdateUserProfileForm } from '~/interfaces/UsersInterfaces'

definePageMeta({
  middleware: 'auth',
  layout: 'default',
})

const { t } = useI18n()
const {
  updateUserProfile,
  changePassword,
  updateLanguagePreference,
  updateDarkModePreference,
  getLanguagePreference,
  getDarkModePreference,
  resetMessages,
  loading: profileLoading,
  error: profileError,
  success: profileSuccess,
  passwordChangeLoading,
  user,
} = useSettings()

const toast = useToast()

const activeSection = ref<'profile' | 'password' | 'preferences'>('profile')

const settingsMenu = computed(() => [
  { id: 'profile', label: t('pages.settings.personalData.title') },
  { id: 'password', label: t('pages.settings.changePassword.title') },
  { id: 'preferences', label: t('pages.settings.preferences.title') },
])

const formData = reactive<IUpdateUserProfileForm>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

const passwordForm = reactive<IChangePasswordForm>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const preferences = reactive({
  language: 'pl' as 'pl' | 'en',
  darkMode: false,
  notifications: true,
})

const isEmailEditable = computed(() => {
  return true
})

const languageOptions = computed(() => [
  { label: 'Polski', value: 'pl' },
  { label: 'English', value: 'en' },
])

const initializeFormData = () => {
  if (user.value && typeof user.value === 'object') {
    const userData = user.value as Record<string, unknown>
    formData.firstName = (userData.firstName as string) || ''
    formData.lastName = (userData.lastName as string) || ''
    formData.email = (userData.email as string) || ''
    formData.phone = (userData.phone as string) || ''
  }
}

const resetProfileForm = () => {
  initializeFormData()
  resetMessages()
}

const resetPasswordForm = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  resetMessages()
}

const handleProfileUpdate = async () => {
  if (!formData.firstName.trim()) {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.settings.validation.firstNameRequired'),
      life: 3000,
    })
    return
  }

  if (!formData.lastName.trim()) {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.settings.validation.lastNameRequired'),
      life: 3000,
    })
    return
  }

  if (formData.email && !validateEmail(formData.email)) {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.settings.validation.invalidEmail'),
      life: 3000,
    })
    return
  }

  const success = await updateUserProfile(formData)
  if (success) {
    toast.add({
      severity: 'success',
      summary: t('common.buttons.save'),
      detail: t('pages.settings.success.profileUpdated'),
      life: 3000,
    })
  }
  else {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.settings.error.profileUpdateFailed'),
      life: 3000,
    })
  }
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

const handleLanguageChange = async (newLanguage: 'pl' | 'en') => {
  await updateLanguagePreference(newLanguage)
}

const handleDarkModeChange = async (isDark: boolean) => {
  await updateDarkModePreference(isDark)
}

const handleNotificationsChange = () => {
  localStorage.setItem('notifications-preference', String(preferences.notifications))
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

onMounted(() => {
  initializeFormData()
  preferences.language = getLanguagePreference()
  preferences.darkMode = getDarkModePreference()
  preferences.notifications = localStorage.getItem('notifications-preference') !== 'false'
})

watch(
  () => user.value,
  () => {
    initializeFormData()
  },
)

watch(
  () => profileError.value,
  (newError) => {
    if (newError) {
      toast.add({
        severity: 'error',
        summary: t('common.error'),
        detail: newError,
        life: 3000,
      })
    }
  },
)

watch(
  () => profileSuccess.value,
  (newSuccess) => {
    if (newSuccess) {
      toast.add({
        severity: 'success',
        summary: t('common.buttons.save'),
        detail: newSuccess,
        life: 3000,
      })
    }
  },
)
</script>

<style scoped>
.settings-container {
  display: grid;
  gap: 2rem;
}
</style>
