<template>
  <div
    class="flex rounded-2xl flex-col justify-end h-full"
  >
    <CurrentRentInfo
      :capacity="room.capacity"
      :size="room.size"
      :room-name="room.room_name"
      :current-booking="room.current_booking"
      :show-more-info="showItem"
      :animate="animationClass"
    />

    <Card
      pt:root:class="max-sm:rounded-t flex-grow lg:-mr-6 -my-1 z-10"
      pt:header:class="py-2 px-3"
      pt:body:class="h-full"
      pt:body:style="--p-card-body-padding: 0.25rem 1.25rem"
      :pt:subtitle:class="['h-full', { 'blur-sm': animationClass === 'show' }]"
      pt:caption:class="flex flex-col justify-around lg:justify-between h-full"
      :style="{ borderColor: statusColor }"
    >
      <template #header>
        <div
          v-if="room.status !== 'out_of_order'"
          class="flex flex-row justify-between items-center gap-2 w-full"
        >
          <h1
            v-if="!room.current_booking.isPrivate"
            v-tooltip.bottom="{
              value: room.current_booking.title,
              pt: {
                root: 'max-w-[20rem]',
                text: 'text-center',
              },
            }"
            :class="{ 'blur-sm': animationClass === 'show' }"
            class="text-lg lg:text-xl font-semibold lg:truncate"
          >
            {{ currentEvent }}
          </h1>
          <h1
            v-else
            :class="{ 'blur-sm': animationClass === 'show' }"
            class="text-xl font-semibold truncate"
          >
            Prywatna rezerwacja
          </h1>
          <div class="hidden lg:block">
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
          v-if="room.status !== 'out_of_order'"
          :title="room.next_booking.title"
          :started-at="room.next_booking.startedAt"
          :ended-at="room.next_booking.endedAt"
          :is-private="room.next_booking.isPrivate"
          color="info"
        />
        <div
          v-else
          class="h-full text-center m-auto flex text-2xl font-black"
        >
          Sala tymczasowo wyłączona z użytku
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import CurrentRentInfo from './CurrentRentInfo.vue'
import IncomingRent from './IncomingRent.vue'

const props = defineProps<{
  room: IRoomAvailability
}>()

provide('roomStatus', props.room.status)

const currentEvent = computed(() => {
  return props.room.current_booking.title ? props.room.current_booking.title : statusResponse
})
const showItem = ref(false)
const statusColor = computed(() => {
  const map: Record<string, string> = {
    avaiable: 'bg-green-600', // zielony
    occupied: 'bg-red-600', // czerwony
    out_of_order: 'bg-yellow-600', // żółty
  }
  return map[props.room.status] || map.default
})
const animationClass = ref('')

const playShow = () => {
  animationClass.value = '' // usuń poprzednią animację
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
const statusResponse = computed(() => {
  if (props.room.status === 'out_of_order') return 'Sala tymczasowo wyłączona z użytku'
  if (props.room.status === 'occupied') return 'Sala jest zajęta'
  return 'Sala jest dostępna'
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
