<template>
  <div
    v-tooltip.bottom="ratingHint"
    class="flex items-center gap-2"
  >
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
const props = defineProps<{
  max: number
  rateValue: number
}>()

const ratingHint = props.rateValue + '/5'
</script>

<style scoped>
.pi {
  font-size: 1.25rem
}
</style>
