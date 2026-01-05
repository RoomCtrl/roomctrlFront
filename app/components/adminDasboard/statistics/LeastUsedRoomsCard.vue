<template>
  <Card
    class="w-full md:w-[calc(33.333%-0.35rem)]"
    pt:body:class="h-full"
    pt:content:class="h-full"
  >
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.leastUsedRooms') }}
        </h3>
        <i class="pi pi-snowflake text-blue-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div
        v-if="leastUsedRooms.length > 0"
        class="space-y-3"
      >
        <div
          v-for="(room, index) in leastUsedRooms"
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
      <div
        v-else
        class="flex justify-center items-center h-full text-2xl font-semibold"
      >
        {{ $t('pages.adminDashboard.statistics.noData') }}
      </div>
    </template>
  </Card>
</template>

<script setup>
const { fetchLeastUsedRooms, leastUsedRooms } = useStatistics()

onMounted(async () => {
  await fetchLeastUsedRooms()
})
</script>
