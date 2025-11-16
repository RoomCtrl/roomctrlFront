<template>
  <div class="flex flex-col gap-40 w-full h-full">
    <Card
      pt:caption:class="text-center mb-5"
      pt:title:class="text-2xl sm:text-3xl font-bold"
      pt:body:class="h-full"
    >
      <template #title>
        {{ $t('pages.home.goodBadSection.title') }}
      </template>
      <template #subtitle>
        {{ $t('pages.home.goodBadSection.subTitle') }}
      </template>
    </Card>
    <div class="flex flex-row justify-between h-full gap-6">
      <div
        v-for="section in sections"
        :key="section.id"
        class="w-full"
      >
        <div :class="[section.backgroundColor, section.textColor, 'relative group rounded-xl shadow-lg p-6 animate-fade-in-up transition-all duration-700']">
          <h3 class="text-xl font-bold flex items-center gap-2">
            <i
              :class="section.titleIcon"
              style="font-size: 1.5rem;"
            />
            {{ section.title }}
          </h3>

          <ul class="mt-4 space-y-2 list-disc list-inside">
            <li
              v-for="item in section.list"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>

          <div
            class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-3 transition-all duration-300"
          >
            <i
              :class="section.animationIcon"
              style="font-size: 60px;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const colorMode = useColorMode()

const isDarkMode = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  },
})

const sections = computed(() => [
  {
    id: 'good',
    titleIcon: 'pi pi-check-circle',
    title: t('common.roomCtrl'),
    list: [
      t('pages.home.goodBadSection.goodSection.intuitive'),
      t('pages.home.goodBadSection.goodSection.automatic'),
      t('pages.home.goodBadSection.goodSection.support'),
      t('pages.home.goodBadSection.goodSection.modern'),
    ],
    backgroundColor: 'bg-green-800/90',
    textColor: isDarkMode.value ? 'text-green-400' : 'text-green-800',
    animationIcon: 'pi pi-thumbs-up',
  },
  {
    id: 'bad',
    titleIcon: 'pi pi-times-circle',
    title: t('pages.home.goodBadSection.badSection.title'),
    list: [
      t('pages.home.goodBadSection.badSection.reservations'),
      t('pages.home.goodBadSection.badSection.noAutomation'),
      t('pages.home.goodBadSection.badSection.noAccess'),
      t('pages.home.goodBadSection.badSection.lowAvailability'),
    ],
    backgroundColor: 'bg-red-800/90',
    textColor: isDarkMode.value ? 'text-red-400' : 'text-red-800',
    animationIcon: 'pi pi-thumbs-down',
  },
])
</script>
