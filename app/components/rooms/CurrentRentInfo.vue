<template>
  <div
    :class="[statusColor, animate]"
    class="rounded-xl flex flex-col -mb-16 mr-3 py-2"
  >
    <div class="flex flex-row justify-between px-2 pb-2 text-white">
      <h1 class="lg:flex-1 text-md lg:text-lg font-bold">
        {{ 'Sala nr. ' + roomName }}
      </h1>
      <div class="flex flex-row gap-2 justify-end items-center">
        <RentBadge
          v-if="badgeColor && currentBooking"
          class="flex-none"
          :color="badgeColor"
          :status="status"
          :started-at="currentBooking.startedAt"
          :ended-at="currentBooking.endedAt"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-2 mx-2 rounded-lg text-center gap-y-1 border-2"
      :class="[textColor]"
    >
      <div class="flex flex-row items-center gap-2 m-auto">
        <i class="pi pi-arrow-up-right-and-arrow-down-left-from-center" />
        <p>Rozmiar sali: {{ size }}2</p>
      </div>
      <div class="flex flex-row items-center gap-2 m-auto">
        <i class="pi pi-users" />
        <p>Pojemność: {{ capacity }}</p>
      </div>
      <div class="col-span-2">
        Lokalizacja: Sektor B skrzydło prawe
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RentBadge from './RentBadge.vue'

defineProps<{
  roomName: string
  capacity: number
  size?: string
  showMoreInfo: boolean
  currentBooking?: {
    title: string
    startedAt: string
    endedAt: string
  }
  animate: string
}>()

const status = inject('roomStatus') as string

const statusColor = computed(() => {
  const map: Record<string, string> = {
    avaiable: 'bg-green-600', // zielony
    occupied: 'bg-red-600', // czerwony
    out_of_order: 'bg-yellow-600', // żółty
  }
  return map[status] || map.default
})

const textColor = computed(() => {
  const map: Record<string, string> = {
    avaiable: 'text-green-700 bg-green-100', // zielony
    occupied: 'text-red-700 bg-red-100', // czerwony
    out_of_order: 'text-yellow-700 bg-yellow-100', // żółty
  }
  return map[status] || map.default
})

const badgeColor = computed(() => {
  const map: Record<string, string> = {
    avaiable: 'success', // zielony
    occupied: 'error', // czerwony
    out_of_order: 'warn', // żółty
  }
  return map[status]
})
</script>

<style scoped>
@keyframes showUpCard {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-100px);
    z-index: 20;
  }
  100% {
    transform: translateY(0px);
    z-index: 20;
  }
}

@keyframes hideUpCard {
  0% {
    transform: translateY(0px);
    z-index: 20
  }
  50% {
    transform: translateY(-100px);
    z-index: 20;
  }
  100% {
    transform: translateY(0px);
    z-index: 0;
  }
}
.show {
  animation: showUpCard 0.5s forwards;
}
.hide {
  animation: hideUpCard 0.5s forwards;
}
</style>
