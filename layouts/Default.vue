<template>
  <div
    class="relative flex flex-col"
  >
    <div class="p-header fixed w-full z-10 bg-white shadow-xl">
      <MainHeader :dark-mode="isDarkMode" />
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

const colorMode = useColorMode()

const isDarkMode = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  },
})
</script>

<style scoped>
.dark .p-header {
background-color: #1B2532;
}
</style>
