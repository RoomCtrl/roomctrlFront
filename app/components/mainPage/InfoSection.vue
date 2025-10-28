<template>
  <Card>
    <template #title>
      <h1 class="font-bold text-base sm:text-lg lg:text-xl">
        {{ $t('pages.home.infoSection.title') }}
      </h1>
    </template>

    <template #content>
      <div class="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="info in informations"
          :key="info.title"
          class="p-sub-card border border-gray-300 rounded-lg shadow-sm p-4 text-xs sm:text-sm lg:text-base bg-white transform transition duration-300 hover:scale-[1.03] hover:shadow-lg cursor-default"
        >
          <div class="font-bold flex items-center gap-2 mb-2">
            <i :class="info.icon" /> {{ info.title }}
          </div>
          <p>
            {{ info.content }}
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
const { t } = useI18n()

const informations = [
  {
    title: t('pages.home.infoSection.adHoc.title'),
    icon: 'pi pi-comments',
    content: t('pages.home.infoSection.adHoc.content'),
  },
  {
    title: t('pages.home.infoSection.reservations.title'),
    icon: 'pi pi-calendar-plus',
    content: t('pages.home.infoSection.reservations.content'),
  },
  {
    title: t('pages.home.infoSection.queuing.title'),
    icon: 'pi pi-sort-amount-down-alt',
    content: t('pages.home.infoSection.queuing.content'),
  },
  {
    title: t('pages.home.infoSection.schools.title'),
    icon: 'pi pi-book',
    content: t('pages.home.infoSection.schools.content'),
  },
  {
    title: t('pages.home.infoSection.business.title'),
    icon: 'pi pi-briefcase',
    content: t('pages.home.infoSection.business.content'),
  },
]
</script>

<style scoped>
.dark .p-sub-card {
  background-color: #404040;
}
</style>
