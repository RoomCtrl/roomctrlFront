<template>
  <div class="flex flex-col items-center">
    <div class="space-y-12">
      <Card class="text-center shadow-sm">
        <template #content>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-4">
            {{ $t('pages.contact.title') }}
          </h1>
          <p class="text-lg sm:text-xl max-w-2xl mx-auto">
            {{ $t('pages.contact.subTitle') }}
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
