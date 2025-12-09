<template>
  <div class="h-[98.2vh] p-2 overflow-hidden">
    <div class="grid grid-cols-2 gap-1 h-full">
      <div class="flex flex-col gap-1 h-full overflow-hidden">
        <MostRentRooms class="h-[26%] min-h-0 overflow-auto" />
        <IncomingRentsTable
          class="h-[37%] min-h-0 overflow-auto"
          :rows="4"
          :header="$t('pages.adminDashboard.dashboard.tables.titles.incomingRents')"
          :to-approve="false"
          :bookings="upcomingBookings"
        />
        <IncomingRentsTable
          class="h-[37%] min-h-0 overflow-auto"
          :rows="4"
          :header="$t('pages.adminDashboard.dashboard.tables.titles.rentsToConfirm')"
          :to-approve="true"
          :bookings="upcomingBookings"
        />
      </div>

      <div class="grid grid-cols-12 grid-rows-11 gap-1 h-full overflow-hidden">
        <ReportRoomsTable class="col-span-8 row-span-6 min-h-0 overflow-auto" />
        <CardInfoAllRooms
          v-for="room in rooms"
          :key="room.type"
          class="col-span-4 row-span-2 min-h-0 overflow-hidden"
          :num-of-rooms="room.numOfRooms"
          :max-rooms="maxRooms"
          :color-light="room.colorLight"
          :color-dark="room.colorDark"
          :status-type="room.type"
        />
        <RentMonthCalendar
          class="col-span-6 row-span-5 min-h-0 overflow-auto"
          :bookings="bookings"
        />
        <LoadOfRooms
          class="col-span-6 row-span-5 min-h-0 overflow-auto"
          :bookings-data="bookingsChartData"
          :bookings="bookings"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardInfoAllRooms from '~/components/adminDasboard/main/CardInfoAllRooms.vue'
import IncomingRentsTable from '~/components/adminDasboard/main/IncomingRentsTable.vue'
import LoadOfRooms from '~/components/adminDasboard/main/LoadOfRooms.vue'
import MostRentRooms from '~/components/adminDasboard/main/MostRentRooms.vue'
import RentMonthCalendar from '~/components/adminDasboard/main/RentMonthCalendar.vue'
import ReportRoomsTable from '~/components/adminDasboard/main/ReportRoomsTable.vue'
import { useBooking } from '~/composables/useBooking'
import { useRoom } from '~/composables/useRoom'
import { useAuth } from '~/composables/useAuth'
import { BookingService } from '~/services/BookingService'

definePageMeta({
  // middleware: ['admin'],
  layout: 'admin-dashboard',
})

const { bookings, fetchBookings } = useBooking()
const { rooms: roomsList, fetchRooms } = useRoom()

// Computed dla statystyk sal
const maxRooms = computed(() => roomsList.value.length)

const rooms = computed(() => {
  // Zarezerwowane: status = 'available' ORAZ currentBooking istnieje
  const rent = roomsList.value.filter(room =>
    room.status === 'available' && room.currentBooking,
  ).length

  // Wolne: status = 'available' ORAZ brak currentBooking
  const available = roomsList.value.filter(room =>
    room.status === 'available' && !room.currentBooking,
  ).length

  // Nieczynne: status = 'occupied' (maintenance)
  const closed = roomsList.value.filter(room =>
    room.status === 'occupied',
  ).length

  return [
    {
      numOfRooms: rent,
      colorLight: 'var(--p-red-500)',
      colorDark: 'var(--p-red-700)',
      type: 'rent',
    },
    {
      numOfRooms: available,
      colorLight: 'var(--p-green-500)',
      colorDark: 'var(--p-green-700)',
      type: 'available',
    },
    {
      numOfRooms: closed,
      colorLight: 'var(--p-yellow-500)',
      colorDark: 'var(--p-yellow-700)',
      type: 'closed',
    },
  ]
})

// Dane dla wykresu obciążenia sal
const roomsChartData = computed(() => ({
  available: roomsList.value.filter(room => room.status === 'available' && !room.currentBooking).length,
  rent: roomsList.value.filter(room => room.status === 'available' && room.currentBooking).length,
  closed: roomsList.value.filter(room => room.status === 'occupied').length,
}))

// Dane dla wykresu statusów rezerwacji
const bookingsChartData = computed(() => ({
  planned: bookings.value.filter(booking => booking.status === 'active').length,
  ended: bookings.value.filter(booking => booking.status === 'completed').length,
  cancelled: bookings.value.filter(booking => booking.status === 'cancelled').length,
}))

// Computed dla najbliższych rezerwacji (sortowane po dacie)
const upcomingBookings = computed(() => {
  const now = new Date()
  return [...bookings.value]
    .filter(booking => new Date(booking.startedAt) > now && booking.status === 'active')
    .sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime())
})

onMounted(async () => {
  // Pobierz wszystkie rezerwacje - aktywne, zakończone i anulowane
  const activeBookings = await new BookingService(useAuth().token.value).getBookings(undefined, 'active')
  const completedBookings = await new BookingService(useAuth().token.value).getBookings(undefined, 'completed')
  const cancelledBookings = await new BookingService(useAuth().token.value).getBookings(undefined, 'cancelled')

  // Połącz wszystkie rezerwacje
  bookings.value = [...activeBookings, ...completedBookings, ...cancelledBookings]

  // Pobierz wszystkie sale z informacją o currentBooking
  fetchRooms(true)
})
</script>
