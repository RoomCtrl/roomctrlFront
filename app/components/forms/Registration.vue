<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col gap-8 items-center">
      <h1 class="text-3xl font-bold pt-[3vh]">
        Rejestracja
      </h1>

      <div class="flex flex-col gap-4">
        <div class="title">
          <i class="pi pi-building" />
          <h2>
            Organizacja
          </h2>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <BaseTextInput
            v-model="regon"
            name="regon"
            label="regon"
            :error="regonError"
            @blur="regonBlur"
          />
          <BaseTextInput
            v-model="name"
            name="name"
            label="name"
            :error="nameError"
            @blur="nameBlur"
          />
          <BaseTextInput
            v-model="orgEmail"
            name="orgEmail"
            label="orgEmail"
            :error="orgEmailError"
            @blur="orgEmailBlur"
          />
        </div>

        <div class="title">
          <i class="pi pi-user" />
          <h2>
            Uzytkownik
          </h2>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <BaseTextInput
            v-model="username"
            name="username"
            label="username"
            :error="usernameError"
            @blur="usernameBlur"
          />
          <BaseTextInput
            v-model="firstName"
            name="firstName"
            label="firstName"
            :error="firstNameError"
            @blur="firstNameBlur"
          />
          <BaseTextInput
            v-model="lastName"
            name="lastName"
            label="lastName"
            :error="lastNameError"
            @blur="lastNameBlur"
          />
          <BaseTextInput
            v-model="userEmail"
            name="userEmail"
            label="userEmail"
            :error="userEmailError"
            @blur="userEmailBlur"
          />
        </div>
      </div>

      <Button
        type="submit"
        :label="$t('common.buttons.logIn')"
        :loading="loading"
        class="w-[65vw] md:w-[15rem]"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import BaseTextInput from '../common/forms/BaseTextInput.vue'

defineRule('required', required)

interface ILoginUser {
  username: string
  password: string
}

const { isAdmin, login, isAuthenticated } = useAuth()

const { handleSubmit, resetForm } = useForm<ILoginUser>({
  validationSchema: {
    regon: 'required',
    name: 'required',
    orgEmail: 'required|email',
    username: 'required',
    firstName: 'required',
    lastName: 'required',
    userEmail: 'required|email',
  },
})

const { value: regon, errorMessage: regonError, handleBlur: regonBlur } = useField<string>('regon')
const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField<string>('name')
const { value: orgEmail, errorMessage: orgEmailError, handleBlur: orgEmailBlur } = useField<string>('orgEmail')
const { value: username, errorMessage: usernameError, handleBlur: usernameBlur } = useField<string>('username')
const { value: firstName, errorMessage: firstNameError, handleBlur: firstNameBlur } = useField<string>('firstName')
const { value: lastName, errorMessage: lastNameError, handleBlur: lastNameBlur } = useField<string>('lastName')
const { value: userEmail, errorMessage: userEmailError, handleBlur: userEmailBlur } = useField<string>('userEmail')

const loading = ref<boolean>(false)
const isMounted = ref<boolean>(false)

const submitForm = handleSubmit(async (formValues: ILoginUser) => {
  loading.value = true

  try {
    await login(formValues)
    resetForm()
    if (isAdmin.value) {
      await navigateTo('panelSelector')
    }
    else {
      await navigateTo('rooms')
    }
  }
  catch {
    password.value = ''
  }
  finally {
    loading.value = false
  }
})

onMounted(() => {
  isMounted.value = true

  if (import.meta.client && isAuthenticated.value) {
    navigateTo('/')
  }
})
</script>

<style scoped>
h2 {
  @apply text-xl font-semibold
}
.title {
  @apply flex gap-1 items-center
}
</style>
