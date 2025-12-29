<template>
  <Card
    class="h-full"
    pt:root:class="h-full flex flex-col"
    pt:body:class="flex-1 p-0 overflow-hidden"
  >
    <template #content>
      <div class="flex flex-col items-center justify-center h-full p-2 gap-1.5">
        <div class="flex-shrink-0">
          <Knob
            v-model="valueProcentOfKnob"
            pt:text:class="font-bold text-lg"
            readonly
            :strokeWidth="6"
            :valueColor="knobColor"
            valueTemplate="{value}%"
          />
        </div>
        <div class="text-center flex-shrink-0">
          <h1 class="font-bold text-sm mb-0.5 line-clamp-2">
            {{ $t('pages.adminDashboard.dashboard.knob.' + statusType + '.title') }}
          </h1>
          <div class="flex items-center justify-center gap-1.5">
            <span
              class="text-xl font-bold"
              :style="{ color: knobColor }"
            >
              {{ numOfRooms }}
            </span>
            <span class="text-xs text-surface-500 dark:text-surface-400">
              / {{ maxRooms }}
            </span>
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
