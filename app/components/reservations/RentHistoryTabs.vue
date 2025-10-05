<template>
  <Tabs
    value="0"
    class="lg:px-8"
  >
    <TabList>
      <Tab
        v-for="tab in tabs"
        :key="tab.title"
        :value="tab.value"
      >
        {{ tab.title }}
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel
        v-for="tab in tabs"
        :key="tab.title"
        :value="tab.value"
      >
        <ReservationCollection
          :completed="tab.completed"
          :title="tab.title"
          :reservations="tab.content"
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup lang="ts">
import { reservationsData } from '~/assets/data/reservationsData'
import ReservationCollection from '~/components/reservations/ReservationCollection.vue'

const { t } = useI18n()
const reservations = reservationsData

const currentReservations = reservations.filter(c => !isEarlierThanNow(c.startedAt))
const pastReservations = reservations.filter(c => isEarlierThanNow(c.startedAt))

const tabs = ref([
  {
    title: t('pages.reservationsHistory.incomingRent'),
    content: currentReservations,
    value: '0',
    completed: false,
  },
  {
    title: t('pages.reservationsHistory.completedRent'),
    content: pastReservations,
    value: '1',
    completed: true,
  },
])
</script>
