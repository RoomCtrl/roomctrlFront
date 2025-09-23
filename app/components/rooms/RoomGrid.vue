<template>
  <div class="w-full flex items-center py-[1vh] px-[2vw]">
    <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 w-full">
      <RoomCard
        v-for="(room, index) in rooms"
        :key="room.room_number + '-' + index"
        :room="room"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RoomCard from './RoomCard.vue'

defineProps({
  rooms: Object,
})
</script>
