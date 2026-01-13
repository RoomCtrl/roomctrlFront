<template>
  <div class="flex flex-col w-full gap-4">
    <Toast />
    <ConfirmDialog />
    <div class="flex flex-row justify-between gap-4">
      <Card>
        <template #content>
          <h1 class="font-extrabold text-4xl">
            {{ $t('pages.myRoomReports.title') }}
          </h1>
        </template>
      </Card>
    </div>
    <DataTable
      v-model:filters="filters"
      :pt="{
        root: { class: 'flex flex-col h-full' },
        table: { class: tableDisplay },
      }"
      :value="fetchedIssues"
      filterDisplay="row"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPageOptions"
      size="small"
      paginator
      removableSort
      :paginatorPosition="paginatorPosition"
      @update:rows="handleUpdateRows"
      @filter="onFilter"
    >
      <BaseTextFilterColumn
        :key="'roomName'"
        field="roomName"
        :header="$t('tables.headers.roomName')"
        class="w-[20%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'categoryTranslated'"
        field="categoryTranslated"
        :header="$t('tables.headers.category')"
        class="w-[20%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'description'"
        field="description"
        :header="$t('tables.headers.description')"
        class="w-[20%]"
        sortable
        filter
      />
      <BaseSelectTagFilter
        :key="'status'"
        field="status"
        :options="statusOptions"
        translationPrefix="pages.adminDashboard.roomIssueReports.status."
        :header="$t('tables.headers.status')"
        class="w-[10%]"
        optionLabel="label"
        optionValue="value"
        sortable
        :statusColor="statusColor"
        filter
      />
      <BaseSelectFilterColumn
        :key="'priority'"
        field="priority"
        :options="priorityOptions"
        :header="$t('tables.headers.priority')"
        class="w-[5%]"
        sortable
        filter
      >
        <template #body="slotProps">
          <span :class="getPriorityColor(slotProps.data.priority)">
            {{ $t(`pages.adminDashboard.roomIssueReports.priority.${slotProps.data.priority}`) }}
          </span>
        </template>
      </BaseSelectFilterColumn>
      <BaseDateFilterColumn
        :key="'reportedAtDate'"
        field="reportedAt"
        :header="$t('tables.headers.reportDate')"
        class="w-[5%]"
        sortable
        filter
      />
      <BaseDateFilterColumn
        :key="'reportedAtTime'"
        field="reportedAtTime"
        :header="$t('tables.headers.reportTime')"
        class="w-[5%]"
        sortable
        filter
        onlyTime
      />
      <BaseDateFilterColumn
        :key="'closedAt'"
        field="closedAt"
        :header="$t('tables.headers.closedAt')"
        class="w-[5%]"
        sortable
        filter
      >
        <template #body="slotProps">
          <span v-if="slotProps.data.closedAt">
            {{ new Date(slotProps.data.closedAt).toLocaleDateString() }}
          </span>
          <span v-else>
            Otwarte
          </span>
        </template>
      </BaseDateFilterColumn>
      <template #empty>
        <h1 class="flex justify-center items-center min-h-[60vh] font-bold text-2xl">
          {{ $t('pages.adminDashboard.roomIssueReports.notFoundIssues') }}
        </h1>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api'
import { onMounted } from 'vue'
import BaseTextFilterColumn from '~/components/common/datatable/columns/BaseTextFilterColumn.vue'
import BaseDateFilterColumn from '~/components/common/datatable/columns/BaseDateFilterColumn.vue'
import BaseSelectTagFilter from '~/components/common/datatable/columns/BaseSelectTagFilter.vue'
import BaseSelectFilterColumn from '~/components/common/datatable/columns/BaseSelectFilterColumn.vue'

definePageMeta({
  middleware: 'auth',
})

const { fetchCurrentUserIssues, issues } = useIssue()
const { t } = useI18n()
const { rows, rowsPerPageOptions, paginatorPosition, tableDisplay, handleUpdateRows, onFilter } = useDataTable(issues, 15)

const statusOptions = ref([
  { label: t('pages.adminDashboard.roomIssueReports.status.pending'), value: 'pending' },
  { label: t('pages.adminDashboard.roomIssueReports.status.in_progress'), value: 'in_progress' },
  { label: t('pages.adminDashboard.roomIssueReports.status.closed'), value: 'closed' },
])

const priorityOptions = ref([
  { label: t('pages.adminDashboard.roomIssueReports.priority.low'), value: 'low' },
  { label: t('pages.adminDashboard.roomIssueReports.priority.medium'), value: 'medium' },
  { label: t('pages.adminDashboard.roomIssueReports.priority.high'), value: 'high' },
  { label: t('pages.adminDashboard.roomIssueReports.priority.critical'), value: 'critical' },
])

const fetchedIssues = computed(() => {
  if (!issues.value) return []
  return issues.value.map(issue => ({
    ...issue,
    categoryTranslated: t('pages.adminDashboard.roomIssueReports.category.' + issue.category),
    reportedAtTime: issue.reportedAt,
    closedAtTime: issue.closedAt,
  }))
})

const filters = ref({
  roomName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  categoryTranslated: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  priority: { value: null, matchMode: FilterMatchMode.EQUALS },
  reportedAt: { value: null, matchMode: 'customDateFilter' },
  reportedAtTime: { value: null, matchMode: 'customTimeFilter' },
  closedAt: { value: null, matchMode: 'customDateFilter' },
  closedAtTime: { value: null, matchMode: 'customTimeFilter' },
})

const statusColor = computed(() => ({
  pending: 'info',
  closed: 'success',
  in_progress: 'warn',
}))

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-red-700 dark:text-red-500'
    case 'high': return 'text-orange-700 dark:text-orange-500'
    case 'medium': return 'text-yellow-700 dark:text-yellow-500'
    case 'low': return 'text-green-700 dark:text-green-500'
    default: return 'text-gray-600 dark:text-gray-500'
  }
}

onMounted(async () => {
  await fetchCurrentUserIssues()
})
</script>
