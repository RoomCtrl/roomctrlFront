<template>
  <div class="py-[2vh] px-[1vw] w-full">
    <div
      v-if="rooms.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:grid-rows-3 gap-8 "
    >
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
    <div
      v-else
      class="flex justify-center items-center font-bold text-2xl h-[35rem]"
    >
      Nie znaleziono sal
    </div>
  </div>
</template>

<script setup lang="ts">
import RoomCard from './RoomCard.vue'

defineProps({
  rooms: Object,
})
</script>
