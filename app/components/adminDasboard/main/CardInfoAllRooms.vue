<template>
  <Card
    pt:root:style="--p-card-body-padding: 0.5rem; --p-card-caption-gap: 0"
    pt:body:class="flex justify-center h-full"
    pt:content:class="flex flex-row justify-between w-full h-full"
  >
    <template #title>
      <h1 class="font-bold text-2xl">
        {{ $t('pages.adminDashboard.dashboard.knob.' + statusType + '.title') }}
      </h1>
    </template>
    <template #subtitle>
      {{ $t('date.today') }}
    </template>
    <template #content>
      <div class="flex flex-row justify-between gap-2 items-center">
        <Knob
          v-model="valueProcentOfKnob"
          pt:text:class="font-semibold"
          readonly
          :size="90"
          :valueColor="knobColor"
          valueTemplate="{value}%"
        />
        <div class="flex flex-col justify-center h-full">
          <div class="flex flex-row items-center gap-1">
            <h2 class="text-sm font-semibold">
              {{ $t('pages.adminDashboard.dashboard.knob.generally') }}
            </h2>
            <h3>
              {{ maxRooms }}
            </h3>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row items-center gap-1">
              <h2 class="text-sm font-semibold">
                {{ $t('pages.adminDashboard.dashboard.knob.' + statusType + '.count') }}
              </h2>
              <h3>
                {{ numOfRooms }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
  numOfRooms: number
  maxRooms: number
  colorLight: string
  colorDark: string
  statusType: string
}>()

const valueProcentOfKnob = computed(() => {
  if (!props.maxRooms || props.maxRooms === 0) {
    return 0
  }
  return Math.round((props.numOfRooms / props.maxRooms) * 100)
})

const colorMode = useColorMode()

const isDarkMode = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  },
})

const knobColor = computed(() => {
  if (isDarkMode.value) {
    return props.colorDark
  }
  else {
    return props.colorLight
  }
})
</script>
