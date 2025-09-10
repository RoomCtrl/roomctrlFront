<template>
  <header class="flex justify-between lg:justify-evenly items-center my-3 max-lg:mx-3">
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

    <div class="hidden lg:flex flex-row gap-5 w-[40rem] justify-center">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="flex-none"
      >
        <TheDropMenu :tab="tab" />
      </div>
    </div>
    <UserHeaderOptions :dark-mode="darkMode" />
    <div
      class="block lg:hidden"
    >
      <MobileHeader :tabs="tabs" />
    </div>
  </header>
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
    label: t('layouts.main.pages.howThisWork'),
    route: 'howThisWork',
    auth: true,
  },
  {
    label: 'Dokumentacja',
    auth: true,
    items: [
      {
        label: t('layouts.main.pages.rules'),
        route: 'rules',
        description: 'Poznaj regulamin strony.',
        auth: true,
      },
      {
        label: t('layouts.main.pages.privacyPolicy'),
        route: 'privacyPolicy',
        description: 'Zaponzaj się z naszą polityką prywatności.',
        auth: true,
      },
      {
        label: t('layouts.main.pages.faq'),
        route: 'faq',
        description: 'Najczęsciej zadawane pytania.',
        auth: true,
      },
    ],
  },
  {
    label: t('layouts.main.pages.aboutUs'),
    route: 'aboutUs',
    auth: true,
  },
  {
    label: t('layouts.main.pages.contact'),
    route: 'contact',
    auth: true,
  },
  {
    label: t('layouts.main.pages.downloadApp'),
    route: 'downloadApp',
    auth: true,
  },
  {
    label: 'Moje sale',
    auth: isUserLogin.value,
    items: [
      {
        label: 'Wszystkie sale',
        auth: isUserLogin.value,
      },
    ],
  },
].filter(tab => tab.auth === true))
</script>
