<template>
  <div class="flex flex-col xl:flex-col w-full">
    <div class="relative flex flex-row items-center justify-center gap-4 mb-14 w-full">
      <div class="absolute left-0 shadow-md p-4 rounded-lg bg-white">
        <h1 class="font-bold text-4xl">
          Lista sal
        </h1>
      </div>
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
import { filter } from '@primeuix/themes/aura/datatable'
import RoomGrid from '~/components/rooms/RoomGrid.vue'
import RoomsFilter from '~/components/rooms/RoomsFilter.vue'
import { useRoom } from '~/composables/useRoom'

definePageMeta({
  middleware: 'auth',
})

const { rooms: allRooms, fetchRooms, loadFavoriteIds } = useRoom()

const first = ref(0)
const rows = ref(12)

const filters = ref({
  status: null as string | null,
  minCapacity: null as number | null,
  minSize: null as number | null,
  searchName: '' as string,
  equipment: [] as string[],
  location: null as string | null,
  lighting: null as string | null,
  access: null as string | null,
})

const filteredRooms = computed(() => {
  return allRooms.value.filter((room) => {
    let matches = true

    if (filters.value.status) {
      if (filters.value.status === 'available') {
        matches = matches && !room.currentBooking && room.status === 'available'
      }
      else if (filters.value.status === 'occupied') {
        matches = matches && !!room.currentBooking
      }
      else if (filters.value.status === 'maintenance') {
        matches = matches && (room.status === 'occupied' || room.status === 'maintenance')
      }
    }

    if (filters.value.minCapacity) {
      matches = matches && room.capacity >= filters.value.minCapacity
    }

    if (filters.value.minSize) {
      matches = matches && room.size >= filters.value.minSize
    }

    if (filters.value.searchName) {
      matches = matches && room.roomName.toLowerCase().includes(filters.value.searchName.toLowerCase())
    }

    if (filters.value.equipment.length > 0) {
      const roomEquipmentNames = room.equipment?.map(eq => eq.name) || []
      matches = matches && filters.value.equipment.every(eqName => roomEquipmentNames.includes(eqName))
    }

    if (filters.value.location && filters.value.location?.length > 0 && room.location) {
      matches = matches && room.location.includes(filters.value.location)
    }

    if (filters.value.lighting && filters.value.lighting?.length > 0 && room.lighting) {
      matches = matches && room.lighting.includes(filters.value.lighting)
    }
    if (filters.value.access && room.access) {
      matches = matches && room.access === filters.value.access
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

const onFilterChange = (newFilters: { status: string | null, minCapacity: number | null, minSize: number | null, searchName: string, equipment: string[], location: string | null, lighting: string | null, access: string | null }) => {
  filters.value = newFilters
  first.value = 0
}

onMounted(async () => {
  await loadFavoriteIds()
  await fetchRooms(true)
})
</script>
