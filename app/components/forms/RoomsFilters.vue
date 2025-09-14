<template>
  <Card>
    <template #content>
      <div class="flex flex-col gap-2">
        Filtrowanie:
        <div v-if="activeFilters">
          <Chip
            v-for="filter in filters"
            :key="filter.label"
            severity="info"
            class="flex-none"
            removable
          >
            <p v-if="filter.value.length > 0">
              {{ filter.label + ': ' + filter.value }}
            </p>
          </Chip>
        </div>

        <div>
          <h1>
            Dostepnosc:
          </h1>
          <div
            v-for="availablity in availabilities"
            :key="availablity.label"
          >
            <Checkbox
              v-model="selectedAvailabity"
              :inputId="availablity.value"
              name="availablity"
              :value="availablity.label"
            />
            <label :for="availablity.value">{{ availablity.label }}</label>
          </div>
        </div>
        <div>
          <h1>
            Rozmiar
          </h1>
          <div>
            {{ size }}
            <Slider
              v-model="size"
              range
            />
          </div>
        </div>
        <div>
          <h1>
            Pojemnosc
          </h1>
          <div>
            {{ capacity }}
            <Slider
              v-model="capacity"
              range
            />
          </div>
        </div>
        <Button
          label="Filtruj"
          @click="toggleFilters"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
const activeFilters = ref(false)

const size = ref([0, 100])
const capacity = ref([0, 100])

const toggleFilters = () => {
  activeFilters.value = !activeFilters.value
}

const availabilities = ref([
  {
    label: 'Dostepne',
    value: 'avaiable',
  },
  {
    label: 'Zajete',
    value: 'occupied',
  },
  {
    label: 'Nieczynne',
    value: 'out_of_order',
  },
])
const selectedAvailabity = ref([])

const filters = computed(() =>
  [
    {
      label: 'Dostepnosc',
      value: selectedAvailabity.value,
    },
    {
      label: 'Rozmiar',
      value: size.value,
    },
    {
      label: 'Pojemnosc',
      value: capacity.value,
    },
  ],
)
</script>
