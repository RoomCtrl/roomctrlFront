<template>
  <DataView
    :value="filteredIssues"
    pt:root:class="h-full w-full"
    pt:emptyMessage:class="flex flex-col justify-center items-center h-[43.5rem]"
    :sortOrder="sortOrder"
    :sortField="sortField"
    layout="grid"
    paginator
    :rows="6"
  >
    <template #header>
      <div class="flex flex-row justify-between">
        <ReportDataFilters
          :issues="issues"
          @filter-issues="handleFilterIssues"
        />
        <Select
          v-model="sortKey"
          :options="sortOptions"
          optionLabel="label"
          aria-label="Sort by priority"
          @change="onSortChange($event)"
        >
          <template #value="slotProps">
            <i
              v-if="slotProps.value"
              :class="slotProps.value.icon"
            />
          </template>
        </Select>
      </div>
    </template>
    <template #grid="slotProps">
      <div class="grid grid-cols-2 grid-rows-3">
        <Card
          v-for="issue in slotProps.items"
          :key="issue.id"
          pt:caption:style="--p-card-caption-gap: 0"
          class="shadow-sm hover:shadow-md transition-shadow m-2"
        >
          <template #title>
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-3">
                <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-semibold">
                  {{ issue.roomName }}
                </div>
                <span :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusColor(issue.status)]">
                  {{ $t('pages.adminDashboard.roomIssueReports.status.' + issue.status) }}
                </span>
              </div>
              <div class="text-right">
                <div class="text-base opacity-60">
                  {{ formatReportedAt(issue.reportedAt).date }}
                </div>
                <div class="text-sm opacity-60">
                  {{ formatReportedAt(issue.reportedAt).time }}
                </div>
              </div>
            </div>
          </template>

          <template #content>
            <div class="mb-3">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {{ $t('pages.adminDashboard.roomIssueReports.category.' + issue.category) }}
                </span>
                <span :class="['text-sm font-semibold', getPriorityColor(issue.priority)]">
                  • {{ $t('pages.adminDashboard.roomIssueReports.priority.'+ issue.priority) }}
                </span>
              </div>
              <p class="text-base truncate">
                {{ issue.description }}
              </p>
            </div>
            <div class="flex items-center justify-between pt-3 border-t">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('pages.adminDashboard.roomIssueReports.reported') }}
                <span class="font-medium text-black dark:text-white">{{ issue.reporterName }}</span>
              </div>
              <div class="flex gap-2">
                <Button
                  v-if="issue.status === 'pending'"
                  :label="$t('common.buttons.start')"
                  severity="warn"
                  size="small"
                  @click="updateStatus(issue.id, 'in_progress')"
                />
                <Button
                  v-if="issue.status === 'in_progress'"
                  :label="$t('common.buttons.close')"
                  severity="success"
                  size="small"
                  @click="updateStatus(issue.id, 'closed')"
                />
                <ReportDetailsModal :issueId="issue.id" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </template>
    <template #empty>
      <i
        class="pi pi-exclamation-triangle"
        style="font-size: 4rem"
      />
      <p class="text-lg">
        {{ $t('pages.adminDashboard.roomIssueReports.empty') }}
      </p>
    </template>
  </DataView>
</template>

<script setup lang="ts">
import type { IIssuesDataResponse } from '~/interfaces/IssuesInterfaces'
import ReportDataFilters from './ReportDataFilters.vue'
import ReportDetailsModal from './ReportDetailsModal.vue'

const props = defineProps<{
  issues: IIssuesDataResponse[]
}>()

const { updateIssueStatusOrPriority } = useIssue()

const filteredIssues = ref([...props.issues])
const sortKey = ref()
const sortOrder = ref()
const sortField = ref()
const sortOptions = ref([
  { label: 'Ważnosc od najwazniejszych', icon: 'pi pi-sort-amount-down', value: '!priority' },
  { label: 'Waznosc od najmniej waznych', icon: 'pi pi-sort-amount-up', value: 'priority' },
])

const updateStatus = async (id: string, newStatus: string) => {
  await updateIssueStatusOrPriority(id, { status: newStatus })
}

const handleFilterIssues = (issues: any[]) => {
  filteredIssues.value = [...issues]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'
    case 'in_progress': return 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100'
    case 'closed': return 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'
    default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-red-700 dark:text-red-500'
    case 'high': return 'text-orange-700 dark:text-orange-500'
    case 'medium': return 'text-yellow-700 dark:text-yellow-500'
    case 'low': return 'text-green-700 dark:text-green-500'
    default: return 'text-gray-600 dark:text-gray-500'
  }
}

const formatReportedAt = (reportedAt: string) => {
  const [date, time] = reportedAt.split(' ')
  return { date, time }
}

const onSortChange = (event) => {
  const value = event.value.value
  const sortValue = event.value

  if (value.indexOf('!') === 0) {
    sortOrder.value = -1
    sortField.value = value.substring(1, value.length)
    sortKey.value = sortValue
  }
  else {
    sortOrder.value = 1
    sortField.value = value
    sortKey.value = sortValue
  }
}
</script>

<style scoped>
.dark .p-card {
  background-color: var(--p-gray-900);
}
</style>
