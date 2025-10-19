<template>
  <Card
    pt:body:class="p-2 h-full"
    pt:title:class="font-bold text-3xl"
    pt:content:class="flex flex-col justify-end h-full"
  >
    <template #title>
      Zgłoszenia sal
    </template>
    <template #content>
      <DataTable
        :value="reservations"
        paginator
        :rows="3"
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
          field="status"
          header="Status"
        />
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
