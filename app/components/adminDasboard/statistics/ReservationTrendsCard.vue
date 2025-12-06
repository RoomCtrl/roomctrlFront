<template>
  <Card class="w-full md:w-[calc(50%-0.5rem)]">
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.reservationTrends') }}
        </h3>
        <i class="pi pi-chart-line text-blue-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div style="height: 320px">
        <Chart
          class="h-full"
          type="line"
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

const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const chartData = computed(() => ({
  labels: dayKeys.map(day => t(`date.dayShortNames.${day}`)),
  datasets: [
    {
      label: t('pages.adminDashboard.statistics.confirmedReservations'),
      data: [65, 72, 68, 85, 92, 78, 88],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
    },
    {
      label: t('pages.adminDashboard.statistics.pendingReservations'),
      data: [25, 18, 32, 28, 22, 35, 20],
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#f59e0b',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
    },
    {
      label: t('pages.adminDashboard.statistics.cancelledReservations'),
      data: [8, 12, 5, 10, 7, 14, 6],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#ef4444',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
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
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return value
        },
      },
    },
  },
  elements: {
    line: {
      borderWidth: 3,
    },
    point: {
      radius: 6,
      hitRadius: 8,
      hoverRadius: 8,
    },
  },
})
</script>
