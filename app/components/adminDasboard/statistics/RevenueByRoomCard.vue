<template>
  <Card class="w-full md:w-[calc(50%-0.5rem)]">
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.revenueByRoom') }}
        </h3>
        <i class="pi pi-dollar text-yellow-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div style="height: 280px">
        <Chart
          type="doughnut"
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
    'Sala Główna',
    'Sala Konf. A',
    'Sala Konf. B',
    'Sala Spotkań',
    'Sala Treningowa',
  ],
  datasets: [
    {
      data: [4200, 3100, 2800, 2100, 1800],
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
      ],
      borderColor: ['#1e40af', '#059669', '#d97706', '#dc2626', '#7c3aed'],
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
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.label + ': PLN ' + context.parsed
        },
      },
    },
  },
})
</script>
