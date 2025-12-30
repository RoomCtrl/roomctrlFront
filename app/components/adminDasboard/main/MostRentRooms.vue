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
      <TopRoomsCarousel
        :rooms="mostOftenRooms"
        :title="$t('pages.adminDashboard.dashboard.carousel.title.mostOftenUse')"
        class="flex-1 min-w-0"
      />
      <TopRoomsCarousel
        :rooms="leastOftenRooms"
        :title="$t('pages.adminDashboard.dashboard.carousel.title.leastOftenUse')"
        class="flex-1 min-w-0"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import TopRoomsCarousel from '../TopRoomsCarousel.vue'

const { fetchMostUsedRooms, fetchLeastUsedRooms } = useStatistics()

const mostOftenRooms = await fetchMostUsedRooms()
const leastOftenRooms = await fetchLeastUsedRooms()
</script>
