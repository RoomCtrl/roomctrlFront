<template>
  <Button
    size="small"
    :icon="modeIcon"
    @click="isDarkMode = !isDarkMode"
  />
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

const modeIcon = computed(() => {
  return isDarkMode.value ? 'pi pi-moon' : 'pi pi-sun'
})
</script>
