<template>
  <div class="h-[98.2vh] overflow-auto w-full">
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-1 xl:grid-cols-6 gap-2">
        <MostRentRooms
          class="min-h-[280px] xl:col-span-2"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 xl:col-span-4 gap-2">
          <RentMonthCalendar
            class="min-h-[280px] md:min-h-[320px]"
            :bookings="bookings"
          />
          <LoadOfRooms
            class="min-h-[280px] md:min-h-[320px]"
            :bookings-data="bookingsChartData"
            :bookings="bookings"
          />

          <div class="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-2">
            <CardInfoAllRooms
              v-for="room in rooms"
              :key="room.type"
              class="flex-1 min-h-[100px]"
              :num-of-rooms="room.numOfRooms"
              :max-rooms="maxRooms"
              :color-light="room.colorLight"
              :color-dark="room.colorDark"
              :status-type="room.type"
            />
          </div>
        </div>
      </div>
      <ReportRoomsTable />
      <IncomingRentsTable
        path="/adminDashboard/reservationList"
        :rows="4"
        :header="$t('pages.adminDashboard.dashboard.tables.titles.incomingRents')"
        :bookings="upcomingBookings"
      />
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

definePageMeta({
  layout: 'admin-dashboard',
  middleware: 'admin',
})

const { bookings, fetchBookings } = useBooking()
const { rooms: roomsList, fetchRooms } = useRoom()

const maxRooms = computed(() => roomsList.value.length)

const rooms = computed(() => {
  const rent = roomsList.value.filter(room =>
    room.status === 'available' && room.currentBooking,
  ).length

  const available = roomsList.value.filter(room =>
    room.status === 'available' && !room.currentBooking,
  ).length

  const closed = roomsList.value.filter(room =>
    room.status === 'out_of_use',
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

const bookingsChartData = computed(() => {
  const now = new Date()
  return {
    planned: bookings.value.filter((booking) => {
      const startDate = new Date(booking.startedAt)
      startDate.setTime(startDate.getTime() + (1 * 60 * 60 * 1000))
      return startDate > now
    }).length,
    ended: bookings.value.filter((booking) => {
      const endDate = new Date(booking.endedAt)
      endDate.setTime(endDate.getTime() + (1 * 60 * 60 * 1000))
      return endDate < now
    }).length,
    cancelled: 0,
  }
})

const upcomingBookings = computed(() => {
  const now = new Date()
  return [...bookings.value]
    .filter((booking) => {
      const startDate = new Date(booking.startedAt)
      startDate.setTime(startDate.getTime() + (1 * 60 * 60 * 1000))
      return startDate > now && booking.status !== 'cancelled'
    })
    .sort((a, b) => {
      const dateA = new Date(a.startedAt)
      const dateB = new Date(b.startedAt)
      dateA.setTime(dateA.getTime() + (1 * 60 * 60 * 1000))
      dateB.setTime(dateB.getTime() + (1 * 60 * 60 * 1000))
      return dateA.getTime() - dateB.getTime()
    })
})

onMounted(async () => {
  await fetchBookings(false)
  await fetchRooms(true)
})
</script>
