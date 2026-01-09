<template>
  <Card
    pt:root:style="--p-card-body-padding:  0.2rem 0rem 0rem 0rem "
    pt:body:class=" h-full"
    pt:content:class="h-full"
  >
    <template #title>
      <div class="flex flex-row justify-between items-center h-full px-2">
        <h1 class="font-bold text-3xl text-center self-center w-full">
          {{ $t('pages.adminDashboard.dashboard.tables.titles.reportRooms') }}
        </h1>
        <Button
          v-tooltip.left="{ value: $t('pages.adminDashboard.dashboard.tables.tooltip') }"
          icon="pi pi-arrow-right"
          variant="outlined"
          as="a"
          :href="localePath('/adminDashboard/roomIssueReports')"
          rounded
        />
      </div>
    </template>
    <template #content>
      <DataTable
        :pt="{
          root: { class: 'flex flex-col' },
          table: { class: tableDisplay },
          headerRow: { class: tableHeaderDisplay },
        }"
        :value="activeIssues"
        paginator
        size="small"
        :rows="8"
      >
        <template #empty>
          <h1 class="flex justify-center items-center text-xl font-semibold min-h-[10rem]">
            {{ $t('tables.emptyMessages.noRoom') }}
          </h1>
        </template>
        <Column
          style="width: 15%;"
          field="roomName"
          :header="$t('tables.headers.roomName')"
        />
        <Column
          style="width: 20%;"
          field="reporterName"
          :header="$t('tables.headers.reportedBy')"
        />
        <Column
          style="width: 25%;"
          field="description"
          :header="$t('tables.headers.description')"
        />
        <Column
          style="width: 15%;"
          field="reportedAt"
          :header="$t('tables.headers.reportDate')"
        />
        <Column
          style="width: 10%;"
          field="priority"
          :header="$t('tables.headers.priority')"
        >
          <template #body="slotProps">
            <div :class="getPriorityColor(slotProps.data.priority)">
              {{ $t(`pages.adminDashboard.roomIssueReports.priority.${slotProps.data.priority}`) }}
            </div>
          </template>
        </Column>
        <Column
          style="width: 15%;"
          field="status"
          :header="$t('tables.headers.status')"
        >
          <template #body="slotProps">
            <Tag
              :value="$t(`pages.adminDashboard.roomIssueReports.status.${slotProps.data.status}`)"
              :severity="statusColorClass(slotProps.data.status)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
const { fetchIssues, issues } = useIssue()

const localePath = useLocalePath()

const activeIssues = computed(() => {
  return issues.value.filter(i => !i.closedAt)
})

const { tableDisplay, tableHeaderDisplay } = useDataTable(activeIssues, 4)

await fetchIssues()

const statusColorClass = (status: string) => {
  switch (status) {
    case 'pending':
      return 'info'
    case 'in_progress':
      return 'warn'
    case 'closed':
      return 'success'
    default:
      return 'help'
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
</script>

<style scoped>
.p-datatable {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
