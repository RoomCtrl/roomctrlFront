<template>
  <div class="relative flex flex-col md:flex-row">
    <PrivacySection />
    <div class="px-[4vw] md:px-[25vw] pt-[6vh]">
      <div class="px-[10vw]">
        <ClientOnly>
          <Card class="bg-[#D74141]">
            <template #title>
              <h1 class="font-black text-4xl text-center py-[2vh] text-white">
                {{ $t('pages.privacyPolicy.title') }}
              </h1>
            </template>
            <template #subtitle>
              <h2 class="flex justify-center text-gray-300">
                {{ $t('pages.privacyPolicy.lastUpdate') }}
              </h2>
            </template>
          </Card>
          <template #fallback>
            <Skeleton height="10rem" />
          </template>
        </ClientOnly>
      </div>
      <PrivacyPolicyInfo />
    </div>
  </div>
</template>

<script setup>
import { Skeleton } from 'primevue'
import PrivacyPolicyInfo from '~/components/privacyPolicyPage/privacyPolicyInfo.vue'
import PrivacySection from '~/components/privacyPolicyPage/privacySection.vue'
</script>
