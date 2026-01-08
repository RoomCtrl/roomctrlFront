<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col items-center">
      <div class="flex itemx-center justify-center">
        <h1 class="text-start w-full text-5xl font-bold py-[3vh]">
          {{ $t('forms.titles.registration') }}
        </h1>
      </div>

      <div class="flex flex-row justify-around w-full ">
        <div class="flex flex-col">
          <div class="section-title">
            <i class="pi pi-building" />
            <h2>{{ $t('forms.titles.organizationData') }}</h2>
          </div>

          <div class="flex flex-col">
            <div class="w-full md:w-[23rem]">
              <CommonFormsTextField
                id="regon"
                v-model="regon"
                icon="pi pi-hashtag"
                :label="$t('forms.fields.organization.regon')"
                :errorMessage="regonError"
                @blur="regonBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <CommonFormsTextField
                id="organizationName"
                v-model="organizationName"
                icon="pi pi-building"
                :label="$t('forms.fields.organization.name')"
                :errorMessage="organizationNameError"
                @blur="organizationNameBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <CommonFormsTextField
                id="organizationEmail"
                v-model="organizationEmail"
                icon="pi pi-envelope"
                :label="$t('forms.fields.organization.email')"
                :errorMessage="organizationEmailError"
                @blur="organizationEmailBlur"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="section-title">
            <i class="pi pi-user" />
            <h2>{{ $t('forms.titles.userData') }}</h2>
          </div>

          <div class="flex flex-col md:grid md:grid-cols-2 md:grid-rows-4 md:gap-x-4">
            <div class="w-full md:w-[23rem] col-span-full">
              <CommonFormsTextField
                id="username"
                v-model="username"
                icon="pi pi-user"
                :label="$t('forms.fields.user.username')"
                :errorMessage="usernameError"
                @blur="usernameBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <CommonFormsTextField
                id="firstName"
                v-model="firstName"
                icon="pi pi-id-card"
                :label="$t('forms.fields.user.firstName')"
                :errorMessage="firstNameError"
                @blur="firstNameBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <CommonFormsTextField
                id="lastName"
                v-model="lastName"
                icon="pi pi-id-card"
                :label="$t('forms.fields.user.lastName')"
                :errorMessage="lastNameError"
                @blur="lastNameBlur"
              />
            </div>

            <div class="w-full md:w-[23rem]">
              <CommonFormsTextField
                id="email"
                v-model="email"
                icon="pi pi-at"
                :label="$t('forms.fields.user.email')"
                :errorMessage="emailError"
                @blur="emailBlur"
              />
            </div>

            <div class="w-full md:w-[23rem] rows-start-3">
              <CommonFormsTextField
                id="phone"
                v-model="phone"
                icon="pi pi-phone"
                :label="$t('forms.fields.phone')"
                :errorMessage="phoneError"
                @blur="phoneBlur"
              />
            </div>

            <div class="w-full md:w-[23rem] row-start-4">
              <CommonFormsPasswordField
                id="password"
                v-model="password"
                :label="$t('forms.fields.user.password')"
                :errorMessage="passwordError"
                @blur="passwordBlur"
              />
            </div>

            <div class="w-full md:w-[23rem] row-start-4">
              <CommonFormsPasswordField
                id="confirmPassword"
                v-model="confirmPassword"
                :label="$t('forms.fields.user.confirmPassword')"
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
            {{ $t('forms.registrationRequires.acceptTerms') }}
            <NuxtLink
              :to="localePath('/rules')"
              target="_blank"
              class="text-primary-400 hover:underline"
            >{{ $t('forms.registrationRequires.rules') }}</NuxtLink>
            {{ $t('forms.registrationRequires.and') }}
            <NuxtLink
              :to="localePath('/privacyPolicy')"
              target="_blank"
              class="text-primary-400 hover:underline"
            >{{ $t('forms.registrationRequires.privacyPolicy') }}</NuxtLink>
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
          :label="$t('forms.submit.register')"
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
    phone: 'required|phone',
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
      summary: t('toast.summary.success'),
      detail: t('toast.messages.success.registration'),
      life: 5000,
    })

    resetForm()

    emit('registrationAttempted')
  }
  catch (error: any) {
    toast.add({
      severity: 'error',
      summary: t('toast.summary.registrationError'),
      detail: error?.data?.message || error?.message || t('toast.messages.error.registration'),
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

.error-message-wrapper {
  min-height: 1.5rem;
}
</style>
