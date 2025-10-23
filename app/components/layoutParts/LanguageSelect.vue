<template>
  <Select
    v-model="selectedLanguage"
    :options="languages"
    :size="size"
    option-label="name"
    option-value="code"
    placeholder="Select Language"
    class="w-[7rem]"
    variant="filled"
    @change="onLanguageSelect"
  />
</template>

<script setup lang="ts">
type LanguageCode = (typeof languages)[number]['code']
type LanguageSelectEvent = { value: LanguageCode }

defineProps<{
  size: string
}>()

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const selectedLanguage = ref(locale.value)
const isLoadingLanguage = ref(false)

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

watch(locale, (newLocale) => {
  selectedLanguage.value = newLocale
})
</script>
