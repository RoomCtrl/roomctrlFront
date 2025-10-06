<template>
  <Panel
    :header=" $t('pages.roomDetails.weekCalendar.title')"
    pt:header:class="text-2xl lg:text-3xl font-bold mb-6"
    pt:content:class="h-full flex"
    :toggleable="isMobile"
  >
    <div class="flex flex-row gap-4 h-full w-full">
      <div class="flex flex-wrap sm:max-xl:grid md:max-lg:grid-cols-2 lg:max-xl:grid-cols-4 lg:flex-col gap-1 w-full">
        <div
          v-for="day in weekDays"
          :key="day.date"
          class="flex max-xl:flex-col xl:flex-nowrap gap-1 w-full"
        >
          <Chip
            pt:root:class="rounded-xl"
            pt:root:style="--p-chip-background:color-mix(in srgb, var(--p-gray-500) 70%, transparent)"
            class="flex-none xl:w-[7vw] flex flex-row justify-between"
          >
            <span class="hidden lg:block">{{ $t(day.name) }}</span>
            <span class="block lg:hidden">{{ $t(day.fullName) }}</span>
            <span>({{ day.dayNumber + '.' + day.month }})</span>
          </Chip>
          <div class="grid grid-cols-4 lg:max-xl:grid-cols-2 xl:flex xl:flex-wrap gap-1 flex-1">
            <Chip
              v-for="hour in hours"
              :key="`${day.date}-${hour}`"
              v-tooltip.bottom="{
                value: getTooltipText(day.date, hour),
                pt: {
                  text: 'text-center',
                },
              }"
              :pt:root:style="getCellClass(day.date, hour)"
              class="flex-1"
              :label="formatHour(hour)"
              @click="handleCellClick(day.date, hour)"
            />
          </div>
        </div>
      </div>
      <Dialog
        v-if="isMobile"
        v-model:visible="selectedSlot"
        :dismissable-mask="true"
        class="block lg:hidden mt-6"
      >
        <template #header>
          <h3 class="text-lg font-semibold mb-2">
            {{ $t(selectedSlot.day) }} {{ formatHour(selectedSlot.hour) }}
          </h3>
        </template>

        <div v-if="selectedSlot.booking">
          <p><strong>{{ selectedSlot.booking.title }}</strong></p>
          <p>{{ $t('pages.roomDetails.weekCalendar.participants') + selectedSlot.booking.participants }}</p>
          <p>{{ $t('pages.roomDetails.weekCalendar.meetingTyp', { type: meetingType }) }}</p>
        </div>
        <div v-else>
          <p>{{ $t('pages.roomDetails.weekCalendar.availableRoom') }}</p>
        </div>
      </Dialog>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  currentBooking: {
    type: Object,
    default: null,
  },
  nextBookings: {
    type: Array,
    default: () => [],
  },
})
const { t } = useI18n()
const isMobile = ref(false)
const isReady = ref(false)
const colorMode = useColorMode()
const isDarkMode = computed(() => {
  if (!isReady.value) return false
  return colorMode.value === 'dark' || colorMode.preference === 'dark'
})

const selectedSlot = ref(null)

const currentBooking = props.currentBooking
const nextBookings = props.nextBookings

const allBookings = computed(() => {
  const bookings = [...nextBookings]
  if (currentBooking) {
    bookings.push(currentBooking)
  }
  return bookings
})

const hours = Array.from({ length: 8 }, (_, i) => i + 8)

const weekDays = computed(() => {
  const startOfWeek = new Date()
  const day = startOfWeek.getDay()
  const month = (startOfWeek.getMonth() + 1).toString().padStart(2, '0')
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(startOfWeek.setDate(diff))

  const days = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    days.push({
      name: dayOfWeekShortNames[i],
      fullName: dayOfWeekFullNames[i],
      dayNumber: date.getDate(),
      month: month,
      date: date.toISOString().split('T')[0],
    })
  }
  return days
})

const formatHour = (hour) => {
  return `${hour}:00`
}

const getBookingForSlot = (date: string, hour: number) => {
  return allBookings.value.find((booking) => {
    const startDate = new Date(booking.startedAt)
    const endDate = new Date(booking.endedAt)
    const bookingDate = startDate.toISOString().split('T')[0]

    if (bookingDate === date) {
      const startHour = startDate.getHours()
      const endHour = endDate.getHours()
      return hour >= startHour && hour < endHour
    }
    return false
  })
}

const getCellClass = (date: string, hour: number) => {
  const booking = getBookingForSlot(date, hour)
  if (!booking) {
    if (isDarkMode.value) {
      return '--p-chip-background: var(--p-green-900)'
    }
    else {
      return '--p-chip-background: var(--p-green-700)'
    }
  }
  if (isDarkMode.value) {
    return '--p-chip-background: var(--p-red-900)'
  }
  else {
    return '--p-chip-background: var(--p-red-700)'
  }
}

const getTooltipText = (date: string, hour: number) => {
  const booking = getBookingForSlot(date, hour)
  const dayName = t(weekDays.value.find(d => d.date === date)?.fullName)

  if (booking) {
    return `${dayName} ${formatHour(hour)} \n ${booking.title} (${booking.participants} osób)`
  }
  return `${dayName} ${formatHour(hour)} \n Dostępne`
}

const handleCellClick = (date, hour) => {
  const booking = getBookingForSlot(date, hour)
  const dayName = weekDays.value.find(d => d.date === date)?.fullName

  selectedSlot.value = {
    day: dayName,
    hour,
    date,
    booking,
  }
}

const meetingType = computed(() => {
  return t('pages.roomDetails.weekCalendar.' + (selectedSlot.value.booking.isPrivate ? 'private' : 'public'))
})

function checkIsMobile() {
  isMobile.value = window.innerWidth <= 768
}
onMounted(() => {
  isReady.value = true
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobile)
})
</script>

<style scoped>
.p-chip {
  border-radius: 0.75rem
}
</style>
