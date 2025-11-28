<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col gap-8 items-center">
      <h1 class="text-3xl font-bold pt-[3vh]">
        {{ $t('forms.titles.loginForm') }}
      </h1>

      <div class="flex flex-col gap-4">
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
                autofocus
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
