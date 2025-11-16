<template>
  <div class="flex items-center">
    <i class="pi pi-sun mr-2" />
    <ToggleSwitch
      v-model="isDarkMode"
      aria-label="Switch mode"
      class="mx-2"
    />
    <i class="pi pi-moon ml-2" />
  </div>
</template>

<script setup lang="ts">
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
