<template>
  <div class="h-[98.2vh] overflow-auto w-full p-6">
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-3 mb-4">
        <i class="pi pi-building text-3xl" />
        <h1 class="text-3xl font-bold">
          {{ $t('pages.adminDashboard.settingsAdmin.title') }}
        </h1>
      </div>

      <OrganizationData />

      <CleaningTime />

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
                <small class="text-gray-500">
                  {{ $t('pages.adminDashboard.settingsAdmin.sections.notifications.newBookingNotificationDescription') }}
                </small>
              </div>
              <ToggleSwitch v-model="settingsAdmin.notifyOnNewBooking" />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-1">
                <label class="font-semibold">
                  {{ $t('pages.adminDashboard.settingsAdmin.sections.notifications.reportNotification') }}
                </label>
                <small class="text-gray-500">
                  {{ $t('pages.adminDashboard.settingsAdmin.sections.notifications.reportNotificationDescription') }}
                </small>
              </div>
              <ToggleSwitch v-model="settingsAdmin.notifyOnReport" />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-1">
                <label class="font-semibold">
                  {{ $t('pages.adminDashboard.settingsAdmin.sections.notifications.cancellationNotification') }}
                </label>
                <small class="text-gray-500">
                  {{ $t('pages.adminDashboard.settingsAdmin.sections.notifications.cancellationNotificationDescription') }}
                </small>
              </div>
              <ToggleSwitch v-model="settingsAdmin.notifyOnCancellation" />
            </div>
          </div>
        </template>
      </Card>
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

const defaultSettingsAdmin = {
  organizationName: '',
  regon: '',
  email: '',
  phone: '',
  address: '',
  description: '',

  openingTime: new Date(2024, 0, 1, 8, 0),
  closingTime: new Date(2024, 0, 1, 18, 0),
  workingDays: [1, 2, 3, 4, 5],

  requireBookingApproval: false,
  maxAdvanceDays: 30,
  maxActiveBookingsPerUser: 5,
  minGapBetweenBookings: 15,
  cancellationDeadlineHours: 24,

  notifyOnNewBooking: true,
  notifyOnReport: true,
  notifyOnCancellation: true,
  notificationEmail: '',
}

const settingsAdmin = ref({ ...defaultSettingsAdmin })
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
