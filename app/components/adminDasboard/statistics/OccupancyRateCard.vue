<template>
  <Card class="w-full md:w-[calc(50%-0.5rem)]">
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.occupancyRate') }}
        </h3>
        <i class="pi pi-chart-bar text-green-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div style="height: 300px">
        <Chart
          class="h-full"
          type="bar"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, computed } from 'vue'

const { t } = useI18n()
const { fetchBookingOccupancyRate } = useStatistics()

const occupancyData = await fetchBookingOccupancyRate()
const occupancyDataProcent = occupancyData.map(
  item => item.occupancyRate,
)

const chartData = computed(() => ({
  labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
  datasets: [
    {
      label: t('pages.adminDashboard.statistics.occupancyPercentage'),
      data: occupancyDataProcent,
      backgroundColor: [
        '#10b981',
        '#10b981',
        '#10b981',
        '#10b981',
        '#10b981',
        '#f59e0b',
        '#f59e0b',
      ],
      borderColor: [
        '#059669',
        '#059669',
        '#059669',
        '#059669',
        '#059669',
        '#b45309',
        '#b45309',
      ],
      borderWidth: 2,
    },
  ],
}))

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: function (value) {
          return value + '%'
        },
      },
    },
  },
})
</script>
