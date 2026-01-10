<template>
  <div class="h-full w-full">
    <ReservationCollection
      :reservations="allReservations"
      :loading="loading"
      @refresh="refreshBookings"
    />
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import ReservationCollection from '~/components/reservations/ReservationCollection.vue'
import { useBooking } from '~/composables/useBooking'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  middleware: 'auth',
})

const { bookings, loading, fetchBookings } = useBooking()
const { user } = useAuth()

const allReservations = computed(() =>
  bookings.value.map(mapBookingToReservation),
)

const refreshBookings = async () => {
  if (user.value?.id) {
    await fetchBookings(true)
  }
}

const mapBookingToReservation = (booking: any) => {
  let status = 'active'

  const now = new Date()
  const endDate = new Date(booking.endedAt)

  if (booking.status === 'cancelled') {
    status = 'cancelled'
  }
  else if (endDate < now) {
    status = 'completed'
  }

  return {
    id: booking.id,
    title: booking.title,
    startedAt: booking.startedAt,
    endedAt: booking.endedAt,
    status,
    roomId: booking.room?.id,
    room: booking.room,
    participants: booking.participantsCount || 0,
    reservationsType: booking.isPrivate ? 'private' : 'public',
  }
}

onMounted(async () => {
  if (user.value?.id) {
    await fetchBookings(true)
  }
})
</script>
