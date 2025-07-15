<template>
  <Card class="w-full sm:w-[60vw]">
    <template #content>
      <div class="flex flex-col lg:flex-row gap-10 items-center w-full sm:w-[60vw]">
        <Panel class="flex-none w-full shadow-md text-xl sm:text-2xl lg:w-[17vw] h-[45vh]">
          <template #header>
            <p class="font-semibold lg:text-2xl sm:text-xl mx-auto">
              {{ $t('pages.contactPage.contactDetails.title') }}
            </p>
          </template>
          <div
            v-for="contactDetail in contactUsDetails"
            :key="contactDetail.label"
            class="text-sm sm:text-base px-[1vw] py-[1vh] text-left"
          >
            <div class="flex flex-row items-center gap-2">
              <i :class="contactDetail.icon" />
              <h1>
                {{ contactDetail.label }}
              </h1>
            </div>

            <h2
              v-if="contactDetail.label == t('pages.contactPage.contactDetails.address')"
              class="w-[30vw] md:w-[20vw] max-sm:w-[40vw] lg:w-[10vw]"
            >
              {{ contactDetail.content }}
            </h2>
            <h2 v-else>
              {{ contactDetail.content }}
            </h2>
          </div>
        </Panel>

        <MailContact class="w-full" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card, Panel } from 'primevue'
import MailContact from '../forms/MailContact.vue'

const { t } = useI18n()

const contactUsDetails = [
  // Change name of company
  // { label: t('pages.contactPage.contactDetails.email'), content: 'FAJKCORP', icon: 'pi pi-building' },
  { label: t('pages.contactPage.contactDetails.email'), content: 'filmac5@st.amu.edu.pl', icon: 'pi pi-envelope' },
  { label: t('pages.contactPage.contactDetails.phone'), content: '+48 888 456 123', icon: 'pi pi-phone' },
  { label: t('pages.contactPage.contactDetails.address'), content: 'Ulica Projektowa 26 64-920 Piła', icon: 'pi pi-map-marker' },
]
</script>
