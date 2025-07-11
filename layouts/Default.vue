<template>
  <div class="relative flex flex-col">
    <div class="fixed w-full z-10 bg-white shadow-xl">
      <MainHeader />
    </div>

    <div class="pt-[9vh] min-h-[79vh] justify-center">
      <slot class="flex-none" />
    </div>

    <div>
      <div class="mt-[4vh] w-full pt-[2vh] bg-[#1B2532]">
        <MainFooter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainFooter from '../components/layoutParts/MainFooter.vue'
import MainHeader from '../components/layoutParts/MainHeader.vue'
</script>
