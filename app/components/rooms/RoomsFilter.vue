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
      class="fixed top-24 right-4 z-[30] bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-80 mt-8"
    >
      <div
        class="flex flex-col gap-4 p-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
        style="overflow: visible !important;"
      >
        <div class="flex flex-col gap-2">
          <label
            id="status-filter"
            class="font-semibold text-sm"
          >{{ $t('pages.allRooms.filters.status') || 'Status' }}</label>
          <div
            aria-labelledby="status-filter"
            class="flex flex-wrap gap-2"
          >
            <Button
              v-for="stat in statuses"
              :key="stat.code"
              :label="stat.name"
              :outlined="selectedStatus !== stat.code"
              :severity="stat.buttonColor"
              size="small"
              @click="selectedStatus = selectedStatus === stat.code ? null : stat.code"
            />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label
            id="capacity-label"
            class="font-semibold text-sm"
          >{{ $t('pages.allRooms.filters.capacity') || 'Capacity' }}</label>
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

        <div class="flex flex-col gap-2">
          <label
            id="size-label"
            class="font-semibold text-sm"
          >{{ $t('pages.allRooms.filters.size') || 'Size' }}</label>
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

        <div class="flex flex-col gap-2">
          <label
            for="room-name-filter"
            class="font-semibold text-sm"
          >{{ $t('pages.allRooms.filters.roomName') || 'Room Name' }}</label>
          <InputText
            id="room-name-filter"
            v-model="searchName"
            :placeholder="$t('pages.allRooms.filters.searchPlaceholder') || 'Search...'"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label
            id="equipment-filter"
            class="font-semibold text-sm"
          >{{ $t('pages.allRooms.filters.equipment') || 'Equipment' }}</label>
          <MultiSelect
            v-model="selectedEquipment"
            :options="availableEquipment"
            option-label="name"
            option-value="code"
            :placeholder="$t('pages.allRooms.filters.selectEquipment') || 'Select equipment...'"
            aria-labelledby="equipment-filter"
            display="chip"
            class="w-full"
          />
        </div>

        <!-- Location Filter -->
        <div class="flex flex-col gap-2">
          <label
            id="location-filter"
            class="font-semibold text-sm"
          >{{ $t('pages.allRooms.filters.location') || 'Location' }}</label>
          <MultiSelect
            v-model="selectedLocation"
            :options="availableLocations"
            option-label="name"
            option-value="code"
            :placeholder="$t('pages.allRooms.filters.selectLocation') || 'All locations'"
            aria-labelledby="location-filter"
            display="chip"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label
            id="lighting-filter"
            class="font-semibold text-sm"
          >{{ $t('pages.allRooms.filters.lighting') || 'Lighting' }}</label>
          <MultiSelect
            v-model="selectedLighting"
            :options="availableLightings"
            optionLabel="name"
            option-value="code"
            :placeholder="$t('pages.allRooms.filters.selectLighting') || 'All lighting types'"
            aria-labelledby="lighting-filter"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label
            id="access-filter"
            class="font-semibold text-sm"
          >{{ $t('pages.allRooms.filters.access') || 'Access' }}</label>
          <div
            aria-labelledby="access-filter"
            class="flex flex-wrap gap-2"
          >
            <Button
              v-for="acc in availableAccess"
              :key="acc.code"
              :label="acc.name"
              :outlined="selectedAccess !== acc.code"
              severity="secondary"
              size="small"
              @click="selectedAccess = selectedAccess === acc.code ? null : acc.code"
            />
          </div>
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
  equipment: string[]
  location: string[]
  lighting: string[]
  access: string | null
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
const selectedEquipment = ref<string[]>([])
const selectedLocation = ref<string[]>([])
const selectedLighting = ref<string[]>([])
const selectedAccess = ref<string | null>(null)

const statuses = computed(() => [
  {
    code: 'available',
    name: t('pages.allRooms.filters.statuses.available') || 'Available',
    buttonColor: 'success',
  },
  {
    code: 'occupied',
    name: t('pages.allRooms.filters.statuses.occupied') || 'Occupied',
    buttonColor: 'error',
  },
  {
    code: 'maintenance',
    name: t('pages.allRooms.filters.statuses.maintenance') || 'Maintenance',
    buttonColor: 'warn',
  },
])

const maxCapacity = computed(() => {
  return Math.max(...props.rooms.map(r => r.capacity), 10)
})

const maxSize = computed(() => {
  return Math.max(...props.rooms.map(r => r.size), 100)
})

const availableEquipment = computed(() => {
  const equipmentSet = new Set<string>()
  props.rooms.forEach((room) => {
    room.equipment?.forEach(eq => equipmentSet.add(eq.name))
  })
  return Array.from(equipmentSet).sort().map(eq => ({ code: eq, name: eq }))
})

const availableLocations = computed(() => {
  const locations = new Set(props.rooms.map(r => r.location).filter(loc => loc !== undefined && loc !== null))
  return Array.from(locations).sort().map(loc => ({ code: loc, name: loc }))
})

const availableLightings = computed(() => {
  const lightings = new Set(props.rooms.map(r => r.lighting).filter(light => light !== undefined && light !== null))
  return Array.from(lightings).sort().map(light => ({ code: light, name: light }))
})

const availableAccess = computed(() => [
  { code: 'Karta magnetyczna', name: t('pages.allRooms.filters.accessTypes.magneticCard') || 'Magnetic Card' },
  { code: 'Kod PIN', name: t('pages.allRooms.filters.accessTypes.pin') || 'PIN' },
  { code: 'Klucz', name: t('pages.allRooms.filters.accessTypes.key') || 'Key' },
])

const toggleFilters = () => {
  showFilters.value = !showFilters.value
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
    equipment: selectedEquipment.value,
    location: selectedLocation.value,
    lighting: selectedLighting.value,
    access: selectedAccess.value,
  }
  emit('filter', filters)
  showFilters.value = false
}

const resetFilters = () => {
  selectedStatus.value = null
  selectedCapacity.value = null
  selectedSize.value = null
  searchName.value = ''
  selectedEquipment.value = []
  selectedLocation.value = []
  selectedLighting.value = []
  selectedAccess.value = null
  const filters = {
    status: null,
    minCapacity: null,
    minSize: null,
    searchName: '',
    equipment: [],
    location: [],
    lighting: [],
    access: null,
  }
  emit('filter', filters)
}
</script>
