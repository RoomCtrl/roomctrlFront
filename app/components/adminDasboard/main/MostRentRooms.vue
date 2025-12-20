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
import type { IBooking } from '~/interfaces/BookingsInterfaces'

const props = defineProps<{
  bookings: IBooking[]
}>()

const roomStats = computed(() => {
  const stats = new Map<string, { roomId: string, roomName: string, weeklyBookings: number, monthlyBookings: number }>()

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  props.bookings.forEach((booking) => {
    const bookingDate = new Date(booking.startedAt)
    const roomId = booking.room.id
    const roomName = booking.room.roomName

    if (!stats.has(roomId)) {
      stats.set(roomId, { roomId, roomName, weeklyBookings: 0, monthlyBookings: 0 })
    }

    const stat = stats.get(roomId)!

    if (bookingDate >= weekAgo) {
      stat.weeklyBookings++
    }
    if (bookingDate >= monthAgo) {
      stat.monthlyBookings++
    }
  })

  return Array.from(stats.values())
})

const mostOftenRooms = computed(() => {
  return [...roomStats.value]
    .sort((a, b) => b.monthlyBookings - a.monthlyBookings)
    .slice(0, 5)
})

const leastOftenRooms = computed(() => {
  return [...roomStats.value]
    .filter(room => room.monthlyBookings > 0) // Tylko pokoje, które były używane
    .sort((a, b) => a.monthlyBookings - b.monthlyBookings)
    .slice(0, 5)
})
</script>
