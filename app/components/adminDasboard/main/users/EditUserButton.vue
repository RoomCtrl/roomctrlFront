<template>
  <div>
    <Button
      v-tooltip.left="{ value: $t('pages.adminDashboard.users.buttons.tooltip.edit') }"
      pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
      severity="info"
      variant="outlined"
      icon="pi pi-user-edit"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      :header="$t('pages.adminDashboard.users.updateUser')"
      pt:title:class="text-3xl font-bold"
      modal
    >
      <FormsUserUpdateForm
        :userId="userId"
        @update-visible="onUpdate"
      />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  userId: string
}>()

const visible = ref(false)
const onUpdate = (updateVisible: boolean) => {
  visible.value = updateVisible
}
</script>
