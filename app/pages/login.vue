<template>
  <div class="flex justify-center pt-[4rem]">
    <Card pt:root:class="w-[90vw] md:w-[40vw]">
      <template #content>
        <BaseLogin />
      </template>
    </Card>
  </div>
</template>

<script setup>
import BaseLogin from '~/components/forms/baseLogin.vue'
</script>
