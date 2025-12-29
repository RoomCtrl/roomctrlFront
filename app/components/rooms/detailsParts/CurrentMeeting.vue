<template>
  <Card
    v-if="currentBooking"
    pt:root:class="flex border-l-4 border-amber-600 justify-center overflow-hidden"
    pt:body:class="bg-amber-200/80 text-amber-900 justify-center w-full h-full"
  >
    <template #title>
      <h2 class="text-base sm:text-lg lg:text-xl font-extrabold">
        {{ $t('pages.roomDetails.currentMeet.title') }}
      </h2>
      <h1
        v-if="currentBooking"
        v-tooltip.bottom="tooltipConfig"
        class="text-sm sm:text-base lg:text-lg font-bold truncate"
        @mouseenter="checkOverflow"
      >
        {{ meetTitle }}
      </h1>
    </template>
    <template #content>
      <div class="flex flex-col gap-1 text-sm sm:text-base">
        <div class="flex flex-row gap-1 items-center">
          <i
            class="pi pi-clock"
            style="font-size: 1rem;"
          />
          <h2 class="font-semibold">
            {{ formatTimeRange(new Date(currentBooking.startedAt), new Date(currentBooking.endedAt)) }}
          </h2>
        </div>
        <div class="flex flex-row gap-2 items-center">
          <i
            class="pi pi-user"
            style="font-weight: bolder;"
          />
          <h2>
            {{ $t('pages.roomDetails.currentMeet.participants', { participants: currentBooking.participants }) }}
          </h2>
        </div>
      </div>
    </template>
  </Card>
  <Card
    v-else
    pt:root:class="border-l-4 border-amber-600 overflow-hidden"
    pt:body:class="flex  justify-center items-center bg-amber-200/80 text-amber-900 w-full h-full"
    pt:content:class="text-lg font-extrabold"
  >
    <template #content>
      <div class="flex flex-row gap-2 items-center justify-center">
        <i
          class="pi pi-book"
          style="font-size: 1.5rem;"
        />
        <h1 class="text-lg sm:text-xl lg:text-2xl">
          {{ $t('pages.allRooms.statuses.roomTitle.available') }}
        </h1>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { formatTimeRange } from '~/utils/dateHelpers'

const props = defineProps<{
  currentBooking?: {
    title: string
    startedAt: string
    endedAt: string
    participants: number
    isPrivate: string
  }
}>()
const { t } = useI18n()
const titleElement = ref(null)
const shouldShowTooltip = ref(false)
const meetTitle = computed(() => {
  return props.currentBooking?.isPrivate ? props.currentBooking.title : t('pages.allRooms.statuses.roomTitle.occupied')
})

const checkOverflow = () => {
  if (titleElement.value) {
    shouldShowTooltip.value
      = titleElement.value.scrollWidth > titleElement.value.clientWidth
  }
}

const tooltipConfig = computed(() => {
  if (!shouldShowTooltip.value) return null

  return {
    value: props.currentBooking.title,
    pt: {
      root: 'max-w-[20rem]',
      text: 'text-center',
    },
  }
})
</script>
