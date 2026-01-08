<template>
  <Toast class="pt-[7vh]" />
  <form @submit.prevent="sendMail">
    <div
      class="flex flex-col w-full 2xl:w-[35vw]"
    >
      <h1 class="flex justify-center text-xl font-bold">
        {{ $t('forms.titles.contactForm') }}
      </h1>
      <CommonFormsTextField
        id="name"
        v-model="name"
        :label="$t('forms.fields.user.username')"
        :errorMessage="nameError"
        icon="pi pi-user"
        @blur="nameBlur"
      />

      <CommonFormsTextField
        id="email"
        v-model="email"
        :label="$t('forms.fields.email')"
        :errorMessage="emailError"
        icon="pi pi-envelope"
        @blur="emailBlur"
      />

      <CommonFormsSelectField
        id="subject"
        v-model="subject"
        :options="subjects"
        :label="$t('forms.fields.subject')"
        :errorMessage="subjectError"
        icon="pi pi-list"
        option-label=""
        option-value=""
        @blur="subjectBlur"
      />

      <CommonFormsTextArea
        id="message"
        v-model="message"
        :label="$t('forms.fields.message')"
        :errorMessage="messageError"
        @blur="messageBlur"
      />
      <Button
        :label="t('pages.contact.send')"
        icon="pi pi-send"
        type="submit"
        :loading="loading"
        class="w-[60vw] sm:w-[15vw] self-center"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useToast } from 'primevue'
import { useField, useForm } from 'vee-validate'
import type { IContactMailData } from '~/interfaces/RepositoriesInterface'

const toast = useToast()
const { sendContactMessage } = useMailer()
const { t } = useI18n()
const { user } = useAuth()

const loading = ref<boolean>(false)

const isUserLogin = computed(() => {
  return !(Object.keys(user.value || {}).length === 0)
})

const subjects = computed(() => {
  if (isUserLogin.value) {
    return [...getUserSubjects(t), ...getGuestSubjects(t)]
  }
  else {
    return getGuestSubjects(t)
  }
})

const { handleSubmit, resetForm } = useForm<IContactMailData>({
  validationSchema: {
    name: 'required',
    email: 'required|email',
    subject: 'required',
    message: 'required|min:10|max:5000',
  },
})

const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField<string>('name')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')
const { value: subject, errorMessage: subjectError, handleBlur: subjectBlur } = useField<string>('subject')
const { value: message, errorMessage: messageError, handleBlur: messageBlur } = useField<string>('message')

const showToast = (severity: string, summary: string, detail: string) => {
  toast.add({ severity, summary, detail, life: 3000 })
}

const sendMail = handleSubmit(async (formValues: IContactMailData) => {
  loading.value = true

  try {
    await sendContactMessage(formValues)

    showToast('success', t('common.success'), t('forms.messages.success.correctSentMail'))
    resetForm()
  }
  catch (error: any) {
    showToast('error', t('common.error'), error.message || t('forms.messages.error.whileSendingMail'))
  }
  finally {
    loading.value = false
  }
})

onMounted(() => {
  if (isUserLogin.value && user.value) {
    name.value = (user.value.firstName + ' ' + user.value.lastName) || ''
    email.value = user.value.email || ''
  }
})
</script>
