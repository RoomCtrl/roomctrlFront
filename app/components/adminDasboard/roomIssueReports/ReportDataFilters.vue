<template>
  <div class="flex gap-4">
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
    notes: Array<string>
  }>
}>()

const emit = defineEmits(['FilterIssues'])

const searchTerm = ref('')
const filterStatus = ref('all')

const options = ref([
  { label: 'Wszystkie', value: 'all' },
  { label: 'Nowe', value: 'new' },
  { label: 'W trakcie', value: 'inProgress' },
  { label: 'Zamknięte', value: 'closed' },
])

const filteredIssues = computed(() => {
  return props.issues.filter((issue) => {
    const search = searchTerm.value.toLowerCase()
    const matchesSearch =
      issue.room?.toLowerCase().includes(search) ||
      issue.description?.toLowerCase().includes(search)

    const matchesFilter =
      filterStatus.value === 'all' || issue.status === filterStatus.value

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
