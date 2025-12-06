<template>
  <Card class="w-full md:w-[calc(50%-0.5rem)]">
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.roomComparison') }}
        </h3>
        <i class="pi pi-chart-radar text-purple-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div style="height: 360px">
        <Chart
          class="h-full"
          type="radar"
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

const chartData = computed(() => ({
  labels: [
    t('pages.adminDashboard.statistics.bookings'),
    t('pages.adminDashboard.statistics.reviews'),
    t('pages.adminDashboard.statistics.occupancy'),
    t('pages.adminDashboard.statistics.satisfaction'),
    t('pages.adminDashboard.statistics.maintenance'),
  ],
  datasets: [
    {
      label: 'Sala Główna',
      data: [90, 85, 92, 88, 95],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
    {
      label: 'Sala Konf. A',
      data: [75, 78, 88, 82, 80],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      pointBackgroundColor: '#ef4444',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
    {
      label: 'Sala Konf. B',
      data: [85, 88, 80, 85, 90],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
  ],
}))

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
    },
  },
})
</script>
