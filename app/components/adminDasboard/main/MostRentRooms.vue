<template>
  <Card
    pt:root:style="--p-card-body-padding: 0rem 0.5rem 0rem 0.5rem"
    pt:body:class="h-full"
    pt:content:class="flex flex-col lg:max-xl:flex-row gap-4 h-full"
  >
    <template #header>
      <div class="font-bold text-xl text-center pt-1">
        {{ $t('pages.adminDashboard.dashboard.carousel.title.rentRooms') }}
      </div>
    </template>
    <template #content>
      <div v-if="mostUsedRooms.length > 0 || leastUsedRooms.length > 0">
        <TopRoomsCarousel
          :rooms="mostUsedRooms"
          :title="$t('pages.adminDashboard.dashboard.carousel.title.mostOftenUse')"
          class="flex-1 min-w-0"
        />
        <TopRoomsCarousel
          :rooms="leastUsedRooms"
          :title="$t('pages.adminDashboard.dashboard.carousel.title.leastOftenUse')"
          class="flex-1 min-w-0"
        />
      </div>
      <div
        v-else
        class="flex justify-center items-center h-full font-semibold text-2xl"
      >
        {{ $t('pages.adminDashboard.dashboard.carousel.noData') }}
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import TopRoomsCarousel from '../TopRoomsCarousel.vue'

const { fetchMostUsedRooms, fetchLeastUsedRooms, mostUsedRooms, leastUsedRooms } = useStatistics()

onMounted(async () => {
  await fetchMostUsedRooms()
  await fetchLeastUsedRooms()
})
</script>
