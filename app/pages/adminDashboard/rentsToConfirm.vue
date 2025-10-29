<template>
  <div class="flex flex-col justify-center h-[100vh]">
    <Toast />
    <ConfirmDialog />
    <DataTable
      v-model:filters="filters"
      pt:root:class="min-h-[90vh]"
      pt:tableContainer:class="min-h-[70vh]"
      :value="reservations"
      filterDisplay="row"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPage"
      paginator
      :paginatorPosition="paginatorPosition"
      @update:rows="handelUpdateRows"
    >
      <Column
        field="room"
        class="w-[10%]"
        sortable
        :header="$t('forms.fields.username')"
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
        :header="$t('forms.fields.firstName')"
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
        field="date"
        class="w-[15%]"
        sortable
        :header="$t('forms.fields.lastName')"
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
        field="hour"
        class="w-[20%]"
        sortable
        :header="$t('forms.fields.email')"
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
        field="status"
        class="w-[20%]"
        :header="$t('forms.fields.email')"
      />
      <Column class="w-[5%]">
        <template #body="{ data }">
          <div class="flex flex-row gap-2">
            <EditUserButton :userId="data.id" />
            <DeleteUserButton :userId="data.id" />
          </div>
        </template>
      </Column>
      <template #empty>
        <h1 class="flex justify-center items-center min-h-[60vh] font-bold text-2xl">
          {{ $t('pages.adminDashboard.users.notFoundUsers') }}
        </h1>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api'
import EditUserButton from '~/components/adminDasboard/main/users/EditUserButton.vue'
import DeleteUserButton from '~/components/adminDasboard/main/users/DeleteUserButton.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin-dashboard',
})

const { t } = useI18n()
const rows = ref(10)
const rowsPerPage = ref([10, 20, 30])
const paginatorPosition = computed(() => {
  return rows.value > 10 ? 'both' : 'bottom'
})

const reservations = [
  {
    hour: '08:00',
    date: '2025-10-16',
    room: 'Room 101',
    bookedBy: 'Alice Johnson',
    status: 'planned',
  },
  {
    hour: '09:30',
    date: '2025-10-16',
    room: 'Room 102',
    bookedBy: 'Michael Brown',
    status: 'toApprove',
  },
  {
    hour: '10:00',
    date: '2025-10-16',
    room: 'Room 103',
    bookedBy: 'Sophie Lee',
    status: 'cancelled',
  },
  {
    hour: '11:15',
    date: '2025-10-16',
    room: 'Room 104',
    bookedBy: 'David Smith',
    status: 'planned',
  },
  {
    hour: '12:00',
    date: '2025-10-16',
    room: 'Room 105',
    bookedBy: 'Emma Wilson',
    status: 'planned',
  },
  {
    hour: '13:30',
    date: '2025-10-16',
    room: 'Room 201',
    bookedBy: 'Olivia Harris',
    status: 'toApprove',
  },
  {
    hour: '14:45',
    date: '2025-10-16',
    room: 'Room 202',
    bookedBy: 'Liam Walker',
    status: 'planned',
  },
  {
    hour: '15:00',
    date: '2025-10-16',
    room: 'Room 203',
    bookedBy: 'Noah Davis',
    status: 'cancelled',
  },
  {
    hour: '16:15',
    date: '2025-10-16',
    room: 'Room 204',
    bookedBy: 'Charlotte Miller',
    status: 'planned',
  },
  {
    hour: '17:30',
    date: '2025-10-16',
    room: 'Room 205',
    bookedBy: 'James Anderson',
    status: 'toApprove',
  },
].filter(r => r.status === 'toApprove')

const filters = ref({
  room: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  bookedBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
  date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  hour: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const handelUpdateRows = (value: number) => {
  rows.value = value
}
</script>
