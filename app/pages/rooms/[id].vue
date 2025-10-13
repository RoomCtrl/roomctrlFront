<template>
  <div class="flex">
    <div
      v-if="roomDetails"
      class="grid max-sm:flex max-sm:flex-col lg:grid-cols-4 2xl:grid-cols-6 gap-2 mx-1 lg:mx-5 h-full w-full"
    >
      <GeneralInfo
        class="order-1 col-span-2 lg:col-span-3 xl:row-span-2 "
        :room-name="roomDetails.roomName"
        :room-description="roomDetails.description"
        :started-at="roomDetails.currentBooking?.startedAt"
        :ended-at="roomDetails.currentBooking?.endedAt"
      />

      <DetailedInfo
        class="order-2 max-lg:order-5 lg:max-2xl:order-3 lg:max-xl:col-span-full xl:max-2xl:col-span-3 col-span-2 row-span-2 lg:max-xl:row-span-1 xl:row-span-4"
        :room-parameters="roomDetails"
      />

      <CurrentMeeting
        v-if="roomDetails"
        class="order-2 2xl:order-3 row-span-2 lg:max-xl:row-span-1"
        :current-booking="roomDetails.currentBooking"
      />

      <WeekCalendar
        class="order-4 max-lg:order-7 lg:max-2xl:order-5 col-span-2 xl:col-span-3 lg:max-2xl:col-span-4 row-span-5 2xl:row-span-5"
        :current-booking="roomDetails?.currentBooking"
        :next-bookings="roomDetails?.nextBookings"
      />
      <UpcomingMeeting
        class="order-4 max-lg:order-6 lg:max-xl:order-6 row-span-4 sm:max-lg:col-span-2 xl:max-2xl:row-span-9 xl:row-span-6"
        :meetings="roomDetails?.nextBookings"
      />
      <EqupimentInfo
        class="order-5 max-lg:order-7 xl:max-2xl:order-6 col-span-2 lg:max-xl:col-span-3  xl:max-2xl:col-span-3 row-span-2 xl:max-2xl:row-span-3 row-span-4 lg:max-xl:row-span-3"
        :equpiments="roomDetails?.equipment"
      />
      <InfoCard
        :header="$t('pages.roomDetails.cleaning.title')"
        class="order-7 sm:max-lg:order-3 xl:max-2xl:order-7"
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
        class="order-8 sm:max-lg:order-4 xl:max-2xl:order-7 lg:max-2xl:order-8"
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
        class="order-9 max-lg:order-9 lg:max-2xl:order-9 sm:max-lg:col-span-2"
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
</template>

<script setup lang="ts">
import { roomsDetailsData } from '~/assets/data/roomsDetails'
import CurrentMeeting from '~/components/rooms/detailsParts/CurrentMeeting.vue'
import DetailedInfo from '~/components/rooms/detailsParts/DetailedInfo.vue'
import EqupimentInfo from '~/components/rooms/detailsParts/EqupimentInfo.vue'
import GeneralInfo from '~/components/rooms/detailsParts/GeneralInfo.vue'
import InfoCard from '~/components/rooms/detailsParts/InfoCard.vue'
import UpcomingMeeting from '~/components/rooms/detailsParts/UpcomingMeeting.vue'
import WeekCalendar from '~/components/rooms/detailsParts/WeekCalendar.vue'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()

const roomDetails = roomsDetailsData.find(details => details.roomId === Number(route.params.id))
const status = computed(() => roomDetails!.status)
provide('roomStatus', status)
</script>

<style scoped>
h1 {
  font-weight: 600;
}
</style>
