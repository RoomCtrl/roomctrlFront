<template>
  <div class="w-full">
    <Card class="w-full flex flex-col">
      <template #header>
        <CalendarHeader
          :current-date="currentDate"
          :weekDays="weekDays"
          :view-mode="viewMode"
          @update-date="handleWeekUpdate"
          @change-view="handleViewChange"
          @add-booking="handleShowBookingForm()"
        />
      </template>

      <template #content>
        <div class="flex-1 overflow-auto">
          <div
            v-if="viewMode === 'day'"
            class="w-full"
          >
            <div class="flex min-w-max h-full">
              <div
                class="w-16 border-r border-gray-200 dark:border-gray-600 sticky left-0 z-10"
              >
                <div class="h-12 border-b border-gray-200 dark:border-gray-600" />
                <div
                  v-for="hour in hours"
                  :key="hour"
                  class="flex items-center justify-end h-12 border-b border-gray-200 dark:border-gray-600 text-sm pr-2 pt-1"
                >
                  {{ String(hour).padStart(2, '0') }}:00
                </div>
              </div>

              <div class="flex-1 relative">
                <div
                  class="sticky top-0 h-12 border-b border-gray-200 dark:border-gray-600 flex items-center justify-center font-semibold text-lg z-10 bg-white dark:bg-gray-900"
                >
                  <div class="text-center">
                    <div class="text-xs text-gray-600 dark:text-gray-400">
                      {{ getDayName(currentDate) }}
                    </div>
                    <div
                      :class="[
                        'text-xl',
                        isToday(currentDate) ? 'text-blue-600 font-bold' : '',
                      ]"
                    >
                      {{ currentDate.getDate() }}
                    </div>
                  </div>
                </div>

                <div class="relative">
                  <div
                    v-for="hour in hours"
                    :key="hour"
                    class="h-12 border-b border-gray-200 dark:border-gray-600"
                  />

                  <div class="absolute top-0 left-0 right-0 bottom-0">
                    <div
                      v-for="res in getReservationsForDay(currentDate)"
                      :key="res.id"
                      v-tooltip.top="res.duration < 120 ? `${res.title}\n${formatTime(res.date)} - ${formatTime(res.endDate)} (${res.duration} min)\n${res.location}` : null"
                      :class="[
                        rentColor(res.color),
                        'absolute left-0 right-0 mx-2 rounded p-2 text-white text-xs cursor-pointer hover:opacity-90 transition-opacity overflow-hidden',
                      ]"
                      :style="getReservationStyle(res)"
                      @click="openModal(res)"
                      @keydown.enter="openModal(res)"
                    >
                      <div class="font-medium text-sm flex items-center gap-2">
                        {{ res.title }}
                      </div>
                      <div class="text-xs opacity-90">
                        {{ formatTime(res.date) }} - {{ formatTime(res.endDate) }} ({{ res.duration }} min)
                      </div>
                      <div class="pt-1">
                        <i class="pi pi-map-marker" />
                        {{ res.location }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="viewMode === 'week'"
            class="flex min-w-max"
          >
            <div
              class="w-16 border-r border-gray-200 dark:border-gray-600 sticky left-0 z-10"
            >
              <div class="h-12 border-b border-gray-200 dark:border-gray-600" />
              <div
                v-for="hour in hours"
                :key="hour"
                class="flex items-center justify-end h-12 border-b border-gray-200 dark:border-gray-600 text-sm pr-2 pt-1"
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
                :class="[
                  'h-12 border-b border-gray-200 dark:border-gray-600 flex flex-col items-center justify-center sticky top-0 z-10',
                  { '': isToday(day) },
                ]"
              >
                <div class="text-xs">
                  {{ getDayName(day) }}
                </div>
                <div
                  :class="[
                    'text-xl',
                    isToday(day)
                      ? 'bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center'
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
                  v-tooltip.top="res.duration < 120 ? `${res.title}\n${formatTime(res.date)} - ${formatTime(res.endDate)} (${res.duration} min)\n${res.location}` : null"
                  :class="[
                    rentColor(res.color),
                    'absolute left-0 right-0 mx-1 rounded p-1 text-white text-xs cursor-pointer hover:opacity-90 transition-opacity overflow-hidden',
                  ]"
                  :style="getReservationStyle(res)"
                  @click="openModal(res)"
                  @keydown.enter="openModal(res)"
                >
                  <div class="font-medium flex items-center gap-1">
                    {{ res.title }}
                  </div>
                  <div class="text-xs opacity-90">
                    {{ formatTime(res.date) }} - {{ formatTime(res.endDate) }}
                  </div>
                  <div class="pt-1">
                    <i class="pi pi-map-marker" />
                    {{ res.location }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="grid grid-cols-7"
          >
            <div
              v-for="(dayName, idx) in monthDayNames"
              :key="idx"
              class="border-b border-r border-gray-200 dark:border-gray-600 p-2 text-center font-semibold text-sm"
            >
              {{ dayName }}
            </div>

            <div
              v-for="(day, idx) in monthDays"
              :key="idx"
              :class="[
                'border-b border-r border-gray-200 dark:border-gray-600 min-h-24 p-2 relative',
                !isSameMonth(day) ? 'bg-gray-50 dark:bg-gray-800 opacity-50' : '',
                isToday(day) ? 'bg-blue-50 dark:bg-blue-900/20' : '',
              ]"
            >
              <div
                :class="[
                  'text-sm font-medium',
                  isToday(day)
                    ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                    : '',
                ]"
              >
                {{ day.getDate() }}
              </div>

              <div class="mt-1 space-y-1">
                <div
                  v-for="res in getReservationsForDay(day)"
                  :key="res.id"
                  v-tooltip.top="res.duration < 120 ? `${res.title}\n${formatTime(res.date)} - ${formatTime(res.endDate)} (${res.duration} min)\n${res.location}` : null"
                  :class="[
                    rentColor(res.color),
                    'text-white text-xs rounded px-1 py-0.5 cursor-pointer hover:opacity-90 transition-opacity truncate',
                  ]"
                  @click="openModal(res)"
                  @keydown.enter="openModal(res)"
                >
                  <span class="font-medium">{{ formatTime(res.date) }} - {{ formatTime(res.endDate) }}</span>
                  {{ res.title }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <RentDetails
          v-if="selectedReservation"
          v-model:open="visible"
          :selected-reservation="selectedReservation"
          @edit="handleEdit"
          @deleted="handleDeleted"
        />
        <Dialog
          v-model:visible="showBookingForm"
          modal
          :header="editedReservation ? t('forms.titles.editBooking') : t('forms.titles.newTitle')"
          :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
          <FormsBookingEditForm
            :visible="showBookingForm"
            :provided-room-id="selectedRoomId"
            :booking-id="editingBookingId"
            @update-visible="showBookingForm = $event"
          />
        </Dialog>
      </template>
    </Card>
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CalendarHeader from '~/components/reservations/myCalendar/CalendarHeader.vue'
import RentDetails from '~/components/reservations/myCalendar/RentDetails.vue'
import { useBooking } from '~/composables/useBooking'
import { useAuth } from '~/composables/useAuth'
import { dayOfWeekFullNames, parseLocalDate } from '~/utils/dateHelpers'

definePageMeta({
  middleware: 'auth',
})

const currentDate = ref(new Date())
const selectedReservation = ref(null)
const visible = ref(false)
const viewMode = ref('week')
const showBookingForm = ref(false)
const selectedRoomId = ref('')
const editingBookingId = ref('')
const editedReservation = ref(null)
const { t } = useI18n()
const { bookings, fetchBookings } = useBooking()
const { user } = useAuth()

const reservations = computed(() => {
  const result = []
  const colors = ['blue', 'green', 'yellow', 'purple', 'orange']

  bookings.value
    .filter(booking => booking.status !== 'cancelled')
    .forEach((booking, index) => {
      const startDate = parseLocalDate(booking.startedAt)
      const endDate = parseLocalDate(booking.endedAt)
      const color = booking.status === 'cancelled' ? 'red' : colors[index % colors.length]

      const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
      const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())

      if (startDay.getTime() === endDay.getTime()) {
        const duration = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))
        result.push({
          id: booking.id,
          title: booking.title,
          date: startDate,
          endDate: endDate,
          duration: duration,
          location: booking.room?.location || t('pages.myCalendar.noLocations'),
          attendees: booking.participantsCount,
          color: color,
          isPrivate: booking.isPrivate,
          roomName: booking.room?.roomName || t('pages.myCalendar.noRoom'),
          status: booking.status,
        })
      }
      else {
        const currentDay = new Date(startDay)

        while (currentDay <= endDay) {
          let segmentStart, segmentEnd

          if (currentDay.getTime() === startDay.getTime()) {
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
            id: `${booking.id}-${currentDay.getTime()}`,
            originalId: booking.id,
            title: booking.title,
            date: segmentStart,
            endDate: segmentEnd,
            duration: duration,
            location: booking.room.location,
            attendees: booking.participantsCount,
            color: color,
            isPrivate: booking.isPrivate,
            roomName: booking.room.roomName,
            isMultiDay: true,
            status: booking.status,
          })

          currentDay.setDate(currentDay.getDate() + 1)
        }
      }
    })

  return result
})

