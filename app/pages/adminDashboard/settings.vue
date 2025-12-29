<template>
  <div class="h-[98.2vh] overflow-auto w-full p-6">
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-3 mb-4">
        <i class="pi pi-building text-3xl" />
        <h1 class="text-3xl font-bold">
          {{ $t('pages.adminDashboard.settings.title') }}
        </h1>
      </div>

      <!-- Sekcja Dane Organizacji -->
      <Card>
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-building" />
            {{ $t('pages.adminDashboard.settings.sections.organization.title') }}
          </div>
        </template>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nazwa organizacji -->
            <div class="flex flex-col gap-2">
              <label
                for="organizationName"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.organization.name') }}
              </label>
              <InputText
                id="organizationName"
                v-model="settings.organizationName"
                :placeholder="$t('pages.adminDashboard.settings.sections.organization.namePlaceholder')"
              />
            </div>

            <!-- REGON -->
            <div class="flex flex-col gap-2">
              <label
                for="regon"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.organization.regon') }}
              </label>
              <InputText
                id="regon"
                v-model="settings.regon"
                :placeholder="$t('pages.adminDashboard.settings.sections.organization.regonPlaceholder')"
              />
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-2">
              <label
                for="email"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.organization.email') }}
              </label>
              <InputText
                id="email"
                v-model="settings.email"
                type="email"
                :placeholder="$t('pages.adminDashboard.settings.sections.organization.emailPlaceholder')"
              />
            </div>

            <!-- Telefon -->
            <div class="flex flex-col gap-2">
              <label
                for="phone"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.organization.phone') }}
              </label>
              <InputText
                id="phone"
                v-model="settings.phone"
                :placeholder="$t('pages.adminDashboard.settings.sections.organization.phonePlaceholder')"
              />
            </div>

            <!-- Adres -->
            <div class="flex flex-col gap-2 col-span-full">
              <label
                for="address"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.organization.address') }}
              </label>
              <Textarea
                id="address"
                v-model="settings.address"
                rows="2"
                :placeholder="$t('pages.adminDashboard.settings.sections.organization.addressPlaceholder')"
              />
            </div>

            <!-- Opis organizacji -->
            <div class="flex flex-col gap-2 col-span-full">
              <label
                for="description"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.organization.description') }}
              </label>
              <Textarea
                id="description"
                v-model="settings.description"
                rows="3"
                :placeholder="$t('pages.adminDashboard.settings.sections.organization.descriptionPlaceholder')"
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- Sekcja Godziny Pracy -->
      <Card>
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-clock" />
            {{ $t('pages.adminDashboard.settings.sections.workingHours.title') }}
          </div>
        </template>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label
                for="openingTime"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.workingHours.openingTime') }}
              </label>
              <DatePicker
                id="openingTime"
                v-model="settings.openingTime"
                timeOnly
                hourFormat="24"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="closingTime"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.workingHours.closingTime') }}
              </label>
              <DatePicker
                id="closingTime"
                v-model="settings.closingTime"
                timeOnly
                hourFormat="24"
              />
            </div>

            <!-- Dni robocze -->
            <div class="flex flex-col gap-2 col-span-full">
              <label class="font-semibold">
                {{ $t('pages.adminDashboard.settings.sections.workingHours.workingDays') }}
              </label>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="day in weekDays"
                  :key="day.value"
                  class="flex items-center gap-2"
                >
                  <Checkbox
                    v-model="settings.workingDays"
                    :inputId="`day-${day.value}`"
                    :value="day.value"
                  />
                  <label :for="`day-${day.value}`">{{ day.label }}</label>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Sekcja Polityka Rezerwacji -->
      <Card>
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-calendar" />
            {{ $t('pages.adminDashboard.settings.sections.bookingPolicy.title') }}
          </div>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <!-- Wymagane zatwierdzenie -->
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-1">
                <label class="font-semibold">
                  {{ $t('pages.adminDashboard.settings.sections.bookingPolicy.requireApproval') }}
                </label>
                <small class="text-gray-500">
                  {{ $t('pages.adminDashboard.settings.sections.bookingPolicy.requireApprovalDescription') }}
                </small>
              </div>
              <ToggleSwitch v-model="settings.requireBookingApproval" />
            </div>

            <!-- Maksymalny czas wyprzedzenia -->
            <div class="flex flex-col gap-2">
              <label
                for="maxAdvanceDays"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.bookingPolicy.maxAdvanceDays') }}
              </label>
              <InputNumber
                id="maxAdvanceDays"
                v-model="settings.maxAdvanceDays"
                :min="1"
                :max="365"
                :suffix="' ' + $t('pages.adminDashboard.settings.sections.bookingPolicy.days')"
              />
            </div>

            <!-- Maksymalna liczba aktywnych rezerwacji na użytkownika -->
            <div class="flex flex-col gap-2">
              <label
                for="maxActiveBookings"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.bookingPolicy.maxActiveBookings') }}
              </label>
              <InputNumber
                id="maxActiveBookings"
                v-model="settings.maxActiveBookingsPerUser"
                :min="1"
                :max="50"
              />
            </div>

            <!-- Minimalny odstęp między rezerwacjami -->
            <div class="flex flex-col gap-2">
              <label
                for="minGapBetween"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.bookingPolicy.minGapBetween') }}
              </label>
              <InputNumber
                id="minGapBetween"
                v-model="settings.minGapBetweenBookings"
                :min="0"
                :max="120"
                :suffix="' ' + $t('pages.adminDashboard.settings.sections.bookingPolicy.minutes')"
              />
            </div>

            <!-- Anulowanie rezerwacji -->
            <div class="flex flex-col gap-2">
              <label
                for="cancellationDeadline"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.bookingPolicy.cancellationDeadline') }}
              </label>
              <InputNumber
                id="cancellationDeadline"
                v-model="settings.cancellationDeadlineHours"
                :min="0"
                :max="72"
                :suffix="' ' + $t('pages.adminDashboard.settings.sections.bookingPolicy.hours')"
              />
              <small class="text-gray-500">
                {{ $t('pages.adminDashboard.settings.sections.bookingPolicy.cancellationDeadlineDescription') }}
              </small>
            </div>
          </div>
        </template>
      </Card>

      <!-- Sekcja Powiadomienia -->
      <Card>
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-bell" />
            {{ $t('pages.adminDashboard.settings.sections.notifications.title') }}
          </div>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <!-- Email powiadomienia o nowych rezerwacjach -->
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-1">
                <label class="font-semibold">
                  {{ $t('pages.adminDashboard.settings.sections.notifications.newBookingNotification') }}
                </label>
                <small class="text-gray-500">
                  {{ $t('pages.adminDashboard.settings.sections.notifications.newBookingNotificationDescription') }}
                </small>
              </div>
              <ToggleSwitch v-model="settings.notifyOnNewBooking" />
            </div>

            <!-- Email powiadomienia o zgłoszeniach -->
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-1">
                <label class="font-semibold">
                  {{ $t('pages.adminDashboard.settings.sections.notifications.reportNotification') }}
                </label>
                <small class="text-gray-500">
                  {{ $t('pages.adminDashboard.settings.sections.notifications.reportNotificationDescription') }}
                </small>
              </div>
              <ToggleSwitch v-model="settings.notifyOnReport" />
            </div>

            <!-- Email powiadomienia o anulowaniach -->
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-1">
                <label class="font-semibold">
                  {{ $t('pages.adminDashboard.settings.sections.notifications.cancellationNotification') }}
                </label>
                <small class="text-gray-500">
                  {{ $t('pages.adminDashboard.settings.sections.notifications.cancellationNotificationDescription') }}
                </small>
              </div>
              <ToggleSwitch v-model="settings.notifyOnCancellation" />
            </div>

            <!-- Email kontaktowy dla powiadomień -->
            <div class="flex flex-col gap-2">
              <label
                for="notificationEmail"
                class="font-semibold"
              >
                {{ $t('pages.adminDashboard.settings.sections.notifications.notificationEmail') }}
              </label>
              <InputText
                id="notificationEmail"
                v-model="settings.notificationEmail"
                type="email"
                :placeholder="$t('pages.adminDashboard.settings.sections.notifications.notificationEmailPlaceholder')"
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- Przyciski akcji -->
      <div class="flex justify-end gap-3">
        <Button
          :label="$t('common.buttons.cancel')"
          severity="secondary"
          @click="resetSettings"
        />
        <Button
          :label="$t('common.buttons.save')"
          icon="pi pi-save"
          :loading="saving"
          @click="saveSettings"
        />
      </div>
    </div>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

