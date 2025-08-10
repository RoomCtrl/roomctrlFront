<template>
  <Card class="w-full lg:w-[60vw]">
    <template #content>
      <div class="flex flex-col lg:flex-row gap-10 items-center w-full lg:w-[60vw]">
        <Panel class="flex-none w-full shadow-md text-xl sm:text-2xl lg:w-[17vw] lg:h-[45vh]">
          <template #header>
            <p class="font-semibold lg:text-2xl sm:text-xl mx-auto">
              {{ $t('pages.contact.contactDetails.title') }}
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

            <h2 class="w-[30vw] md:w-[20vw] max-sm:w-[40vw] lg:w-[10vw]">
              {{ contactDetail.content }}
            </h2>
          </div>
        </Panel>

        <div class="w-full">
          <MailContact />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import MailContact from '../forms/MailContact.vue'

const { t } = useI18n()

const contactUsDetails = [
  { label: t('pages.contact.contactDetails.company'), content: 'WorldCtrl', icon: 'pi pi-building' },
  { label: t('pages.contact.contactDetails.email'), content: 'roomctrlinfo@gmail.com', icon: 'pi pi-envelope' },
  { label: t('pages.contact.contactDetails.phone'), content: '+48 123 123 123', icon: 'pi pi-phone' },
]
</script>

<style scoped>
.dark .p-panel {
  background-color: #1B2532;
}
</style>
