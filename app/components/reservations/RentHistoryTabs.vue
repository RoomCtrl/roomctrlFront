<template>
  <Tabs
    value="0"
    class="min-h-[70vh]"
  >
    <TabList>
      <Tab
        v-for="tab in tabs"
        :key="tab.title"
        :value="tab.value"
      >
        {{ tab.title }}
      </Tab>
    </TabList>
    <TabPanels
      pt:root:class="min-h-[65vh]"
    >
      <TabPanel
        v-for="tab in tabs"
        :key="tab.title"
        pt:root:class="min-h-[60vh]"
        :value="tab.value"
      >
        <ReservationCollection
          :completed="tab.completed"
          :title="tab.title"
          :reservations="tab.content"
          @refresh="refreshBookings"
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup lang="ts">
import ReservationCollection from '~/components/reservations/ReservationCollection.vue'
import { useBooking } from '~/composables/useBooking'
import { useAuth } from '~/composables/useAuth'
import { parseLocalDate } from '~/utils/dateHelpers'

const { t } = useI18n()
const { bookings, fetchBookings } = useBooking()
const { user } = useAuth()

const mapBookingToReservation = (booking: any) => {
  const now = new Date()
  const endDate = parseLocalDate(booking.endedAt)
  const status = endDate < now ? 'ended' : 'planned'

  return {
    id: booking.id,
    title: booking.title,
    startedAt: parseLocalDate(booking.startedAt),
    endedAt: parseLocalDate(booking.endedAt),
    status,
    roomId: booking.room?.id,
    room: booking.room,
    participants: booking.participantsCount || 0,
    reservationsType: booking.isPrivate ? 'private' : 'public',
  }
}

const currentReservations = computed(() =>
  bookings.value
    .map(mapBookingToReservation)
    .filter(c => !isEarlierThanNow(c.endedAt) && c.status !== 'ended' && c.status !== 'cancelled'),
)

const pastReservations = computed(() =>
  bookings.value
    .map(mapBookingToReservation)
    .filter(c => isEarlierThanNow(c.endedAt) || c.status === 'ended' || c.status === 'cancelled'),
)

const tabs = computed(() => [
  {
    title: t('pages.reservationsHistory.incomingRent'),
    content: currentReservations.value,
    value: '0',
    completed: false,
  },
  {
    title: t('pages.reservationsHistory.completedRent'),
    content: pastReservations.value,
    value: '1',
    completed: true,
  },
])

onMounted(async () => {
  if (user.value?.id) {
    await fetchBookings(true)
  }
})

const refreshBookings = async () => {
  if (user.value?.id) {
    await fetchBookings(true)
  }
}
</script>
