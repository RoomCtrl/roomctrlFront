<template>
  <Card>
    <template #content>
      <div class="flex justify-center">
        <NuxtImg
          src="/images/aboutUsPage/team.jpg"
          alt="Nasz zespół"
          class="hidden h-[20vh] rounded-lg shadow-lg sm:flex"
        />
      </div>

      <h1 class="text-4xl sm:text-5xl font-extrabold mt-12 mb-12 text-center">
        {{ $t('pages.aboutUsPage.title') }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div
          v-for="(column, index) in columns"
          :key="index"
          class="flex flex-col items-center"
        >
          <i
            :class="column.icon"
            class="pb-[3vh]"
            style="font-size: 8rem;"
          />
          <p class="text-lg font-semibold">
            {{ column.title }}
          </p>
          <p>
            {{ column.description }}
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'
import { Card } from 'primevue'

const { t } = useI18n()

const columns = [
  {
    icon: 'pi pi-lightbulb',
    title: t('pages.aboutUsPage.strategy.title'),
    description: t('pages.aboutUsPage.strategy.description'),
  },
  {
    icon: 'pi pi-microchip-ai',
    title: t('pages.aboutUsPage.innovativeTech.title'),
    description: t('pages.aboutUsPage.innovativeTech.description'),
  },
  {
    icon: 'pi pi-cog',
    title: t('pages.aboutUsPage.teamwork.title'),
    description: t('pages.aboutUsPage.teamwork.description'),
  },
]
</script>
