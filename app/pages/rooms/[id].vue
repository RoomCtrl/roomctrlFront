<template>
  <div
    v-if="roomDetails"
    class="flex flex-col lg:grid lg:grid-cols-6 gap-2 mx-1 lg:mx-5"
  >
    <GeneralInfo
      class="col-span-3 max-lg:order-1 order-1"
      :room-name="roomDetails.roomName"
      :room-description="roomDetails.description"
      :started-at="roomDetails.currentBooking?.startedAt"
      :ended-at="roomDetails.currentBooking?.endedAt"
    />

    <DetailedInfo
      class="col-span-2 lg:max-2xl:col-span-3 row-span-2 max-lg:order-5 lg:max-2xl:order-5 order-2"
      :room-parameters="roomDetails"
    />

    <CurrentMeeting
      v-if="roomDetails"
      class="max-lg:order-2 lg:max-2xl:order-2 order-3"
      :current-booking="roomDetails.currentBooking"
    />

    <WeekCalendar
      class="col-span-3 lg:max-2xl:col-span-5 row-span-4 2xl:row-span-3 max-lg:order-8 lg:max-2xl:order-8 order-4"
      :current-booking="roomDetails?.currentBooking"
      :next-bookings="roomDetails?.nextBookings"
    />
    <UpcomingMeeting
      class="row-span-4 lg:max-2xl:row-span-5 max-lg:order-5 lg:max-2xl:order-7 order-5"
      :meetings="roomDetails?.nextBookings"
    />
    <EqupimentInfo
      class="col-span-2 lg:max-2xl:col-span-2 row-span-2 2xl:row-span-3 max-lg:order-6 lg:max-2xl:order-6 order-6"
      :equpiments="roomDetails?.equipment"
    />

    <Card
      pt:root:class="border-l-4 border-blue-900 max-lg:order-3 lg:max-2xl:order-3 order-7 overflow-hidden"
      pt:body:class="bg-blue-300/40 h-full text-blue-950"
      pt:content:class="flex flex-col font-medium"
    >
      <template #title>
        <h1 class="lg:text-2xl font-semibold">
          {{ $t('pages.roomDetails.cleaning.title') }}
        </h1>
      </template>
      <template #content>
        <span>
          {{ $t('pages.roomDetails.cleaning.last') + 'wczoraj 18:00' }}
        </span>
        <span>
          {{ $t('pages.roomDetails.cleaning.next') + 'dzisiaj 18:00' }}
        </span>
      </template>
    </Card>

    <Card
      pt:root:class="border-l-4 border-green-900 max-lg:order-4 lg:max-2xl:order-4 order-8 overflow-hidden"
      pt:body:class="bg-green-300/40 text-green-950 h-full"
      pt:content:class="flex flex-col"
    >
      <template #title>
        <h1 class="lg:text-2xl font-semibold">
          {{ $t('pages.roomDetails.maintenance.title') }}
        </h1>
      </template>
      <template #content>
        <span>
          {{ $t('pages.roomDetails.maintenance.planned') + 'piątek 08:00' }}
        </span>
        <span>
          Klimatyzacja + sprzęt AV
        </span>
      </template>
    </Card>

    <Card
      pt:root:class="max-lg:order-9 order-9 overflow-hidden"
      pt:body:class="bg-yellow-300/40 text-yellow-950"
      pt:content:class="flex flex-col font-medium"
    >
      <template #title>
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
