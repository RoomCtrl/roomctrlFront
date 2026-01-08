<template>
  <Dialog
    :visible="props.open"
    class="min-w-[40rem]"
    modal
    @update:visible="(val) => emit('update:open', val)"
  >
    <template #header>
      <div class="w-full">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div
              :class="[
                rentColor(selectedReservation.color),
                'w-1 h-16 rounded absolute left-0',
              ]"
            />
            <h3 class="text-xl font-semibold ml-4 flex items-center gap-2">
              <i
                v-if="selectedReservation.status === 'cancelled'"
                class="pi pi-times-circle text-red-500"
              />
              {{ selectedReservation.title }}
            </h3>
            <p class="text-sm ml-4 mt-1">
              {{ formatDate(selectedReservation.date) }}
            </p>
          </div>
        </div>
      </div>
    </template>
    <div class="p-6 mb-3 border-y border-gray-200">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-start gap-3">
          <i class="pi pi-clock" />
          <div>
            <div class="text-sm font-medium">
              {{ formatTime(selectedReservation.date) }} -
              {{
                formatEndTime(
                  selectedReservation.date,
                  selectedReservation.duration,
                )
              }}
            </div>
            <div class="text-sm">
              {{ $t('reservations.rentDetails.duration') }}:
              {{ selectedReservation.duration }}
              {{ $t('reservations.rentDetails.minutes') }}
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <i class="pi pi-building" />
          <div>
            <div class="text-xs text-gray-500 font-semibold">
              {{ $t('reservations.rentDetails.room') }}
            </div>
            <div class="text-sm">
              {{ selectedReservation.roomName }}
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <i class="pi pi-map-marker" />
          <div>
            <div class="text-xs text-gray-500 font-semibold">
              {{ $t('reservations.rentDetails.location') }}
            </div>
            <div class="text-sm">
              {{ selectedReservation.location }}
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <i class="pi pi-users" />
          <div>
            <div class="text-xs text-gray-500 font-semibold">
              {{ $t('reservations.rentDetails.attendees') }}
            </div>
            <div class="text-sm">
              {{ selectedReservation.attendees }}
              {{
                selectedReservation.attendees === 1
                  ? $t('reservations.rentDetails.person')
                  : $t('reservations.rentDetails.persons')
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="selectedReservation.status !== 'cancelled' && selectedReservation.status !== 'completed'"
      class="flex justify-end gap-3"
    >
      <Button
        :label="$t('reservations.rentDetails.cancelReservation')"
        severity="danger"
        :loading="deleteLoading"
        @click="handleDelete"
      />
      <Button
        :label="$t('common.buttons.edit')"
        severity="success"
        @click="handleEdit"
      />
    </div>
    <div
      v-else
      class="flex justify-center"
    >
      <p
        v-if="selectedReservation.status === 'cancelled'"
        class="text-red-500 font-semibold"
      >
        {{ $t('reservations.rentDetails.reservationCancelled') }}
      </p>
      <p
        v-else-if="selectedReservation.status === 'completed'"
        class="text-green-600 font-semibold"
      >
        {{ $t('reservations.rentDetails.reservationCompleted') }}
      </p>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  selectedReservation: {
    id?: number
    title: string
    duration: number
    date: Date
    location: string
    attendees: number
    color: string
    status?: 'active' | 'cancelled' | 'completed'
    roomName?: string
  }
}>()

const emit = defineEmits(['update:open', 'edit', 'deleted'])

const { cancelBooking } = useBooking()
const deleteLoading = ref(false)
const confirm = useConfirm()
const { t, locale } = useI18n()
const toast = useToast()

const formatTime = (date: Date) => {
  return date.toLocaleTimeString(locale.value, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString(locale.value, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

const formatEndTime = (startDate: Date, duration: number) => {
  const endDate = new Date(startDate.getTime() + duration * 60000)
  return formatTime(endDate)
}

const colorMap = {
  blue: 'bg-blue-500 dark:bg-blue-900',
  green: 'bg-green-500 dark:bg-green-900',
  yellow: 'bg-yellow-500 dark:bg-yellow-900',
  purple: 'bg-purple-500 dark:bg-purple-900',
  red: 'bg-red-500 dark:bg-red-900',
  orange: 'bg-orange-500 dark:bg-orange-900',
}

const rentColor = (color: string) => colorMap[color]

const handleDelete = async () => {
  confirm.require({
    message: t('pages.myCalendar.cancelReservation.title'),
    header: t('common.toast.danger'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('common.buttons.cancel'),
    rejectProps: {
      label: t('common.buttons.cancel'),
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: t('common.buttons.delete'),
      severity: 'danger',
    },
    accept: async () => {
      deleteLoading.value = true
      try {
        await cancelBooking(props.selectedReservation.id)
        toast.add({
          severity: 'success',
          summary: t('common.toast.success'),
          detail: t('common.toast.bookingCancelled'),
          life: 3000,
        })
        emit('update:open', false)
        emit('deleted')
      }
      catch (err) {
        console.error('Error cancelling booking:', err)
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: t('common.toast.bookingCancelError'),
          life: 3000,
        })
      }
      finally {
        deleteLoading.value = false
      }
    },
  })
}

const handleEdit = () => {
  emit('edit', props.selectedReservation)
}
</script>
