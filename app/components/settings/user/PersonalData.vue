<template>
  <div>
    <div>
      <h2 class="text-2xl font-semibold mb-1">
        {{ $t('pages.settings.personalData.title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        {{ $t('pages.settings.personalData.description') || 'Manage your personal information' }}
      </p>
    </div>
    <Card>
      <template #content>
        <form @submit.prevent="submitForm">
          <div>
            <div
              id="usernamelabel"
              class="block mb-2 font-semibold"
            >
              {{ t('forms.fields.username') }}
            </div>
            <InputText
              v-model="username"
              class="w-full"
              aria-labelledby="usernamelabel"
              @blur="usernameBlur"
            />
          </div>
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <div
                id="firstNameLabel"
                class="block mb-2 font-semibold"
              >
                {{ t('forms.fields.firstName') }}
              </div>
              <InputText
                v-model="firstName"
                class="w-full"
                aria-labelledby="firstNameLabel"
                @blur="firstNameBlur"
              />
            </div>
            <div>
              <div
                id="lastNameLabel"
                class="block mb-2 font-semibold"
              >
                {{ t('forms.fields.lastName') }}
              </div>
              <InputText
                v-model="lastName"
                class="w-full"
                aria-labelledby="lastNameLabel"
                @blur="lastNameBlur"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <div
                id="emailLabel"
                class="block mb-2 font-semibold"
              >
                {{ t('forms.fields.email') }}
              </div>
              <InputText
                v-model="email"
                type="email"
                class="w-full"
                aria-labelledby="emailLabel"
                @blur="emailBlur"
              />
            </div>

            <div class="">
              <div
                id="phoneLabel"
                class="block mb-2 font-semibold"
              >
                {{ t('forms.fields.phone') }}
              </div>
              <InputText
                v-model="phone"
                class="w-full"
                aria-labelledby="phoneLabel"
                @blur="phoneBlur"
              />
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <Button
              type="submit"
              severity="success"
              :loading="loading"
              :label="$t('common.buttons.save')"
            />
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
const { user } = useAuth()
const { updateUser } = useUser()

const { handleSubmit } = useForm<IUpdateUserProfileForm>({
  validationSchema: {
    username: 'required',
    firstName: 'required',
    lastName: 'required',
    email: 'required|email',
    phone: 'required',
  },
  initialValues: {
    username: user.value.username,
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
    phone: user.value.phone,
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
    await updateUser(user.value.id, formValues)
  }
  catch (error) {
    console.error('Error updating profile:', error)
  }
  finally {
    loading.value = false
    toast.add({
      severity: 'success',
      summary: t('common.buttons.save'),
      detail: t('pages.settings.success.profileUpdated'),
      life: 3000,
    })
  }
})
</script>
