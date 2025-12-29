<template>
  <Card pt:capation:class="m-0">
    <template #title>
      <div class="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-start">
        <h1 class="text-xl sm:text-2xl 2xl:text-3xl font-semibold">
          {{ roomName }}
        </h1>
        <RentBadge
          :started-at="startedAt"
          :ended-at="endedAt"
          :info-type="false"
          :custom-color="false"
          size="lg"
        />
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-col sm:flex-row justify-between gap-2">
        <h2 class="text-sm sm:text-base lg:truncate lg:w-[70%]">
          {{ roomDescription }}
        </h2>
        <UserRating
          class="hidden sm:block"
          :max="max"
          :rate-value="value"
        />
      </div>
    </template>
    <template #footer>
      <UserRating
        class="block sm:hidden flex justify-center mb-3"
        :max="max"
        :rate-value="value"
      />
      <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div class="flex gap-2 justify-center sm:justify-start">
          <Button
            :label="t('pages.roomDetails.buttons.rentNow')"
            class="flex-1 sm:flex-none"
            @click="emit('showBookingForm')"
          />
          <Button
            v-tooltip="isFavoriteLocal ? t('pages.roomDetails.buttons.removeFavorite') : t('pages.roomDetails.buttons.addFavorite')"
            :icon="isFavoriteLocal ? 'pi pi-heart-fill' : 'pi pi-heart'"
            :severity="isFavoriteLocal ? 'danger' : 'secondary'"
            variant="outlined"
            rounded
            @click="handleToggleFavorite"
          />
        </div>
        <WeekCalendar
          class="flex justify-center"
          :current-booking="currentBooking"
          :next-bookings="nextBookings"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import UserRating from '~/components/common/UserRating.vue'
import RentBadge from '../RentBadge.vue'
import WeekCalendar from './WeekCalendar.vue'
import type { IBooking } from '~/interfaces/RoomsIntefaces'
import { useRoom } from '~/composables/useRoom'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  roomName: string
  roomDescription: string
  startedAt?: string
  endedAt?: string
  currentBooking?: IBooking
  nextBookings?: IBooking[]
  roomId: string
  isFavorite?: boolean
}>()

const emit = defineEmits<{
  showBookingForm: []
}>()

const { t } = useI18n()
const toast = useToast()
const { toggleFavorite } = useRoom()
const max = 5
const value = 4

const isFavoriteLocal = ref(props.isFavorite || false)

const handleToggleFavorite = async () => {
  const previousState = isFavoriteLocal.value
  isFavoriteLocal.value = !isFavoriteLocal.value

  try {
    await toggleFavorite(props.roomId)
    if (isFavoriteLocal.value) {
      toast.add({
        severity: 'success',
        summary: t('common.toast.success'),
        detail: t('common.toast.favoriteAdded'),
        life: 3000,
      })
    }
    else {
      toast.add({
        severity: 'success',
        summary: t('common.toast.success'),
        detail: t('common.toast.favoriteRemoved'),
        life: 3000,
      })
    }
  }
  catch (err) {
    isFavoriteLocal.value = previousState
    console.error('Error toggling favorite:', err)
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('common.toast.favoriteError'),
      life: 3000,
    })
  }
}

const buttons = [
  t('pages.roomDetails.buttons.rentNow'),
  t('pages.roomDetails.buttons.addFavorite'),
]

watch(() => props.isFavorite, (newValue) => {
  isFavoriteLocal.value = newValue || false
}, { immediate: true })
</script>
