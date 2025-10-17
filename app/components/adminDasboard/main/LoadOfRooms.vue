<template>
  <Card
    pt:body:class="h-full p-0"
    pt:content:class="flex h-full justify-center items-center"
    pt:title:class="font-bold text-3xl px-2 pt-2"
  >
    <template #title>
      Obłożenie sal
    </template>
    <template #content>
      <Chart
        type="pie"
        class="flex flex-col justify-end h-[60%] w-[70%]"
        :data="chartData"
        :options="chartOptions"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
const chartData = ref()
const chartOptions = ref(null)

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: ['Wolne', 'Zajete', 'Nieczynne'],
    datasets: [
      {
        data: [20, 25, 5],
        backgroundColor: [documentStyle.getPropertyValue('--p-green-500'), documentStyle.getPropertyValue('--p-red-500'), documentStyle.getPropertyValue('--p-yellow-500')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-green-400'), documentStyle.getPropertyValue('--p-red-400'), documentStyle.getPropertyValue('--p-yellow-400')],
        borderColor: '#000000',
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
