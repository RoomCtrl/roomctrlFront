<template>
  <div class="flex w-full">
    <div
      v-if="roomDetails"
      class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2 mx-2 sm:mx-3 md:mx-4 lg:mx-5 w-full auto-rows-min"
    >
      <GeneralInfo
        class="col-span-1 md:col-span-3 lg:col-span-5 md:row-start-1"
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
        class="col-span-1 md:row-start-1"
        :current-booking="roomDetails.currentBooking as any"
      />

      <Card
        v-else
        class="col-span-1 md:row-start-1"
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

      <DetailedInfo
        class="col-span-1 md:col-span-2 lg:col-span-2 md:col-start-1 md:row-start-2"
        :room-parameters="roomDetails as any"
      />

      <EqupimentInfo
        class="col-span-1 md:col-span-2 lg:col-span-2 md:col-start-3 md:row-start-2"
        :equpiments="roomDetails?.equipment as any"
      />

      <UpcomingMeeting
        class="col-span-1 md:col-span-4 lg:col-span-2 md:row-start-3 lg:col-start-5 lg:row-start-2 lg:row-span-3"
        :meetings="roomDetails?.nextBookings as any"
      />

      <RoomImages
        v-if="roomDetails"
        :room-id="roomDetails.roomId"
        class="col-span-3 md:col-span-4 lg:col-span-3"
      />

      <div class="col-span-1 md:col-span-4 lg:col-span-1 md:col-start-1 grid md:grid-rows-3 gap-2">
        <InfoCard
          :header="$t('pages.roomDetails.cleaning.title')"
        >
          <div class="flex flex-row gap-1">
            <h1>
              {{ $t('pages.roomDetails.cleaning.last') }}
            </h1>
            <h2>
              {{ lastCleaning }}
              {{ lastCleaning || $t('common.noData') }}
            </h2>
          </div>
          <div class="flex flex-row gap-1">
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
          <div class="flex flex-row gap-1">
            <h1>
              {{ $t('pages.roomDetails.maintenance.last') }}
            </h1>
            <h2>
              {{ lastMaintenance || $t('common.noData') }}
            </h2>
          </div>
          <div class="flex flex-row gap-1 ">
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
          <div class="flex flex-col max-lg:flex-row max-lg:gap-2">
            <div class="flex flex-row gap-1">
              <h1>
                {{ $t('pages.roomDetails.contact.name') }}
              </h1>
              <h2>
                {{ organization?.name || $t('common.noData') }}
              </h2>
            </div>
            <div class="flex flex-row gap-1">
              <h1>
                {{ $t('pages.roomDetails.contact.email') }}
              </h1>
              <h2>
                {{ organization?.email || $t('common.noData') }}
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
import type { IOrganization } from '~/interfaces/OrganizationInterfaces'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const { room: roomDetails, fetchRoom, loadFavoriteIds } = useRoom()
const { fetchBookings, bookings } = useBooking()
const organization = ref<IOrganization | null>(null)

const showBookingForm = ref(false)

const cleaningBookings = computed(() => {
  if (!bookings.value || !roomDetails.value) return []
  return bookings.value.filter(booking =>
    booking.room.id === roomDetails.value?.roomId && booking.title.toLowerCase().includes('sprzątanie'),
  ).sort((a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime())
})

const maintenanceBookings = computed(() => {
  if (!bookings.value || !roomDetails.value) return []
  return bookings.value.filter(booking =>
    booking.room.id === roomDetails.value?.roomId && booking.title.toLowerCase().includes('konserwacja'),
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

const fetchOrganizationData = async () => {
  try {
    const response = await fetch('/api/organizations', {
      headers: {
        Authorization: `Bearer ${useAuth().token.value}`,
      },
    })
    const data = await response.json()
    organization.value = data[0] || null
  }
  catch (error) {
    console.error('Error fetching organization:', error)
  }
}

onMounted(async () => {
  const roomId = String(route.params.id)
  await loadFavoriteIds()
  await fetchRoom(roomId, true)
  await fetchBookings(roomId)
  await fetchOrganizationData()
})
</script>

<style scoped>
h1 {
  font-weight: 600;
}
</style>
