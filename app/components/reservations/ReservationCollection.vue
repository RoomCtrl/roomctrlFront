<template>
  <DataTable
    v-model:filters="filters"
    pt:root:class="min-h-[60vh]"
    pt:tableContainer:class="min-h-[60vh]"
    pt:thead:class="grid grid-cols-6 border-2"
    :value="filteredRents"
    filterDisplay="row"
    paginator
    stripedRows
    :paginatorPosition="paginatorPosition"
    :rows="rowsPerPage"
    :rowsPerPageOptions="[9, 18, 27]"
    @update:rows="handelUpdateRows"
  >
    <Column
      field="roomName"
      :header="$t('pages.reservationsHistory.roomName')"
      class="w-[5%]"
      sortable
      :showFilterMenu="false"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          id="rentTitle"
          v-model="filterModel.value"
          class="w-full"
          @input="filterCallback()"
        />
      </template>
    </Column>
    <Column
      field="title"
      :header="$t('pages.reservationsHistory.rentTitle')"
      sortable
      class="w-[30%]"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          id="rentTitle"
          v-model="filterModel.value"
          class="w-full"
          @input="filterCallback()"
        />
      </template>
    </Column>
    <Column
      field="startedAt"
      :header="$t('pages.reservationsHistory.rentStart')"
      dataType="date"
      sortable
      class="w-[12%]"
    >
      <template #body="{ data }">
        {{ formatToTimeAndDate(data.startedAt) }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <DatePicker
          v-model="filterModel.value"
          showButtonBar
          showClear
          @date-select="filterCallback()"
          @clear-click="handleClearDate(filterModel, filterCallback)"
        />
      </template>
    </Column>
    <Column
      field="endedAt"
      :header="$t('pages.reservationsHistory.rentEnd')"
      dataType="date"
      sortable
      class="w-[12%]"
    >
      <template #body="{ data }">
        {{ formatToTimeAndDate(data.endedAt) }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <DatePicker
          v-model="filterModel.value"
          showButtonBar
          showClear
          @date-select="filterCallback()"
          @clear-click="handleClearDate(filterModel, filterCallback)"
        />
      </template>
    </Column>
    <Column
      field="status"
      :header="$t('pages.reservationsHistory.rentStatus')"
      sortable
      :showFilterMenu="false"
      class="w-[10%]"
    >
      <template #body="{ data }">
        <Message
          pt:content:style="--p-message-content-padding: 0.25rem "
          pt:text:class="text-center w-full text-md"
          :severity="statusColor[ data.status]"
        >
          {{ $t('pages.reservationsHistory.statuses.' + data.status) }}
        </Message>
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Select
          id="rentStatus"
          v-model="filterModel.value"
          class="w-full"
          :options="statuses"
          optionLabel="name"
          optionValue="code"
          @change="filterCallback()"
        />
      </template>
    </Column>
    <Column
      field="reservationsType"
      header="Typ rezerwacji"
      class="w-[11%]"
    >
      <template #body="{ data }">
        {{ $t('pages.reservationsHistory.reservationTypes.' + data.reservationsType) }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Select
          id="rentStatus"
          v-model="filterModel.value"
          class="w-full"
          :options="typesOfReservation"
          optionLabel="name"
          optionValue="code"
          @change="filterCallback()"
        />
      </template>
    </Column>
    <Column
      class="w-[20%]"
    >
      <template #body="{ data }">
        <div class="flex justify-center gap-4">
          <Button
            v-if="!completed"
            label="Edytuj"
          />
          <Button
            v-if="!completed"
            label="Anuluj"
          />
          <Button
            :label="$t('pages.reservationsHistory.comeToRoom')"
            as="a"
            :href="localePath(`/rooms/` + data.roomId)"
            class="flex-none"
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

const props = defineProps<{
  title: string
  completed: boolean
  reservations: object
}>()

const { t } = useI18n()
const localePath = useLocalePath()
const filteredRents = computed(() => {
  return props.reservations.map((rent: any) => {
    const room = roomsDetailsData.find(r => r.roomId === rent.roomId)
    return {
      ...rent,
      roomName: room?.roomName ?? 'Brak danych',
    }
  })
})

const customStatusFilter = (value: any, filter: any): boolean => {
  if (filter === null || filter === undefined || filter === 'all') {
    return true
  }
  return value === filter
}

const customDateFilter = (value: any, filter: any): boolean => {
  if (!filter) {
    return true
  }

  // Konwertuj obie daty do formatu bez czasu (tylko dzień/miesiąc/rok)
  const valueDate = new Date(value)
  const filterDate = new Date(filter)

  // Normalizuj daty do początku dnia (00:00:00)
  valueDate.setHours(0, 0, 0, 0)
  filterDate.setHours(0, 0, 0, 0)

  return valueDate.getTime() === filterDate.getTime()
}

const handleClearDate = (filterModel: any, filterCallback: Function) => {
  filterModel.value = null
  filterCallback()
}

onMounted(() => {
  FilterService.register('statusEquals', customStatusFilter)
  FilterService.register('dateEquals', customDateFilter)
})

const filters = ref({
  roomName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  startedAt: { value: null, matchMode: 'dateEquals' },
  endedAt: { value: null, matchMode: 'dateEquals' },
  status: { value: null, matchMode: 'statusEquals' },
  reservationsType: { value: null, matchmode: FilterMatchMode.EQUALS },
})

const rowsPerPage = ref(9)
const handelUpdateRows = (value: number) => {
  rowsPerPage.value = value
}

const paginatorPosition = computed(() => {
  if (rowsPerPage.value === 9) {
    return 'bottom'
  }
  else {
    return 'both'
  }
})

const statusColor = computed(() => ({
  cancelled: 'error',
  ended: 'success',
  planned: 'info',
  toApprove: 'warn',
}))

const statuses = ref([
  {
    name: t('pages.reservationsHistory.statuses.all'),
    code: 'all',
  },
  {
    name: t('pages.reservationsHistory.statuses.planned'),
    code: 'planned',
  },
  {
    name: t('pages.reservationsHistory.statuses.cancelled'),
    code: 'cancelled',
  },
  {
    name: t('pages.reservationsHistory.statuses.ended'),
    code: 'ended',
  },
  {
    name: t('pages.reservationsHistory.statuses.toApprove'),
    code: 'toApprove',
  },
])
const typesOfReservation = ref([
  {
    name: t('pages.reservationsHistory.reservationTypes.public'),
    code: 'public',
  },
  {
    name: t('pages.reservationsHistory.reservationTypes.private'),
    code: 'private',
  },
])
</script>

<style scoped>
h3 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: -0.5rem;
}
</style>
