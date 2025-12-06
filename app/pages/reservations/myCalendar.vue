<template>
  <Card class="w-full flex flex-col">
    <template #header>
      <CalendarHeader
        :current-date="currentDate"
        :weekDays="weekDays"
        :view-mode="viewMode"
        @update-date="handleWeekUpdate"
        @change-view="changeView"
      />
    </template>

    <template #content>
      <div class="flex-1 overflow-auto">
        <div v-if="viewMode === 'day'" class="w-full">
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
                v-for="hour in hours"
                :key="hour"
                class="h-12 border-b border-gray-200 dark:border-gray-600"
              />

              <div class="absolute top-0 left-0 right-0 bottom-0">
                <div
                  v-for="res in getReservationsForDay(currentDate)"
                  :key="res.id"
                  :class="[
                    rentColor(res.color),
                    'absolute left-0 right-0 mx-2 rounded p-2 text-white text-xs cursor-pointer hover:opacity-90 transition-opacity overflow-hidden'
                  ]"
                  :style="getReservationStyle(res)"
                  @click="openModal(res)"
                  @keydown.enter="openModal(res)"
                >
                  <div class="font-medium text-sm">
                    {{ res.title }}
                  </div>
                  <div class="text-xs opacity-90">
                    {{ formatTime(res.date) }} ({{ res.duration }} min)
                  </div>
                  <div class="pt-1">
                    <i class="pi pi-map-marker" />
                    {{ res.location }}
                  </div>
                </div>
              </div>

              <div
                class="sticky top-0 h-12 border-b border-gray-200 dark:border-gray-600 flex items-center justify-center font-semibold text-lg z-5"
              >
                <div class="text-center">
                  <div class="text-xs text-gray-600 dark:text-gray-400">
                    {{ getDayName(currentDate) }}
                  </div>
                  <div
                    :class="[
                      'text-xl',
                      isToday(currentDate) ? 'text-blue-600 font-bold' : ''
                    ]"
                  >
                    {{ currentDate.getDate() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="viewMode === 'week'" class="flex min-w-max">
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
                { '': isToday(day) }
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
                    : ''
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
                :class="[
                  rentColor(res.color),
                  'absolute left-0 right-0 mx-1 rounded p-1 text-white text-xs cursor-pointer hover:opacity-90 transition-opacity overflow-hidden'
                ]"
                :style="getReservationStyle(res)"
                @click="openModal(res)"
                @keydown.enter="openModal(res)"
              >
                <div class="font-medium">
                  {{ res.title }}
                </div>
                <div class="text-xs opacity-90">
                  {{ formatTime(res.date) }}
                </div>
                <div class="pt-1">
                  <i class="pi pi-map-marker" />
                  {{ res.location }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-7">
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
              isToday(day) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            ]"
          >
            <div
              :class="[
                'text-sm font-medium',
                isToday(day)
                  ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                  : ''
              ]"
            >
              {{ day.getDate() }}
            </div>

            <div class="mt-1 space-y-1">
              <div
                v-for="res in getReservationsForDay(day)"
                :key="res.id"
                :class="[
                  rentColor(res.color),
                  'text-white text-xs rounded px-1 py-0.5 cursor-pointer hover:opacity-90 transition-opacity truncate'
                ]"
                @click="openModal(res)"
                @keydown.enter="openModal(res)"
              >
                <span class="font-medium">{{ formatTime(res.date) }}</span>
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
        @edit="handleEditReservation"
        @delete="handleDeleteReservation"
      />

      <EditReservationForm
        v-model:open="showEditForm"
        :reservation="editingReservation"
        @save="handleSaveReservation"
      />
    </template>
  </Card>
</template>

<script setup>
import { ref, computed } from 'vue'
import CalendarHeader from '~/components/reservations/myCalendar/CalendarHeader.vue'
import RentDetails from '~/components/reservations/myCalendar/RentDetails.vue'
import EditReservationForm from '~/components/reservations/myCalendar/EditReservationForm.vue'
import { dayOfWeekFullNames } from '~/utils/dateHelpers'

const currentDate = ref(new Date())
const selectedReservation = ref(null)
const visible = ref(false)
const showEditForm = ref(false)
const editingReservation = ref(null)
const viewMode = ref('week') // 'day', 'week' lub 'month'
const { t } = useI18n()

