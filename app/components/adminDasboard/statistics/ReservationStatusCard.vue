<template>
  <Card
    class="w-full md:w-[calc(50%-0.5rem)]"
    pt:body:class="h-full min-h-[10rem]"
    pt:content:class="h-full"
  >
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.reservationStatus') }}
        </h3>
        <i class="pi pi-chart-pie text-purple-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div
        v-if="bookingTypeCount.count > 0"
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div class="flex justify-center">
          <Chart
            type="doughnut"
            :data="chartData"
            :options="chartOptions"
          />
        </div>
        <div class="space-y-3">
          <div
            v-for="status in statusList"
            :key="status.id"
            class="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-gray-800"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 rounded"
                :style="{ backgroundColor: status.color }"
              />
              <span class="font-medium">{{ status.label }}</span>
            </div>
            <div class="text-right">
              <p class="font-bold">
                {{ status.count }}
              </p>
              <p class="text-sm text-gray-500">
                {{ status.percentage }}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex justify-center items-center h-full text-2xl font-semibold"
      >
        {{ $t('pages.adminDashboard.statistics.noData') }}
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, computed } from 'vue'

const { t } = useI18n()
const { fetchBookingTypeCount } = useStatistics()

const bookingTypeCount = await fetchBookingTypeCount()

const statusList = computed(() => [
  {
    id: 1,
    label: t('pages.adminDashboard.statistics.statusActive'),
    count: bookingTypeCount.active,
    percentage: Math.round((bookingTypeCount.active / bookingTypeCount.count) * 100),
    color: '#10b981',
  },
  {
    id: 3,
    label: t('pages.adminDashboard.statistics.statusCancelled'),
    count: bookingTypeCount.cancelled,
    percentage: Math.round((bookingTypeCount.cancelled / bookingTypeCount.count) * 100),
    color: '#ef4444',
  },
  {
    id: 4,
    label: t('pages.adminDashboard.statistics.statusCompleted'),
    count: bookingTypeCount.completed,
    percentage: Math.round((bookingTypeCount.completed / bookingTypeCount.count) * 100),
    color: '#8b5cf6',
  },
])

const chartData = computed(() => ({
  labels: [
    t('pages.adminDashboard.statistics.statusActive'),
    t('pages.adminDashboard.statistics.statusCancelled'),
    t('pages.adminDashboard.statistics.statusCompleted'),
  ],
  datasets: [
    {
      data: [bookingTypeCount.active, bookingTypeCount.cancelled, bookingTypeCount.completed],
      backgroundColor: ['#10b981', '#ef4444', '#8b5cf6'],
      borderColor: ['#059669', '#dc2626', '#7c3aed'],
      borderWidth: 2,
    },
  ],
}))

const chartOptions = ref({
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
})
</script>
