<template>
  <Toast class="pt-[7vh]" />
  <form @submit.prevent="sendMail">
    <div
      class="flex flex-col gap-3 w-full 2xl:w-[35vw]"
    >
      <h1 class="flex justify-center text-xl font-bold">
        {{ $t('forms.titles.contactForm') }}
      </h1>
      <div>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText
              id="name"
              v-model="name"
              type="text"
              class="w-[70vw] sm:w-full"
              :class="{ 'p-invalid': nameError }"
              @blur="nameBlur"
            />
            <label for="name">{{ $t('forms.fields.name') }}</label>
          </FloatLabel>
        </InputGroup>
        <Message
          v-if="nameError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ nameError }}
        </Message>
      </div>
      <div>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-envelope" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText
              id="email"
              v-model="email"
              type="text"
              class="w-[70vw] sm:w-full"
              :class="{ 'p-invalid': emailError }"
              @blur="emailBlur"
            />
            <label for="email">{{ $t('forms.fields.email') }}</label>
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
      <div>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-list" />
          </InputGroupAddon>
          <FloatLabel variant="on">
            <Select
              id="subject"
              v-model="subject"
              :options="subjects"
              type="text"
              class="w-[70vw] sm:w-full"
              :class="{ 'p-invalid': subjectError }"
              @blur="subjectBlur"
            />
            <label for="subject">{{ $t('forms.fields.subject') }}</label>
          </FloatLabel>
        </InputGroup>
        <Message
          v-if="subjectError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ subjectError }}
        </Message>
      </div>
      <div>
        <FloatLabel variant="on">
          <Textarea
            id="message"
            v-model="message"
            class="w-full h-[25vh]"
            :class="{ 'p-invalid': messageError }"
            @blur="messageBlur"
          />
          <label for="message">{{ $t('forms.fields.message') }}</label>
        </FloatLabel>
        <Message
          v-if="messageError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ messageError }}
        </Message>
      </div>
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

const showToast = (severity: string, summary: string, detail: string) => {
  toast.add({ severity, summary, detail, life: 3000 })
}

const { t } = useI18n()
const { user } = useAuth()
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

const { sendContactMessage } = useMailer()

const { handleSubmit, resetForm } = useForm<IContactMailData>({
  validationSchema: {
    name: 'required',
    email: 'required|email',
    subject: 'required',
    message: 'required',
  },
})

const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField<string>('name')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')
const { value: subject, errorMessage: subjectError, handleBlur: subjectBlur } = useField<string>('subject')
const { value: message, errorMessage: messageError, handleBlur: messageBlur } = useField<string>('message')

const loading = ref<boolean>(false)

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
</script>
