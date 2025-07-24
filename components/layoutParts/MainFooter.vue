<template>
  <div class="flex flex-col items-center min-h-[8vh] pb-[3vh] md:mx-[10rem] md:gap-6">
    <div class="flex flex-col md:flex-row md:justify-evenly max-md:gap-3 md:w-full">
      <div>
        <h1>
          {{ $t('layouts.main.aboutPlatform') }}
        </h1>
        <ul class="footer-list">
          <li><NuxtLink :to="localePath('contact')">{{ $t('layouts.main.contact') }}</NuxtLink></li>
          <li><NuxtLink to="/">{{ $t('layouts.main.aboutAs') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h1>
          {{ $t('layouts.main.footer.resources.title') }}
        </h1>
        <ul class="footer-list">
          <li><NuxtLink :to="localePath('faq')">FAQ</NuxtLink></li>
          <li><NuxtLink to="">{{ $t('layouts.main.footer.resources.rules') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h1>
          {{ $t('layouts.main.footer.contact.title') }}
        </h1>
        <ul class="footer-list">
          <li
            v-for="(contactDetail, index) in contactUsDetails"
            :key="index"
            class="text-white"
          >
            {{ contactDetail.label }}: {{ contactDetail.content }}
          </li>
        </ul>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <Divider class="w-[90vw]" />
      <p class="text-white">
        &copy; {{ $t('layouts.main.copyright') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Divider } from 'primevue'

const localePath = useLocalePath()
const { t } = useI18n()

const contactUsDetails = [
  { label: t('layouts.main.footer.contact.email'), content: 'roomctrlinfo@gmail.com' },
  { label: t('layouts.main.footer.contact.phone'), content: '+48 123 123 123' },
]
</script>

<style scoped>
.pi-github {
  margin-top: 0.4rem;
  font-size: 1.5rem;
  color:white;
}

h1 {
  color: #D74141;
  font-weight: 700;
  font-size: 1.125rem;
}

.footer-list {
  color: white;
  margin-left: 1.5vh;
}
</style>
