<template>
  <Card class="w-full md:w-[calc(33.333%-0.35rem)]">
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.mostUsedRooms') }}
        </h3>
        <i class="pi pi-fire text-red-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div class="space-y-3">
        <div
          v-for="(room, index) in topRooms"
          :key="room.id"
          class="flex items-center justify-between p-3 rounded bg-gray-100 dark:bg-gray-800"
        >
          <div class="flex items-center gap-3">
            <span class="font-semibold text-lg w-8 text-center">{{
              index + 1
            }}</span>
            <div>
              <p class="font-medium">
                {{ room.name }}
              </p>
              <p class="text-sm text-gray-500">
                {{ room.bookings }}
                {{ $t('pages.adminDashboard.statistics.bookings') }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-lg">
              {{ room.percentage }}%
            </p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
const topRooms = ref([
  { id: 1, name: 'Sala nr 208', bookings: 45, percentage: 25 },
  { id: 2, name: 'Sala Konferencyjna A', bookings: 38, percentage: 21 },
  { id: 3, name: 'Sala Główna', bookings: 35, percentage: 19 },
  { id: 4, name: 'Sala nr 215', bookings: 32, percentage: 18 },
  { id: 5, name: 'Sala Spotkań B', bookings: 30, percentage: 17 },
])
</script>
