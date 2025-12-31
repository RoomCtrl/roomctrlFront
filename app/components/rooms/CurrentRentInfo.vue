<template>
  <div
    :class="[statusColor, animate]"
    class="rounded-t-xl lg:rounded-xl flex flex-col lg:-mb-20 lg:mr-9 py-3"
  >
    <div class="flex flex-row justify-between px-2 pb-5 text-white max-sm:items-center">
      <h1 class="lg:flex-1 text-lg font-bold">
        {{ roomName }}
      </h1>
      <div
        v-if="badgeColor"
        class="flex flex-row gap-2 justify-end items-center"
      >
        <RentBadge
          v-if="currentBooking"
          class="flex-none"
          :current="true"
          custom-color
          :color="statusBadgeColor"
          :started-at="currentBooking.startedAt"
          :ended-at="currentBooking.endedAt"
          size="sm"
        />
        <RentBadge
          v-else
          custom-color
          :color="statusBadgeColor"
          class="flex-none"
          :current="true"
          size="sm"
        />
      </div>
    </div>
    <Message
      severity="info"
      class="custom-message"
      :pt:root:style="statusBadgeColor"
      :pt:root:class="'mx-2 rounded-lg lg:text-center overflow-hidden'"
      pt:text:class="grid grid-cols-2 gap-1 gap-x-4 w-full "
    >
      <div class="flex flex-row items-center gap-2 lg:m-auto text-sm">
        <i class="pi pi-arrow-up-right-and-arrow-down-left-from-center" />
        <p>{{ $t('pages.allRooms.size') + size + ' m' }}<sup>2</sup></p>
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

const props = defineProps<{
  roomName: string
  capacity: number
  size: number
  showMoreInfo: boolean
  currentBooking?: {
    title: string
    startedAt: string
    endedAt: string
  }
  animate: string
}>()
const currentBooking = computed(() => props.currentBooking)
const colorMode = useColorMode()
const isReady = ref(false)
const roomStatus = inject<ComputedRef<string>>('roomStatus')
const isDarkMode = computed(() => {
  if (!isReady.value) return false
  return colorMode.value === 'dark' || colorMode.preference === 'dark'
})
const statusColor = computed(() => {
  if (roomStatus!.value === 'out_of_use') {
    return isDarkMode.value ? 'bg-yellow-900' : 'bg-yellow-600'
  }
  const hasBooking = !!currentBooking.value
  if (isDarkMode.value) {
    return hasBooking ? 'bg-red-900' : 'bg-green-900'
  }
  return hasBooking ? 'bg-red-600' : 'bg-green-600'
})

const statusBadgeColor = computed(() => {
  if (roomStatus!.value === 'out_of_use') {
    return isDarkMode.value
      ? '--p-message-info-background: var(--p-yellow-950); --p-message-info-border-color: var(--p-yellow-950); --p-message-info-color: var(--p-yellow-400)'
      : '--p-message-info-background: var(--p-yellow-800); --p-message-info-border-color: var(--p-yellow-800); --p-message-info-color: var(--p-yellow-200)'
  }
  const hasBooking = !!currentBooking.value
  if (isDarkMode.value) {
    return hasBooking
      ? '--p-message-info-background: var(--p-red-950); --p-message-info-border-color: var(--p-red-950); --p-message-info-color: var(--p-red-400)'
      : '--p-message-info-background: var(--p-green-950); --p-message-info-border-color: var(--p-green-950); --p-message-info-color: var(--p-green-400)'
  }
  return hasBooking
    ? '--p-message-info-background: var(--p-red-800); --p-message-info-border-color: var(--p-red-800); --p-message-info-color: var(--p-red-200)'
    : '--p-message-info-background: var(--p-green-800); --p-message-info-border-color: var(--p-green-800); --p-message-info-color: var(--p-green-200)'
})
const badgeColor = computed(() => {
  if (roomStatus!.value === 'out_of_use') {
    return 'warn'
  }
  return currentBooking.value ? 'error' : 'success'
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
