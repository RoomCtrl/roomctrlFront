<template>
  <Toast />
  <div class="flex flex-col gap-3 w-full sm:w-[35vw]">
    <h1 class="flex justify-center text-xl font-bold">
      {{ $t('forms.titles.contactForm') }}
    </h1>
    <div>
      <FloatLabel variant="on">
        <InputText
          id="name"
          v-model="form.name"
          type="text"
          class="w-[70vw] sm:w-full"
        />
        <label for="name">{{ $t('forms.fields.name') }}</label>
      </FloatLabel>
    </div>
    <div>
      <FloatLabel variant="on">
        <Select
          id="subject"
          v-model="form.subject"
          :options="subjects"
          type="text"
          class="w-[70vw] sm:w-full"
        />
        <label for="subject">{{ $t('forms.fields.subject') }}</label>
      </FloatLabel>
    </div>
    <div>
      <FloatLabel variant="on">
        <Textarea
          id="message"
          v-model="form.message"
          class="w-full h-[25vh]"
        />
        <label for="message">{{ $t('forms.fields.message') }}</label>
      </FloatLabel>
    </div>
    <Button
      as="a"
      :href="mailtoLink"
      target="_blank"
      label="Wyślij"
      type="submit"
      class="w-[60vw] sm:w-[15vw] self-center"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const form = reactive({
  name: '',
  subject: '',
  message: '',
})

const mailtoLink = computed(() => {
  const subject = encodeURIComponent(form.subject || 'Kontakt ze strony')
  const body = encodeURIComponent(
    `Imię: ${form.name}\n`
    + `Wiadomość:\n${form.message}`,
  )

  return `mailto:roomctrlinfo@gmail.com?subject=${subject}&body=${body}`
})

const subjects = [
  t('pages.contactPage.subjects.reservation.room'),
  t('pages.contactPage.subjects.reservation.cancel'),
  t('pages.contactPage.subjects.techProblems'),
  t('pages.contactPage.subjects.techSupport'),
  t('pages.contactPage.subjects.feedback'),
  t('pages.contactPage.subjects.requestFunction'),
  t('pages.contactPage.subjects.helpWithApp'),
  t('pages.contactPage.subjects.other'),
]
</script>
