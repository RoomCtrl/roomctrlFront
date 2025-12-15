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
        :room-id="roomDetails?.roomId || ''"
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
        class="col-span-1 md:col-span-4 lg:col-span-2 md:row-start-3 lg:col-start-5 lg:row-start-2 lg:row-span-2"
        :meetings="roomDetails?.nextBookings as any"
      />

      <div class="col-span-1 md:col-span-4 lg:col-span-4 md:col-start-1 md:row-start-4 lg:row-start-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <InfoCard
          :header="$t('pages.roomDetails.cleaning.title')"
        >
          <div class="flex flex-row gap-1">
            <h1>
              {{ $t('pages.roomDetails.cleaning.last') }}
            </h1>
            <h2>
              wczoraj 15:00
            </h2>
          </div>
          <div class="flex flex-row gap-1">
            <h1>
              {{ $t('pages.roomDetails.cleaning.next') }}
            </h1>
            <h2>
              dzisiaj 15:00
            </h2>
          </div>
        </InfoCard>

        <InfoCard
          :header="$t('pages.roomDetails.maintenance.title')"
        >
          <div class="flex flex-row gap-1">
            <h1>
              {{ $t('pages.roomDetails.cleaning.last') }}
            </h1>
            <h2>
              wczoraj 15:00
            </h2>
          </div>
          <div class="flex flex-row gap-1 ">
            <h1>
              {{ $t('pages.roomDetails.cleaning.next') }}
            </h1>
            <h2>
              dzisiaj 15:00
            </h2>
          </div>
        </InfoCard>

        <InfoCard
          :header="$t('pages.roomDetails.contact.title')"
        >
          <div class="flex flex-col max-lg:flex-row max-lg:gap-2">
            <div class="flex flex-row gap-1">
              <h1>
                {{ $t('pages.roomDetails.contact.phone') }}
              </h1>
              <h2>
                +48 123 456 789
              </h2>
            </div>
            <div class="flex flex-row gap-1">
              <h1>
                {{ $t('pages.roomDetails.contact.insidePhone') }}
              </h1>
              <h2>
                2247
              </h2>
            </div>
            <div class="flex flex-row gap-1">
              <h1>
                {{ $t('pages.roomDetails.contact.email') }}
              </h1>
              <h2>
                it-support@firma.com
              </h2>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>

    <BookingForm
      v-if="roomDetails"
      :visible="showBookingForm"
      :room-id="roomDetails.roomId"
      :capacity="roomDetails.capacity"
      @success="handleBookingSuccess"
      @cancel="showBookingForm = false"
      @close="showBookingForm = false"
    />
  </div>
  <Toast />
</template>

<script setup lang="ts">
import CurrentMeeting from '~/components/rooms/detailsParts/CurrentMeeting.vue'
import DetailedInfo from '~/components/rooms/detailsParts/DetailedInfo.vue'
import EqupimentInfo from '~/components/rooms/detailsParts/EqupimentInfo.vue'
import GeneralInfo from '~/components/rooms/detailsParts/GeneralInfo.vue'
import InfoCard from '~/components/rooms/detailsParts/InfoCard.vue'
import UpcomingMeeting from '~/components/rooms/detailsParts/UpcomingMeeting.vue'
import BookingForm from '~/components/rooms/BookingForm.vue'
import { useRoom } from '~/composables/useRoom'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const { room: roomDetails, fetchRoom, loadFavoriteIds } = useRoom()

const showBookingForm = ref(false)

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

const handleBookingSuccess = () => {
  showBookingForm.value = false
  // Refresh room details to get updated bookings
  const roomId = String(route.params.id)
  fetchRoom(roomId, true)
}

onMounted(async () => {
  const roomId = String(route.params.id)
  await loadFavoriteIds() // Load favorite IDs first
  await fetchRoom(roomId, true)
})
</script>

<style scoped>
h1 {
  font-weight: 600;
}
</style>
