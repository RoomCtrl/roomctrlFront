<template>
  <Card
    pt:body:class="h-full"
    pt:content:class="h-full flex justify-center"
  >
    <template #title>
      <h1 class="text-2xl font-semibold pb-4">
        {{ $t('pages.roomDetails.upcomingMeetings.title') }}
      </h1>
    </template>
    <template #content>
      <div v-if="todayMeetings?.length > 0">
        <Timeline
          :value="todayMeetings"
        >
          <template #opposite="slotProps">
            <div class="flex lg:max-2xl:flex-col gap-1 justify-end">
              <h2 class="hidden lg:max-2xl:block">
                {{ slotProps.item.title }}
              </h2>
              <DateTimeDisplay
                :current="false"
                :started-at="slotProps.item.startedAt"
                :ended-at="slotProps.item.endedAt"
                size="sm"
              />
            </div>
          </template>
          <template #content="slotProps">
            <h2 class="block lg:max-2xl:hidden">
              {{ slotProps.item.title }}
            </h2>
          </template>
        </Timeline>
      </div>
      <h1
        v-else
        class="h-full flex flex-col justify-center"
      >
        {{ $t('pages.roomDetails.upcomingMeetings.none') }}
      </h1>
    </template>
  </Card>
</template>

<script setup lang="ts">
import DateTimeDisplay from '~/components/common/DateTimeDisplay.vue'

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
  return props.meetings?.filter(m => isRangeTimeToday(m.startedAt, m.endedAt))
})
</script>