const reservations = ref([
  {
    id: 1,
    title: 'Kolacja w Restauracji Italiano',
    date: new Date(2025, 11, 5, 19, 0),
    duration: 120,
    location: 'ul. Paderewskiego 12',
    attendees: 4,
    color: 'blue'
  },
  {
    id: 2,
    title: 'Spotkanie biznesowe',
    date: new Date(2025, 11, 2, 14, 0),
    duration: 90,
    location: 'Hotel Sheraton',
    attendees: 6,
    color: 'green'
  },
  {
    id: 3,
    title: 'Lunch z klientem',
    date: new Date(2025, 11, 3, 12, 30),
    duration: 90,
    location: 'Stary Rynek 44',
    attendees: 2,
    color: 'yellow'
  },
  {
    id: 4,
    title: 'Prezentacja produktu',
    date: new Date(2025, 11, 4, 10, 0),
    duration: 60,
    location: 'Biuro główne',
    attendees: 8,
    color: 'purple'
  },
  {
    id: 5,
    title: 'Spotkanie zespołu',
    date: new Date(2025, 11, 4, 15, 30),
    duration: 60,
    location: 'Sala konferencyjna A',
    attendees: 5,
    color: 'red'
  },
  {
    id: 6,
    title: 'Warsztat design thinking',
    date: new Date(2025, 11, 6, 9, 0),
    duration: 180,
    location: 'Malta Office Park',
    attendees: 12,
    color: 'blue'
  },
  {
    id: 7,
    title: 'Konsultacja prawna',
    date: new Date(2025, 11, 6, 14, 0),
    duration: 60,
    location: 'Online - Zoom',
    attendees: 3,
    color: 'green'
  },
  {
    id: 8,
    title: 'Kolacja biznesowa',
    date: new Date(2025, 11, 7, 18, 30),
    duration: 150,
    location: 'Restauracja Porto',
    attendees: 4,
    color: 'red'
  }
])

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
    startDate.getDate() - (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1)
  )

  const days = []
  const totalDays = 42 // 6 tygodni

  for (let i = 0; i < totalDays; i++) {
    const day = new Date(startDate)
    day.setDate(startDate.getDate() + i)
    days.push(day)
  }

  return days
})

const monthDayNames = computed(() => {
  const days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd']
  return days.map((day) => t(day))
})

const getReservationsForDay = (day) => {
  return reservations.value.filter(
    (res) =>
      res.date.getFullYear() === day.getFullYear() &&
      res.date.getMonth() === day.getMonth() &&
      res.date.getDate() === day.getDate()
  )
}

const getReservationStyle = (reservation) => {
  const hour = reservation.date.getHours()
  const minutes = reservation.date.getMinutes()
  const top = (hour * 60 + minutes) * (48 / 60)
  const height = (reservation.duration / 60) * 48

  return {
    top: `${top}px`,
    height: `${height}px`
  }
}

const colorMap = {
  blue: 'bg-blue-500 dark:bg-blue-900',
  green: 'bg-green-500 dark:bg-green-900',
  yellow: 'bg-yellow-500 dark:bg-yellow-900',
  purple: 'bg-purple-500 dark:bg-purple-900',
  red: 'bg-red-500 dark:bg-red-900',
  orange: 'bg-orange-500 dark:bg-orange-900'
}

const rentColor = (color) => colorMap[color]

const formatTime = (date) => {
  return date.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit'
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
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() &&
    day.getFullYear() === today.getFullYear()
  )
}

const isSameMonth = (day) => {
  return day.getMonth() === currentDate.value.getMonth()
}

const openModal = (reservation) => {
  visible.value = true
  selectedReservation.value = reservation
}

const handleWeekUpdate = (value) => {
  currentDate.value = value
}

const changeView = (newMode) => {
  viewMode.value = newMode
}

const handleEditReservation = (reservation) => {
  editingReservation.value = reservation
  showEditForm.value = true
}

const handleSaveReservation = (updatedReservation) => {
  const index = reservations.value.findIndex(
    (res) => res.id === updatedReservation.id
  )
  if (index !== -1) {
    reservations.value[index] = updatedReservation
  }
  editingReservation.value = null
  showEditForm.value = false
}

const handleDeleteReservation = (reservationId) => {
  // Usuń rezerwację z listy
  reservations.value = reservations.value.filter(
    (res) => res.id !== reservationId
  )
}
</script>
