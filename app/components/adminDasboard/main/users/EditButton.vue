<template>
  <div>
    <Button
      icon="pi pi-user-edit"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      :header="$t('pages.adminDashboard.users.updateUser')"
      pt:title:class="text-3xl font-bold"
    >
      <UpdateUserForms :userId="userId" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import UpdateUserForms from '~/components/forms/UpdateUserForms.vue'

defineProps<{
  userId: string
}>()

const visible = ref(false)
</script>
