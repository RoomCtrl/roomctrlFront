<template>
  <Card pt:body:class="p-0">
    <template #title>
      szybkie akcje
    </template>
    <template #content>
      <div class="flex flex-col gap-1">
        <Button
          v-for="button in buttons"
          :key="button.label"
          :label="button.label"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
const buttons = ref([
  {
    label: 'Dodaj rezerwacje',
  },
  {
    label: 'Dodaj sale',
  },
  {
    label: 'Dodaj uzytkownika',
  },
])
</script>
