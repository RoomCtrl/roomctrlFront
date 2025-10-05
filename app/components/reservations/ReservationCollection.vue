<template>
  <div class="pb-8">
    <RentHistoryFilter
      class="hidden lg:block"
      :reservations="reservations"
      @filter-rents="handleFilter"
    />
    <div class="grid grid-cols-4 lg:flex lg:justify-center">
      <div class="block lg:hidden">
        <Button
          :label="$t('common.buttons.filter')"
          @click="visible = true"
        />
        <Dialog
          v-model:visible="visible"
          modal
          :header="$t('forms.filters.title')"
        >
          <RentHistoryFilter
            :reservations="reservations"
            @filter-rents="handleFilter"
          />
        </Dialog>
      </div>

      <Paginator
        class="col-span-2 self-center"
        :first="first"
        :rows="rowsPerPage"
        :totalRecords="reservations.length"
        :rowsPerPageOptions="[12, 24, 36]"
        @page="onPageChange"
      />
    </div>

    <div
      v-if="paginatedRooms.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:grid-rows-3 gap-2"
    >
      <div
        v-for="reservation in paginatedRooms"
        :key="reservation.id"
      >
        <RentCard :reservation="reservation" />
      </div>
    </div>
    <div
      v-else
      class="flex justify-center items-center min-h-[30rem]"
    >
      <div class="font-bold text-2xl">
        {{ $t('pages.reservationHistory.noRent') }}
      </div>
    </div>
    <Paginator
      :first="first"
      :rows="rowsPerPage"
      :totalRecords="reservations.length"
      :rowsPerPageOptions="[12, 24, 36]"
      @page="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import RentHistoryFilter from '../forms/filters/RentHistoryFilter.vue'
import RentCard from './RentCard.vue'

const props = defineProps<{
  title: string
  completed: boolean
  reservations: object
}>()

const visible = ref(false)
const filteredRents = ref(props.reservations)
const handleFilter = (renst: object) => {
  filteredRents.value = renst
}
const first = ref(0)
const rowsPerPage = ref(12)

const paginatedRooms = computed(() => {
  return filteredRents.value.slice(first.value, first.value + rowsPerPage.value)
})

function onPageChange(event: any) {
  first.value = event.first
  rowsPerPage.value = event.rows
}
</script>

<style scoped>
h3 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: -0.5rem;
}
</style>
