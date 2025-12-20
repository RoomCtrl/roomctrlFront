<template>
  <Button
    v-tooltip.left="{ value: $t('pages.adminDashboard.users.buttons.tooltip.delete') }"
    pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
    severity="error"
    variant="outlined"
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
const toast = useToast()
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
      try {
        await deleteUser(props.userId)
        toast.add({
          severity: 'success',
          summary: t('common.toast.success'),
          detail: t('common.toast.userDeleted'),
          life: 3000,
        })
      }
      catch (error) {
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: t('common.toast.userDeleteError'),
          life: 3000,
        })
      }
    },
  })
}
</script>
