<template>
  <Select
    v-model="selectedLanguage"
    :options="languages"
    :option-label="fullNameDisplay ? 'fullname' : 'name'"
    option-value="code"
    placeholder="Select Language"
    @change="onLanguageSelect"
  />
</template>

<script setup lang="ts">
defineProps<{
  fullNameDisplay?: boolean
}>()
type LanguageCode = (typeof languages)[number]['code']
type LanguageSelectEvent = { value: LanguageCode }

const isLoadingLanguage = ref(false)
const { locale } = useI18n()
const selectedLanguage = ref(locale.value)
const switchLocalePath = useSwitchLocalePath()
const languages = [
  { name: 'PL', fullname: 'Polski', code: 'pl' },
  { name: 'ENG', fullname: 'English', code: 'en' },
]

const onLanguageSelect = (event: LanguageSelectEvent) => {
  const newLocale = event.value as 'pl' | 'en'
  const localePath = switchLocalePath(newLocale)
  if (localePath) {
    isLoadingLanguage.value = true
    navigateTo(localePath)
  }
}

watch(locale, (newLocale) => {
  selectedLanguage.value = newLocale
})
</script>
