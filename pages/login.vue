<template>
  <div class="flex justify-center pt-[20vh]">
    <Card class="w-[90vw] md:w-[40vw]">
      <template #content>
        <BaseLogin />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { Card } from 'primevue'
import BaseLogin from '~/components/forms/baseLogin.vue'
</script>
