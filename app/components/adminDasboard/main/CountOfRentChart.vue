<template>
  <Card
    pt:body:class="p-0 h-full"
    pt:title:class="font-bold text-3xl"
    pt:content:class="flex flex-col justify-end h-full"
  >
    <template #title>
      Liczba rezerwacji
    </template>
    <template #content>
      <div>
        <Button label="Ostatni tydzien" />
        <Button label="Ostatnie 2 tygodnie" />
      </div>
      <Chart
        class="w-full h-full"
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

const weekChart = lastWeekdaysArray().map(d => d.weekDay = t(d.weekDay) + ' ' + d.date)

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: weekChart,
    datasets: [
      {
        label: 'Rezerwacje',
        data: [20, 10, 30, 22, 31, 22, 10, 20, 10, 30, 22, 31, 22, 10, 20, 10, 30, 22, 31, 22, 10, 20, 10, 30, 22, 31, 22, 10, 31, 22, 10],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-red-800'),
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
