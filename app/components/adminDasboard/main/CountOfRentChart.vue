<template>
  <Card
    pt:body:class="p-0"
    pt:title:class="font-bold text-3xl"
  >
    <template #title>
      Liczba rezerwacji
    </template>
    <template #content>
      <Chart
        type="line"
        :data="chartData"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { lastWeekdaysArray } from '~/utils/dateHelpers'

const chartData = ref()
const date = new Date()
date.setDate(date.getDate() - 1)
const chartOptions = ref()
const { t } = useI18n()

const test = lastWeekdaysArray()

const weekChart = lastWeekdaysArray().map(d => d = t(d))

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: weekChart,
    datasets: [
      {
        label: 'Rezerwacje',
        data: [20, 10, 30, 22, 31, 22, 10],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        tension: 0.4,
      },
    ],
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
</script>
