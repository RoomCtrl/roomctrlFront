<template>
  <div>
    <Button
      v-tooltip.left="{ value: $t('pages.adminDashboard.users.buttons.tooltip.edit') }"
      icon="pi pi-user-edit"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      :header="$t('pages.adminDashboard.users.updateUser')"
      pt:title:class="text-3xl font-bold"
      modal
    >
      <UpdateUserForms
        :userId="userId"
        @update-visible="onUpdate"
      />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import UpdateUserForms from '~/components/forms/UpdateUserForms.vue'

defineProps<{
  userId: string
}>()

const visible = ref(false)
const onUpdate = (updateVisible: boolean) => {
  visible.value = updateVisible
}
</script>
