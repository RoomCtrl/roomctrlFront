<template>
  <Card
    pt:body:class="flex justify-center px-2 py-1 h-full"
    pt:content:class="flex flex-row justify-between w-full h-full"
    pt:caption:class="gap-0"
    pt:title:class="font-bold text-2xl"
  >
    <template #title>
      {{ header }}
    </template>
    <template #subtitle>
      {{ $t('date.today') }}
    </template>
    <template #content>
      <div class="flex flex-row justify-between gap-2 items-center">
        <Knob
          v-model="valueProcentOfKnob"
          v-tooltip.bottom="tooltipKnob"
          readonly
          :size="90"
          :valueColor="color"
          valueTemplate="{value}%"
        />
        <div class="flex flex-col justify-center h-full">
          <div class="flex flex-row items-center gap-1">
            <h2 class="text-sm font-semibold">
              Ogolnie sal:
            </h2>
            <h3>
              50
            </h3>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row items-center gap-1">
              <h2 class="text-sm font-semibold">
                Zajetych:
              </h2>
              <h3>
                20
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
  header: string
  numOfRooms: number
  maxRooms: number
  color: string
}>()
const valueProcentOfKnob = ((props.numOfRooms / props.maxRooms) * 100)
const tooltipKnob = props.numOfRooms + '/' + props.maxRooms
</script>