const hours = Array.from({ length: 24 }, (_, i) => i)

const weekDays = computed(() => {
  const date = new Date(currentDate.value)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(date.setDate(diff))

  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push(d)
  }
  return days
})

const monthDays = computed(() => {
  const date = new Date(currentDate.value)
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDay = new Date(year, month, 1)

  const firstDayOfWeek = firstDay.getDay()
  const startDate = new Date(firstDay)
  startDate.setDate(
    startDate.getDate() - (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1),
  )

  const days = []
  const totalDays = 42

  for (let i = 0; i < totalDays; i++) {
    const day = new Date(startDate)
    day.setDate(startDate.getDate() + i)
    days.push(day)
  }

  return days
})

const monthDayNames = computed(() => {
  return [
    t('date.dayShortNames.monday'),
    t('date.dayShortNames.tuesday'),
    t('date.dayShortNames.wednesday'),
    t('date.dayShortNames.thursday'),
    t('date.dayShortNames.friday'),
    t('date.dayShortNames.saturday'),
    t('date.dayShortNames.sunday'),
  ]
})

const getReservationsForDay = (day) => {
  return reservations.value.filter(
    res =>
      res.date.getFullYear() === day.getFullYear()
      && res.date.getMonth() === day.getMonth()
      && res.date.getDate() === day.getDate(),
  )
}

