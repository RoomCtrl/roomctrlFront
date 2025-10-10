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
        class="order-2 max-lg:order-5 lg:max-2xl:order-5 lg:max-xl:col-span-full xl:max-2xl:col-span-3 col-span-2 row-span-2 lg:max-xl:row-span-1 xl:row-span-4"
        :room-parameters="roomDetails"
      />

      <CurrentMeeting
        v-if="roomDetails"
        class="order-2 2xl:order-3 row-span-2 lg:max-xl:row-span-1"
        :current-booking="roomDetails.currentBooking"
      />

      <WeekCalendar
        class="order-4 col-span-2 max-lg:order-7 xl:col-span-3 lg:max-2xl:col-span-4 row-span-5 2xl:row-span-5"
        :current-booking="roomDetails?.currentBooking"
        :next-bookings="roomDetails?.nextBookings"
      />
      <UpcomingMeeting
        class="order-4 max-lg:order-6 lg:max-xl:order-6 row-span-4 sm:max-lg:col-span-2 xl:max-2xl:row-span-9 xl:row-span-6"
        :meetings="roomDetails?.nextBookings"
      />
      <EqupimentInfo
        class="order-5 max-lg:order-7 xl:max-2xl:order-6 col-span-2 lg:max-xl:col-span-3  xl:max-2xl:col-span-3 row-span-2 xl:max-2xl:row-span-2 row-span-4 lg:max-xl:row-span-3"
        :equpiments="roomDetails?.equipment"
      />

      <Card
        pt:root:class="order-7 sm:max-lg:order-3 xl:max-2xl:order-7 border-l-4 border-blue-900 overflow-hidden bg-blue-300/60 h-full text-blue-950"
        pt:body:class="p-0"
        pt:content:class="flex flex-col font-medium"
      >
        <template #header>
          <h1 class="lg:text-2xl font-semibold">
            {{ $t('pages.roomDetails.cleaning.title') }}
          </h1>
        </template>
        <template #content>
          <div class="flex flex-row gap-1">
            <h1 class="font-semibold">
              {{ $t('pages.roomDetails.cleaning.last') }}
            </h1>
            <h2>
              wczoraj 15:00
            </h2>
          </div>
          <div class="flex flex-row gap-1">
            <h1 class="font-semibold">
              {{ $t('pages.roomDetails.cleaning.next') }}
            </h1>
            <h2>
              dzisiaj 15:00
            </h2>
          </div>
        </template>
      </Card>

      <Card
        pt:root:class="order-8 sm:max-lg:order-4 xl:max-2xl:order-7 lg:max-2xl:order-8 border-l-4 border-blue-900 overflow-hidden bg-blue-300/60 text-blue-950"
        pt:body:class="p-0"
        pt:content:class="flex flex-col font-medium"
      >
        <template #header>
          <h1 class="lg:text-2xl font-semibold">
            {{ $t('pages.roomDetails.maintenance.title') }}
          </h1>
        </template>
        <template #content>
          <div class="flex flex-row gap-1">
            <h1>
              {{ $t('pages.roomDetails.maintenance.planned') }}
            </h1>
            <h2>
              piątek 08:00
            </h2>
          </div>
          <h2>
            Klimatyzacja + sprzęt AV
          </h2>
        </template>
      </Card>

      <Card
        pt:root:class="order-9 max-lg:order-9 lg:max-2xl:order-9 sm:max-lg:col-span-2 border-l-4 border-blue-900 overflow-hidden bg-blue-300/60 h-full text-blue-950"
        pt:body:class="p-0"
        pt:content:class="flex flex-col font-medium"
      >
        <template #header>
          <h1 class="text-2xl font-semibold">
            {{ $t('pages.roomDetails.contact.title') }}
          </h1>
        </template>
        <template #content>
          <span>
            {{ $t('pages.roomDetails.contact.phone') }}
          </span>
          <span>
            {{ $t('pages.roomDetails.contact.insidePhone') }}
          </span>
          <span>
            {{ $t('pages.roomDetails.contact.email') + 'it-support@firma.com' }}
          </span>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { roomsDetailsData } from '~/assets/data/roomsDetails'
import CurrentMeeting from '~/components/rooms/detailsParts/CurrentMeeting.vue'
import DetailedInfo from '~/components/rooms/detailsParts/DetailedInfo.vue'
import EqupimentInfo from '~/components/rooms/detailsParts/EqupimentInfo.vue'
import GeneralInfo from '~/components/rooms/detailsParts/GeneralInfo.vue'
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
