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
                {{ room.roomName }}
              </p>
              <p class="text-sm text-gray-500">
                {{ room.count }}
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
const { fetchMostUsedRooms } = useStatistics()

const topRooms = await fetchMostUsedRooms()
</script>
