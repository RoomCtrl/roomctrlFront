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
        />
        <IncomingRentsTable
          class="h-[37%] min-h-0 overflow-auto"
          :rows="4"
          :header="$t('pages.adminDashboard.dashboard.tables.titles.rentsToConfirm')"
          :to-approve="true"
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
          :colorLight="room.colorLight"
          :colorDark="room.colorDark"
          :status-type="room.type"
        />
        <RentMonthCalendar class="col-span-6 row-span-5 min-h-0 overflow-auto" />
        <LoadOfRooms class="col-span-6 row-span-5 min-h-0 overflow-auto" />
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

definePageMeta({
  // middleware: ['admin'],
  layout: 'admin-dashboard',
})

const maxRooms = ref(50)
const rooms = ref([
  {
    numOfRooms: 40,
    colorLight: 'var(--p-red-500)',
    colorDark: 'var(--p-red-700)',
    type: 'rent',
  },
  {
    numOfRooms: 5,
    colorLight: 'var(--p-green-500)',
    colorDark: 'var(--p-green-700)',
    type: 'available',
  },
  {
    numOfRooms: 5,
    colorLight: 'var(--p-yellow-500)',
    colorDark: 'var(--p-yellow-700)',
    type: 'closed',
  },
])
</script>
