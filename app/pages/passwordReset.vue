<template>
  <div class="flex justify-center items-center pt-[4rem] w-full">
    <Card pt:root:class="w-[90vw] lg:w-[40vw]">
      <template #content>
        <FormsPasswordResetForm />
      </template>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'guest',
})
</script>
