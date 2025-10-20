<template>
  <div class="fixed inset-4 flex flex-col overflow-hidden pl-[4rem] pr-[1rem]">
    <div class="grid grid-cols-2 gap-x-2 h-full">
      <div class="grid grid-cols-12 grid-rows-13 gap-2 h-full">
        <CardInfoAllRooms
          v-for="room in rooms"
          :key="room.title"
          class="col-span-4 row-span-3 min-h-0 overflow-hidden"
          :header="room.title"
          :num-of-rooms="room.numOfRooms"
          :max-rooms="maxRooms"
          :color="room.color"
        />
        <RentMonthCalendar class="col-span-6 row-span-5 min-h-0 overflow-hidden" />
        <LoadOfRooms class="col-span-6 row-span-5 min-h-0 overflow-hidden" />
        <ReportRoomsTable class="col-span-full row-span-5 min-h-0 overflow-hidden" />
      </div>
      <div class="flex flex-col gap-2 h-full">
        <div class="grid grid-cols-2 gap-x-2 min-h-0">
          <CountOfRentChart class="min-h-0 overflow-hidden" />
          <MostRentRooms class="min-h-0 overflow-hidden" />
        </div>
        <IncomingRentsTable
          class="flex-1 min-h-0"
          :rows="3"
          header="Najblizsze rezerwacje"
          :to-approve="false"
        />
        <IncomingRentsTable
          class="flex-1 min-h-0"
          :rows="3"
          header="Rezerwacje do potwierdznia"
          :to-approve="true"
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
    color: 'var(--p-red-800)',
  },
  {
    title: 'Dostepne sale',
    numOfRooms: 5,
    color: 'var(--p-green-800)',
  },
  {
    title: 'Nieczynne sale',
    numOfRooms: 5,
    color: 'var(--p-yellow-800)',
  },
])
</script>
