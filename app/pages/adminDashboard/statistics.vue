<template>
  <div class="flex flex-col gap-4 h-full w-full overflow-auto">
    <div class="flex">
      <Card>
        <template #content>
          <h1 class="text-4xl font-extrabold">
            {{ $t('pages.adminDashboard.statistics.title') }}
          </h1>
        </template>
      </Card>
    </div>

    <div>
      <div class="flex flex-row gap-2 mb-4">
        <MostUsedRoomsCard />

        <LeastUsedRoomsCard />

        <MostReportsRoomsCard />
      </div>

      <div class="flex flex-wrap gap-2 justify-between">
        <TotalReservationsCard />

        <ReservationStatusCard />

        <RoomsByCategoryCard />

        <OccupancyRateCard />

        <ReservationTrendsCard />

        <RoomComparisonCard />
      </div>
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
