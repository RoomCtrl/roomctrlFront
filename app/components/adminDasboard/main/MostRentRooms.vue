<template>
  <Card
    pt:root:class="h-full"
    pt:body:class="h-full px-0 py-2"
    pt:content:class="h-full flex flex-col gap-3"
  >
    <template #content>
      <div class="flex flex-row gap-2 justify-center">
        <Button
          size="small"
          raised
          class="bg-gray-800"
          variant="text"
          label="Najczesciej wybierane"
        />
        <Button
          size="small"
          raised
          class="bg-gray-800"
          variant="text"
          label="Najrzadziej wybierane"
        />
      </div>
      <h1 class="text-center font-semibold text-xl">
        Top 5 najczęściej wybierane sale:
      </h1>
      <Carousel
        :value="rooms"
        :numVisible="1"
        :numScroll="1"
        circular
      >
        <template #item="{ data }">
          <div class="flex flex-col border-4 rounded-lg mx-2 p-1">
            <h1 class="font-semibold text-xl">
              {{ data.roomName }}
            </h1>
            <h2>
              {{ 'Tygodniowo rezerwacji: ' + data.weeklyBookings }}
            </h2>
            <h2>
              {{ 'Miesiecznie rezerwacji: ' + data.monthlyBookings }}
            </h2>
            <h2>
              Ocena uzytkownikow: 2/10
            </h2>
          </div>
        </template>
      </Carousel>
    </template>
  </Card>
</template>

<script setup lang="ts">
const rooms = [
  { roomId: 1, roomName: 'Sala nr 208', weeklyBookings: 5, monthlyBookings: 18 },
  { roomId: 2, roomName: 'Sala B', weeklyBookings: 3, monthlyBookings: 12 },
  { roomId: 3, roomName: 'Sala C', weeklyBookings: 8, monthlyBookings: 25 },
  { roomId: 4, roomName: 'Sala D', weeklyBookings: 2, monthlyBookings: 9 },
  { roomId: 5, roomName: 'Sala E', weeklyBookings: 6, monthlyBookings: 22 },
]
</script>
