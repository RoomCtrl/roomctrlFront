<template>
  <form @submit.prevent="submitForm">
    <div class="grid grid-cols-2 grid-rows-3 gap-2 py-[0.4rem]">
      <div class="w-[70vw] md:w-[23rem]">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText
              id="username"
              v-model="username"
              :class="{ 'p-invalid': usernameError }"
              type="text"
              @blur="usernameBlur"
            />
            <label for="username">{{ $t('forms.fields.username') }}</label>
          </FloatLabel>
        </InputGroup>
        <div class="min-h-[1.1rem] pt-1">
          <Message
            v-if="usernameError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ usernameError }}
          </Message>
        </div>
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText
              id="firstName"
              v-model="firstName"
              :class="{ 'p-invalid': firstNameError }"
              type="text"
              @blur="firstNameBlur"
            />
            <label for="firstName">{{ $t('forms.fields.firstName') }}</label>
          </FloatLabel>
        </InputGroup>
        <div class="min-h-[1.1rem] pt-1">
          <Message
            v-if="firstNameError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ firstNameError }}
          </Message>
        </div>
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText
              id="lastName"
              v-model="lastName"
              :class="{ 'p-invalid': lastNameError }"
              type="text"
              @blur="lastNameBlur"
            />
            <label for="lastName">{{ $t('forms.fields.lastName') }}</label>
          </FloatLabel>
        </InputGroup>
        <div class="min-h-[1.1rem] pt-1">
          <Message
            v-if="lastNameError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ lastNameError }}
          </Message>
        </div>
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-at" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText
              id="email"
              v-model="email"
              :class="{ 'p-invalid': emailError }"
              type="text"
              @blur="emailBlur"
            />
            <label for="email">{{ $t('forms.fields.email') }}</label>
          </FloatLabel>
        </InputGroup>
        <div class="min-h-[1.1rem] pt-1">
          <Message
            v-if="emailError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ emailError }}
          </Message>
        </div>
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-phone" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText
              id="phone"
              v-model="phone"
              :class="{ 'p-invalid': phoneError }"
              type="text"
              @blur="phoneBlur"
            />
            <label for="phone">{{ $t('forms.fields.phone') }}</label>
          </FloatLabel>
        </InputGroup>
        <div class="min-h-[1.1rem] pt-1">
          <Message
            v-if="phoneError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ phoneError }}
          </Message>
        </div>
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-users" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <MultiSelect
              id="roles"
              v-model="roles"
              :class="{ 'p-invalid': rolesError }"
              :options="listOfRoles"
              optionLabel="label"
              optionValue="code"
              filter
              @blur="rolesBlur"
            />
            <label for="roles">{{ $t('forms.fields.roles') }}</label>
          </FloatLabel>
        </InputGroup>
        <div class="min-h-[1.1rem] pt-1">
          <Message
            v-if="rolesError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ rolesError }}
          </Message>
        </div>
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
import type { IUserResponse } from '~/interfaces/UsersInterfaces'

const props = defineProps<{
  userId: string
}>()
const emit = defineEmits(['updateVisible'])
defineRule('required', required)

const toast = useToast()
const user = ref<IUserResponse>()
const { t } = useI18n()
const { updateUser, fetchUser } = useUser()
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
const { value: roles, errorMessage: rolesError, handleBlur: rolesBlur } = useField<string>('roles')

const loading = ref<boolean>(false)

const submitForm = handleSubmit(async (formValues: IAddUserForm) => {
  loading.value = true

  try {
    await updateUser(props.userId, formValues)
    resetForm()
  }
  finally {
    toast.add({
      severity: 'info',
      summary: t('common.toast.update'),
      detail: t('pages.adminDashboard.users.toast.update'),
      life: 3000 })
    emit('updateVisible', false)
    loading.value = false
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
