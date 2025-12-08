<template>
  <div class="flex flex-col xl:flex-col w-full">
    <div class="relative flex flex-row items-center justify-center gap-4 mb-4 w-full">
      <Paginator
        v-if="paginatorPosition"
        class="flex self-center"
        :first="first"
        :rows="rows"
        :totalRecords="filteredRooms.length"
        :rowsPerPageOptions="[12, 18, 24]"
        @page="onPageChange"
        @update:rows="handelUpdateRows"
      />
      <RoomsFilter
        class="flex self-end absolute right-0"
        :rooms="allRooms"
        @filter="onFilterChange"
      />
    </div>

    <div class="flex flex-row items-center gap-1">
      <RoomGrid
        :rooms="paginatedRooms"
      />
    </div>
    <Paginator
      class="flex self-center"
      :first="first"
      :rows="rows"
      :totalRecords="filteredRooms.length"
      :rowsPerPageOptions="[12, 18, 24]"
      @page="onPageChange"
      @update:rows="handelUpdateRows"
    />
  </div>
</template>

<script setup lang="ts">
import RoomGrid from '~/components/rooms/RoomGrid.vue'
import RoomsFilter from '~/components/rooms/RoomsFilter.vue'
import { useRoom } from '~/composables/useRoom'

definePageMeta({
  middleware: 'auth',
})

const { rooms: allRooms, fetchRooms } = useRoom()

const first = ref(0)
const rows = ref(12)

const filters = ref({
  status: null as string | null,
  minCapacity: null as number | null,
  minSize: null as number | null,
  searchName: '' as string,
})

const filteredRooms = computed(() => {
  return allRooms.value.filter((room) => {
    let matches = true

    // Filter by status
    if (filters.value.status) {
      if (filters.value.status === 'available') {
        // Dostępna = nie ma currentBooking i status === 'available'
        matches = matches && !room.currentBooking && room.status === 'available'
      }
      else if (filters.value.status === 'occupied') {
        // Zajęta = ma currentBooking
        matches = matches && !!room.currentBooking
      }
      else if (filters.value.status === 'maintenance') {
        // Nieczynna = status === 'occupied' lub 'maintenance'
        matches = matches && (room.status === 'occupied' || room.status === 'maintenance')
      }
    }

    // Filter by minimum capacity
    if (filters.value.minCapacity) {
      matches = matches && room.capacity >= filters.value.minCapacity
    }

    // Filter by minimum size
    if (filters.value.minSize) {
      matches = matches && room.size >= filters.value.minSize
    }

    // Filter by room name
    if (filters.value.searchName) {
      matches = matches && room.roomName.toLowerCase().includes(filters.value.searchName.toLowerCase())
    }

    return matches
  })
})

const paginatedRooms = computed(() => {
  return filteredRooms.value.slice(first.value, first.value + rows.value)
})

const paginatorPosition = computed(() => {
  return rows.value > 12
})

function onPageChange(event: { first: number, rows: number }) {
  first.value = event.first
  rows.value = event.rows
}

const handelUpdateRows = (value: number) => {
  rows.value = value
}

const onFilterChange = (newFilters: { status: string | null, minCapacity: number | null, minSize: number | null, searchName: string }) => {
  filters.value = newFilters
  first.value = 0 // Reset to first page when filters change
}

onMounted(() => {
  fetchRooms(true) // true to fetch with bookings
})
</script>
