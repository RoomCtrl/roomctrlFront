<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Logowanie</h1>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">username:</label>
          <InputText
            id="username"
            v-model="credentials.username"
            type="username"
            required
            :disabled="loading"
            placeholder="wprowadź username"
          />
        </div>

        <div class="form-group">
          <label for="password">Hasło:</label>
          <InputText
            id="password"
            v-model="credentials.password"
            type="password"
            required
            :disabled="loading"
            placeholder="wprowadź hasło"
          />
        </div>

        <Button
          type="submit"
          :disabled="!isMounted || loading || !isFormValid"
          :class="{ loading: loading }"
        >
          {{ loading ? 'Logowanie...' : 'Zaloguj' }}
        </Button>

        <div
          v-if="error"
          class="error"
        >
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Button, InputText } from 'primevue'

// Zapobiegaj hydration podczas SSR
definePageMeta({
  middleware: 'guest',
})

const { login, isAuthenticated } = useAuth()

const credentials = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')
const isMounted = ref(false)

const isFormValid = computed(() => {
  return credentials.username && credentials.password
})

const handleLogin = async () => {
  if (!isFormValid.value) return

  loading.value = true
  error.value = ''

  try {
    const data = await login(credentials)
    if (data.user.firstLogonStatus == true) {
      await navigateTo('/contact')
    }
    else {
      await navigateTo('/')
    }
  }
  catch (err) {
    error.value = err.message
  }
  finally {
    loading.value = false
  }
}

// Obsługa mounted state dla hydration
onMounted(() => {
  isMounted.value = true
})

// Przekieruj jeśli już zalogowany (tylko po stronie klienta)
onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo('/')
  }
})
</script>
