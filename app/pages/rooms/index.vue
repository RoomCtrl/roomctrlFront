<template>
  <div class="flex flex-col xl:flex-col">
    <Paginator
      class="flex self-center"
      :first="first"
      :rows="rowsPerPage"
      :totalRecords="rooms.length"
      :rowsPerPageOptions="[8, 12, 16]"
      @page="onPageChange"
    />
    <div class="flex flex-row items-center gap-1">
      <RoomGrid
        :rooms="paginatedRooms"
        class="lg:basis-3/4"
      />
      <div class="basis-1/4 self-start hidden lg:block">
        <RoomsFilters />
      </div>
    </div>
    <Paginator
      class="flex self-center"
      :first="first"
      :rows="rowsPerPage"
      :totalRecords="rooms.length"
      :rowsPerPageOptions="[8, 12, 16]"
      @page="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import RoomsFilters from '~/components/forms/RoomsFilters.vue'
import RoomGrid from '~/components/rooms/RoomGrid.vue'

const first = ref(0)
const rowsPerPage = ref(12)

const rooms = [{
  room_id: '1',
  room_name: '201',
  status: 'occupied',
  capacity: 21,
  size: '12 m',
  current_booking: {
    title: 'Spotkanie zespółu do spraw sprzedaży oraz techniczny',
    startedAt: '2025-08-11 11:00:00',
    endedAt: '2025-08-11 13:30:00',
  },
  next_booking: {
    title: 'Sprzatanie pomieszczenia',
    startedAt: '2025-08-11 14:00:00',
    endedAt: '2025-08-11 16:30:00',
  },
}, {
  room_id: '2',
  room_name: '202',
  status: 'occupied',
  capacity: 10,
  size: '2 m',
  current_booking: {
    title: 'Spotkanie zespółu do spraw sprzedaży oraz techniczny',
    startedAt: '2025-08-11 11:00:00',
    endedAt: '2025-08-12 13:30:00',
  },
  next_booking: {
    title: 'Sprzatanie pomieszczenia',
    startedAt: '2025-08-12 14:00:00',
    endedAt: '2025-08-13 16:30:00',
  },
}, {
  room_id: '3',
  room_name: '201',
  status: 'out_of_order',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '4',
  room_name: '201',
  status: 'occupied',
  capacity: 21,
  current_booking: {
    title: 'Spotkanie zespółu do spraw sprzedaży oraz techniczny',
    startedAt: '2025-08-11 11:00:00',
    endedAt: '2025-08-12 13:30:00',
    isPrivate: true,
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '5',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: 'Spotkanie zespółu do spraw sprzedaży oraz techniczny',
    startedAt: '2025-08-11 11:00:00',
    endedAt: '2025-08-12 13:30:00',
    isPrivate: true,
  },
}, {
  room_id: '6',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '7',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '8',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '9',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '10',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '11',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '12',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '13',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '14',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
}, {
  room_id: '15',
  room_name: '201',
  status: 'avaiable',
  capacity: 21,
  current_booking: {
    title: '',
  },
  next_booking: {
    title: '',
  },
},
]

const paginatedRooms = computed(() => {
  return rooms.slice(first.value, first.value + rowsPerPage.value)
})

function onPageChange(event: any) {
  first.value = event.first
  rowsPerPage.value = event.rows
}
</script>
