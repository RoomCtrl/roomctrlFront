<template>
  <Message
    :severity="color"
    pt:root:style="--p-message-border-radius: 1.5rem"
    pt:content:style="--p-message-content-padding: 0.25rem 0.5rem "
  >
    <div class="flex flex-row gap-1 items-center text-sm">
      <div
        v-if="status === 'occupied'"
        class="flex flex-row gap-1 items-center"
      >
        <h3
          v-if="current"
          class="text-md"
        >
          {{ $t('pages.allRooms.statuses.tags.occupiedTo') + endedTime }}
        </h3>
        <h3 v-else>
          {{ rentTimeRange }}
        </h3>
        <i class="pi pi-clock" />
        <div v-if="startedAt && endedAt && !isRangeTimeToday(startedAt, endedAt)">
          {{ formatToDayMonth(endedAt) }}
          <i class="pi pi-calendar" />
        </div>
      </div>
      <div v-else-if="startedAt && endedAt">
        <div
          class="flex flex-row gap-2 items-center text-sm"
        >
          <div class="flex flex-row gap-1 items-center">
            <h3>
              {{ formatDateRange(startedAt, endedAt) }}
            </h3>
            <i class="pi pi-calendar" />
          </div>
          <div class="flex flex-row gap-1 items-center">
            <h4 class="text-end">
              {{ rentTimeRange }}
            </h4>
            <i class="pi pi-clock" />
          </div>
        </div>
      </div>
      <div v-else>
        {{ statusText }}
      </div>
    </div>
  </Message>
</template>

<script setup lang="ts">
const props = defineProps<{
  color: string
  startedAt?: string
  endedAt?: string
  current?: boolean
}>()

const status = inject('roomStatus') as string
const endedTime = computed(() => {
  if (props.endedAt) {
    return formatToHoursMinutes(props.endedAt)
  }
  return ''
})
const rentTimeRange = computed(() => {
  if (props.endedAt && props.startedAt) {
    return formatTimeRange(props.startedAt, props.endedAt)
  }
  return ''
})
const { t } = useI18n()

const statusText = computed(() => {
  if (status === 'closed') return t('pages.allRooms.statuses.tags.closed')
  if (status === 'occupied') return t('pages.allRooms.statuses.tags.occupied')
  return t('pages.allRooms.statuses.tags.available')
})
</script>
