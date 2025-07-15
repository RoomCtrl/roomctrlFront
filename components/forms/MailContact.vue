<template>
  <form @submit.prevent="submitForm">
    <Toast />
    <div class="flex flex-col gap-3 w-full sm:w-[35vw]">
      <h1 class="flex justify-center text-xl font-bold">
        {{ $t('forms.titles.contactForm') }}
      </h1>
      <div>
        <FloatLabel variant="on">
          <InputText
            id="name"
            v-model="name"
            type="text"
            class="w-[70vw] sm:w-full"
            :class="{ 'p-invalid': nameError }"
            autofocus
            @blur="nameBlur"
          />
          <label for="name">{{ $t('forms.fields.name') }}</label>
        </FloatLabel>
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
        <FloatLabel variant="on">
          <InputText
            id="subject"
            v-model="subject"
            type="text"
            class="w-[70vw] sm:w-full"
            :class="{ 'p-invalid': subjectError }"
            @blur="subjectBlur"
          />
          <label for="subject">{{ $t('forms.fields.subject') }}</label>
        </FloatLabel>
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
            v-model="messageContent"
            class="w-full h-[25vh]"
            :class="{ 'p-invalid': messageContentError }"
            @blur="messageContentBlur"
          />
          <label for="message">{{ $t('forms.fields.message') }}</label>
        </FloatLabel>
        <Message
          v-if="messageContentError"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ messageContentError }}
        </Message>
      </div>
      <Button
        label="Wyślij"
        type="submit"
        class="w-[60vw] sm:w-[15vw] self-center"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useToast } from 'primevue'
import { useField, useForm } from 'vee-validate'
import type { IMailContactUs } from '@/interfaces/FormsInterface'

const { handleSubmit, resetForm } = useForm<IMailContactUs>({
  validationSchema: {
    name: 'required',
    email: 'required|email',
    subject: 'required',
    messageContent: 'required',
  },
})

const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField<string>('name')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')
const { value: subject, errorMessage: subjectError, handleBlur: subjectBlur } = useField<string>('subject')
const { value: messageContent, errorMessage: messageContentError, handleBlur: messageContentBlur } = useField<string>('messageContent')

const toast = useToast()

const showToast = (severity: string, summary: string, detail: string) => {
  toast.add({ severity, summary, detail, life: 3000 })
}

const submitForm = handleSubmit((formValues: IMailContactUs) => {
  try {
    router.post('/send-mail', formValues, {
      preserveScroll: true,
      onSuccess: () => {
        showToast('success', 'Sukces', 'Mail został wysłany.')
        resetForm()
      },
      onError: (errors: Record<string, string>) => {
        showToast('error', 'Błąd', Object.values(errors).join(', '))
      },
    })
  }
  catch {
    showToast('error', 'Błąd', 'Wystąpił nieoczekiwany błąd.')
  }
})
</script>
