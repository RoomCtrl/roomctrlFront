<template>
  <div :class="[{ 'h-[95vh]': isTableEmpty }, 'flex flex-col w-full gap-4']">
    <Toast />
    <ConfirmDialog />
    <div class="flex justify-between w-full">
      <Card>
        <template #content>
          <h1 class="font-extrabold text-4xl">
            {{ $t('tables.titles.rentsToConfirm') }}
          </h1>
        </template>
      </Card>
      <Card>
        <template #content>
          <QuickDateFilters @selected-button="handleSelected" />
        </template>
      </Card>
    </div>

    <DataTable
      v-model:filters="filters"
      :pt="{
        root: { class: 'flex flex-col h-full' },
        table: { class: tableDisplay },
      }"
      filterDisplay="row"
      :value="reservations"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPage"
      paginator
      :paginatorPosition="paginatorPosition"
      size="small"
      @update:rows="handleUpdateRows"
      @filter="onFilter"
    >
      <BaseTextFilterColumn
        :key="'room'"
        field="room"
        :header="$t('tables.headers.roomName')"
        class="w-[12%]"
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
        sortable
        filter
      />
      <BaseDateFilterColumn
        :key="'hour'"
        field="date"
        :header="$t('tables.headers.hour')"
        class="w-[10%]"
        onlyTime
        sortable
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
      <Column
        class="w-[8%]"
      >
        <template #body="{ data }">
          <div class="flex flex-row gap-2">
            <Button
              v-tooltip.left="{ value: $t('tables.buttonsTooltip.goToRoom') }"

              pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
              icon="pi pi-box"
              variant="outlined"
              severity="info"
              @click="handelTest(data.id)"
            />
            <Button
              v-tooltip.left="{ value: $t('tables.buttonsTooltip.approveRent') }"

              pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
              icon="pi pi-calendar-plus"
              variant="outlined"
              severity="success"
            />
            <Button
              v-tooltip.left="{ value: $t('tables.buttonsTooltip.deniedRent') }"

              pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
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

const { tableDisplay, isTableEmpty, paginatorPosition, onFilter, handleUpdateRows } = useDataTable(reservations, 12)
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
