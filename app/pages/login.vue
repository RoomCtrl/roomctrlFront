<template>
  <div class="flex justify-center items-center pt-[4rem] w-full">
    <Card pt:root:class="w-[90vw] lg:w-[40vw]">
      <template #content>
        <BaseLogin />
      </template>
    </Card>
  </div>
</template>

<script setup>
import BaseLogin from '~/components/forms/baseLogin.vue'
</script>
