<template>
  <Button
    v-tooltip.left="{ value: $t('pages.adminDashboard.users.buttons.tooltip.delete') }"
    icon="pi pi-user-minus"
    @click="handleDeleteUser()"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  userId: string
}>()

const confirm = useConfirm()
const { t } = useI18n()
const { deleteUser } = useUser()

const handleDeleteUser = () => {
  confirm.require({
    message: t('pages.adminDashboard.users.deleteUser.title'),
    header: t('common.toast.danger'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('common.buttons.cancel'),
    rejectProps: {
      label: t('common.buttons.cancel'),
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: t('common.buttons.delete'),
      severity: 'danger',
    },
    accept: async () => {
      await deleteUser(props.userId)
    },
  })
}
</script>
