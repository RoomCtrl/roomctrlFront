<template>
  <div class="w-full">
    <!-- Day Header -->
    <div class="flex gap-2 mb-6 flex-wrap">
      <Button
        v-for="(day, index) in weekDays"
        :key="index"
        :label="day.label"
        :outlined="!day.isToday"
        :severity="day.isToday ? 'success' : 'secondary'"
        size="small"
        @click="selectedDayIndex = index"
      />
    </div>

    <!-- Hours Grid -->
    <div class="space-y-2">
      <div
        v-for="hour in hours"
        :key="hour"
        class="flex gap-3 items-center h-20"
      >
        <!-- Hour Label -->
        <div class="w-16 text-center font-semibold text-gray-600 dark:text-gray-400 text-sm">
          {{ hour }}:00
        </div>

        <!-- Hour Block -->
        <div class="flex-1 relative h-full bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div
            v-for="booking in getBookingsForHour(hour)"
            :key="booking.id"
            :class="[
              'absolute inset-y-0 left-0 right-0 p-2 border-l-4 overflow-hidden',
              booking.isPrivate ? 'bg-red-50 dark:bg-red-900/20 border-red-500' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500',
            ]"
          >
            <p
              class="text-xs font-semibold truncate"
              :class="booking.isPrivate ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'"
            >
              {{ booking.title }}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              {{ formatTime(booking.startedAt) }} - {{ formatTime(booking.endedAt) }}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              {{ booking.participants }} osób
            </p>
          </div>

          <!-- Empty State -->
          <div
            v-if="getBookingsForHour(hour).length === 0"
            class="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-xs"
          >
            <i class="pi pi-check" />
            <span class="ml-1">Dostępna</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBooking } from '~/interfaces/RoomsIntefaces'

interface BookingWithDate extends IBooking {
  dayOfWeek: number
}

const props = defineProps<{
  bookings?: BookingWithDate[]
  currentBooking?: IBooking
}>()

const selectedDayIndex = ref(0)

// Generate week days starting from today
const weekDays = computed(() => {
  const days = []
  const today = new Date()

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const formatter = new Intl.DateTimeFormat('pl-PL', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
    })

    days.push({
      label: formatter.format(date),
      isToday: i === 0,
      date,
    })
  }

  return days
})

// Generate hours 8-18
const hours = Array.from({ length: 11 }, (_, i) => i + 8)

// Get bookings for selected day
const dayBookings = computed(() => {
  if (!props.bookings) return []

  const selectedDate = weekDays.value[selectedDayIndex.value]?.date
  if (!selectedDate) return []

  const dayOfWeek = selectedDate.getDay()

  return props.bookings.filter((booking) => {
    const bookingDate = new Date(booking.startedAt)
    return bookingDate.getDay() === dayOfWeek
  })
})

// Get bookings for specific hour
const getBookingsForHour = (hour: number) => {
  return dayBookings.value.filter((booking) => {
    const startDate = new Date(booking.startedAt)
    const endDate = new Date(booking.endedAt)
    return startDate.getHours() <= hour && endDate.getHours() >= hour
  })
}

// Format time from ISO string
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
}
</script>
