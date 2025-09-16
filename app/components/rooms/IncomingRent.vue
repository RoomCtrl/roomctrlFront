<template>
  <div class="flex flex-col justify-between gap-1">
    <div class="flex flex-row justify-between items-center">
      <h1
        class="font-medium lg:font-semibold lg:text-lg"
      >
        Nadchodzące:
      </h1>
      <StatusBadge
        :color="color"
        :started-at="startedAt"
        :ended-at="endedAt"
      />
    </div>
    <h2 v-if="!title">
      Brak nadchodzących rezerwacji
    </h2>
    <h2
      v-else
      class="truncate"
    >
      {{ isPrivate ? 'Prywatna rezerwacja' : title }}
    </h2>
    <div
      v-if="startedAt && endedAt"
      class="flex flex-row gap-2 self-start"
    />
  </div>
</template>

<script setup lang="ts">
import StatusBadge from './RentBadge.vue'

defineProps<{
  title?: string
  startedAt?: string
  endedAt?: string
  color: string
  isPrivate?: boolean
}>()
</script>

<style scoped>
h2 {
  font-size: 1.125rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
