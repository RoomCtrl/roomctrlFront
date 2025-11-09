<template>
  <div class="flex flex-col h-full">
    <Toast />
    <ConfirmDialog />
    <DataTable
      v-model:filters="filters"
      class="h-full"
      pt:tableContainer:class="flex flex-col justify-betwen h-full"
      :pt:table:class="tableDisplay"
      filterDisplay="row"
      :value="reservations"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPage"
      paginator
      stripedRows
      size="small"
      :paginatorPosition="paginatorPosition"
      @update:rows="handleUpdateRows"
      @filter="onFilter"
    >
      <template #header>
        <div class="flex flex-col gap-6">
          <h1 class="font-extrabold text-4xl">
            {{ $t('tables.titles.rentsToConfirm') }}
          </h1>
          <QuickDateFilters @selected-button="handleSelected" />
        </div>
      </template>
      <BaseTextFilterColumn
        :key="'room'"
        field="room"
        :header="$t('tables.headers.roomName')"
        class="w-[10%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'bookedBy'"
        field="bookedBy"
        :header="$t('tables.headers.booker')"
        class="w-[15%]"
        sortable
        filter
      />
      <BaseDateFilterColumn
        :key="'date'"
        field="date"
        :header="$t('tables.headers.day')"
        class="w-[10%]"
        filter
      />
      <BaseDateFilterColumn
        :key="'hour'"
        field="date"
        :header="$t('tables.headers.hour')"
        class="w-[10%]"
        onlyTime
        filter
      />
      <BaseTextFilterColumn
        :key="'email'"
        field="email"
        :header="$t('tables.headers.email')"
        class="w-[25%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'phone'"
        field="phone"
        :header="$t('tables.headers.phone')"
        class="w-[10%]"
        sortable
        filter
      />
      <BaseSelectMessageFilter
        :key="'status'"
        field="status"
        :header="$t('tables.headers.status')"
        class="w-[10%]"
      />
      <Column class="w-[10%]">
        <template #body="{ data }">
          <div class="flex flex-row gap-2">
            <Button
              v-tooltip.left="{ value: $t('tables.buttonsTooltip.goToRoom') }"
              icon="pi pi-box"
              variant="outlined"
              severity="info"
              @click="handelTest(data.id)"
            />
            <Button
              v-tooltip.left="{ value: $t('tables.buttonsTooltip.approveRent') }"
              icon="pi pi-calendar-plus"
              variant="outlined"
              severity="success"
            />
            <Button
              v-tooltip.left="{ value: $t('tables.buttonsTooltip.deniedRent') }"
              icon="pi pi-calendar-minus"
              variant="outlined"
              severity="error"
              @click="handelDeniedRent(data.id)"
            />
          </div>
        </template>
      </Column>
      <template #empty>
        <h1 class="font-bold text-2xl">
          {{ $t('tables.emptyMessages.noRentsToConfirm') }}
        </h1>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterService } from '@primevue/core/api'
import { reservations } from '~/assets/data/rentsToConfirmData'
import QuickDateFilters from '~/components/adminDasboard/main/rentsToConfirm/QuickDateFilters.vue'
import BaseDateFilterColumn from '~/components/common/datatable/columns/BaseDateFilterColumn.vue'
import BaseSelectMessageFilter from '~/components/common/datatable/columns/BaseSelectMessageFilter.vue'
import BaseTextFilterColumn from '~/components/common/datatable/columns/BaseTextFilterColumn.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin-dashboard',
})

const rows = ref(12)
const rowsPerPage = ref([12, 24, 36])

const { tableDisplay, paginatorPosition, onFilter, handleUpdateRows } = useDataTable(reservations)
const { customDateFilter, customTimeFilter } = useCustomFilterMatch()

const filters = ref({
  room: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  bookedBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
  date: { value: null, matchMode: 'dateEquals' },
  hour: { value: null, matchMode: 'timeEquals' },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const handelTest = (roomId: number) => {
  navigateTo('/rooms/' + roomId)
}
const handelDeniedRent = (id: number) => {
  const index = reservations.findIndex(r => r.id === id)
  if (index !== -1) {
    reservations.splice(index, 1)
  }
}
const handleSelected = (date: Date) => {
  filters.value.date.value = date
}
onMounted(() => {
  FilterService.register('timeEquals', customTimeFilter)
  FilterService.register('dateEquals', customDateFilter)
})
</script>
