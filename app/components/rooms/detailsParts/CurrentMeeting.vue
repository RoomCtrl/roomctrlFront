<template>
  <Card
    v-if="currentBooking"
    pt:root:class="flex border-l-4 border-amber-600 justify-center overflow-hidden"
    pt:body:class="bg-amber-200/80 text-amber-900 w-full h-full"
  >
    <template #title>
      <h2 class="lg:text-xl 2xl:text-2xl font-extrabold">
        {{ $t('pages.roomDetails.currentMeet.title') }}
      </h2>
      <h1
        v-if="currentBooking"
        v-tooltip.bottom="currentBooking.title"
        class="max-xl:text-base font-bold truncate"
      >
        {{ meetTitle }}
      </h1>
    </template>
    <template #content>
      <div class="flex flex-col gap-1">
        <div class="flex flex-row gap-1 items-center">
          <i
            class="pi pi-clock"
            style="font-size: 1.1rem;"
          />
          <h2 class="font-semibold">
            {{ formatTimeRange(currentBooking.startedAt, currentBooking.endedAt) }}
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
    pt:root:class="border-l-4 border-amber-600 bg-amber-200/80 text-amber-900"
    pt:content:class="text-lg font-extrabold"
  >
    <template #content>
      {{ $t('pages.allRooms.statuses.roomTitle.available') }}
    </template>
  </Card>
</template>

<script setup lang="ts">
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
const meetTitle = computed(() => {
  return props.currentBooking?.isPrivate ? props.currentBooking.title : t('pages.allRooms.statuses.roomTitle.occupied')
})
</script>
