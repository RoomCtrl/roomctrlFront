<template>
  <Panel
    :header="t('pages.roomDetails.detailedInfo.title')"
    pt:content:class="grid sm:max-lg:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 w-[95%] self-center"
    pt:header:class="text-2xl 2xl:text-3xl font-semibold mb-3"
    :toggleable="isMobile"
  >
    <Card
      v-for="info in Informations"
      :key="info.title"
      pt:root:class="border-l-8 border-y-2 border-r-2 border-blue-900/80 overflow-hidden"
      pt:body:class="bg-sky-500/10 h-full"
      pt:body:style="--p-card-body-padding: 0.25rem 1rem"
      pt:caption:style="--p-card-caption-gap: 0rem"
    >
      <template #title>
        <div class="flex flex-row gap-2 items-center">
          <i
            :class="info.icon"
            style="font-size: 1.2rem"
          />
          <h1>
            {{ info.title }}
          </h1>
        </div>
      </template>
      <template #subtitle>
        {{ info.value }}
      </template>
    </Card>
  </Panel>
</template>

<script setup lang="ts">
const props = defineProps<{
  roomParameters: {
    capacity: number
    size: string
    location: string
    access: string
    airConditioning: string
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
    value: props.roomParameters.size,
  },
  {
    title: t('common.roomParameters.location'),
    icon: 'pi pi-thumbtack',
    value: props.roomParameters.location,
  },
  {
    title: t('pages.roomDetails.detailedInfo.parameters.access'),
    icon: 'pi pi-id-card',
    value: t('pages.roomDetails.detailedInfo.accessMethod.' + props.roomParameters.access),
  },
  {
    title: t('pages.roomDetails.detailedInfo.parameters.airConditioning'),
    icon: 'pi pi-wrench',
    value: props.roomParameters.airConditioning,
  },
  {
    title: t('pages.roomDetails.detailedInfo.parameters.lighting'),
    icon: 'pi pi-lightbulb',
    value: props.roomParameters.lighting,
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
