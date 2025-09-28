<template>
  <div class="grid grid-cols-2 md:grid-cols-2 2xl:grid-cols-3 gap-8 py-[2vh] px-[2vw]">
    <div
      v-for="(room, index) in rooms"
      :key="room.room_number + '-' + index"
      class=" w-full"
    >
      <NuxtLink
        v-if="room.status != 'closed'"
        :to="'rooms/' + room.roomId"
      >
        <RoomCard :room="room" />
      </NuxtLink>
      <RoomCard
        v-else
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
