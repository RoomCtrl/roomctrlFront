<template>
  <DataTable
    ref="dataTable"
    v-model:filters="filters"
    :pt="{
      root: { class: 'min-h-[60vh]' },
      tableContainer: { class: 'justify-between h-full' },
      table: { class: tableDisplay },
    }"
    :value="filteredRents"
    filterDisplay="row"
    paginator
    size="small"
    stripedRows
    :paginatorPosition="paginatorPosition"
    :rows="rows"
    :rowsPerPageOptions="[10, 20, 30]"
    @update:rows="handleUpdateRows"
    @filter="onFilter"
  >
    <BaseTextFilterColumn
      :key="'roomName'"
      field="roomName"
      :header="$t('pages.reservationsHistory.roomName')"
      class="w-[10%]"
      sortable
      filter
      showFilterMenu
    />
    <BaseTextFilterColumn
      :key="'title'"
      field="title"
      :header="$t('pages.reservationsHistory.rentTitle')"
      class="w-[25%]"
      sortable
      filter
    />
    <BaseDateFilterColumn
      :key="'startedAt'"
      field="startedAt"
      :header="$t('pages.reservationsHistory.rentStart')"
      dateFormat="dd/mm/yy"
      class="w-[12%]"
      sortable
      showTime
      filter
    />
    <BaseDateFilterColumn
      :key="'endedAt'"
      field="endedAt"
      :header="$t('pages.reservationsHistory.rentEnd')"
      dateFormat="dd/mm/yy"
      class="w-[12%]"
      sortable
      showTime
      filter
    />
    <BaseSelectMessageFilter
      :key="'status'"
      field="status"
      :header="$t('pages.reservationsHistory.rentStatus')"
      class="20%"
      sortable
      :options="statuses"
      filter
    />
    <BaseSelectFilterColumn
      :key="'reservationsType'"
      class="w-[11%]"
      field="reservationsType"
      :header="$t('pages.reservationsHistory.rentType')"
      sortable
      :options="typesOfReservation"
      filter
    />
    <Column
      :key="'actions'"
      class="w-[10%]"
    >
      <template #body="{ data }">
        <div class="flex justify-center gap-4">
          <Button
            v-tooltip.left="{ value: $t('pages.reservationsHistory.comeToRoom') }"
            icon="pi pi-sign-out"
            as="a"
            :href="localePath(`/rooms/` + data.roomId)"
            variant="outlined"
            severity="info"
            class="flex-none"
          />
          <Button
            v-show="!completed"
            v-tooltip.left="{ value: $t('common.buttons.edit') }"
            icon="pi pi-pencil"
            severity="success"
            variant="outlined"
          />
          <Button
            v-show="!completed"
            v-tooltip.left="{ value: $t('common.buttons.cancel') }"
            icon="pi pi-times"
            variant="outlined"
          />
        </div>
      </template>
    </Column>

    <template #empty>
      <h1 class="flex justify-center items-center min-h-[50vh] font-bold text-2xl">
        {{ $t('pages.reservationsHistory.noRent') }}
      </h1>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterService } from '@primevue/core/api'
import { roomsDetailsData } from '~/assets/data/roomsDetails'
import BaseTextFilterColumn from '../common/datatable/columns/BaseTextFilterColumn.vue'
import BaseSelectMessageFilter from '../common/datatable/columns/BaseSelectMessageFilter.vue'
import BaseDateFilterColumn from '../common/datatable/columns/BaseDateFilterColumn.vue'
import BaseSelectFilterColumn from '../common/datatable/columns/BaseSelectFilterColumn.vue'

const props = defineProps<{
  title?: string
  completed?: boolean
  reservations: any[]
}>()

const dataTable = ref()
const { t } = useI18n()
const { customDateAndTimeFilter, customStatusFilter } = useCustomFilterMatch()
const localePath = useLocalePath()

const filteredRents = computed(() => {
  return (props.reservations || []).map((rent: any) => {
    const room = roomsDetailsData.find(r => r.roomId === rent.roomId)
    return {
      ...rent,
      roomName: room?.roomName ?? 'Brak danych',
    }
  })
})

const { rows, tableDisplay, paginatorPosition, handleUpdateRows, onFilter } = useDataTable(filteredRents, 10)

const filters = ref({
  roomName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  startedAt: { value: null, matchMode: 'dateEquals' },
  endedAt: { value: null, matchMode: 'dateEquals' },
  status: { value: null, matchMode: 'statusEquals' },
  reservationsType: { value: null, matchMode: 'statusEquals' },
})

const statuses = ref([
  { name: t('pages.reservationsHistory.statuses.all'), code: 'all' },
  { name: t('pages.reservationsHistory.statuses.planned'), code: 'planned' },
  { name: t('pages.reservationsHistory.statuses.cancelled'), code: 'cancelled' },
  { name: t('pages.reservationsHistory.statuses.ended'), code: 'ended' },
  { name: t('pages.reservationsHistory.statuses.toApprove'), code: 'toApprove' },
])

const typesOfReservation = ref([
  { name: t('pages.reservationsHistory.statuses.all'), code: 'all' },
  { name: t('pages.reservationsHistory.reservationTypes.public'), code: 'public' },
  { name: t('pages.reservationsHistory.reservationTypes.private'), code: 'private' },
])

onMounted(() => {
  const anyFS = FilterService as any
  if (!anyFS.__customFiltersRegistered) {
    FilterService.register('statusEquals', customStatusFilter)
    FilterService.register('dateEquals', customDateAndTimeFilter)
    anyFS.__customFiltersRegistered = true
  }
})
</script>

<style scoped>
h3 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: -0.5rem;
}
</style>