const getReservationStyle = (reservation) => {
  const hour = reservation.date.getHours()
  const minutes = reservation.date.getMinutes()
  const top = (hour * 60 + minutes) * (48 / 60)
  const height = (reservation.duration / 60) * 48

  return {
    top: `${top}px`,
    height: `${height}px`,
  }
}

const colorMap = {
  blue: 'bg-blue-500 dark:bg-blue-900',
  green: 'bg-green-500 dark:bg-green-900',
  yellow: 'bg-yellow-500 dark:bg-yellow-900',
  purple: 'bg-purple-500 dark:bg-purple-900',
  red: 'bg-red-500 dark:bg-red-900',
  orange: 'bg-orange-500 dark:bg-orange-900',
}

const rentColor = color => colorMap[color]

const formatTime = (date) => {
  return date.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getDayName = (day) => {
  const dayNumber = day.getDay()
  let arrayDayNumber = dayNumber - 1
  if (arrayDayNumber < 0) {
    arrayDayNumber = 6
  }
  return t(dayOfWeekFullNames[arrayDayNumber])
}

const isToday = (day) => {
  const today = new Date()
  return (
    day.getDate() === today.getDate()
    && day.getMonth() === today.getMonth()
    && day.getFullYear() === today.getFullYear()
  )
}

const isSameMonth = (day) => {
  return day.getMonth() === currentDate.value.getMonth()
}

const openModal = (reservation) => {
  visible.value = true
  const displayReservation = {
    ...reservation,
    id: reservation.originalId || reservation.id,
  }
  selectedReservation.value = displayReservation
}

const handleWeekUpdate = (value) => {
  currentDate.value = value
}

const handleViewChange = (newView) => {
  viewMode.value = newView
}

const handleBookingSuccess = async () => {
  showBookingForm.value = false

  const editedId = editingBookingId.value

  if (user.value?.id) {
    await fetchBookings(true)
  }

  if (editedReservation.value && editedId) {
    setTimeout(() => {
      const updatedReservation = reservations.value.find(r => r.id === editedId)
      if (updatedReservation) {
        selectedReservation.value = updatedReservation
        visible.value = true
      }
      editedReservation.value = null
      editingBookingId.value = ''
    }, 300)
  }
}

const handleShowBookingForm = (roomId = '') => {
  selectedRoomId.value = roomId
  editingBookingId.value = ''
  editedReservation.value = null
  showBookingForm.value = true
}

const handleEdit = (reservation) => {
  visible.value = false
  editedReservation.value = reservation
  editingBookingId.value = reservation.id
  selectedRoomId.value = ''
  showBookingForm.value = true
}

const handleDeleted = () => {
  if (user.value?.id) {
    fetchBookings(true)
  }
}

defineExpose({ handleShowBookingForm })

onMounted(async () => {
  await fetchBookings(true)
})
</script>
