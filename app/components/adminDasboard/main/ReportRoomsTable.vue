<template>
  <Card
    pt:root:style="--p-card-body-padding:  0.2rem 0rem 0rem 0rem "
    pt:caption:class="h-full"
    pt:title:class="h-full"
    pt:body:class="flex justify-between h-full"
    pt:content:class="flex flex-col justify-between"
  >
    <template #title>
      <div class="flex flex-row justify-between items-center h-full px-2">
        <h1 class="font-bold text-3xl text-center self-center w-full">
          {{ $t('pages.adminDashboard.dashboard.tables.titles.reportRooms') }}
        </h1>
        <Button
          v-tooltip.left="{ value: $t('pages.adminDashboard.dashboard.tables.tooltip') }"
          icon="pi pi-arrow-right"
          variant="outlined"
          rounded
        />
      </div>
    </template>
    <template #content>
      <DataTable
        :pt="{
          root: {
            class: 'h-full flex flex-col',
            style: '--p-datatable-paginator-bottom-border-width: 0; --p-paginator-border-radius: 0px',
          },
          tableContainer: { class: 'flex flex-col justify-end' },
        }"
        :value="reservations"
        paginator
        size="small"
        :rows="8"
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
                pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 1px"
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
import type { Style } from '#components'

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
