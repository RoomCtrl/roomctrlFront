<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col gap-8 items-center">
      <div class="grid grid-cols-2 grid-rows-3 gap-2">
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
              <label for="firstName">Imię</label>
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
              <label for="lastName">Nazwisko</label>
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
              <i class="pi pi-user" />
            </InputGroupAddon>
            <FloatLabel variant="on">
              <MultiSelect
                id="roles"
                v-model="roles"
                :class="{ 'p-invalid': rolesError }"
                :options="listOfRoles"
                @blur="rolesBlur"
              />
              <label for="roles">Rola</label>
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
                id="username"
                v-model="username"
                :class="{ 'p-invalid': usernameError }"
                type="text"
                @blur="usernameBlur"
              />
              <label for="username">{{ $t('forms.fields.login') }}</label>
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
            v-if="passwordError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ passwordError }}
          </Message>
        </div>
      </div>

      <Button
        type="submit"
        label="Dodaj"
        :loading="loading"
        class="w-[65vw] md:w-[15rem]"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import type { IAddUserForm } from '~/interfaces/FormInterfaces'

const emit = defineEmits(['updateVisible'])

defineRule('required', required)

const { addUser } = useUser()
const { handleSubmit, resetForm } = useForm<IAddUserForm>({
  validationSchema: {
    username: 'required|min:3',
    firstName: 'min:3',
    lastName: 'min:3',
    password: 'required',
    roles: 'required',
  },
})

const listOfRoles = ref([
  'ROLE_ADMIN',
  'ROLE_USER',
])

const { value: username, errorMessage: usernameError, handleBlur: usernameBlur } = useField<string>('username')
const { value: firstName, errorMessage: firstNameError, handleBlur: firstNameBlur } = useField<string>('firstName')
const { value: lastName, errorMessage: lastNameError, handleBlur: lastNameBlur } = useField<string>('lastName')
const { value: roles, errorMessage: rolesError, handleBlur: rolesBlur } = useField<string>('roles')
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField<string>('password')

const loading = ref<boolean>(false)

const submitForm = handleSubmit(async (formValues: IAddUserForm) => {
  loading.value = true

  try {
    formValues.organizationId = 1
    formValues.firstLoginStatus = true
    formValues.contactDetail = {
      streetName: 'Main Street',
      streetNumber: '123',
      flatNumber: '4A',
      postCode: '00-001',
      city: 'Warsaw',
      email: 'john.doe@example.com',
      phone: '+48123456789',
    }
    console.log(formValues)
    addUser(formValues)
    resetForm()
  }
  catch {
    console.log('test')
  }
  finally {
    emit('updateVisible', false)
    loading.value = false
  }
})
</script>
