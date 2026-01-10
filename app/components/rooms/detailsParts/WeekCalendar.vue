<template>
  <div>
    <button
      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
      @click="isOpen = true"
    >
      <i class="pi pi-calendar mr-2" />
      {{ $t('pages.roomDetails.weekCalendar.title') }}
    </button>

    <Dialog
      v-model:visible="isOpen"
      modal
      :header="$t('pages.roomDetails.weekCalendar.title')"
      :style="{ width: '90vw', maxWidth: '1200px', height: '85vh' }"
      class="calendar-modal"
    >
      <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-gray-600">
        <button
          :disabled="!canGoPrevious"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2',
            canGoPrevious
              ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white cursor-pointer'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50',
          ]"
          @click="previousWeek"
        >
          <i class="pi pi-chevron-left text-xs" />
          {{ $t('common.buttons.previous') || 'Poprzedni' }}
        </button>

        <div class="text-center">
          <div class="text-base font-bold">
            {{ getWeekRange() }}
          </div>
          <button
            class="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
            @click="goToCurrentWeek"
          >
            {{ $t('date.today') || 'Dzisiaj' }}
          </button>
        </div>

        <button
          class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          @click="nextWeek"
        >
          {{ $t('common.buttons.next') || 'Następny' }}
          <i class="pi pi-chevron-right text-xs" />
        </button>
      </div>

      <div
        class="overflow-auto"
        style="height: calc(80vh - 140px);"
      >
        <div class="flex min-w-max">
          <div
            class="w-12 border-r border-gray-200 dark:border-gray-600 sticky left-0 z-10 bg-gray-50 dark:bg-gray-900"
          >
            <div class="h-12 border-b border-gray-200 dark:border-gray-600" />
            <div
              v-for="hour in hours"
              :key="hour"
              class="flex items-center justify-end h-12 border-b border-gray-200 dark:border-gray-600 text-xs pr-1 pt-1 font-medium"
            >
              {{ String(hour).padStart(2, '0') }}:00
            </div>
          </div>

          <div
            v-for="(day, dayIdx) in weekDays"
            :key="dayIdx"
            class="flex-1 min-w-32 border-r border-gray-200 dark:border-gray-600 relative"
          >
            <div
              class="h-12 border-b border-gray-200 dark:border-gray-600 flex flex-col items-center justify-center sticky top-0 z-10 bg-gray-50 dark:bg-gray-900"
            >
              <div class="text-xs font-semibold">
                {{ getDayName(day) }}
              </div>
              <div
                :class="[
                  'text-sm font-bold',
                  isToday(day)
                    ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                    : '',
                ]"
              >
                {{ day.getDate() }}
              </div>
            </div>

            <div class="relative">
              <div
                v-for="hour in hours"
                :key="hour"
                class="h-12 border-b border-gray-200 dark:border-gray-600"
              />

              <div
                v-for="res in getReservationsForDay(day)"
                :key="res.id"
                v-tooltip.bottom="calculateDuration(res) < 120 ? getTooltipText(res) : null"
                :class="[
                  'absolute left-0 right-0 mx-1 rounded p-1 text-white text-xs cursor-pointer hover:opacity-90 transition-opacity overflow-hidden',
                  getReservationColor(res),
                ]"
                :style="getReservationStyle(res)"
                role="button"
                tabindex="0"
                @click="openBookingModal(res)"
                @keydown.enter="openBookingModal(res)"
                @keydown.space="openBookingModal(res)"
              >
                <div v-if="!res.isMultiDay || res.isFirstDay">
                  <div class="font-medium flex items-center gap-1">
                    {{ res.title }}
                  </div>
                  <div class="text-xs opacity-90">
                    {{ formatTime(res.date || res.startedAt) }} - {{ formatTime(res.endDate || res.endedAt) }}
                  </div>
                  <div class="pt-1">
                    <i class="pi pi-map-marker" />
                    {{ res.room?.location || $t('pages.myCalendar.noLocations') || 'Brak lokalizacji' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="showBookingDetails"
      modal
      :header="selectedReservation?.title || $t('pages.roomDetails.weekCalendar.bookingDetails') || 'Szczegóły rezerwacji'"
      :style="{ width: '90vw', maxWidth: '500px' }"
    >
      <div
        v-if="selectedReservation"
        class="space-y-4"
      >
        <div
          class="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <i class="pi pi-calendar text-blue-600 dark:text-blue-400 text-xl mt-1" />
          <div>
            <div class="font-semibold text-blue-900 dark:text-blue-100">
              {{ selectedReservation.title }}
            </div>
            <div class="text-sm text-blue-700 dark:text-blue-300 mt-1">
              {{ formatDate(selectedReservation.startedAt) }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <div class="text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase">
              {{ $t('pages.roomDetails.weekCalendar.startTime') }}
            </div>
            <div class="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">
              {{ formatTime(selectedReservation.startedAt) }}
            </div>
          </div>

          <div class="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
            <div class="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase">
              {{ $t('pages.roomDetails.weekCalendar.duration') }}
            </div>
            <div class="text-lg font-bold text-amber-900 dark:text-amber-100 mt-1">
              {{ calculateDuration(selectedReservation) }} min
            </div>
          </div>

          <div class="p-3 bg-green-50 dark:bg-green-950 rounded-lg col-span-2">
            <div class="text-xs text-green-600 dark:text-green-400 font-semibold uppercase">
              {{ $t('pages.roomDetails.weekCalendar.participantsCount') }}
            </div>
            <div class="text-lg font-bold text-green-900 dark:text-green-100 mt-1">
              <i class="pi pi-users mr-2" />
              {{ selectedReservation.participantsCount || 1 }} {{ $t('common.persons') || 'osób' }}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Dialog from 'primevue/dialog'
import type { IBooking } from '~/interfaces/RoomsIntefaces'
import { useBooking } from '~/composables/useBooking'

interface IReservation extends IBooking {
  color?: string
  date?: Date
  endDate?: Date
  duration?: number
  originalId?: string
  isMultiDay?: boolean
  originalBooking?: IBooking
}

const props = defineProps<{
  currentBooking?: IBooking
  nextBookings?: IBooking[]
  roomId?: string
}>()

const { fetchBookings, bookings } = useBooking()
const isOpen = ref(false)
const showBookingDetails = ref(false)
const selectedReservation = ref<IReservation | null>(null)
const { t } = useI18n()
const weekOffset = ref(0)

watch(() => props.roomId, async (newRoomId) => {
  if (newRoomId && isOpen.value) {
    await fetchBookings()
  }
}, { immediate: true })

watch(isOpen, async (open) => {
  if (open && props.roomId) {
    await fetchBookings()
  }
})

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))

const weekDays = computed(() => {
  const today = new Date()
  today.setDate(today.getDate() + (weekOffset.value * 7))
  const dayOfWeek = today.getDay()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return date
  })
})

