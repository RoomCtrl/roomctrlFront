<template>
  <div class="min-h-[70vh] w-full">
    <RentHistoryTabs />
  </div>
  <ConfirmDialog />
  <Toast />
</template>

<script setup lang="ts">
import RentHistoryTabs from '~/components/reservations/RentHistoryTabs.vue'

definePageMeta({
  middleware: 'auth',
})
</script>
