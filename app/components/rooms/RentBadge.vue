<template>
  <Message
    :severity="color"
    pt:root:class="rounded-3xl"
    pt:content:class="py-1 px-2"
  >
    <div class="flex flex-row gap-1 items-center">
      <div
        v-if="status === 'occupied'"
        class="flex flex-row gap-1 items-center"
      >
        <h3
          v-if="endedAt"
          class="text-md"
        >
          {{ statusText + ' do ' + formatToHoursMinutes(endedAt) }}
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
              {{ formatTimeRange(startedAt, endedAt) }}
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
defineProps<{
  color: string
  startedAt?: string
  endedAt?: string
}>()

const statusText = computed(() => {
  if (status === 'out_of_order') return 'Nieczynna'
  if (status === 'occupied') return 'Zajęta'
  return 'Dostępna'
})

const status = inject('roomStatus') as string
</script>
