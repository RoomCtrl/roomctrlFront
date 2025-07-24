<template>
  <div>
    <div class="hidden md:flex flex-row gap-4">
      <ClientOnly class="flex">
        <template #fallback>
          <Skeleton
            width="12rem"
            height="3rem"
          />
        </template>
        <Select
          v-model="selectedLanguage"
          :options="languages"
          option-label="name"
          option-value="code"
          placeholder="Select Language"
          @change="onLanguageSelect"
        />
      </ClientOnly>

      <ClientOnly>
        <div class="flex items-center">
          <i class="pi pi-sun mr-2" />
          <ToggleSwitch
            v-model="isDarkMode"
            class="mx-2"
          />
          <i class="pi pi-moon ml-2" />
        </div>
      </ClientOnly>
      <Button
        v-if="!user"
        as="a"
        :label="t('common.buttons.logIn')"
        :href="localePath('login')"
      />
      <UserAvatar v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'primevue'
import UserAvatar from './UserAvatar.vue'

const { user } = useAuth()
const localePath = useLocalePath()

const colorMode = useColorMode()
const isLoadingLanguage = ref(false)
type LanguageCode = (typeof languages)[number]['code']
type LanguageSelectEvent = { value: LanguageCode }
const { t, locale } = useI18n()
const isDarkMode = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  },
})

const languages = [
  { name: 'PL', code: 'pl' },
  { name: 'ENG', code: 'en' },
]

const selectedLanguage = ref(locale.value)

watch(locale, (newLocale) => {
  selectedLanguage.value = newLocale
})

const switchLocalePath = useSwitchLocalePath()

const onLanguageSelect = (event: LanguageSelectEvent) => {
  const newLocale = event.value as 'pl' | 'en'
  const localePath = switchLocalePath(newLocale)
  if (localePath) {
    isLoadingLanguage.value = true
    navigateTo(localePath)
  }
}
</script>
