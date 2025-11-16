<template>
  <div class="flex justify-between items-center my-3 max-lg:px-[3vw] px-[1rem] max-sm:px-[0.5rem] xl:px-[2rem]">
    <div class="flex flex-row gap-8">
      <ClientOnly>
        <NuxtLink
          :to="localePath('index')"
          class="flex-none"
        >

          <img
            v-if="darkMode"
            src="/logos/logo_dark_mode.svg"
            :alt="t('common.logoAlt')"
            class="flex h-[5vh]"
          />
          <img
            v-else
            src="/logos/logo.svg"
            :alt="t('common.logoAlt')"
            class="flex h-[5vh]"
          />

        </NuxtLink>
        <template #fallback>
          <Skeleton
            width="10rem"
            height="3rem"
          />
        </template>
      </ClientOnly>
    </div>

    <div class="hidden xl:flex flex-row w-[40rem] justify-center">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="flex-none"
      >
        <TheDropMenu :tab="tab" />
      </div>
    </div>
    <UserHeaderOptions
      :dark-mode="darkMode"
    />
    <div
      class="block xl:hidden"
    >
      <MobileHeader :tabs="tabs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheDropMenu from './headerParts/TheDropMenu.vue'
import UserHeaderOptions from './headerParts/UserHeaderOptions.vue'
import MobileHeader from './headerParts/MobileSidebar.vue'

defineProps({
  darkMode: Boolean,
})
const localePath = useLocalePath()
const { t } = useI18n()
const { user } = useAuth()
const isUserLogin = computed(() => {
  return !(Object.keys(user.value || {}).length === 0)
})
const tabs = computed(() => [
  {
    label: t('layouts.main.pages.aboutUs'),
    route: '/aboutUs',
    auth: true,
  },
  {
    label: t('layouts.main.pages.resources'),
    auth: true,
    items: [
      {
        label: t('layouts.main.pages.howThisWork.title'),
        route: '/howThisWork',
        description: t('layouts.main.pages.howThisWork.description'),
        auth: true,
      },
      {
        label: t('layouts.main.pages.rules.title'),
        route: '/rules',
        description: t('layouts.main.pages.rules.description'),
        auth: true,
      },
      {
        label: t('layouts.main.pages.faq.title'),
        route: '/faq',
        description: t('layouts.main.pages.faq.description'),
        auth: true,
      },
      {
        label: t('layouts.main.pages.privacyPolicy.title'),
        route: '/privacyPolicy',
        description: t('layouts.main.pages.privacyPolicy.description'),
        auth: true,
      },
    ],
  },
  {
    label: t('layouts.main.pages.downloadApp'),
    route: '/downloadApp',
    auth: true,
  },
  {
    label: t('layouts.main.pages.roomsArea'),
    auth: isUserLogin.value,
    items: [
      {
        label: t('layouts.main.pages.roomsList.title'),
        route: '/rooms',
        description: t('layouts.main.pages.roomsList.description'),
        auth: isUserLogin.value,
      },
      {
        label: t('layouts.main.pages.reservationHistory.title'),
        route: '/reservations/history',
        description: t('layouts.main.pages.reservationHistory.description'),
        auth: isUserLogin.value,
      },
    ],
  },
  {
    label: t('layouts.main.pages.contact'),
    route: '/contact',
    auth: true,
  },
].filter(tab => tab.auth === true))
</script>
