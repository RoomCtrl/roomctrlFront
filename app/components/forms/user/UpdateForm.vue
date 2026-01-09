<template>
  <form @submit.prevent="submitForm">
    <div class="grid grid-cols-2 grid-rows-3 gap-x-2 py-[0.4rem]">
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
          :label="$t('forms.fields.user.roles')"
          :errorMessage="rolesError"
          :options="listOfRoles"
          optionLabel="label"
          optionValue="code"
          icon="pi pi-users"
          @blur="rolesBlur"
        />
      </div>

      <div class="flex justify-center pt-4 col-span-3">
        <Button
          type="submit"
          :label="$t('pages.adminDashboard.users.buttons.update')"
          :loading="loading"
          class="w-[65vw] md:w-[15rem]"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import type { IUserAddResponse } from '~/interfaces/UsersInterfaces'

const props = defineProps<{
  userId: string
}>()
const emit = defineEmits(['updateVisible'])
defineRule('required', required)

const toast = useToast()
const user = ref<IUserAddResponse>()
const { t } = useI18n()
const { updateUser, fetchUser, error } = useUser()
const { handleSubmit, resetForm } = useForm<IAddUserForm>({
  validationSchema: {
    username: 'required|min:3',
    firstName: 'min:3',
    lastName: 'min:3',
    email: 'email',
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

const loading = ref<boolean>(false)

const submitForm = handleSubmit(async (formValues: IAddUserForm) => {
  try {
    await updateUser(props.userId, formValues)
    resetForm()
    toast.add({
      severity: 'info',
      summary: t('common.toast.update'),
      detail: t('pages.adminDashboard.users.toast.update'),
      life: 3000 })
    emit('updateVisible', false)
  }
  catch (err: any) {
    console.log(error.value)
    const errorMessage = error.value || err?.message || t('toast.error')
    toast.add({
      severity: 'error',
      summary: t('toast.summary.error'),
      detail: errorMessage,
      life: 5000,
    })
  }
})

onMounted(async () => {
  user.value = await fetchUser(props.userId, false)

  username.value = user.value.username
  firstName.value = user.value.firstName
  lastName.value = user.value.lastName
  email.value = user.value.email
  phone.value = user.value.phone
  roles.value = user.value.roles
})
</script>
