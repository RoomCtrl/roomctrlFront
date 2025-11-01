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
      @update:rows="handelUpdateRows"
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
      <Column
        field="room"
        class="w-[10%]"
        sortable
        :header="$t('tables.headers.roomName')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            class="w-full"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="bookedBy"
        class="w-[15%]"
        sortable
        :header="$t('tables.headers.booker')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            class="w-full"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        filterField="date"
        class="w-[10%]"
        dataType="date"
        sortable
        :header="$t('tables.headers.day')"
      >
        <template #body="{ data }">
          {{ data.date.toISOString().split('T')[0] }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <DatePicker
            v-model="filterModel.value"
            showButtonBar
            showClear
            date-format="yy/mm/dd"
            :placeholder="$t('forms.filters.search')"
            @date-select="filterCallback()"
            @clear-click="handleClearDate(filterModel, filterCallback)"
          />
        </template>
      </Column>
      <Column
        field="hour"
        class="w-[10%]"
        sortable
        :header="$t('tables.headers.hour')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <DatePicker
            v-model="filterModel.value"
            showButtonBar
            showClear
            timeOnly
            :placeholder="$t('forms.filters.search')"
            @date-select="filterCallback()"
            @clear-click="handleClearDate(filterModel, filterCallback)"
          />
        </template>
      </Column>
      <Column
        class="w-[25%]"
        field="email"
        :header="$t('tables.headers.email')"
      />
      <Column
        class="w-[10%]"
        field="phone"
        :header="$t('tables.headers.phone')"
      />
      <Column
        field="status"
        class="w-[10%]"
        :header="$t('tables.headers.status')"
      >
        <template #body="{ data }">
          <Message
            pt:content:style="--p-message-content-padding: 0.25rem "
            pt:text:class="text-center w-full text-md"
            severity="warn"
          >
            {{ $t('pages.reservationsHistory.statuses.' + data.status) }}
          </Message>
        </template>
      </Column>
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
import QuickDateFilters from '~/components/adminDasboard/main/rentsToConfirm/QuickDateFilters.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin-dashboard',
})

const rows = ref(12)
const rowsPerPage = ref([12, 24, 36])
const isTableEmpty = ref(false)
const paginatorPosition = computed(() => {
  return rows.value > 12 ? 'both' : 'bottom'
})

const reservations = [
  {
    id: 1,
    hour: '08:00',
    date: new Date(2025, 9, 14),
    room: 'Room 101',
    bookedBy: 'Alice Johnson',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 2,
    hour: '09:30',
    date: new Date(2025, 9, 15),
    room: 'Room 102',
    bookedBy: 'Michael Brown',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 3,
    hour: '10:00',
    date: new Date(2025, 9, 16),
    room: 'Room 103',
    bookedBy: 'Sophie Lee',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 4,
    hour: '11:15',
    date: new Date(2025, 9, 16),
    room: 'Room 104',
    bookedBy: 'David Smith',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 5,
    hour: '12:00',
    date: new Date(2025, 9, 16),
    room: 'Room 105',
    bookedBy: 'Emma Wilson',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 6,
    hour: '13:30',
    date: new Date(2025, 9, 16),
    room: 'Room 201',
    bookedBy: 'Olivia Harris',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 7,
    hour: '14:45',
    date: new Date(2025, 9, 16),
    room: 'Room 202',
    bookedBy: 'Liam Walker',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 8,
    hour: '15:00',
    date: new Date(2025, 9, 16),
    room: 'Room 203',
    bookedBy: 'Noah Davis',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 8,
    hour: '15:00',
    date: new Date(2025, 9, 16),
    room: 'Room 203',
    bookedBy: 'Noah Davis',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 8,
    hour: '15:00',
    date: new Date(2025, 9, 16),
    room: 'Room 203',
    bookedBy: 'Noah Davis',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 8,
    hour: '15:00',
    date: new Date(2025, 9, 16),
    room: 'Room 203',
    bookedBy: 'Noah Davis',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
  {
    id: 8,
    hour: '15:00',
    date: new Date(2025, 9, 16),
    room: 'Room 203',
    bookedBy: 'Noah Davis',
    status: 'toApprove',
    phone: '777888999',
    email: 'me@me.pl',
  },
]

const filters = ref({
  room: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  bookedBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
  date: { value: null, matchMode: 'dateEquals' },
  hour: { value: null, matchMode: 'timeEquals' },
})

const handelUpdateRows = (value: number) => {
  rows.value = value
}

const handleClearDate = (filterModel: any, filterCallback: Function) => {
  filterModel.value = null
  filterCallback()
}
const onFilter = (event) => {
  isTableEmpty.value = event.filteredValue.length === 0
}

const tableDisplay = computed(() => {
  if (isTableEmpty.value) {
    return 'flex flex-col h-full'
  }
  else {
    return ''
  }
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
