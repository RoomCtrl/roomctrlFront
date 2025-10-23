<template>
  <Card
    pt:body:class="h-full p-0"
    pt:content:class="flex flex-col h-full"
    pt:caption:class="gap-0 px-2 pt-2"
    pt:title:class="font-bold text-3xl"
  >
    <template #title>
      Obłożenie sal
    </template>
    <template #subtitle>
      {{ $t('date.today') }}
    </template>
    <template #content>
      <div class="flex flex-row justify-center gap-2 w-full">
        <Button
          size="small"
          raised
          class="bg-gray-800"
          variant="text"
          label="Dzisiaj"
        />
        <Button
          size="small"
          raised
          class="bg-gray-800"
          variant="text"
          label="Ten tydzień"
        />
        <Button
          size="small"
          raised
          class="bg-gray-800"
          variant="text"
          label="Ten miesiac"
        />
      </div>
      <div class="flex flex-col justify-center items-center w-full h-full">
        <Chart
          type="pie"
          class="flex flex-col justify-end h-[90%] w-[90%]"
          :data="chartData"
          :options="chartOptions"
          :plugins="chartPlugins"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import ChartDataLabels from 'chartjs-plugin-datalabels'

const chartData = ref()
const chartOptions = ref(null)
const chartPlugins = ref([ChartDataLabels])

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)
  return {
    labels: ['Wolne', 'Zajęte', 'Nieczynne'],
    datasets: [
      {
        data: [20, 25, 5],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-green-700'),
          documentStyle.getPropertyValue('--p-red-700'),
          documentStyle.getPropertyValue('--p-yellow-700'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-green-600'),
          documentStyle.getPropertyValue('--p-red-600'),
          documentStyle.getPropertyValue('--p-yellow-600'),
        ],
        borderColor: [documentStyle.getPropertyValue('--p-green-800'),
          documentStyle.getPropertyValue('--p-red-800'),
          documentStyle.getPropertyValue('--p-yellow-800')],
      },
    ],
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: textColor,
        },
      },
      datalabels: {
        align: 'end',
        color: '#ffffff',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = ((value / total) * 100).toFixed(0)
          return `${percentage}%`
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  }
}

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
</script>