const canGoPrevious = computed(() => {
  const firstDayOfWeek = weekDays.value[0]
  if (!firstDayOfWeek) return false

  const previousWeekStart = new Date(firstDayOfWeek)
  previousWeekStart.setDate(previousWeekStart.getDate() - 7)

  return previousWeekStart.getFullYear() >= 2020
})

const allReservations = computed(() => {
  const result: IReservation[] = []
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

  const bookingsToProcess: IBooking[] = []
  
  // Pobierz wszystkie rezerwacje i filtruj po ID pokoju
  if (props.roomId && bookings.value) {
    const roomBookings = bookings.value.filter((booking: any) => 
      booking.room?.id === props.roomId && booking.status !== 'cancelled'
    )
    bookingsToProcess.push(...roomBookings)
  } else {
    // Fallback do starych danych jeśli roomId nie jest dostępne
    if (props.currentBooking) {
      bookingsToProcess.push(props.currentBooking)
    }
    if (props.nextBookings) {
      bookingsToProcess.push(...props.nextBookings)
    }
  }

  bookingsToProcess.forEach((booking, index) => {
    const startDate = new Date(booking.startedAt)
    const endDate = new Date(booking.endedAt)
    const color = colors[index % colors.length]

    const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())

    if (startDay.getTime() === endDay.getTime()) {
      const duration = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))
      result.push({
        ...booking,
        color,
        date: startDate,
        endDate: endDate,
        duration: duration,
      })
    }
    else {
      const currentDay = new Date(startDay)

      while (currentDay <= endDay) {
        let segmentStart: Date, segmentEnd: Date
        const isFirstDay = currentDay.getTime() === startDay.getTime()

        if (isFirstDay) {
          segmentStart = new Date(startDate)
          segmentEnd = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 23, 59, 59)
        }
        else if (currentDay.getTime() === endDay.getTime()) {
          segmentStart = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 0, 0, 0)
          segmentEnd = new Date(endDate)
        }
        else {
          segmentStart = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 0, 0, 0)
          segmentEnd = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 23, 59, 59)
        }

        const duration = Math.round((segmentEnd.getTime() - segmentStart.getTime()) / (1000 * 60))

        result.push({
          ...booking,
          id: `${booking.id}-${currentDay.getTime()}`,
          originalId: booking.id,
          date: segmentStart,
          endDate: segmentEnd,
          duration: duration,
          color,
          isMultiDay: true,
          isFirstDay: isFirstDay,
          originalBooking: booking,
        } as any)

        currentDay.setDate(currentDay.getDate() + 1)
      }
    }
  })

  return result
})

