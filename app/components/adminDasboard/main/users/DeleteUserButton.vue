<template>
  <Button
    v-tooltip.left="{ value: $t('pages.adminDashboard.users.buttons.tooltip.delete'), disabled: user.id === userId }"
    pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
    severity="danger"
    :disabled="user.id === userId"
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
const { user } = useAuth()
const { deleteUser } = useUser()

const handleDeleteUser = () => {
  confirm.require({
    message: t('pages.adminDashboard.users.deleteUser.title'),
    header: t('common.toast.danger'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('common.buttons.cancel'),
    rejectProps: {
      label: t('common.buttons.cancel'),
      severity: 'contrast',
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
          summary: t('toast.summary.success'),
          detail: t('common.toast.userDeleted'),
          life: 3000,
        })
      }
      catch (err) {
        toast.add({
          severity: 'error',
          summary: t('toast.summary.error'),
          detail: t('common.toast.userDeleteError'),
          life: 3000,
        })
      }
    },
  })
}
</script>
