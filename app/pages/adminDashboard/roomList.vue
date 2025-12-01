<template>
  <div class="w-full">
    <DataTable
      v-model:filters="filters"
      :pt="{
        root: { class: 'flex flex-col h-full' },
        tableContainer: { class: 'h-full' },
        table: { class: tableDisplay },
      }"
      :value="roomsDetailsData"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPage"
      filterDisplay="row"
      size="small"
      paginator
      :paginatorPosition="paginatorPosition"
      @update:rows="handleUpdateRows"
      @filter="onFilter"
    >
      <template #header>
        <div class="flex flex-row justify-between">
          <h1 class="font-extrabold text-4xl">
            {{ $t('tables.titles.roomList') }}
          </h1>
          <ActionButton
            icon="pi pi-plus"
            label="Dodaj sale"
            modal-header="Some"
            mode="add"
          >
            <template #modal>
              some
            </template>
          </Actionbutton>
        </div>
      </template>
      <BaseTextFilterColumn
        key="roomName"
        field="roomName"
        :header="$t('tables.headers.roomName')"
        filter
        sortable
        class="w-[10%]"
      />
      <BaseTextFilterColumn
        key="capacity"
        field="capacity"
        :header="$t('tables.headers.capacity')"
        filter
        sortable
        class="w-[5%]"
      />
      <BaseTextFilterColumn
        key="size"
        field="size"
        :header="$t('tables.headers.size')"
        filter
        sortable
        class="w-[5%]"
      />
      <BaseTextFilterColumn
        key="location"
        field="location"
        :header="$t('tables.headers.location')"
        filter
        sortable
        class="w-[15%]"
      />
      <BaseTextFilterColumn
        key="description"
        field="description"
        :header="$t('tables.headers.description')"
        filter
        sortable
      />
      <Column :header="$t('tables.headers.actions')">
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <ActionButton
              icon="pi pi-box"
              mode="goRoom"
              inTable
              :room-id="slotProps.data.roomId"
            />
            <ActionButton
              icon="pi pi-pencil"
              mode="edit"
              inTable
            />
            <ActionButton
              icon="pi pi-eraser"
              mode="delete"
              inTable
            />
          </div>
        </template>
      </Column>
      <template #empty>
        <h1 class="flex justify-center items-center min-h-[60vh] font-bold text-2xl">
          {{ $t('tables.emptyMessages.noRoom') }}
        </h1>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { roomsDetailsData } from '~/assets/data/roomsDetails'
import { FilterMatchMode } from '@primevue/core/api'
import BaseTextFilterColumn from '~/components/common/datatable/columns/BaseTextFilterColumn.vue'
import ActionButton from '~/components/common/buttons/ActionButton.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin-dashboard',
})

const { rows, paginatorPosition, tableDisplay, onFilter, handleUpdateRows } = useDataTable(roomsDetailsData, 17)

const rowsPerPage = [17, 34, 51]

const filters = ref({
  roomName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  capacity: { value: null, matchMode: FilterMatchMode.EQUALS },
  size: { value: null, matchMode: FilterMatchMode.EQUALS },
  location: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
</script>
