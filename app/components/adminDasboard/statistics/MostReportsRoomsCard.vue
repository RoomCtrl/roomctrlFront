<template>
  <Card class="w-full md:w-[calc(33.333%-0.35rem)]">
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.mostReportedRooms') }}
        </h3>
        <i class="pi pi-exclamation-circle text-yellow-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div class="space-y-3">
        <div
          v-for="(room, index) in reportedRooms"
          :key="room.id"
          class="flex items-center justify-between p-3 rounded bg-gray-100 dark:bg-gray-800"
        >
          <div class="flex items-center gap-3">
            <span class="font-semibold text-lg w-8 text-center">{{ index + 1 }}</span>
            <div>
              <p class="font-medium">
                {{ room.name }}
              </p>
              <p class="text-sm text-gray-500">
                {{ room.reports }} {{ $t('pages.adminDashboard.statistics.reports') }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <Tag
              :value="`${room.severity}`"
              :severity="getSeverity(room.severity)"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
const reportedRooms = ref([
  { id: 1, name: 'Sala nr 208', reports: 12, severity: 'high' },
  { id: 2, name: 'Sala Konferencyjna A', reports: 8, severity: 'high' },
  { id: 3, name: 'Sala Główna', reports: 5, severity: 'medium' },
  { id: 4, name: 'Sala nr 215', reports: 3, severity: 'medium' },
  { id: 5, name: 'Sala Spotkań B', reports: 2, severity: 'low' },
])

const getSeverity = (severity) => {
  const severityMap = {
    high: 'danger',
    medium: 'warning',
    low: 'info',
  }
  return severityMap[severity]
}
</script>
