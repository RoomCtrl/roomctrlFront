<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col items-center">
      <div class="flex itemx-center justify-center">
        <h1 class="text-start w-full text-5xl font-bold py-[3vh]">
          {{ $t('forms.registration.title') }}
        </h1>
      </div>

      <div class="flex flex-row justify-around w-full">
        <div class="flex flex-col">
          <div class="section-title">
            <i class="pi pi-building" />
            <h2>{{ $t('forms.registration.organizationData') }}</h2>
          </div>

          <div class="flex flex-col">
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
                  <label for="regon">{{ $t('forms.registration.regon') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
                <Message
                  v-if="regonError"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ regonError }}
                </Message>
              </div>
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
                  <label for="organizationName">{{ $t('forms.registration.organizationName') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
                <Message
                  v-if="organizationNameError"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ organizationNameError }}
                </Message>
              </div>
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
                  <label for="organizationEmail">{{ $t('forms.registration.organizationEmail') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
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
          </div>
        </div>

        <div class="flex flex-col">
          <div class="section-title">
            <i class="pi pi-user" />
            <h2>{{ $t('forms.registration.userData') }}</h2>
          </div>

          <div class="grid grid-cols-2 grid-rows-4 gap-x-4">
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
                  <label for="firstName">{{ $t('forms.registration.firstName') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
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
                  <i class="pi pi-id-card" />
                </InputGroupAddon>
                <FloatLabel variant="on">
                  <InputText
                    id="lastName"
                    v-model="lastName"
                    :class="{ 'p-invalid': lastNameError }"
                    @blur="lastNameBlur"
                  />
                  <label for="lastName">{{ $t('forms.registration.lastName') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
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

            <div class="w-[70vw] md:w-[23rem] col-span-full">
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
                  <label for="username">{{ $t('forms.registration.username') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
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
                  <label for="email">{{ $t('forms.registration.email') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
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

            <div class="w-[70vw] md:w-[23rem] rows-start-3">
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
                  <label for="phone">{{ $t('forms.registration.phone') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
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

            <div class="w-[70vw] md:w-[23rem] row-start-4">
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
                  <label for="password">{{ $t('forms.registration.password') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
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

            <div class="w-[70vw] md:w-[23rem] row-start-4">
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-key" />
                </InputGroupAddon>
                <FloatLabel variant="on">
                  <Password
                    id="confirmPassword"
                    v-model="confirmPassword"
                    :class="{ 'p-invalid': confirmPasswordError }"
                    toggleMask
                    fluid
                    :feedback="false"
                    @blur="confirmPasswordBlur"
                  />
                  <label for="confirmPassword">{{ $t('forms.registration.confirmPassword') }}</label>
                </FloatLabel>
              </InputGroup>
              <div class="error-message-wrapper">
                <Message
                  v-if="confirmPasswordError"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ confirmPasswordError }}
                </Message>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Akceptacja regulaminu -->
      <div class="flex flex-col items-center mt-6">
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="acceptTerms"
            inputId="acceptTerms"
            :binary="true"
            @blur="acceptTermsBlur"
          />
          <label for="acceptTerms" class="text-sm">
            {{ $t('forms.registration.acceptTerms') }}
            <NuxtLink :to="localePath('/rules')" target="_blank" class="text-primary-400 hover:underline">{{ $t('forms.registration.rules') }}</NuxtLink>
            {{ $t('forms.registration.and') }}
            <NuxtLink :to="localePath('/privacyPolicy')" target="_blank" class="text-primary-400 hover:underline">{{ $t('forms.registration.privacyPolicy') }}</NuxtLink>
          </label>
        </div>
        <div class="error-message-wrapper">
          <Message v-if="acceptTermsError" severity="error" size="small" variant="simple">
            {{ acceptTermsError }}
          </Message>
        </div>
      </div>

      <Button
        type="submit"
        :label="$t('forms.registration.submit')"
        :loading="loading"
        class="w-[65vw] md:w-[15rem] mt-[2rem]"
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
const localePath = useLocalePath()
const { t } = useI18n()
const authRepository = new AuthRepository()

const { handleSubmit, resetForm } = useForm<IRegisterRequest>({
  validationSchema: {
    regon: 'required|min:9|max:9',
    organizationName: 'required|min:3',
    organizationEmail: 'required|email',
    username: 'required|min:3',
    firstName: 'required|min:2',
    lastName: 'required|min:2',
    email: 'required|email',
    phone: 'required',
    password: 'required|min:8',
    confirmPassword: 'required|confirmed:@password',
    acceptTerms: 'required|accepted',
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
const { value: confirmPassword, errorMessage: confirmPasswordError, handleBlur: confirmPasswordBlur } = useField<string>('confirmPassword')
const { value: acceptTerms, errorMessage: acceptTermsError, handleBlur: acceptTermsBlur } = useField<boolean>('acceptTerms')

const loading = ref<boolean>(false)

const submitForm = handleSubmit(async (formValues) => {
  loading.value = true

  try {
    await authRepository.register(formValues)

    toast.add({
      severity: 'success',
      summary: t('forms.registration.successTitle'),
      detail: t('forms.registration.successMessage'),
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
      summary: t('forms.registration.errorTitle'),
      detail: error?.data?.message || error?.message || t('forms.registration.errorMessage'),
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

/* Rezerwacja miejsca dla komunikatów błędów */
.error-message-wrapper {
  min-height: 1.5rem;
}
</style>
