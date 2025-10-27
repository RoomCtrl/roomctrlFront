<template>
  <div class="flex flex-col justify-between ">
    <h3 class="text-center self-center text-2xl font-bold w-[50%]">
      {{ title }}
    </h3>
    <Carousel
      :value="rooms"
      :numVisible="1"
      :numScroll="1"
      po
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
