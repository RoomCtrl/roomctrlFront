<template>
  <div class="min-h-[70vh]">
    <RentHistoryTabs />
  </div>
</template>

<script setup lang="ts">
import RentHistoryTabs from '~/components/reservations/RentHistoryTabs.vue'

definePageMeta({
  middleware: 'auth',
})
</script>
