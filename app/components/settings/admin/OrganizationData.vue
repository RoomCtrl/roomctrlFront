<template>
  <Card>
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-building" />
        {{ $t('pages.adminDashboard.settingsAdmin.sections.organization.title') }}
      </div>
    </template>
    <template #content>
      <form
        class="grid grid-cols-1 md:grid-cols-2 gap-x-4 pt-4"
        @submit.prevent="onSubmit"
      >
        <CommonFormsTextField
          id="organizationName"
          v-model="name"
          :label="$t('pages.adminDashboard.settingsAdmin.sections.organization.name')"
          :errorMessage="nameError"
          @blur="nameBlur"
        />

        <div class="flex flex-col gap-2">
          <CommonFormsTextField
            id="organizationEmail"
            v-model="email"
            :label="$t('pages.adminDashboard.settingsAdmin.sections.organization.email')"
            :errorMessage="emailError"
            @blur="emailBlur"
          />
        </div>
        <div class="flex justify-end col-span-full">
          <Button
            type="submit"
            :label="$t('forms.submit.saveChanges')"
            severity="success"
            icon="pi pi-check"
          />
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

const { user } = useAuth()
interface IOrganizationSettings {
  regon: string
  name: string
  email: string
}
const { updateOrganization } = useUser()
const toast = useToast()
const { t } = useI18n()

const { handleSubmit, resetForm } = useForm<IOrganizationSettings>({
  validationSchema: {
    name: 'required',
    email: 'required',
  },
})

const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField<string>('name')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')

const onSubmit = handleSubmit(async (formValues: IOrganizationSettings) => {
  await updateOrganization(user.value?.organization?.id, formValues)
  toast.add({
    severity: 'success',
    summary: t('toast.summary.success'),
    detail: t('toast.details.organizationDataUpdated'),
  })
  resetForm({
    values: formValues,
  })
})

onMounted(() => {
  resetForm({
    values: {
      name: user.value.organization.name,
      email: user.value.organization.email,
    },
  })
})
</script>
