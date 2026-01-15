<template>
  <div class="flex w-full overflow-x-hidden">
    <div
      v-if="roomDetails"
      class="flex flex-col lg:grid lg:grid-cols-6 gap-2 mx-2 sm:mx-3 md:mx-4 lg:mx-5 w-full"
    >
      <div class="flex flex-col md:flex-row gap-2 lg:contents">
        <GeneralInfo
          class="flex-1 lg:col-span-5"
          :room-name="roomDetails.roomName"
          :room-description="roomDetails.description"
          :started-at="roomDetails.currentBooking?.startedAt"
          :ended-at="roomDetails.currentBooking?.endedAt"
          :current-booking="roomDetails?.currentBooking"
          :next-bookings="roomDetails?.nextBookings"
          :room-id="roomDetails?.roomId"
          :is-favorite="roomDetails?.isFavorite || false"
          @show-booking-form="showBookingForm = true"
        />

        <CurrentMeeting
          v-if="roomDetails && status !== 'maintance'"
          class="md:w-64 lg:w-auto lg:col-span-1"
          :current-booking="roomDetails.currentBooking as any"
        />

        <Card
          v-else
          class="md:w-64 lg:w-auto lg:col-span-1"
          pt:root:class="border-l-4 border-yellow-600 overflow-hidden"
          pt:body:class="flex justify-center items-center bg-yellow-200/80 text-yellow-900 w-full h-full"
          pt:content:class="text-lg font-extrabold"
        >
          <template #content>
            <div class="flex flex-col gap-2 items-center text-center">
              <i
                class="pi pi-exclamation-triangle"
                style="font-size: 2.5rem;"
              />
              <h1 class="text-2xl">
                {{ $t('pages.allRooms.statuses.roomTitle.closed') }}
              </h1>
            </div>
          </template>
        </Card>
      </div>

      <div class="flex flex-col md:flex-row gap-2 lg:contents">
        <DetailedInfo
          class="flex-1 lg:col-span-2"
          :room-parameters="roomDetails as any"
        />

        <EqupimentInfo
          class="flex-1 lg:col-span-2"
          :equipments="roomDetails?.equipment as any"
        />
      </div>

      <UpcomingMeeting
        class="lg:col-span-2 lg:row-span-2"
        :meetings="roomDetails?.nextBookings as any"
      />

      <RoomImages
        v-if="roomDetails"
        :room-id="roomDetails.roomId"
        class="lg:col-span-3"
      />

      <div class="flex flex-col md:flex-row lg:flex-col gap-2 lg:col-span-1 min-w-0">
        <InfoCard
          :header="$t('pages.roomDetails.cleaning.title')"
        >
          <div class="flex flex-col">
            <h1>
              {{ $t('pages.roomDetails.cleaning.last') }}
            </h1>
            <h2>
              {{ lastCleaning }}
              {{ lastCleaning || $t('common.noData') }}
            </h2>
          </div>
          <div class="flex flex-col">
            <h1>
              {{ $t('pages.roomDetails.cleaning.next') }}
            </h1>
            <h2>
              {{ nextCleaning || $t('common.noData') }}
            </h2>
          </div>
        </InfoCard>

        <InfoCard
          :header="$t('pages.roomDetails.maintenance.title')"
        >
          <div class="flex flex-col">
            <h1>
              {{ $t('pages.roomDetails.maintenance.last') }}
            </h1>
            <h2>
              {{ lastMaintenance || $t('common.noData') }}
            </h2>
          </div>
          <div class="flex flex-col ">
            <h1>
              {{ $t('pages.roomDetails.maintenance.next') }}
            </h1>
            <h2>
              {{ nextMaintenance || $t('common.noData') }}
            </h2>
          </div>
        </InfoCard>

        <InfoCard
          :header="$t('pages.roomDetails.contact.title')"
        >
          <div class="flex flex-col gap-1">
            <div class="flex flex-col">
              <h1 class="shrink-0">
                {{ $t('pages.roomDetails.contact.name') }}
              </h1>
              <h2 class="break-all">
                {{ user?.organization?.name || $t('common.noData') }}
              </h2>
            </div>
            <div class="flex flex-col">
              <h1 class="shrink-0">
                {{ $t('pages.roomDetails.contact.email') }}
              </h1>
              <h2 class="break-all">
                {{ user?.organization?.email || $t('common.noData') }}
              </h2>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import CurrentMeeting from '~/components/rooms/detailsParts/CurrentMeeting.vue'
import DetailedInfo from '~/components/rooms/detailsParts/DetailedInfo.vue'
import EqupimentInfo from '~/components/rooms/detailsParts/EqupimentInfo.vue'
import GeneralInfo from '~/components/rooms/detailsParts/GeneralInfo.vue'
import InfoCard from '~/components/rooms/detailsParts/InfoCard.vue'
import UpcomingMeeting from '~/components/rooms/detailsParts/UpcomingMeeting.vue'
import RoomImages from '~/components/rooms/detailsParts/RoomImages.vue'
import { useRoom } from '~/composables/useRoom'
import { useBooking } from '~/composables/useBooking'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const { room: roomDetails, fetchRoom, loadFavoriteIds } = useRoom()
const { fetchBookings, bookings } = useBooking()

const { user } = useAuth()
const showBookingForm = ref(false)

const cleaningBookings = computed(() => {
  if (!bookings.value || !roomDetails.value) return []
  return bookings.value.filter(b =>
    b.room.id === roomDetails.value?.roomId && b.title === 'Sprzątanie',
  ).sort((a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime())
})

const maintenanceBookings = computed(() => {
  if (!bookings.value || !roomDetails.value) return []
  return bookings.value.filter(b =>
    b.room.id === roomDetails.value?.roomId && b.title === 'Konserwacja',
  ).sort((a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime())
})

const lastCleaning = computed(() => {
  const completed = cleaningBookings.value.find(booking => new Date(booking.endedAt) < new Date())
  return completed
    ? new Date(completed.endedAt).toLocaleString('pl-PL', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      })
    : null
})

const nextCleaning = computed(() => {
  const upcoming = cleaningBookings.value.find(booking => new Date(booking.startedAt) > new Date())
  return upcoming
    ? new Date(upcoming.startedAt).toLocaleString('pl-PL', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      })
    : null
})

const lastMaintenance = computed(() => {
  const completed = maintenanceBookings.value.find(booking => new Date(booking.endedAt) < new Date())
  return completed
    ? new Date(completed.endedAt).toLocaleString('pl-PL', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      })
    : null
})

const nextMaintenance = computed(() => {
  const upcoming = maintenanceBookings.value.find(booking => new Date(booking.startedAt) > new Date())
  return upcoming
    ? new Date(upcoming.startedAt).toLocaleString('pl-PL', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      })
    : null
})

const status = computed(() => {
  if (roomDetails.value?.currentBooking) {
    return 'occupied'
  }
  if (roomDetails.value?.status === 'occupied') {
    return 'maintance'
  }
  return roomDetails.value?.status
})
provide('roomStatus', status)

watch(status, (newStatus) => {
  if (newStatus === 'maintance') {
    navigateTo('/rooms')
  }
})

onMounted(async () => {
  const roomId = String(route.params.id)
  await loadFavoriteIds()
  await fetchRoom(roomId)
  await fetchBookings(false)
})
</script>

<style scoped>
h1 {
  font-weight: 600;
}
</style>