const getReservationsForDay = (day: Date): IReservation[] => {
  return allReservations.value.filter((res) => {
    const resDate = res.date || new Date(res.startedAt)
    return (
      resDate.getDate() === day.getDate()
      && resDate.getMonth() === day.getMonth()
      && resDate.getFullYear() === day.getFullYear()
    )
  })
}

const getReservationStyle = (reservation: IReservation): Record<string, string> => {
  const startDate = reservation.date || new Date(reservation.startedAt)
  const endDate = reservation.endDate || new Date(reservation.endedAt)
  const durationMinutes = reservation.duration || Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))

  const top = (startDate.getHours() * 60 + startDate.getMinutes()) * (48 / 60)
  const height = (durationMinutes / 60) * 48

  return {
    top: `${top}px`,
    height: `${height}px`,
  }
}

const colorMap: Record<string, string> = {
  red: 'bg-red-500 dark:bg-red-900',
  blue: 'bg-blue-500 dark:bg-blue-900',
  green: 'bg-green-500 dark:bg-green-900',
  yellow: 'bg-yellow-500 dark:bg-yellow-900',
  purple: 'bg-purple-500 dark:bg-purple-900',
  orange: 'bg-orange-500 dark:bg-orange-900',
}

const getReservationColor = (res: IReservation): string => {
  return colorMap[res.color || 'blue'] || 'bg-blue-500 dark:bg-blue-900'
}

const formatTime = (date: string | Date): string => {
  if (!date) return '--:--'
  const d = typeof date === 'string' ? new Date(date) : date
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const formatDate = (date: string): string => {
  if (!date) return '--'
  const d = new Date(date)
  return d.toLocaleDateString()
}

const calculateDuration = (res: IReservation): number => {
  if (res.duration) return res.duration
  const startDate = res.date || new Date(res.startedAt)
  const endDate = res.endDate || new Date(res.endedAt)
  const durationMs = endDate.getTime() - startDate.getTime()
  return Math.round(durationMs / (1000 * 60))
}

const dayOfWeekFullNames = [
  'date.dayNames.sunday',
  'date.dayNames.monday',
  'date.dayNames.tuesday',
  'date.dayNames.wednesday',
  'date.dayNames.thursday',
  'date.dayNames.friday',
  'date.dayNames.saturday',
]

const getDayName = (day: Date): string => {
  const arrayDayNumber = day.getDay()
  const dayName = dayOfWeekFullNames[arrayDayNumber] ?? 'date.dayNames.monday'
  return t(dayName)
}

const getTooltipText = (res: IReservation): string => {
  const startTime = formatTime(res.date || res.startedAt)
  const endTime = formatTime(res.endDate || res.endedAt)
  const duration = calculateDuration(res)
  const location = res.room?.location || t('pages.myCalendar.noLocations') || 'Brak lokalizacji'
  return `${res.title}\n${startTime} - ${endTime} (${duration} min)\n${location}`
}

const isToday = (day: Date): boolean => {
  const today = new Date()
  return (
    day.getDate() === today.getDate()
    && day.getMonth() === today.getMonth()
    && day.getFullYear() === today.getFullYear()
  )
}

const openBookingModal = (reservation: IReservation): void => {
  const originalBooking = (reservation as any).originalBooking || reservation
  const displayReservation = {
    ...originalBooking,
    id: (reservation as any).originalId || reservation.id,
  }
  selectedReservation.value = displayReservation
  showBookingDetails.value = true
}

const previousWeek = (): void => {
  if (canGoPrevious.value) {
    weekOffset.value -= 1
  }
}

const nextWeek = (): void => {
  weekOffset.value += 1
}

const goToCurrentWeek = (): void => {
  weekOffset.value = 0
}

const getWeekRange = (): string => {
  const firstDay = weekDays.value[0]
  const lastDay = weekDays.value[6]

  if (!firstDay || !lastDay) return ''

  const monthNamesKeys = [
    'date.monthNames.january',
    'date.monthNames.february',
    'date.monthNames.march',
    'date.monthNames.april',
    'date.monthNames.may',
    'date.monthNames.june',
    'date.monthNames.july',
    'date.monthNames.august',
    'date.monthNames.september',
    'date.monthNames.october',
    'date.monthNames.november',
    'date.monthNames.december',
  ]

  const formatDate = (date: Date): string => {
    const day = date.getDate()
    const month = t(monthNamesKeys[date.getMonth()])
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  return `${formatDate(firstDay)} - ${formatDate(lastDay)}`
}
</script>

<style scoped>
:deep(.p-dialog) {
  background-color: var(--surface-card);
}

:deep(.p-dialog .p-dialog-header) {
  background-color: var(--surface-overlay);
  border-color: var(--surface-border);
}

:deep(.p-dialog .p-dialog-content) {
  color: var(--text-color);
  padding: 1rem;
}

:deep(.calendar-modal) {
  max-height: 85vh;
}
</style>
