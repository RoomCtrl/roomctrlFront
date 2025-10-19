<template>
  <form @submit.prevent="submitForm">
    <div class="grid grid-cols-2 grid-rows-4 gap-2 py-[0.4rem]">
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
        <Message
          v-if="usernameError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ usernameError }}
        </Message>
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
              @blur="rolesBlur"
            />
            <label for="roles">{{ $t('forms.fields.roles') }}</label>
          </FloatLabel>
        </InputGroup>
        <Message
          v-if="rolesError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ rolesError }}
        </Message>
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
        <Message
          v-if="firstNameError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ firstNameError }}
        </Message>
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
        <Message
          v-if="lastNameError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ lastNameError }}
        </Message>
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
        <Message
          v-if="emailError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ emailError }}
        </Message>
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
        <Message
          v-if="phoneError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ phoneError }}
        </Message>
      </div>

      <div class="w-[70vw] md:w-[23rem]">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-key" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <Password
              id="password"
              v-model="password"
              :class="{ 'p-invalid': passwordError }"
              type="password"
              toggleMask
              fluid
              :feedback="false"
              @blur="passwordBlur"
            />
            <label for="password">{{ $t('forms.fields.password') }}</label>
          </FloatLabel>
        </InputGroup>
        <Message
          severity="error"
          size="small"
          variant="simple"
        >
          {{ passwordError }}
        </Message>
      </div>
      <div class="col-span-2">
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
import { useForm, useField, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import type { IUserAddResponse } from '~/interfaces/UsersInterfaces'

const emit = defineEmits(['updateVisible'])

defineRule('required', required)

const { addUser } = useUser()
const { t } = useI18n()
const { handleSubmit, resetForm } = useForm<IUserAddResponse>({
  validationSchema: {
    username: 'required|min:3',
    firstName: 'min:3',
    lastName: 'min:3',
    password: 'required',
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
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField<string>('password')

const loading = ref<boolean>(false)

const submitForm = handleSubmit(async (formValues: IUserAddResponse) => {
  loading.value = true

  try {
    formValues.organizationId = '0199f775-e375-7018-abeb-b535b507472d'
    formValues.firstLoginStatus = true
    addUser(formValues)
    resetForm()
  }
  finally {
    emit('updateVisible', false)
    loading.value = false
  }
})
</script>
