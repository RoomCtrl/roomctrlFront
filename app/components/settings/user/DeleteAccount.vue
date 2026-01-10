<template>
  <Card>
    <template #title>
      <h2 class="text-xl font-semibold text-red-600 dark:text-red-400">
        {{ $t('pages.settings.deleteAccount.title') }}
      </h2>
    </template>
    <template #content>
      <div class="space-y-4">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="pi pi-exclamation-triangle text-red-600 dark:text-red-400 text-xl" />
            <div>
              <h3 class="font-semibold text-red-900 dark:text-red-100 mb-2">
                {{ $t('pages.settings.deleteAccount.warning') }}
              </h3>
              <p class="text-sm text-red-800 dark:text-red-200">
                {{ $t('pages.settings.deleteAccount.description') }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <Button
            :label="$t('pages.settings.deleteAccount.button')"
            severity="danger"
            icon="pi pi-trash"
            :loading="loading"
            @click="handleDeleteAccount"
          />
        </div>
      </div>
    </template>
  </Card>
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useAuth } from '~/composables/useAuth'
import { useUser } from '~/composables/useUser'

const { t } = useI18n()
const confirm = useConfirm()
const toast = useToast()
const { user, logout } = useAuth()
const { deleteUser } = useUser()
const loading = ref(false)
const router = useRouter()

const handleDeleteAccount = () => {
  confirm.require({
    message: t('pages.settings.deleteAccount.confirmMessage'),
    header: t('pages.settings.deleteAccount.confirmHeader'),
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: t('common.buttons.cancel'),
    acceptLabel: t('common.buttons.delete'),
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
      if (!user.value?.id) {
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: t('pages.settings.deleteAccount.errorNoUser'),
          life: 3000,
        })
        return
      }

      loading.value = true
      try {
        await deleteUser(user.value.id)
        toast.add({
          severity: 'success',
          summary: t('common.toast.success'),
          detail: t('pages.settings.deleteAccount.success'),
          life: 3000,
        })

        // Wyloguj użytkownika i przekieruj na stronę główną
        setTimeout(async () => {
          await logout()
          router.push('/')
        }, 1000)
      }
      catch (err) {
        console.error('Error deleting account:', err)
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: t('pages.settings.deleteAccount.error'),
          life: 3000,
        })
      }
      finally {
        loading.value = false
      }
    },
  })
}
</script>
