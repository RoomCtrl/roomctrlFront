<template>
  <div class="h-full w-full p-4 overflow-auto">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">
        {{ $t('pages.adminDashboard.statistics.title') }}
      </h1>
    </div>

    <div class="flex flex-row gap-3  mb-4">
      <MostUsedRoomsCard />

      <LeastUsedRoomsCard />

      <MostReportsRoomsCard />
    </div>

    <div class="flex flex-wrap gap-4 justify-between">
      <TotalReservationsCard />

      <ReservationStatusCard />

      <RoomsByCategoryCard />

      <OccupancyRateCard />

      <ReservationTrendsCard />

      <RoomComparisonCard />
    </div>
  </div>
</template>

<script setup>
import MostUsedRoomsCard from '~/components/adminDasboard/statistics/MostUsedRoomsCard.vue'
import LeastUsedRoomsCard from '~/components/adminDasboard/statistics/LeastUsedRoomsCard.vue'
import MostReportsRoomsCard from '~/components/adminDasboard/statistics/MostReportsRoomsCard.vue'
import TotalReservationsCard from '~/components/adminDasboard/statistics/TotalReservationsCard.vue'
import ReservationStatusCard from '~/components/adminDasboard/statistics/ReservationStatusCard.vue'
import ReservationTrendsCard from '~/components/adminDasboard/statistics/ReservationTrendsCard.vue'
import RoomsByCategoryCard from '~/components/adminDasboard/statistics/RoomsByCategoryCard.vue'
import OccupancyRateCard from '~/components/adminDasboard/statistics/OccupancyRateCard.vue'
import RoomComparisonCard from '~/components/adminDasboard/statistics/RoomComparisonCard.vue'

definePageMeta({
  layout: 'admin-dashboard',
})
</script>
