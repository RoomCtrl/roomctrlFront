<template>
  <DataView
    :value="filteredIssues"
    pt:header:class="flex flex-row justify-between"
    pt:emptyMessage:class="flex flex-col justify-center items-center h-[43.5rem]"
    :sortOrder="sortOrder"
    :sortField="sortField"
    layout="grid"
    paginator
    :rows="6"
  >
    <template #header>
      <ReportDataFilters :issues="issues" @FilterIssues="handleFilterIssues" class=""/>
      <Select v-model="sortKey" :options="sortOptions" optionLabel="label" @change="onSortChange($event)"/>
    </template>
    <template #grid="slotProps">
      <div class="grid grid-cols-2 grid-rows-3">
        <Card
        pt:caption:style="--p-card-caption-gap: 0"
          v-for="issue in slotProps.items"
          :key="issue.id"
          class="shadow-sm hover:shadow-md transition-shadow m-2"
        >
          <template #title>
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-3">
                <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-semibold">
                  {{ issue.room }}
                </div>
                <span :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusColor(issue.status)]">
                  {{ $t('pages.adminDashboard.roomIssueReports.status.' + issue.status) }}
                </span>
              </div>
              <div class="text-right">
                <div class="text-base opacity-60">
                  {{ issue.date }}
                </div>
                <div class="text-sm opacity-60">
                  {{ issue.time }}
                </div>
              </div>
            </div>
          </template>

          <template #content>
            <div class="mb-3">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-100/50">{{ issue.category }}</span>
                <span :class="['text-sm font-semibold', getPriorityColor(issue.priority)]">
                  • {{ $t('pages.adminDashboard.roomIssueReports.priority.'+ issue.priority) }}
                </span>
              </div>
              <p class="text-base truncate">
                {{ issue.description }}
              </p>
            </div>
            <div class="flex items-center justify-between pt-3 border-t">
              <div class="text-sm text-gray-500 dark:text-gray-100/50">
                {{ $t('pages.adminDashboard.roomIssueReports.reported') }}
                <span class="font-medium">{{ issue.reporter }}</span>
              </div>
              <div class="flex gap-2">
                <Button
                  v-if="issue.status === 'new'"
                  label="Rozpocznij"
                  severity="warn"
                  size="small"
                  @click="updateStatus(issue.id, 'inProgress')"
                />
                <Button
                  v-if="issue.status === 'inProgress'"
                  label="Zamknij"
                  severity="success"
                  size="small"
                  @click="updateStatus(issue.id, 'closed')"
                />
                <ReportDetailsModal :selectedIssue="issue"/>
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
import ReportDataFilters from './ReportDataFilters.vue';
import ReportDetailsModal from './ReportDetailsModal.vue';

const props = defineProps<{
  issues: Array<{
    id: number
    room: string
    category: string
    description: string
    priority: string
    status: string
    reporter: string
    date: string
    time: string
    activityLog: [{
      action: string
      date: string
      time: string
      user: string
    }]
    notes: Array<string>
  }>
}>()

const filteredIssues = ref([...props.issues])
const colorMode = useColorMode()
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
    {label: 'Price High to Low', value: '!priority'},
    {label: 'Price Low to High', value: 'priority'},
]);


const isDarkMode = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  },
})

const updateStatus = (id: number, newStatus: string) => {
  const issue = props.issues.find(i => i.id === id)
  if (issue) {
    issue.status = newStatus
  }
}

const handleFilterIssues = (issues: any[]) => {
  filteredIssues.value = [...issues]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800'
    case 'inProgress': return 'bg-yellow-100 text-yellow-800'
    case 'closed': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority: string) => {

  switch (priority) {
    case 'critical': return 'text-red-600'
    case 'high': return 'text-orange-600'
    case 'mid': return 'text-yellow-600'
    case 'low': return 'text-green-600'
    default: return 'text-gray-600'
  }
}

const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    }
    else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};
</script>