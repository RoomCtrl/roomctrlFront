<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-center self-center text-2xl font-bold w-full">
      {{ title }}
    </h3>
    <Carousel
      :value="rooms"
      :numVisible="1"
      :numScroll="1"
      circular
    >
      <template #item="slotProps">
        <RoomStatCard
          :room="slotProps.data"
          :rank="slotProps.index + 1"
        />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import RoomStatCard from './main/RoomStatCard.vue'

defineProps({
  rooms: Array,
  title: String,
})
</script>
