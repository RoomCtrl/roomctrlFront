<template>
  <Card
    pt:root:style="--p-card-body-padding: 0rem; --p-card-caption-gap: 0"
    pt:body:class="h-full"
    pt:content:class="flex flex-col h-full"
    pt:caption:class="px-2 pt-2"
  >
    <template #title>
      <div class="font-bold text-3xl">
        {{ $t('pages.adminDashboard.dashboard.chart.title') }}
      </div>
    </template>
    <template #subtitle>
      {{ subTitleDate }}
    </template>
    <template #content>
      <div class="flex flex-row justify-center gap-2 w-full">
        <Button
          v-for="button in buttons"
          :key="button.title"
          :label="button.title"
          size="small"
          raised
          :variant="isActive === button.id ? '' : 'outlined'"
          severity="info"
          @click="changeDateRange(button.data, button.id, button.title)"
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

const isActive = ref<string>('today')

const todayData = ref([20, 25, 5])
const thisWeekData = ref([190, 50, 10])
const thisMontData = ref([900, 80, 20])
const colorMode = useColorMode()
const { t } = useI18n()

const subTitleDate = ref<string>(t('pages.adminDashboard.dashboard.chart.buttons.today'))

const isDarkMode = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  },
})
const buttons = ref([
  {
    id: 'today',
    title: t('pages.adminDashboard.dashboard.chart.buttons.today'),
    data: todayData.value,
  },
  {
    id: 'week',
    title: t('pages.adminDashboard.dashboard.chart.buttons.thisWeek'),
    data: thisWeekData.value,
  },
  {
    id: 'month',
    title: t('pages.adminDashboard.dashboard.chart.buttons.thisMonth'),
    data: thisMontData.value,
  },
])

const chooseData = ref<number[]>(todayData.value)

const chartDataSets = computed(() => {
  const documentStyle = getComputedStyle(document.body)
  const backgroundSuffix = isDarkMode.value ? '700' : '600'
  const hoverBackgroundSuffix = isDarkMode.value ? '600' : '500'
  const borderSuffix = isDarkMode.value ? '800' : '700'
  return [
    {
      data: chooseData.value,
      backgroundColor: [
        documentStyle.getPropertyValue(`--p-green-${backgroundSuffix}`),
        documentStyle.getPropertyValue(`--p-red-${backgroundSuffix}`),
        documentStyle.getPropertyValue(`--p-yellow-${backgroundSuffix}`),
      ],
      hoverBackgroundColor: [
        documentStyle.getPropertyValue(`--p-green-${hoverBackgroundSuffix}`),
        documentStyle.getPropertyValue(`--p-red-${hoverBackgroundSuffix}`),
        documentStyle.getPropertyValue(`--p-yellow-${hoverBackgroundSuffix}`),
      ],
      borderColor: [
        documentStyle.getPropertyValue(`--p-green-${borderSuffix}`),
        documentStyle.getPropertyValue(`--p-red-${borderSuffix}`),
        documentStyle.getPropertyValue(`--p-yellow-${borderSuffix}`),
      ],
    },
  ]
})

const changeDateRange = (data: number[], activeButton: string, title: string) => {
  subTitleDate.value = title
  isActive.value = activeButton
  chooseData.value = data
}

const setChartData = () => {
  return {
    labels: ['Wolne', 'Zajęte', 'Nieczynne'],
    datasets: chartDataSets.value,
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
        color: 'white',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = ((value / total) * 100)
          if (percentage < 5) {
            return ''
          }
          else {
            return `${percentage}%`
          }
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  }
}

watch(chartDataSets, () => {
  chartData.value = setChartData()
})

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
</script>
