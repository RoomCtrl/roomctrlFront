<template>
  <div class="flex rounded-2xl flex-col justify-end h-full">
    <CurrentRentInfo
      :capacity="room.capacity"
      :size="room.size"
      :room-name="room.roomName"
      :current-booking="room.currentBooking"
      :show-more-info="showItem"
      :animate="animationClass"
    />

    <Card
      pt:root:class="max-sm:rounded-t flex-grow lg:-mr-6 -my-1 z-10"
      pt:header:class="py-2 px-3"
      pt:body:class="h-full"
      pt:body:style="--p-card-body-padding: 0.25rem 1.25rem"
      :pt:subtitle:class="['h-full', { 'blur-sm': animationClass === 'show' }]"
      pt:caption:class="flex flex-col h-full"
      :style="{ borderColor: statusColor }"
    >
      <template #header>
        <div
          class="flex flex-row justify-between items-center gap-2 w-full"
        >
          <div
            v-if="room.status !== 'closed'"
            class="w-[90%]"
          >
            <h1
              v-if="room.currentBooking && !room.currentBooking.isPrivate"
              v-tooltip.bottom="{
                value: room.currentBooking.title,
                pt: {
                  root: 'max-w-[20rem]',
                  text: 'text-center',
                },
              }"
              :class="{ 'blur-sm': animationClass === 'show' }"
              class="text-lg lg:text-xl font-semibold lg:truncate"
            >
              {{ room.currentBooking.title }}
            </h1>
            <h1
              v-else-if="room.currentBooking"
              :class="{ 'blur-sm': animationClass === 'show' }"
              class="text-xl font-semibold truncate"
            >
              {{ $t('pages.allRooms.statuses.roomTitle.occupied') }}
            </h1>
            <h1
              v-else
              class="text-xl font-semibold"
            >
              {{ $t('pages.allRooms.statuses.roomTitle.available') }}
            </h1>
          </div>
          <div v-else />
          <div class="hidden lg:block flex">
            <i
              class="pi pi-info-circle"
              style="font-size: 1.25rem;"
              @mouseenter="playShow"
              @mouseleave="playHide"
            />
          </div>
        </div>
      </template>

      <template #subtitle>
        <IncomingRent
          v-if="room.status !== 'closed' && firstNextBooking"
          :title="firstNextBooking.title"
          :started-at="firstNextBooking.startedAt"
          :ended-at="firstNextBooking.endedAt"
          :is-private="firstNextBooking.isPrivate"
        />
        <IncomingRent
          v-else-if="room.status !== 'closed'"
          :title="noRentIncomingTitle"
        />
        <div
          v-else
          class="h-full text-center m-auto flex text-2xl font-black"
        >
          {{ $t('pages.allRooms.statuses.roomTitle.closed') }}
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { IRoomCard } from '~/interfaces/RoomsIntefaces'
import CurrentRentInfo from './CurrentRentInfo.vue'
import IncomingRent from './IncomingRent.vue'

const props = defineProps<{
  room: IRoomCard
}>()
const { t } = useI18n()
const noRentIncomingTitle = t('pages.allRooms.incoming.noRent')
const animationClass = ref('')
const showItem = ref(false)
const firstNextBooking = computed(() => {
  if (props.room.nextBookings) {
    return props.room.nextBookings[0]
  }
  else {
    return false
  }
})
const status = computed(() => props.room.status)
provide('roomStatus', status)

const statusColor = computed(() => {
  const map: Record<string, string> = {
    avaiable: 'bg-green-600',
    occupied: 'bg-red-600',
    closed: 'bg-yellow-600',
  }
  return map[props.room.status] || map.default
})

const playShow = () => {
  animationClass.value = ''
  requestAnimationFrame(() => {
    animationClass.value = 'show'
  })
}

const playHide = () => {
  animationClass.value = ''
  requestAnimationFrame(() => {
    animationClass.value = 'hide'
  })
}
</script>
