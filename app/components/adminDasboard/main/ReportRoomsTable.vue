<template>
  <Card
    pt:root:style="--p-card-body-padding:  0.2rem 0.5rem 0.1rem 0.5rem "
    pt:body:class="h-full"
    pt:content:class="flex flex-col justify-end h-full"
  >
    <template #title>
      <div class="flex flex-row justify-between">
        <div />
        <h1 class="font-bold text-3xl">
          {{ $t('pages.adminDashboard.dashboard.tables.titles.reportRooms') }}
        </h1>
        <div>
          <Button
            v-tooltip.left="{ value: $t('pages.adminDashboard.dashboard.tables.tooltip') }"
            icon="pi pi-arrow-right"
            variant="outlined"
            rounded
          />
        </div>
      </div>
    </template>
    <template #content>
      <DataTable
        pt:root:class="h-full flex flex-col justify-evenly"
        :value="reservations"
        paginator
        :rows="6"
      >
        <Column
          class="w-[50%]"
          field="room"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.room')"
        />
        <Column
          class="w-[20%]"
          field="date"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.day')"
        />
        <Column
          class="w-[20%]"
          field="hour"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.hour')"
        />
        <Column class="w-[10%]">
          <template #body>
            <div>
              <Button
                pt:root:style="--p-button-padding-y: 0.2rem; --p-button-padding-x: 0.2rem"
                :label="$t('pages.adminDashboard.dashboard.tables.buttons.details')"
                severity="info"
                variant="outlined"
                raised
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
const reservations = [
  {
    hour: '08:00',
    date: '2025-10-16',
    room: 'Room 101',
    bookedBy: 'Alice Johnson',
    status: 'confirmed',
  },
  {
    hour: '09:30',
    date: '2025-10-16',
    room: 'Room 102',
    bookedBy: 'Michael Brown',
    status: 'pending',
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
    status: 'confirmed',
  },
  {
    hour: '12:00',
    date: '2025-10-16',
    room: 'Room 105',
    bookedBy: 'Emma Wilson',
    status: 'confirmed',
  },
  {
    hour: '13:30',
    date: '2025-10-16',
    room: 'Room 201',
    bookedBy: 'Olivia Harris',
    status: 'pending',
  },
  {
    hour: '14:45',
    date: '2025-10-16',
    room: 'Room 202',
    bookedBy: 'Liam Walker',
    status: 'confirmed',
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
    status: 'confirmed',
  },
  {
    hour: '17:30',
    date: '2025-10-16',
    room: 'Room 205',
    bookedBy: 'James Anderson',
    status: 'pending',
  },
]
</script>
