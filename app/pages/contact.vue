<template>
  <div class="flex flex-col 2xl:items-center w-full">
    <div class="space-y-12">
      <Card pt:root:class="text-center shadow-sm">
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
import MailSender from '~/components/contactPage/MailSender.vue'
</script>
