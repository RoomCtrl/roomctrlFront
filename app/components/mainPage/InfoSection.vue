<template>
  <Card
    pt:body:class="flex flex-col h-full justify-between"
    pt:title:class="text-2xl sm:text-3xl font-bold text-center"
    pt:content:class="flex items-center h-[85%]"
  >
    <template #title>
      {{ $t('pages.home.infoSection.title') }}
    </template>

    <template #content>
      <div class="grid grid-col-1 sm:grid-cols-2 gap-4 h-[85%]">
        <div
          v-for="info in informations"
          :key="info.title"
          class="p-sub-card border border-gray-300 rounded-lg shadow-sm p-4 text-xs sm:text-sm lg:text-base bg-white transform transition duration-300 hover:scale-[1.03] hover:shadow-lg cursor-default"
        >
          <div class="font-bold text-xl flex items-center gap-2 mb-2">
            <i
              :class="info.icon"
              style="font-size: 1.3rem;"
            />
            {{ info.title }}
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
