<template>
  <Card pt:root:class="w-full lg:w-[80vw] 2xl:w-[60vw]">
    <template #content>
      <div class="flex flex-col lg:flex-row gap-10 items-center w-full 2xl:w-[60vw]">
        <Panel class="flex-none w-full shadow-md text-xl sm:text-2xl lg:w-[17vw] lg:h-[45vh] self-start">
          <template #header>
            <p class="font-semibold lg:text-2xl sm:text-xl">
              {{ $t('pages.contact.contactDetails.title') }}
            </p>
          </template>
          <div
            v-for="contactDetail in contactUsDetails"
            :key="contactDetail.label"
            class="text-sm sm:text-base py-[1vh] text-left"
          >
            <div class="flex flex-row items-center gap-2">
              <i :class="contactDetail.icon" />
              <h1>
                {{ contactDetail.label }}
              </h1>
            </div>

            <address v-if="contactDetail.id === 'phone' || contactDetail.id === 'email'">
              <a :href="contactDetail.href + contactDetail.content">
                {{ contactDetail.content }}
              </a>
            </address>
            <h2
              v-else
              class="w-[30vw] md:w-[20vw] max-sm:w-[40vw] lg:w-[10vw]"
            >
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
  { id: 'companyName', label: t('pages.contact.contactDetails.company'), content: 'WorldCtrl', icon: 'pi pi-building' },
  { id: 'email', label: t('pages.contact.contactDetails.email'), content: 'roomctrlinfo@gmail.com', icon: 'pi pi-envelope', href: 'mailto:' },
  { id: 'phone', label: t('pages.contact.contactDetails.phone'), content: '+48 123 123 123', icon: 'pi pi-phone', href: 'tel:' },
]
</script>

<style scoped>
.dark .p-panel {
  background-color: #1B2532;
}
</style>
