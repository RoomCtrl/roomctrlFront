<template>
  <div class="flex flex-col xl:flex-col">
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
import { roomsDetailsData } from '~/assets/data/roomsDetails'

definePageMeta({
  middleware: 'auth',
})

const first = ref(0)
const rows = ref(12)
const filteredRooms = ref(roomsDetailsData)
const paginatedRooms = computed(() => {
  return filteredRooms.value.slice(first.value, first.value + rows.value)
})
const paginatorPosition = computed(() => {
  return rows.value > 12
})

function onPageChange(event: any) {
  first.value = event.first
  rows.value = event.rows
}

const handelUpdateRows = (value: number) => {
  rows.value = value
}
</script>
