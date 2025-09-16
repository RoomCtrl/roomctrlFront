<template>
  <div
    :class="[statusColor, animate]"
    class="rounded-t-xl lg:rounded-xl flex flex-col lg:-mb-20 lg:mr-3 py-3"
  >
    <div class="flex flex-row justify-between px-2 pb-3 text-white max-sm:items-center">
      <h1 class="lg:flex-1 text-lg font-bold">
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
    <Message
      pt:root:class="mx-2 rounded-lg lg:text-center max-sm:text-sm"
      pt:text:class="flex flex-col justify-start lg:grid lg:grid-cols-2 lg:gap-y-1"
      :severity="badgeColor"
    >
      <div class="flex flex-row items-center gap-2 lg:m-auto">
        <i class="pi pi-arrow-up-right-and-arrow-down-left-from-center" />
        <p>Rozmiar sali: {{ size }}2</p>
      </div>
      <div class="flex flex-row items-center gap-2 lg:m-auto">
        <i class="pi pi-users" />
        <p>Pojemność: {{ capacity }}</p>
      </div>
      <div class="col-span-2">
        <i class="pi pi-thumbtack" />
        Lokalizacja: Sektor B skrzydło prawe
      </div>
    </Message>
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

const isReady = ref(false)

onMounted(() => {
  isReady.value = true
})

const status = inject('roomStatus') as string

const colorMode = useColorMode()

const isDarkMode = computed(() => {
  if (!isReady.value) return false
  return colorMode.value === 'dark' || colorMode.preference === 'dark'
})
const statusColor = computed(() => {
  const lightMap: Record<string, string> = {
    avaiable: 'bg-green-600',
    occupied: 'bg-red-600',
    out_of_order: 'bg-yellow-600',
  }

  const darkMap: Record<string, string> = {
    avaiable: 'bg-green-950',
    occupied: 'bg-red-950',
    out_of_order: 'bg-yellow-950',
  }

  const currentMap = isDarkMode.value ? darkMap : lightMap
  return currentMap[status] || lightMap.avaiable // fallback
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
