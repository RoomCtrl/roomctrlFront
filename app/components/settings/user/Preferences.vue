<template>
  <div>
    <Card>
      <template #title>
        <h2 class="text-2xl font-semibold mb-1">
          {{ $t('pages.settings.preferences.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6 text-base">
          {{ $t('pages.settings.preferences.description') || 'Customize your experience' }}
        </p>
      </template>
      <template #content>
        <div class="space-y-6">
          <div>
            <div
              id="languageLabel"
              class="block mb-2 font-semibold"
            >
              {{ $t('pages.settings.preferences.language') }}
            </div>
            <LangSelect full-name-display />
          </div>

          <div
            class="flex items-center justify-between"
            role="group"
            :aria-label="$t('pages.settings.preferences.darkMode')"
          >
            <span class="font-semibold">
              {{ $t('pages.settings.preferences.darkMode') }}
            </span>
            <ModeSwitch />
          </div>

          <div
            class="flex items-center justify-between"
            role="group"
            :aria-label="$t('pages.settings.preferences.notifications')"
          >
            <span class="font-semibold">
              {{ $t('pages.settings.preferences.notifications') }}
            </span>
            <ToggleSwitch
              v-model="notifications"
              @change="handleNotificationsChange"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import LangSelect from '~/components/layoutParts/headerParts/LangSelect.vue'
import ModeSwitch from '~/components/layoutParts/headerParts/ModeSwitch.vue'

const { fetchUserNotifications, updateUserNotifications } = useUser()

const toast = useToast()
const { t } = useI18n()

const notifications = ref(false)

const handleNotificationsChange = async () => {
  await updateUserNotifications(notifications.value)
  toast.add({
    severity: 'success',
    summary: t('toast.summary.changeSuccess'),
    detail: notifications.value ? t('toast.details.onNotifications') : t('toast.details.offNotifications'),
    life: 3000,
  })
}

onMounted(async () => {
  const userNotifications = await fetchUserNotifications()
  notifications.value = userNotifications.emailNotificationsEnabled
})
</script>
