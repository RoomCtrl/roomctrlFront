<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col items-center">
      <h1 class="text-start w-full text-3xl font-bold pt-[3vh] pl-20">
        Rejestracja
      </h1>

      <div class="flex flex-col gap-4">
        <div class="section-title">
          <i class="pi pi-building" />
          <h2>Dane organizacji</h2>
        </div>

        <div class="flex flex-wrap gap-4">
          <div class="w-[70vw] md:w-[23rem]">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-hashtag" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText
                  id="regon"
                  v-model="regon"
                  :class="{ 'p-invalid': regonError }"
                  @blur="regonBlur"
                />
                <label for="regon">REGON</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="regonError"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ regonError }}
            </Message>
          </div>

          <div class="w-[70vw] md:w-[23rem]">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-building" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText
                  id="organizationName"
                  v-model="organizationName"
                  :class="{ 'p-invalid': organizationNameError }"
                  @blur="organizationNameBlur"
                />
                <label for="organizationName">Nazwa organizacji</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="organizationNameError"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ organizationNameError }}
            </Message>
          </div>

          <div class="w-[70vw] md:w-[23rem]">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-envelope" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText
                  id="organizationEmail"
                  v-model="organizationEmail"
                  type="email"
                  :class="{ 'p-invalid': organizationEmailError }"
                  @blur="organizationEmailBlur"
                />
                <label for="organizationEmail">Email organizacji</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="organizationEmailError"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ organizationEmailError }}
            </Message>
          </div>
        </div>

        <div class="section-title">
          <i class="pi pi-user" />
          <h2>Dane użytkownika</h2>
        </div>

        <div class="grid grid-cols-3 grid-rows-3 gap-y-4">
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
                  @blur="usernameBlur"
                />
                <label for="username">Nazwa użytkownika</label>
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
                <i class="pi pi-id-card" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText
                  id="firstName"
                  v-model="firstName"
                  :class="{ 'p-invalid': firstNameError }"
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
                <i class="pi pi-id-card" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText
                  id="lastName"
                  v-model="lastName"
                  :class="{ 'p-invalid': lastNameError }"
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
                <i class="pi pi-at" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText
                  id="email"
                  v-model="email"
                  type="email"
                  :class="{ 'p-invalid': emailError }"
                  @blur="emailBlur"
                />
                <label for="email">Email</label>
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
                  @blur="phoneBlur"
                />
                <label for="phone">Telefon</label>
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

          <div class="w-[70vw] md:w-[23rem] row-start-3">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-key" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <Password
                  id="password"
                  v-model="password"
                  :class="{ 'p-invalid': passwordError }"
                  toggleMask
                  fluid
                  :feedback="true"
                  @blur="passwordBlur"
                />
                <label for="password">Hasło</label>
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
      </div>

      <Button
        type="submit"
        label="Zarejestruj się"
        :loading="loading"
        class="w-[65vw] md:w-[15rem]"
      />
    </div>
  </form>
  <Toast />
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { useToast } from 'primevue/usetoast'
import { AuthRepository } from '~/repositories/AuthRepository'
import type { IRegisterRequest } from '~/interfaces/RepositoriesInterface'

const toast = useToast()
const authRepository = new AuthRepository()

const { handleSubmit, resetForm } = useForm<IRegisterRequest>({
  validationSchema: {
    regon: 'required|min:9',
    organizationName: 'required|min:3',
    organizationEmail: 'required|email',
    username: 'required|min:3',
    firstName: 'required|min:2',
    lastName: 'required|min:2',
    email: 'required|email',
    phone: 'required',
    password: 'required|min:8',
  },
})

const { value: regon, errorMessage: regonError, handleBlur: regonBlur } = useField<string>('regon')
const { value: organizationName, errorMessage: organizationNameError, handleBlur: organizationNameBlur } = useField<string>('organizationName')
const { value: organizationEmail, errorMessage: organizationEmailError, handleBlur: organizationEmailBlur } = useField<string>('organizationEmail')
const { value: username, errorMessage: usernameError, handleBlur: usernameBlur } = useField<string>('username')
const { value: firstName, errorMessage: firstNameError, handleBlur: firstNameBlur } = useField<string>('firstName')
const { value: lastName, errorMessage: lastNameError, handleBlur: lastNameBlur } = useField<string>('lastName')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')
const { value: phone, errorMessage: phoneError, handleBlur: phoneBlur } = useField<string>('phone')
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField<string>('password')

const loading = ref<boolean>(false)

const submitForm = handleSubmit(async (formValues) => {
  loading.value = true

  try {
    await authRepository.register(formValues)

    toast.add({
      severity: 'success',
      summary: 'Sukces',
      detail: 'Rejestracja przebiegła pomyślnie! Możesz się teraz zalogować.',
      life: 5000,
    })

    resetForm()

    setTimeout(() => {
      const loginTab = document.querySelector('[value="0"]') as HTMLElement
      loginTab?.click()
    }, 2000)
  }
  catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Błąd rejestracji',
      detail: error?.data?.message || error?.message || 'Nie udało się zarejestrować. Spróbuj ponownie.',
      life: 5000,
    })
  }
  finally {
    loading.value = false
  }
})
</script>

<style scoped>
.section-title {
  @apply flex justify-center items-center gap-2 mt-4 mb-2;
}

.section-title h2 {
  @apply text-xl font-semibold;
}
</style>
