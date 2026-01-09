<template>
  <div>
    <Card>
      <template #title>
        <h2 class="text-2xl font-semibold mb-1">
          {{ $t('pages.settings.personalData.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-base mb-6">
          {{ $t('pages.settings.personalData.description') || 'Manage your personal information' }}
        </p>
      </template>
      <template #content>
        <form @submit.prevent="submitForm">
          <div class="w-[30rem]">
            <CommonFormsTextField
              id="username"
              v-model="username"
              :label="$t('forms.fields.user.username')"
              :errorMessage="usernameError"
              @blur="usernameBlur"
            />
          </div>
          <div class="grid md:grid-cols-2 gap-x-4">
            <div>
              <CommonFormsTextField
                id="firstName"
                v-model="firstName"
                :label="$t('forms.fields.user.firstName')"
                :errorMessage="firstNameError"
                @blur="firstNameBlur"
              />
            </div>
            <div>
              <CommonFormsTextField
                id="lastName"
                v-model="lastName"
                :label="$t('forms.fields.user.lastName')"
                :errorMessage="lastNameError"
                @blur="lastNameBlur"
              />
            </div>

            <div>
              <CommonFormsTextField
                id="email"
                v-model="email"
                :label="$t('forms.fields.user.email')"
                :errorMessage="emailError"
                @blur="emailBlur"
              />
            </div>

            <div>
              <CommonFormsTextField
                id="phone"
                v-model="phone"
                :label="$t('forms.fields.phone')"
                :errorMessage="phoneError"
                @blur="phoneBlur"
              />
            </div>

            <div class="flex justify-end col-span-full">
              <Button
                type="submit"
                severity="success"
                :loading="loading"
                :label="$t('common.buttons.save')"
              />
            </div>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import type { IUpdateUserProfileForm } from '~/interfaces/UsersInterfaces'

const toast = useToast()
const loading = ref(false)
const { t } = useI18n()
const { user, fetchUserProfile } = useAuth()
const { updateUserPartially } = useUser()

const { handleSubmit, resetForm } = useForm<IUpdateUserProfileForm>({
  validationSchema: {
    username: 'required',
    firstName: 'required',
    lastName: 'required',
    email: 'required|email',
    phone: 'required',
  },
})

const { value: username, errorMessage: usernameError, handleBlur: usernameBlur } = useField<string>('username')
const { value: firstName, errorMessage: firstNameError, handleBlur: firstNameBlur } = useField<string>('firstName')
const { value: lastName, errorMessage: lastNameError, handleBlur: lastNameBlur } = useField<string>('lastName')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')
const { value: phone, errorMessage: phoneError, handleBlur: phoneBlur } = useField<string>('phone')

const submitForm = handleSubmit(async (formValues: IUpdateUserProfileForm) => {
  loading.value = true
  try {
    await updateUserPartially(user.value.id, formValues)
    toast.add({
      severity: 'success',
      summary: t('toast.summary.success'),
      detail: t('toast.messages.success.profileUpdated'),
      life: 3000,
    })
  }
  catch (error) {
    toast.add({
      severity: 'error',
      summary: t('toast.summary.error'),
      detail: error.response?.data?.message || t('toast.messages.error.profileUpdateFailed'),
      life: 3000,
    })
  }
  finally {
    await fetchUserProfile()
    resetForm({
      values: {
        username: user.value.username,
        firstName: user.value.firstName,
        lastName: user.value.lastName,
        email: user.value.email,
        phone: user.value.phone,
      },
    })
    loading.value = false
  }
})

onMounted(() => {
  if (user.value) {
    resetForm({
      values: {
        username: user.value.username,
        firstName: user.value.firstName,
        lastName: user.value.lastName,
        email: user.value.email,
        phone: user.value.phone,
      },
    })
  }
})
</script>
