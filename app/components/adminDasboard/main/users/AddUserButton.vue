<template>
  <Button
    severity="success"
    variant="outlined"
    icon="pi pi-user-plus"
    :label="$t('pages.adminDashboard.users.buttons.add')"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    :header="$t('pages.adminDashboard.users.addUser')"
    modal
    pt:title:class="text-3xl font-bold"
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
