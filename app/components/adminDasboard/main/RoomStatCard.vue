<template>
  <Card
    pt:root:class="dark:[--p-card-background:var(--p-zinc-900)] [--p-card-background:var(--p-zinc-300)] p-2 mx-3 2xl:mx-6"
    pt:root:style="--p-card-body-gap: 0, --p-card-body-padding: 0.25rem"
    pt:footer:class="grid grid-cols-2 gap-x-2"
  >
    <template #header>
      <div class="flex justify-between items-center pb-2 ">
        <div class="flex items-center flex-shrink-0">
          <span class="text-xl font-bold text-amber-800 dark:text-amber-500 leading-none">#{{ rank }}</span>
        </div>
        <h3 class="text-sm font-semibold text-right">
          {{ room.roomName }}
        </h3>
      </div>
    </template>

    <template #content>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex items-center gap-1.5 p-2 rounded-md bg-green-50">
          <div class="flex items-center justify-center w-7 h-7 rounded-md bg-green-500 text-white text-xs flex-shrink-0">
            <i class="pi pi-calendar" />
          </div>
          <div class="flex flex-row items-end gap-0.5">
            <span class="text-base font-bold text-gray-800 leading-none">{{ room.weeklyBookings }}</span>
            <span class="text-[9px] text-gray-600 font-medium uppercase">
              {{ $t('pages.adminDashboard.dashboard.carousel.weekly') }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-1.5 p-2 rounded-md bg-cyan-50">
          <div class="flex items-center justify-center w-7 h-7 rounded-md bg-cyan-500 text-white text-xs flex-shrink-0">
            <i class="pi pi-chart-bar" />
          </div>
          <div class="flex flex-row items-end gap-0.5">
            <span class="text-base font-bold text-gray-800 leading-none">{{ room.monthlyBookings }}</span>
            <span class="text-[9px] text-gray-600 font-medium uppercase">
              {{ $t('pages.adminDashboard.dashboard.carousel.monthly') }}
            </span>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex flex-col gap-1 pt-1">
        <div class="flex justify-between text-xs font-medium">
          <span>Wykorzystanie</span>
        </div>
        <ProgressBar
          :pt:value:class="progressColorClass"
          :value="Math.round(room.percentage)"
          aria-label="Percentage of room utilization"
          mode="determinate"
        />
      </div>

      <div
        class="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-semibold mt-auto"
        :class="trendDirection === 'trending-up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
      >
        <i
          :class="trendIcon"
          class="text-[10px]"
        />
        <span>{{ trendText }}</span>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { IStatisticsUsageRoomsResponse } from '~/interfaces/StatisticsInterfaces'

const props = defineProps<{
  room: IStatisticsUsageRoomsResponse
  rank: number
}>()

const progressColorClass = computed(() => {
  const rate = Math.round(props.room.percentage)
  if (rate >= 80) return 'bg-gradient-to-r from-green-500 to-green-600'
  if (rate >= 60) return 'bg-gradient-to-r from-blue-500 to-blue-600'
  if (rate >= 40) return 'bg-gradient-to-r from-orange-500 to-orange-600'
  return 'bg-gradient-to-r from-red-500 to-red-600'
})

const trendDirection = computed(() => {
  const weeklyAvg = props.room.monthlyBookings / 4
  return props.room.weeklyBookings > weeklyAvg ? 'trending-up' : 'trending-down'
})

const trendIcon = computed(() => {
  return trendDirection.value === 'trending-up' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'
})

const trendText = computed(() => {
  const weeklyAvg = props.room.monthlyBookings / 4
  if (weeklyAvg === 0) return 'Brak danych do porównania'
  const diff = Math.abs(props.room.weeklyBookings - weeklyAvg)
  const percent = Math.round((diff / weeklyAvg) * 100)
  return trendDirection.value === 'trending-up'
    ? `+${percent}% vs średnia`
    : `-${percent}% vs średnia`
})
</script>
