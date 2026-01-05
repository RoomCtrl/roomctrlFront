<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col items-center">
      <div class="flex itemx-center justify-center">
        <h1 class="text-start w-full text-5xl font-bold py-[3vh]">
          {{ $t('forms.registration.title') }}
        </h1>
      </div>

      <div class="flex flex-row justify-around w-full ">
        <div class="flex flex-col">
          <div class="section-title">
            <i class="pi pi-building" />
            <h2>{{ $t('forms.registration.organizationData') }}</h2>
          </div>

          <div class="flex flex-col">
            <div class="w-full md:w-[23rem]">
              <FormTextField
                id="regon"
                v-model="regon"
                icon="pi pi-hashtag"
                :label="$t('forms.registration.regon')"
                :errorMessage="regonError"
                @blur="regonBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <FormTextField
                id="organizationName"
                v-model="organizationName"
                icon="pi pi-building"
                :label="$t('forms.registration.organizationName')"
                :errorMessage="organizationNameError"
                @blur="organizationNameBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <FormTextField
                id="organizationEmail"
                v-model="organizationEmail"
                icon="pi pi-envelope"
                :label="$t('forms.registration.organizationEmail')"
                :errorMessage="organizationEmailError"
                @blur="organizationEmailBlur"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="section-title">
            <i class="pi pi-user" />
            <h2>{{ $t('forms.registration.userData') }}</h2>
          </div>

          <div class="flex flex-col md:grid md:grid-cols-2 md:grid-rows-4 md:gap-x-4">
            <div class="w-full md:w-[23rem] col-span-full">
              <FormTextField
                id="username"
                v-model="username"
                icon="pi pi-user"
                :label="$t('forms.registration.username')"
                :errorMessage="usernameError"
                @blur="usernameBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <FormTextField
                id="firstName"
                v-model="firstName"
                icon="pi pi-id-card"
                :label="$t('forms.registration.firstName')"
                :errorMessage="firstNameError"
                @blur="firstNameBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <FormTextField
                id="lastName"
                v-model="lastName"
                icon="pi pi-id-card"
                :label="$t('forms.registration.lastName')"
                :errorMessage="lastNameError"
                @blur="lastNameBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <FormTextField
                id="email"
                v-model="email"
                icon="pi pi-at"
                :label="$t('forms.registration.email')"
                :errorMessage="emailError"
                @blur="emailBlur"
              />
            </div>

            <div class="w-full md:w-[23rem] rows-start-3">
              <FormTextField
                id="phone"
                v-model="phone"
                icon="pi pi-phone"
                :label="$t('forms.registration.phone')"
                :errorMessage="phoneError"
                @blur="phoneBlur"
              />
            </div>

            <div class="w-full md:w-[23rem] row-start-4">
              <FormPasswordField
                id="password"
                v-model="password"
                :label="$t('forms.registration.password')"
                :errorMessage="passwordError"
                @blur="passwordBlur"
              />
            </div>

            <div class="w-full md:w-[23rem] row-start-4">
              <FormPasswordField
                id="confirmPassword"
                v-model="confirmPassword"
                :label="$t('forms.registration.confirmPassword')"
                :errorMessage="confirmPasswordError"
                @blur="confirmPasswordBlur"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center mt-6">
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="acceptTerms"
            inputId="acceptTerms"
            :binary="true"
            @blur="acceptTermsBlur"
          />
          <label
            for="acceptTerms"
            class="text-sm"
          >
            {{ $t('forms.registration.acceptTerms') }}
            <NuxtLink
              :to="localePath('/rules')"
              target="_blank"
              class="text-primary-400 hover:underline"
            >{{ $t('forms.registration.rules') }}</NuxtLink>
            {{ $t('forms.registration.and') }}
            <NuxtLink
              :to="localePath('/privacyPolicy')"
              target="_blank"
              class="text-primary-400 hover:underline"
            >{{ $t('forms.registration.privacyPolicy') }}</NuxtLink>
          </label>
        </div>
        <div class="error-message-wrapper">
          <Message
            v-if="acceptTermsError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ acceptTermsError }}
          </Message>
        </div>
      </div>
      <div class="flex justify-center">
        <Button
          type="submit"
          :label="$t('forms.registration.submit')"
          :loading="loading"
          class="w-[65vw] md:w-[15rem]"
        />
      </div>
    </div>
  </form>
  <Toast />
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { useToast } from 'primevue/usetoast'
import { AuthRepository } from '~/repositories/AuthRepository'
import type { IRegisterRequest } from '~/interfaces/RepositoriesInterface'
import FormTextField from '../common/FormTextField.vue'
import FormPasswordField from '../common/FormPasswordField.vue'

const toast = useToast()
const localePath = useLocalePath()
const { t } = useI18n()
const authRepository = new AuthRepository()

const emit = defineEmits(['registrationAttempted'])

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
    acceptTerms: 'accepted',
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
    emit('registrationAttempted')
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

.error-message-wrapper {
  min-height: 1.5rem;
}
</style>
