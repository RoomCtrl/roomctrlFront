<template>
  <div class="flex items-center gap-2">
    <span
      v-for="i in max"
      :key="i"
    >
      <i
        v-if="i <= rateValue"
        class="pi pi-star-fill text-[#D74141]"
      />
      <i
        v-else
        class="pi pi-star text-gray-400"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  max: number
  rateValue: number
}>()
</script>

<style scoped>
.pi {
  font-size: 1.25rem
}
</style>
