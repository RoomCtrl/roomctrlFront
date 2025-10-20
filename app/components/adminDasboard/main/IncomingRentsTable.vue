<template>
  <Card
    pt:body:class="p-2"
  >
    <template #title>
      <div class="flex flex-row justify-between">
        <h1 class="font-bold text-3xl">
          {{ header }}
        </h1>
        <Button
          icon="pi pi-arrow-right"
          class="flex"
          variant="outlined"
          rounded
        />
      </div>
    </template>
    <template #content>
      <DataTable
        :value="tableData"
        paginator
        :rows="rows"
      >
        <Column
          field="hour"
          header="Godzina"
        />
        <Column
          field="date"
          header="Dzien"
        />
        <Column
          field="room"
          header="Sala"
        />
        <Column
          field="bookedBy"
          header="Rezerwujacy"
        />
        <Column
          pt:root:class=""
          field="status"
          header="Status"
        >
          <template #body="{ data }">
            <Message
              pt:content:style="--p-message-content-padding: 0.25rem "
              pt:text:class="text-center w-full text-md"
              :severity="statusColor[ data.status]"
            >
              {{ $t('pages.reservationsHistory.statuses.' + data.status) }}
            </Message>
          </template>
        </column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
  rows: number
  header: string
  toApprove: boolean
}>()
const reservations = [
  {
    hour: '08:00',
    date: '2025-10-16',
    room: 'Room 101',
    bookedBy: 'Alice Johnson',
    status: 'planned',
  },
  {
    hour: '09:30',
    date: '2025-10-16',
    room: 'Room 102',
    bookedBy: 'Michael Brown',
    status: 'toApprove',
  },
  {
    hour: '10:00',
    date: '2025-10-16',
    room: 'Room 103',
    bookedBy: 'Sophie Lee',
    status: 'cancelled',
  },
  {
    hour: '11:15',
    date: '2025-10-16',
    room: 'Room 104',
    bookedBy: 'David Smith',
    status: 'planned',
  },
  {
    hour: '12:00',
    date: '2025-10-16',
    room: 'Room 105',
    bookedBy: 'Emma Wilson',
    status: 'planned',
  },
  {
    hour: '13:30',
    date: '2025-10-16',
    room: 'Room 201',
    bookedBy: 'Olivia Harris',
    status: 'toApprove',
  },
  {
    hour: '14:45',
    date: '2025-10-16',
    room: 'Room 202',
    bookedBy: 'Liam Walker',
    status: 'planned',
  },
  {
    hour: '15:00',
    date: '2025-10-16',
    room: 'Room 203',
    bookedBy: 'Noah Davis',
    status: 'cancelled',
  },
  {
    hour: '16:15',
    date: '2025-10-16',
    room: 'Room 204',
    bookedBy: 'Charlotte Miller',
    status: 'planned',
  },
  {
    hour: '17:30',
    date: '2025-10-16',
    room: 'Room 205',
    bookedBy: 'James Anderson',
    status: 'toApprove',
  },
]
const toApproveReservations = reservations.filter(r => r.status === 'toApprove')

const tableData = computed(() => {
  if (props.toApprove) {
    return toApproveReservations
  }
  else {
    return reservations
  }
})

const statusColor = computed(() => ({
  cancelled: 'error',
  ended: 'success',
  planned: 'info',
  toApprove: 'warn',
}))
</script>
