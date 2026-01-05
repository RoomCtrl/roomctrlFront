<template>
  <Panel
    :header="t('pages.roomDetails.detailedInfo.title')"
    pt:content:class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-2 gap-2 self-center"
    pt:header:class="text-xl sm:text-2xl 2xl:text-3xl font-semibold mb-3"
    :toggleable="isMobile"
  >
    <Card
      v-for="info in Informations"
      :key="info.title"
      pt:root:class="border-l-8 border-y-2 border-r-2 border-gray-600 overflow-hidden"
      pt:body:class="bg-gray-500/20 h-full"
      pt:body:style="--p-card-body-padding: 0.25rem 1rem"
      pt:caption:style="--p-card-caption-gap: 0rem"
    >
      <template #title>
        <div class="flex flex-row gap-2 items-center">
          <i
            :class="info.icon"
            class="text-base sm:text-lg"
          />
          <h1 class="text-sm sm:text-base">
            {{ info.title }}
          </h1>
        </div>
      </template>
      <template #subtitle>
        <span
          v-if="info.value"
          class="text-xs sm:text-sm"
        >{{ info.value }}</span>
      </template>
    </Card>
  </Panel>
</template>

<script setup lang="ts">
import type { IRoomAirConditioning } from '~/interfaces/RoomsIntefaces'

const props = defineProps<{
  roomParameters: {
    capacity: number
    size: string
    location: string
    access: string
    airConditioning: IRoomAirConditioning
    lighting: string
  }
}>()

const { t } = useI18n()

const Informations = [
  {
    title: t('common.roomParameters.capacity'),
    icon: 'pi pi-users',
    value: props.roomParameters.capacity + ' osób',
  },
  {
    title: t('common.roomParameters.size'),
    icon: 'pi pi-arrow-up-right-and-arrow-down-left-from-center',
    value: props.roomParameters.size + ' m²',
  },
  {
    title: t('common.roomParameters.location'),
    icon: 'pi pi-thumbtack',
    value: props.roomParameters.location,
  },
  {
    title: t('pages.roomDetails.detailedInfo.parameters.access'),
    icon: 'pi pi-id-card',
    value: props.roomParameters.access,
  },
  {
    title: t('pages.roomDetails.detailedInfo.parameters.airConditioning'),
    icon: 'pi pi-wrench',
    value: props.roomParameters.airConditioning ? `Min: ${props.roomParameters.airConditioning.min}°C, Max: ${props.roomParameters.airConditioning.max}°C` : 'Brak',
  },
  {
    title: t('pages.roomDetails.detailedInfo.parameters.lighting'),
    icon: 'pi pi-lightbulb',
    value: props.roomParameters.lighting || 'Brak',
  },
]

const isMobile = ref(false)

function checkIsMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobile)
})
</script>
