<template>
  <div class="flex justify-center shadow-lg mx-[-2rem]">
    <Galleria
      :value="images"
      :show-thumbnails="false"
      :circular="true"
      :auto-play="true"
      :transition-interval="4500"
      :num-visible="1"
    >
      <template #item="slotProps">
        <div class="relative h-[20vh] md:h-[25rem] object-fill">
          <img :src="'/images/mainPage/' + slotProps.item" />

          <div class="absolute inset-0 flex items-center justify-center px-4">
            <div class="backdrop-blur bg-black/30 rounded-lg px-4 py-3 text-center max-w-full">
              <div class="text-white text-3xl sm:text-5xl md:text-7xl font-bold leading-tight cursor-default">
                {{ $t('common.roomCtrl') }}
              </div>
              <div class="text-white text-sm sm:text-base md:text-xl mt-2 cursor-default">
                {{ $t('pages.home.carousel.subTitle') }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </Galleria>
  </div>
</template>

<script setup lang="ts">
const images = [
  'meeting.jpg',
  'planning.jpg',
  'school.jpg',
]
</script>
