<template>
  <Card
    pt:body:class="flex justify-center items-center px-2 py-0 h-full"
    pt:title:class="text-center"
  >
    <template #title>
      {{ header }}
    </template>
    <template #content>
      <div class="flex flex-row gap-2 items-center">
        <Knob
          v-model="valueProcentOfKnob"
          v-tooltip.bottom="tooltipKnob"
          readonly
          :size="90"
          :valueColor="color"
          valueTemplate="{value}%"
        />
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
