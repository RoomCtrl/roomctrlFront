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
import type { IIssuesDataResponse } from '~/interfaces/IssuesInterfaces'

const props = defineProps<{
  issues: IIssuesDataResponse[]
}>()

const emit = defineEmits(['FilterIssues'])

const searchTerm = ref('')
const filterStatus = ref('all')

const { t } = useI18n()

const options = ref([
  { label: t('common.filters.all'), value: 'all' },
  { label: t('pages.adminDashboard.roomIssueReports.status.pending'), value: 'pending' },
  { label: t('pages.adminDashboard.roomIssueReports.status.in_progress'), value: 'in_progress' },
  { label: t('pages.adminDashboard.roomIssueReports.status.closed'), value: 'closed' },
])

const filteredIssues = computed(() => {
  return props.issues.filter((issue) => {
    const search = searchTerm.value.toLowerCase()
    const matchesSearch
      = issue.roomName?.toLowerCase().includes(search)
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
