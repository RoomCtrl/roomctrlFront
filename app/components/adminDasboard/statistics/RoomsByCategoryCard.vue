<template>
  <Card class="w-full md:w-[calc(50%-0.5rem)]">
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.roomsByCategory') }}
        </h3>
        <i class="pi pi-th-large text-cyan-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div style="height: 260px">
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

const chartData = computed(() => ({
  labels: ['Sala Główna', 'Sala Konf. A', 'Sala Konf. B', 'Sala Spotkań', 'Sala Treningowa'],
  datasets: [
    {
      label: t('pages.adminDashboard.statistics.confirmed'),
      data: [120, 95, 110, 88, 75],
      backgroundColor: '#10b981',
      borderColor: '#059669',
      borderWidth: 2,
    },
    {
      label: t('pages.adminDashboard.statistics.pending'),
      data: [45, 38, 32, 28, 22],
      backgroundColor: '#f59e0b',
      borderColor: '#d97706',
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
      position: 'top',
    },
  },
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
      beginAtZero: true,
    },
  },
})
</script>
