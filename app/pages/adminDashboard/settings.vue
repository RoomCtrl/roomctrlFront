<template>
  <div class="h-[98.2vh] overflow-auto w-full p-6">
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-3 mb-4">
        <i class="pi pi-cog text-3xl" />
        <h1 class="text-3xl font-bold">
          {{ $t('pages.adminDashboard.settingsAdmin.title') }}
        </h1>
      </div>

      <div class="grid grid-cols-2 gap-x-6">
        <OrganizationData />

        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-bell" />
              {{ $t('pages.adminDashboard.settingsAdmin.sections.notifications.title') }}
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <label class="font-semibold">
                    {{ $t('pages.adminDashboard.settingsAdmin.sections.notifications.newBookingNotification') }}
                  </label>
                </div>
                <ToggleSwitch
                  v-model="newNotifications"
                  :default-value="notifications"
                  @change="handleNotificationsChange"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>

      <CleaningTime />
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import CleaningTime from '~/components/settings/admin/CleaningTime.vue'
import OrganizationData from '~/components/settings/admin/OrganizationData.vue'

definePageMeta({
  middleware: ['admin'],
  layout: 'admin-dashboard',
})

const toast = useToast()
const { t } = useI18n()

const { fetchUserNotifications, updateUserNotifications } = useUser()
const notifications = await fetchUserNotifications()

const newNotifications = ref(true)

const handleNotificationsChange = async () => {
  await updateUserNotifications(newNotifications.value)
  toast.add({
    severity: 'success',
    summary: t('toast.summary.changeSuccess'),
    detail: newNotifications.value ? t('toast.details.onNotifications') : t('toast.details.offNotifications'),
    life: 3000,
  })
}
</script>

<style scoped>
:deep(.p-card) {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

:deep(.p-card-title) {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
