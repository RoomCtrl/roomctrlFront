<template>
  <Card
    pt:root:style="--p-card-body-padding: 0.5rem"
    pt:body:class="h-full"
    pt:content:class="flex flex-col justify-end h-full"
  >
    <template #title>
      <div class="flex flex-row justify-between">
        <div />
        <h1 class="font-bold text-3xl ">
          {{ header }}
        </h1>
        <Button
          v-tooltip.left="{ value: $t('pages.adminDashboard.dashboard.tables.tooltip') }"
          icon="pi pi-arrow-right"
          class="flex"
          variant="outlined"
          rounded
        />
      </div>
    </template>
    <template #content>
      <DataTable
        pt:root:class="h-full flex flex-col justify-between"
        :value="tableData"
        paginator
        :rows="rows"
      >
        <Column
          field="room"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.room')"
        />
        <Column
          field="bookedBy"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.reserver')"
        />
        <Column
          field="date"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.day')"
        />
        <Column
          field="hour"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.hour')"
        />
        <Column
          pt:root:class=""
          field="status"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.status')"
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
