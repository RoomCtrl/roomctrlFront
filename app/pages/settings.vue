<template>
  <div
    class="flex-1 w-full"
  >
    <div class="w-full max-w-7xl mx-auto ">
      <h1 class="text-3xl font-bold mb-8">
        {{ t('pages.settings.title') }}
      </h1>
      <Toast />

      <div class="flex gap-8 flex-col lg:flex-row">
        <div class="w-full lg:w-56 flex-shrink-0">
          <nav class="space-y-1 sticky top-20">
            <button
              v-for="item in settingsMenu"
              :key="item.id"
              class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
              :class="
                activeSection === item.id
                  ? 'bg-gray-100 dark:bg-gray-700 text-primary-inverse font-semibold'
                  : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              "
              @click="activeSection = item.id"
            >
              {{ item.label }}
            </button>
          </nav>
        </div>

        <div class="flex-1 min-w-0">
          <component :is="choosenSetting" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordChange from '~/components/settings/user/PasswordChange.vue'
import PersonalData from '~/components/settings/user/PersonalData.vue'
import Preferences from '~/components/settings/user/Preferences.vue'
import DeleteAccount from '~/components/settings/user/DeleteAccount.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'default',
})
const { t } = useI18n()
const { isAdmin } = useAuth()
type settingType = 'profile' | 'password' | 'preferences' | 'deleteAccount'
const activeSection = ref<settingType>('profile')

const settingsMenu = computed<Array<{ id: settingType, label: string }>>(() => {
  const menu = [
    { id: 'profile', label: t('pages.settings.personalData.title') },
    { id: 'password', label: t('pages.settings.changePassword.title') },
    { id: 'preferences', label: t('pages.settings.preferences.title') },
  ] as Array<{ id: settingType, label: string }>

  if (!isAdmin.value) {
    menu.push({ id: 'deleteAccount', label: t('pages.settings.deleteAccount.title') })
  }

  return menu
})

const choosenSetting = computed(() => {
  switch (activeSection.value) {
    case 'profile':
      return PersonalData
    case 'password':
      return PasswordChange
    case 'preferences':
      return Preferences
    case 'deleteAccount':
      return DeleteAccount
    default:
      return ''
  }
})
</script>

<style scoped>
.settings-container {
  display: grid;
  gap: 2rem;
}
</style>
