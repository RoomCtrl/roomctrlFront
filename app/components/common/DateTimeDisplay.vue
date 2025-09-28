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
      <div v-if="startedAt && endedAt && !isRangeSameDay(startedAt, endedAt)">
        {{ formatToDayMonth(endedAt) }}
        <i class="pi pi-calendar" />
      </div>
    </div>
    <div v-else-if="startedAt && endedAt">
      <div
        :class="[fontSize, 'flex flex-row gap-2 items-center']"
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
    <div
      v-else
    />
  </div>
</template>

<script setup lang="ts">
const status = inject('roomStatus') as string
const props = defineProps<{
  startedAt: string
  endedAt: string
  current: boolean
  size: string
}>()

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
