<template>
  <Card>
    <template #content>
      <h1 class="text-4xl sm:text-5xl font-extrabold mt-12 mb-12 text-center">
        {{ $t('pages.aboutUs.title') }}
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
const { t } = useI18n()

const columns = [
  {
    icon: 'pi pi-lightbulb',
    title: t('pages.aboutUs.strategy.title'),
    description: t('pages.aboutUs.strategy.description'),
  },
  {
    icon: 'pi pi-microchip-ai',
    title: t('pages.aboutUs.innovativeTech.title'),
    description: t('pages.aboutUs.innovativeTech.description'),
  },
  {
    icon: 'pi pi-cog',
    title: t('pages.aboutUs.teamwork.title'),
    description: t('pages.aboutUs.teamwork.description'),
  },
]
</script>
