<template>
  <div :class="[fontSize, 'flex flex-row gap-1 items-center']">
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
      <i
        :class="[iconSize, 'pi pi-clock']"
      />
      <div v-if="startedAt && endedAt && !isRangeSameDay(new Date(startedAt), new Date(endedAt)) && isToday">
        {{ formatToDayMonth(new Date(endedAt)) }}
        <i class="pi pi-calendar" />
      </div>
    </div>
    <div v-else-if="startedAt && endedAt">
      <div
        :class="[fontSize, textLayout, 'flex gap-2 items-center']"
      >
        <div
          v-if="!isToday"
          class="flex flex-row gap-1 items-center"
        >
          <h3>
            {{ formatDateRange(new Date(startedAt), new Date(endedAt)) }}
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
    <div
      v-else
    />
  </div>
</template>

<script setup lang="ts">
import { formatToHoursMinutes, formatTimeRange, formatToDayMonth, formatDateRange, isRangeSameDay } from '~/utils/dateHelpers'

const status = inject('roomStatus') as string
const props = defineProps<{
  startedAt: string
  endedAt: string
  current: boolean
  size: string
  layout: 'vertical' | 'horizontial'
}>()

const endedTime = computed(() => {
  if (props.endedAt) {
    const date = new Date(props.endedAt)
    return formatToHoursMinutes(date)
  }
  return ''
})
const rentTimeRange = computed(() => {
  if (props.endedAt && props.startedAt) {
    const startDate = new Date(props.startedAt)
    const endDate = new Date(props.endedAt)
    return formatTimeRange(startDate, endDate)
  }
  return ''
})

const isToday = computed(() => {
  if (!props.startedAt) return false
  const date = new Date(props.startedAt)
  const today = new Date()
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear()
})

const textLayout = computed(() => {
  if (props.layout === 'vertical') {
    return 'flex-col'
  }
  else {
    return 'flex-row'
  }
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm' : {
      return 'icon-sm'
    }
    case 'lg' : {
      return 'icon-lg'
    }
    default: {
      return 'icon-base'
    }
  }
})

const fontSize = computed(() => {
  switch (props.size) {
    case 'sm' : {
      return 'text-sm'
    }
    case 'lg' : {
      return 'text-lg font-medium'
    }
    default: {
      return 'text-base'
    }
  }
})
</script>

<style scoped>
.icon-sm {
  font-size: 0.875rem;
}
.icon-base {
  font-size: 1rem;
}
.icon-lg {
  font-size: 1.35rem;
}
</style>
