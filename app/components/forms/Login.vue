<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col gap-8 items-center">
      <h1 class="text-3xl font-bold pt-[3vh]">
        {{ $t('forms.titles.loginForm') }}
      </h1>

      <div class="flex flex-col gap-4">
        <div class="w-[70vw] md:w-[23rem]">
          <FormTextField
            id="username"
            v-model="username"
            :label="$t('forms.fields.user.login')"
            :error-message="usernameError"
            icon="pi pi-user"
            autofocus
            @blur="usernameBlur"
          />
        </div>

        <FormPasswordField
          id="password"
          v-model="password"
          :label="$t('forms.fields.user.password')"
          :error-message="passwordError"
          @blur="passwordBlur"
        />
      </div>

      <div class="flex flex-col gap-3 text-center">
        <Button
          type="submit"
          :label="$t('common.buttons.logIn')"
          :loading="loading"
          class="w-[65vw] md:w-[15rem]"
        />
        <NuxtLink
          to="/passwordReset"
          class="hover:underline"
        >
          {{ $t('common.buttons.forgotPassword') }}
        </NuxtLink>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import FormTextField from '../common/FormTextField.vue'
import FormPasswordField from '../common/FormPasswordField.vue'

defineRule('required', required)

interface ILoginUser {
  username: string
  password: string
}

const { isAdmin, login, isAuthenticated } = useAuth()

const { handleSubmit, resetForm } = useForm<ILoginUser>({
  validationSchema: {
    username: 'required',
    password: 'required',
  },
})

const { value: username, errorMessage: usernameError, handleBlur: usernameBlur } = useField<string>('username')
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField<string>('password')

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
