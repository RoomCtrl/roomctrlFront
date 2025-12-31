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
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
        @submit.prevent="onSubmit"
      >
        <div class="flex flex-col gap-2">
          <label
            for="organizationName"
            class="font-semibold"
          >
            {{ $t('pages.adminDashboard.settingsAdmin.sections.organization.name') }}
          </label>
          <InputText
            id="organizationName"
            v-model="name"
            :placeholder="$t('pages.adminDashboard.settingsAdmin.sections.organization.namePlaceholder')"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label
            for="email"
            class="font-semibold"
          >
            {{ $t('pages.adminDashboard.settingsAdmin.sections.organization.email') }}
          </label>
          <InputText
            id="email"
            v-model="email"
            type="email"
            :placeholder="$t('pages.adminDashboard.settingsAdmin.sections.organization.emailPlaceholder')"
          />
        </div>
        <div class="flex justify-end col-span-full">
          <Button
            type="submit"
            label="Zapisz zmiany"
            severity="success"
            icon="pi pi-check"
            class="mt-4"
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

const { handleSubmit, resetForm } = useForm<IOrganizationSettings>({
  validationSchema: {
    name: 'required',
    email: 'required',
  },
  initialValues: {
    name: user.value.organization.name,
    email: user.value.organization.email,
  },
})

const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField<string>('name')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')

const onSubmit = handleSubmit(async (formValues: IOrganizationSettings) => {
  await updateOrganization(user.value?.organization?.id, formValues)
  toast.add({ severity: 'success', summary: 'Success', detail: 'Organization data updated successfully' })
})
</script>
