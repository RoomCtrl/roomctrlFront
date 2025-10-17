<template>
  <Card>
    <template #title>
      <Carousel
        :value="rooms"
        :numVisible="1"
        :numScroll="1"
      >
        <template #item="{ data }">
          <div class="flex flex-col border-2">
            {{ data.roomName }}
            <h1>
              {{ 'Tygodniowo rezerwacji: ' + data.weeklyBookings }}
            </h1>
            <h1>
              {{ 'Miesiecznie rezerwacji: ' + data.monthlyBookings }}
            </h1>
          </div>
        </template>
      </Carousel>
    </template>
  </Card>
</template>

<script setup lang="ts">
const rooms = [
  { roomId: 1, roomName: 'Sala A', weeklyBookings: 5, monthlyBookings: 18 },
  { roomId: 2, roomName: 'Sala B', weeklyBookings: 3, monthlyBookings: 12 },
  { roomId: 3, roomName: 'Sala C', weeklyBookings: 8, monthlyBookings: 25 },
  { roomId: 4, roomName: 'Sala D', weeklyBookings: 2, monthlyBookings: 9 },
  { roomId: 5, roomName: 'Sala E', weeklyBookings: 6, monthlyBookings: 22 },
]
</script>
