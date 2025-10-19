<template>
  <div class="fixed inset-4 flex flex-col overflow-hidden">
    <div class="grid grid-cols-2 gap-x-2 h-full">
      <div class="grid grid-cols-12 grid-rows-9 gap-2 h-full">
        <CardInfoAllRooms
          v-for="room in rooms"
          :key="room.title"
          class="col-span-3 row-span-2 min-h-0 overflow-hidden"
          :header="room.title"
          :num-of-rooms="room.numOfRooms"
          :max-rooms="maxRooms"
          :color="room.color"
        />
        <QuickActions class="col-span-3 row-span-2 min-h-0 overflow-hidden" />
        <RentMonthCalendar class="col-span-6 row-span-4 min-h-0 overflow-hidden" />
        <LoadOfRooms class="col-span-6 row-span-4 min-h-0 overflow-hidden" />
        <ReportRoomsTable class="col-span-full row-span-3 min-h-0 overflow-hidden" />
      </div>
      <div class="flex flex-col gap-2 h-full">
        <div class="grid grid-cols-2 gap-x-2 flex-1 min-h-0">
          <CountOfRentChart class="min-h-0 overflow-hidden" />
          <MostRentRooms class="min-h-0 overflow-hidden" />
        </div>
        <IncomingRentsTable
          class="flex-1 min-h-0"
          :rows="3"
          header="Najblizsze rezerwacje"
        />
        <IncomingRentsTable
          class="flex-1 min-h-0"
          :rows="3"
          header="Rezerwacje do potwierdznia"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardInfoAllRooms from '~/components/adminDasboard/main/CardInfoAllRooms.vue'
import CountOfRentChart from '~/components/adminDasboard/main/CountOfRentChart.vue'
import IncomingRentsTable from '~/components/adminDasboard/main/IncomingRentsTable.vue'
import LoadOfRooms from '~/components/adminDasboard/main/LoadOfRooms.vue'
import MostRentRooms from '~/components/adminDasboard/main/MostRentRooms.vue'
import QuickActions from '~/components/adminDasboard/main/QuickActions.vue'
import RentMonthCalendar from '~/components/adminDasboard/main/RentMonthCalendar.vue'
import ReportRoomsTable from '~/components/adminDasboard/main/ReportRoomsTable.vue'

definePageMeta({
  middleware: ['admin'],
  layout: 'adminDashboard',
})

const maxRooms = ref(50)

const rooms = ref([
  {
    title: 'Zarezerwoane sale',
    numOfRooms: 40,
    color: 'red',
  },
  {
    title: 'Dostepne sale',
    numOfRooms: 5,
    color: 'green',
  },
  {
    title: 'Nieczynne sale',
    numOfRooms: 5,
    color: 'yellow',
  },
])
</script>
