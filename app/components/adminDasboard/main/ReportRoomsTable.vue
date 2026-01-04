<template>
  <Card
    pt:root:style="--p-card-body-padding:  0.2rem 0rem 0rem 0rem "
    pt:caption:class="h-full"
    pt:title:class="h-full"
    pt:body:class="flex justify-between h-full"
    pt:content:class="flex flex-col justify-between"
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
          root: {
            class: 'h-full flex flex-col',
          },
          tableContainer: { class: 'flex flex-col justify-end' },
        }"
        :value="reservations"
        paginator
        size="small"
        :rows="8"
      >
        <Column
          class="w-[20%]"
          field="roomName"
          :header="$t('tables.headers.roomName')"
        />
        <Column
          class="w-[15%]"
          field="reporterName"
          :header="$t('tables.headers.reportedBy')"
        />
        <Column
          class="w-[35%]"
          field="description"
          :header="$t('tables.headers.description')"
        />
        <Column
          class="w-[20%]"
          field="reportedAt"
          :header="$t('tables.headers.reportDate')"
        />
        <Column
          class="w-[20%]"
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
const { fetchIssues } = useIssue()
const reservations = await fetchIssues()

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
</script>
