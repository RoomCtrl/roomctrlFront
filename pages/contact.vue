<template>
  <div class="min-h-screen flex flex-col items-center">
    <div class="w-[80vw] space-y-12">
      <Card class="text-center shadow-sm">
        <template #content>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-4">
            {{ $t('pages.contactPage.title') }}
          </h1>
          <p class="text-lg sm:text-xl max-w-2xl mx-auto">
            {{ $t('pages.contactPage.subTitle') }}
          </p>
        </template>
      </Card>

      <div class="flex sm:justify-center">
        <MailSender />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card } from 'primevue'
import MailSender from '~/components/contactPage/MailSender.vue'
</script>
