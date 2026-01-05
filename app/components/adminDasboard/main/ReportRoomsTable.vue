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
          rounded
        />
      </div>
    </template>
    <template #content>
      <DataTable
        :pt="{
          root: { class: 'flex flex-col h-full' },
          table: { class: tableDisplay },
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
          class="w-[25%]"
          field="roomName"
          :header="$t('tables.headers.roomName')"
        />
        <Column
          class="w-[30%]"
          field="reporterName"
          :header="$t('tables.headers.reportedBy')"
        />
        <Column
          class="w-[25%]"
          field="description"
          :header="$t('tables.headers.description')"
        />
        <Column
          class="w-[25%]"
          field="reportedAt"
          :header="$t('tables.headers.reportDate')"
        />
        <Column
          class="w-[10%]"
          field="priority"
          :header="$t('tables.headers.priority')"
        >
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.priority"
              :severity="priorityColorClass(slotProps.data.priority)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
const { fetchIssues, issues } = useIssue()

const activeIssues = computed(() => {
  return issues.value.filter(i => !i.closedAt)
})
const { tableDisplay } = useDataTable(activeIssues, 8)

const priorityColorClass = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'danger'
    case 'high':
      return 'warn'
    case 'medium':
      return 'warn'
    default:
      return 'success'
  }
}
onMounted(async () => {
  await fetchIssues()
})
</script>
