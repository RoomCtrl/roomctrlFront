<template>
  <div class="flex flex-col xl:flex-col min-h-screen">
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
      />
      <div class="basis-1/5 self-start hidden lg:block">
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
import { roomsDetailsData } from '~/assets/data/roomsDetails'

definePageMeta({
  middleware: 'auth',
})

const first = ref(0)
const rowsPerPage = ref(12)
const rooms = roomsDetailsData

const paginatedRooms = computed(() => {
  return rooms.slice(first.value, first.value + rowsPerPage.value)
})

function onPageChange(event: any) {
  first.value = event.first
  rowsPerPage.value = event.rows
}
</script>
