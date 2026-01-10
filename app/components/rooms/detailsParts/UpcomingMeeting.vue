<template>
  <Card
    pt:body:class="h-full"
    pt:content:class="h-full"
  >
    <template #title>
      <h1 class="text-lg sm:text-xl lg:text-2xl font-semibold pb-2 sm:pb-4">
        {{ $t('pages.roomDetails.upcomingMeetings.title') }}
      </h1>
    </template>
    <template #content>
      <div
        v-if="roomStatus === 'maintance'"
        class="h-full flex flex-col gap-2 justify-center items-center text-center"
      >
        <i
          class="pi pi-exclamation-triangle"
          style="font-size: 3rem;"
        />
        <h1 class="text-2xl font-semibold">
          {{ $t('pages.allRooms.statuses.roomTitle.closed') }}
        </h1>
      </div>
      <div v-else-if="todayMeetings?.length > 0">
        <Timeline
          :value="todayMeetings"
        >
          <template #opposite="slotProps">
            <div class="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-1 justify-end">
              <DateTimeDisplay
                layout="vertical"
                :current="false"
                :started-at="slotProps.item.startedAt"
                :ended-at="slotProps.item.endedAt"
                size="md"
              />
            </div>
          </template>
          <template #content="slotProps">
            <h2 class="lg:block text-sm sm:text-base lg:text-lg">
              {{ slotProps.item.title }}
            </h2>
          </template>
        </Timeline>
      </div>
      <div
        v-else
        class="h-full flex flex-row gap-2 justify-center items-center"
      >
        <i class="pi pi-stopwatch text-lg sm:text-xl lg:text-2xl" />
        <h1 class="text-base sm:text-lg lg:text-xl">
          {{ $t('pages.roomDetails.upcomingMeetings.none') }}
        </h1>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import DateTimeDisplay from '~/components/common/DateTimeDisplay.vue'

const roomStatus = inject<ComputedRef<string>>('roomStatus')

const props = defineProps<{
  meetings?: [
    {
      title: string
      startedAt: string
      endedAt: string
      isPrivate: boolean
    },
  ]
}>()

const todayMeetings = computed(() => {
  return props.meetings?.filter(m => isRangeTimeToday(new Date(m.startedAt), new Date(m.endedAt)))
})
</script>
