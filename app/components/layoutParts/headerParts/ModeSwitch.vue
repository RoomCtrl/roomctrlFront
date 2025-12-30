<template>
  <div class="flex items-center">
    <i
      v-if="withIcon"
      class="pi pi-sun mr-2"
    />
    <ToggleSwitch
      v-model="isDarkMode"
      :class="{ withIcon: 'mx-2' }"
    />
    <i
      v-if="withIcon"
      class="pi pi-moon ml-2"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  withIcon?: boolean
}>()
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