definePageMeta({
  middleware: ['admin'],
  layout: 'admin-dashboard',
})

const toast = useToast()
const { t } = useI18n()

const saving = ref(false)

// Dni tygodnia
const weekDays = computed(() => [
  { label: t('pages.adminDashboard.settings.weekDays.monday'), value: 1 },
  { label: t('pages.adminDashboard.settings.weekDays.tuesday'), value: 2 },
  { label: t('pages.adminDashboard.settings.weekDays.wednesday'), value: 3 },
  { label: t('pages.adminDashboard.settings.weekDays.thursday'), value: 4 },
  { label: t('pages.adminDashboard.settings.weekDays.friday'), value: 5 },
  { label: t('pages.adminDashboard.settings.weekDays.saturday'), value: 6 },
  { label: t('pages.adminDashboard.settings.weekDays.sunday'), value: 0 },
])

// Ustawienia domyślne
const defaultSettings = {
  // Dane organizacji
  organizationName: '',
  regon: '',
  email: '',
  phone: '',
  address: '',
  description: '',

  // Godziny pracy
  openingTime: new Date(2024, 0, 1, 8, 0),
  closingTime: new Date(2024, 0, 1, 18, 0),
  workingDays: [1, 2, 3, 4, 5], // Poniedziałek-Piątek

  // Polityka rezerwacji
  requireBookingApproval: false,
  maxAdvanceDays: 30,
  maxActiveBookingsPerUser: 5,
  minGapBetweenBookings: 15,
  cancellationDeadlineHours: 24,

  // Powiadomienia
  notifyOnNewBooking: true,
  notifyOnReport: true,
  notifyOnCancellation: true,
  notificationEmail: '',
}

const settings = ref({ ...defaultSettings })

const resetSettings = () => {
  settings.value = { ...defaultSettings }
  toast.add({
    severity: 'info',
    summary: t('common.toast.success'),
    detail: t('pages.adminDashboard.settings.messages.settingsReset'),
    life: 3000,
  })
}

const saveSettings = async () => {
  saving.value = true
  try {
    // Tutaj będzie wywołanie API do zapisania ustawień organizacji
    // await organizationRepository.updateSettings(settings.value)

    // Symulacja zapisu
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.add({
      severity: 'success',
      summary: t('common.toast.success'),
      detail: t('pages.adminDashboard.settings.messages.settingsSaved'),
      life: 3000,
    })
  }
  catch (error) {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.adminDashboard.settings.messages.settingsSaveError'),
      life: 5000,
    })
  }
  finally {
    saving.value = false
  }
}

// Załaduj ustawienia organizacji przy montowaniu komponentu
onMounted(async () => {
  // Tutaj będzie wywołanie API do pobrania ustawień organizacji
  // const loadedSettings = await organizationRepository.getSettings()
  // settings.value = { ...defaultSettings, ...loadedSettings }
})
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
