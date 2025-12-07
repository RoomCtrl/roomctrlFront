<template>
  <div class="flex items-center gap-2">
    <Button
      v-bind="$attrs"
      class="p-button-lg"
      :icon="`pi ${showFilters ? 'pi-filter-fill' : 'pi-filter'}`"
      :rounded="true"
      :text="true"
      severity="secondary"
      @click="toggleFilters"
    />
    <div
      v-if="showFilters"
      class="absolute top-24 left-4 z-50 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 w-80"
    >
      <div class="flex flex-col gap-4">
        <!-- Status Filter -->
        <div class="flex flex-col gap-2">
          <label
            id="status-filter"
            class="font-semibold text-sm"
          >{{ $t('pages.rooms.filters.status') || 'Status' }}</label>
          <div
            aria-labelledby="status-filter"
            class="flex flex-wrap gap-2"
          >
            <Button
              v-for="stat in statuses"
              :key="stat.code"
              :label="stat.name"
              :outlined="selectedStatus !== stat.code"
              :severity="getStatusSeverity(stat.code)"
              size="small"
              @click="selectedStatus = selectedStatus === stat.code ? null : stat.code"
            />
          </div>
        </div>

        <!-- Capacity Filter -->
        <div class="flex flex-col gap-2">
          <label
            id="capacity-label"
            class="font-semibold text-sm"
          >{{ $t('pages.rooms.filters.capacity') || 'Capacity' }}</label>
          <Slider
            aria-labelledby="capacity-label"
            :model-value="selectedCapacity ?? 0"
            :min="0"
            :max="maxCapacity"
            :step="1"
            class="w-full"
            @update:model-value="handleCapacityChange"
          />
          <span class="text-xs text-gray-600 dark:text-gray-400">
            {{ selectedCapacity ? `Min: ${selectedCapacity} ${$t('common.persons') || 'persons'}` : 'All' }}
          </span>
        </div>

        <!-- Size Filter -->
        <div class="flex flex-col gap-2">
          <label
            id="size-label"
            class="font-semibold text-sm"
          >{{ $t('pages.rooms.filters.size') || 'Size' }}</label>
          <Slider
            aria-labelledby="size-label"
            :model-value="selectedSize ?? 0"
            :min="0"
            :max="maxSize"
            :step="1"
            class="w-full"
            @update:model-value="handleSizeChange"
          />
          <span class="text-xs text-gray-600 dark:text-gray-400">
            {{ selectedSize ? `Min: ${selectedSize} m²` : 'All' }}
          </span>
        </div>

        <!-- Room Name Search -->
        <div class="flex flex-col gap-2">
          <label
            for="room-name-filter"
            class="font-semibold text-sm"
          >{{ $t('pages.rooms.filters.roomName') || 'Room Name' }}</label>
          <InputText
            id="room-name-filter"
            v-model="searchName"
            :placeholder="$t('pages.rooms.filters.searchPlaceholder') || 'Search...'"
            class="w-full"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2 justify-end">
          <Button
            :label="$t('common.reset') || 'Reset'"
            severity="secondary"
            size="small"
            @click="resetFilters"
          />
          <Button
            :label="$t('common.apply') || 'Apply'"
            size="small"
            @click="applyFilters"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRoomCard } from '~/interfaces/RoomsIntefaces'

interface Props {
  rooms: IRoomCard[]
}

interface RoomFilters {
  status: string | null
  minCapacity: number | null
  minSize: number | null
  searchName: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  filter: [filters: RoomFilters]
}>()
const { t } = useI18n()

const showFilters = ref(false)
const selectedStatus = ref<string | null>(null)
const selectedCapacity = ref<number | null>(null)
const selectedSize = ref<number | null>(null)
const searchName = ref('')

const statuses = computed(() => [
  {
    code: 'available',
    name: t('pages.rooms.statuses.available') || 'Available',
  },
  {
    code: 'occupied',
    name: t('pages.rooms.statuses.occupied') || 'Occupied',
  },
  {
    code: 'maintenance',
    name: t('pages.rooms.statuses.maintenance') || 'Maintenance',
  },
])

const maxCapacity = computed(() => {
  return Math.max(...props.rooms.map(r => r.capacity), 10)
})

const maxSize = computed(() => {
  return Math.max(...props.rooms.map(r => r.size), 100)
})

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const getStatusSeverity = (status: string) => {
  if (status === selectedStatus.value) {
    return 'primary'
  }
  return 'secondary'
}

const handleCapacityChange = (value: number | number[]) => {
  selectedCapacity.value = typeof value === 'number' ? value : null
}

const handleSizeChange = (value: number | number[]) => {
  selectedSize.value = typeof value === 'number' ? value : null
}

const applyFilters = () => {
  const filters = {
    status: selectedStatus.value,
    minCapacity: selectedCapacity.value,
    minSize: selectedSize.value,
    searchName: searchName.value,
  }
  emit('filter', filters)
  showFilters.value = false
}

const resetFilters = () => {
  selectedStatus.value = null
  selectedCapacity.value = null
  selectedSize.value = null
  searchName.value = ''
  const filters = {
    status: null,
    minCapacity: null,
    minSize: null,
    searchName: '',
  }
  emit('filter', filters)
}
</script>
