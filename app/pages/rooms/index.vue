<template>
  <div class="flex flex-col xl:flex-col">
    <div class="flex flex-row justify-between px-4">
      <Card
        pt:content:class="flex flex-row justify-between items-center"
      >
        <template #content>
          <div class="flex flex-row gap-1">
            <div
              v-for="button in statusButtons"
              :key="button.label"
            >
              <div
                class="border-2 rounded-xl px-3 py-2 font-semibold"
                :class="[roomStatus === button.value ? button.selected : button.style]"
                variant="raised"
                @click="filterByStatus(button.value)"
              >
                {{ button.label }}
              </div>
            </div>
          </div>
        </template>
      </Card>
      <Paginator
        class="flex self-center"
        :first="first"
        :rows="rowsPerPage"
        :totalRecords="filteredRooms.length"
        :rowsPerPageOptions="[12, 18, 24]"
        @page="onPageChange"
      />
      <Card>
        <template #content>
          <div class="flex flex-row gap-2">
            <FloatLabel variant="on">
              <InputNumber
                id="roomName"
                v-model="roomName"
              />
              <label for="roomName">Numer sali</label>
            </FloatLabel>
            <Button
              label="Szukaj"
              @click="filterRooms"
            />
          </div>
        </template>
      </Card>
    </div>

    <div class="flex flex-row items-center gap-1">
      <RoomGrid
        :rooms="paginatedRooms"
      />
    </div>
    <Paginator
      class="flex self-center"
      :first="first"
      :rows="rowsPerPage"
      :totalRecords="filteredRooms.length"
      :rowsPerPageOptions="[12, 18, 24]"
      @page="onPageChange"
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
const rowsPerPage = ref(12)
const rooms = roomsDetailsData
const filteredRooms = ref(roomsDetailsData)
const roomName = ref()
const roomStatus = ref('all')
const paginatedRooms = computed(() => {
  return filteredRooms.value.slice(first.value, first.value + rowsPerPage.value)
})
const statusButtons = ref([
  {
    label: 'Wszystkie',
    value: 'all',
    selected: 'bg-gray-700 border-gray-700 text-white',
  },
  {
    label: 'Dostepna',
    value: 'available',
    selected: 'bg-green-700 border-green-700 text-white',
  },
  {
    label: 'Zajete',
    value: 'occupied',
    selected: 'bg-red-700 border-red-700 text-white',
  },
  {
    label: 'Nieczynne',
    value: 'closed',
    selected: 'bg-yellow-700 border-yellow-700 text-white',
  },
])

const filterByStatus = (status: string) => {
  roomStatus.value = status
  filterRooms()
}

const filterRooms = () => {
  filteredRooms.value = rooms.filter((r) => {
    const matchesTitles = roomName.value ? r.roomName?.includes(roomName.value) : true

    const matchesStatus = roomStatus.value === 'all' ? true : r.status === roomStatus.value

    return matchesTitles && matchesStatus
  })
}

function onPageChange(event: any) {
  first.value = event.first
  rowsPerPage.value = event.rows
}
</script>
