<template>
  <form @submit.prevent="submitForm">
    <div class="grid grid-cols-3 grid-rows-4 gap-x-2 py-[0.4rem]">
      <div class="w-[70vw] md:w-[23rem]">
        <CommonFormsTextField
          id="username"
          v-model="username"
          :label="$t('forms.fields.user.username')"
          icon="pi pi-user"
          :errorMessage="usernameError"
          @blur="usernameBlur"
        />
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <CommonFormsTextField
          id="firstName"
          v-model="firstName"
          :label="$t('forms.fields.user.firstName')"
          :errorMessage="firstNameError"
          @blur="firstNameBlur"
        />
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <CommonFormsTextField
          id="lastName"
          v-model="lastName"
          :label="$t('forms.fields.user.lastName')"
          :errorMessage="lastNameError"
          @blur="lastNameBlur"
        />
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <CommonFormsTextField
          id="email"
          v-model="email"
          :label="$t('forms.fields.email')"
          :errorMessage="emailError"
          icon="pi pi-at"
          @blur="emailBlur"
        />
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <CommonFormsTextField
          id="phone"
          v-model="phone"
          :label="$t('forms.fields.phone')"
          :errorMessage="phoneError"
          icon="pi pi-phone"
          @blur="phoneBlur"
        />
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <CommonFormsMultiSelectField
          id="roles"
          v-model="roles"
          :class="{ 'p-invalid': rolesError }"
          :options="listOfRoles"
          optionLabel="label"
          optionValue="code"
          :label="$t('forms.fields.user.roles')"
          filter
          icon="pi pi-users"
          @blur="rolesBlur"
        />
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <CommonFormsPasswordField
          id="password"
          v-model="password"
          :label="$t('forms.fields.user.password')"
          :errorMessage="passwordError"
          icon="pi pi-key"
          @blur="passwordBlur"
        />
      </div>
      <div class="flex justify-center pt-4 col-span-3">
        <Button
          type="submit"
          label="Dodaj"
          :loading="loading"
          class="w-[65vw] md:w-[15rem]"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { IUserAddResponse } from '~/interfaces/UsersInterfaces'

const emit = defineEmits(['updateVisible'])

const { addUser, error } = useUser()
const { user } = useAuth()
const { t } = useI18n()
const toast = useToast()
const { handleSubmit, resetForm } = useForm<IUserAddResponse>({
  validationSchema: {
    username: 'required|min:3',
    firstName: 'required|min:3',
    lastName: 'required|min:3',
    email: 'required|email',
    password: 'required',
    phone: 'required|phone',
    roles: 'required',
  },
})

const listOfRoles = ref([
  {
    label: t('pages.adminDashboard.users.roles.admin'),
    code: 'ROLE_ADMIN',
  },
  {
    label: t('pages.adminDashboard.users.roles.user'),
    code: 'ROLE_USER',
  },
])

const { value: username, errorMessage: usernameError, handleBlur: usernameBlur } = useField<string>('username')
const { value: firstName, errorMessage: firstNameError, handleBlur: firstNameBlur } = useField<string>('firstName')
const { value: lastName, errorMessage: lastNameError, handleBlur: lastNameBlur } = useField<string>('lastName')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')
const { value: phone, errorMessage: phoneError, handleBlur: phoneBlur } = useField<string>('phone')
const { value: roles, errorMessage: rolesError, handleBlur: rolesBlur } = useField<string[]>('roles')
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField<string>('password')

const loading = ref<boolean>(false)

const submitForm = handleSubmit(async (formValues: IUserAddResponse) => {
  try {
    formValues.organizationId = user.value?.organization.id
    formValues.firstLoginStatus = true
    await addUser(formValues)
    resetForm()
    toast.add({
      severity: 'success',
      summary: t('toast.success'),
      detail: t('pages.adminDashboard.users.toast.success'),
      life: 3000,
    })
    emit('updateVisible', false)
  }
  catch (err: any) {
    const errorMessage = error.value || err?.message || t('toast.error')
    toast.add({
      severity: 'error',
      summary: t('toast.summary.error'),
      detail: errorMessage,
      life: 5000,
    })
  }
})
</script>
