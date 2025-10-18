<template>
  <Button
    icon="pi pi-user-plus"
    label="Dodaj uzytkownika"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    modal
  >
    <AddUserFroms @update-visible="onAdd" />
  </Dialog>
</template>

<script setup lang="ts">
import AddUserFroms from '~/components/forms/AddUserFroms.vue'

const visible = ref(false)

const onAdd = (updateVisible: boolean) => {
  visible.value = updateVisible
}
</script>
