<template>
  <Card
    pt:root:style="--p-card-body-padding: 0rem 0.5rem 0.5rem 0.5rem"
    pt:body:class="h-full"
    pt:content:class="grid grid-cols-2 h-full"
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
      />
      <TopRoomsCarousel
        :rooms="leastOftenRooms"
        :title="$t('pages.adminDashboard.dashboard.carousel.title.leastOftenUse')"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import TopRoomsCarousel from '../TopRoomsCarousel.vue'

const mostOftenRooms = [
  { roomId: 1, roomName: 'Sala nr 208', weeklyBookings: 5, monthlyBookings: 18 },
  { roomId: 2, roomName: 'Sala B', weeklyBookings: 3, monthlyBookings: 12 },
  { roomId: 3, roomName: 'Sala C', weeklyBookings: 8, monthlyBookings: 25 },
  { roomId: 4, roomName: 'Sala D', weeklyBookings: 2, monthlyBookings: 9 },
  { roomId: 5, roomName: 'Sala E', weeklyBookings: 6, monthlyBookings: 22 },
]
const leastOftenRooms = [
  { roomId: 1, roomName: 'Sala nr 201', weeklyBookings: 5, monthlyBookings: 18 },
  { roomId: 2, roomName: 'Sala B', weeklyBookings: 3, monthlyBookings: 12 },
  { roomId: 3, roomName: 'Sala C', weeklyBookings: 8, monthlyBookings: 25 },
  { roomId: 4, roomName: 'Sala D', weeklyBookings: 2, monthlyBookings: 9 },
  { roomId: 5, roomName: 'Sala E', weeklyBookings: 6, monthlyBookings: 22 },
]
</script>
