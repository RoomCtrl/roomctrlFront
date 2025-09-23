<template>
  <div
    :class="[statusColor, animate]"
    class="rounded-t-xl lg:rounded-xl flex flex-col lg:-mb-20 lg:mr-3 py-3"
  >
    <div class="flex flex-row justify-between px-2 pb-5 text-white max-sm:items-center">
      <h1 class="lg:flex-1 text-lg font-bold">
        {{ $t('pages.allRooms.room') + roomName }}
      </h1>
      <div
        v-if="badgeColor"
        class="flex flex-row gap-2 justify-end items-center"
      >
        <RentBadge
          v-if="currentBooking"
          class="flex-none"
          :current="true"
          :color="badgeColor"
          :status="status"
          :started-at="currentBooking.startedAt"
          :ended-at="currentBooking.endedAt"
        />
        <RentBadge
          v-else
          class="flex-none"
          :current="true"
          :color="badgeColor"
          :status="status"
        />
      </div>
    </div>
    <Message
      pt:root:class="mx-2 rounded-lg lg:text-center"
      pt:text:class="flex flex-col justify-start lg:grid lg:grid-cols-2 lg:gap-y-1 w-full"
      :severity="badgeColor"
    >
      <div class="flex flex-row items-center gap-2 lg:m-auto text-sm">
        <i class="pi pi-arrow-up-right-and-arrow-down-left-from-center" />
        <p>{{ $t('pages.allRooms.size') + size }}<sup>2</sup></p>
      </div>
      <div class="flex flex-row items-center gap-2 lg:m-auto text-sm">
        <i class="pi pi-users" />
        <p>{{ $t('pages.allRooms.capacity') + capacity }}</p>
      </div>
      <div class="flex flex-row gap-2 col-span-2 text-sm items-center justify-center">
        <i class="pi pi-thumbtack" />
        {{ $t('pages.allRooms.location') + 'Sektor B skrzydło prawe' }}
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

const colorMode = useColorMode()
const isReady = ref(false)

const status = inject('roomStatus') as string

const isDarkMode = computed(() => {
  if (!isReady.value) return false
  return colorMode.value === 'dark' || colorMode.preference === 'dark'
})
const statusColor = computed(() => {
  const lightMap: Record<string, string> = {
    avaiable: 'bg-green-600',
    occupied: 'bg-red-600',
    closed: 'bg-yellow-600',
  }

  const darkMap: Record<string, string> = {
    avaiable: 'bg-green-950',
    occupied: 'bg-red-950',
    closed: 'bg-yellow-950',
  }

  const currentMap = isDarkMode.value ? darkMap : lightMap
  return currentMap[status] || lightMap.avaiable
})

const badgeColor = computed(() => {
  const map: Record<string, string> = {
    avaiable: 'success',
    occupied: 'error',
    closed: 'warn',
  }
  return map[status]
})

onMounted(() => {
  isReady.value = true
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
