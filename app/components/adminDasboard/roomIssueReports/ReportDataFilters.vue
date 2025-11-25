<template>
  <div class="flex w-full pr-4">
    <div class="flex-1 relative">
      <FloatLabel variant="on">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            id="searchTerm"
            v-model="searchTerm"
            type="text"
            class="w-[20rem]"
          />
        </IconField>
        <label for="searchTerm">Szukaj po sali</label>
      </FloatLabel>
    </div>

    <div class="flex items-center gap-2">
      <i class="pi pi-filter" />
      <Select
        v-model="filterStatus"
        :options="options"
        optionLabel="label"
        optionValue="value"
        aria-label="filter by Status"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

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
    notes: {
      text: string
      author: string
      date: string
    }[]
  }>
}>()

const emit = defineEmits(['FilterIssues'])

const searchTerm = ref('')
const filterStatus = ref('all')

const { t } = useI18n()

const options = ref([
  { label: t('common.filters.all'), value: 'all' },
  { label: t('pages.adminDashboard.roomIssueReports.status.new'), value: 'new' },
  { label: t('pages.adminDashboard.roomIssueReports.status.inProgress'), value: 'inProgress' },
  { label: t('pages.adminDashboard.roomIssueReports.status.closed'), value: 'closed' },
])

const filteredIssues = computed(() => {
  return props.issues.filter((issue) => {
    const search = searchTerm.value.toLowerCase()
    const matchesSearch
      = issue.room?.toLowerCase().includes(search)
        || issue.description?.toLowerCase().includes(search)

    const matchesFilter
      = filterStatus.value === 'all' || issue.status === filterStatus.value

    return matchesSearch && matchesFilter
  })
})

watch([searchTerm, filterStatus, () => props.issues], () => {
  emit('FilterIssues', filteredIssues.value)
})

onMounted(() => {
  emit('FilterIssues', props.issues)
})
</script>
