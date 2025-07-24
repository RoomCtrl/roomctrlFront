<template>
  <div class="flex gap-4">
    <Drawer
      v-model:visible="visible"
      header="Menu"
      position="right"
    >
      <div class="flex flex-col gap-4 mt-2">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
        >
          <NuxtLink :to="tab.link">{{ tab.name }}</NuxtLink>
        </div>
        <Button
          v-if="!user"
          as="a"
          :label="t('common.buttons.logIn')"
          :href="localePath('login')"
        />
        <Button
          v-else
          :label="t('common.buttons.logOut')"
          @click="handleLogout"
        />
        <div class="flex flex-row justify-between">
          <div class="flex items-center">
            <i class="pi pi-sun mr-2" />
            <ToggleSwitch
              v-model="isDarkMode"
              class="mx-2"
            />
            <i class="pi pi-moon ml-2" />
          </div>

          <Select
            v-model="selectedLanguage"
            :options="languages"
            option-label="name"
            option-value="code"
            placeholder="Select Language"
            @change="onLanguageSelect"
          />
        </div>
      </div>
    </Drawer>
    <Button
      icon="pi pi-bars"
      @click="visible = true"
    />
  </div>
</template>

<script setup lang="ts">
import type { IGetUserProfileResponse } from '~/interfaces/RepositoriesInterface'

const localePath = useLocalePath()
const { t, locale } = useI18n()
const selectedLanguage = ref(locale.value)
const switchLocalePath = useSwitchLocalePath()

const visible = ref(false)
const { user, logout } = useAuth() as {
  user: Ref<IGetUserProfileResponse | null>
  logout: () => Promise<void>
}

const handleLogout = async () => {
  await logout()
}

const tabs = computed(() => [
  {
    name: t('layouts.main.contact'),
    link: 'contact',
  },
  {
    name: t('layouts.main.aboutAs'),
    link: 'aboutUs',
  },
])

const colorMode = useColorMode()
const isLoadingLanguage = ref(false)
type LanguageCode = (typeof languages)[number]['code']
type LanguageSelectEvent = { value: LanguageCode }

const languages = [
  { name: 'PL', code: 'pl' },
  { name: 'ENG', code: 'en' },
]

const onLanguageSelect = (event: LanguageSelectEvent) => {
  const newLocale = event.value as 'pl' | 'en'
  const localePath = switchLocalePath(newLocale)
  if (localePath) {
    isLoadingLanguage.value = true
    navigateTo(localePath)
  }
}

const isDarkMode = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  },
})

watch(locale, (newLocale) => {
  selectedLanguage.value = newLocale
})
</script>
