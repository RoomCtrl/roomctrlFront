<template>
  <div class="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="info in informations"
      :key="info.title"
      class="info-card"
    >
      <div class="info-icon-wrapper">
        <i :class="info.icon" />
      </div>
      <div>
        <h3 class="info-title">
          {{ info.title }}
        </h3>
        <p class="info-text">
          {{ info.content }}
        </p>
      </div>
    </div>
  </div>
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
  {
    title: 'Notyfikacje w czasie rzeczywistym',
    icon: 'pi pi-bell',
    content: 'Otrzymuj powiadomienia o zbliżających się rezerwacjach i ważnych zmianach w czasie rzeczywistym',
  },
  {
    title: 'Raporty i Statystyki',
    icon: 'pi pi-chart-line',
    content: 'Analizuj wykorzystanie sal dzięki szczegółowym raportom i wizualizacjom danych',
  },
]
</script>

<style scoped>
.info-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}
.dark .info-card {
  background: var(--p-gray-800);
  box-shadow: 0 4px 16px rgba(161, 158, 158, 0.06);
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.info-icon-wrapper {
  width: 60px;
  height: 60px;
  background: #eff6ff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: #6366f1;
  flex-shrink: 0;
}

.dark .info-icon-wrapper {
  background: var(--p-gray-700);
  color: white;
}
.info-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.info-text {
  color: #6b7280;
  line-height: 1.6;
}

.dark .info-text {
  color: #d1d5db;
}
</style>
