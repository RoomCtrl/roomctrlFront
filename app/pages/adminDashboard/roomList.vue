<template>
  <div class="w-full">
    <DataTable
      v-model:filters="filters"
      :pt="{
        root: { class: 'flex flex-col h-full' },
        tableContainer: { class: 'h-full' },
        table: { class: tableDisplay },
      }"
      :value="rooms"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPage"
      filterDisplay="row"
      size="small"
      paginator
      :paginatorPosition="paginatorPosition"
      :loading="loading"
      @update:rows="handleUpdateRows"
      @filter="onFilter"
    >
      <template #header>
        <div class="flex flex-row justify-between">
          <h1 class="font-extrabold text-4xl">
            {{ $t('tables.titles.roomList') }}
          </h1>
          <Button
            icon="pi pi-plus"
            label="Dodaj salę"
            @click="openAddModal"
          />
        </div>
      </template>
      <BaseTextFilterColumn
        key="roomName"
        field="roomName"
        :header="$t('tables.headers.roomName')"
        filter
        sortable
        class="w-[15%]"
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
            <Button
              pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
              icon="pi pi-pencil"
              severity="info"
              variant="outlined"
              @click="openEditModal(slotProps.data)"
            />
            <Button
              pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
              icon="pi pi-trash"
              severity="danger"
              variant="outlined"
              @click="deleteRoom(slotProps.data.roomId)"
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

    <Dialog
      v-model:visible="showModal"
      :header="isEditMode ? 'Edytuj salę' : 'Dodaj nową salę'"
      :modal="true"
      :closable="true"
      class="w-[50vw]"
      @hide="resetModal"
    >
      <RoomForm
        :room="selectedRoom"
        :loading="formLoading"
        @submit="handleFormSubmit"
        @cancel="showModal = false"
      />
    </Dialog>

    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useRoom } from '~/composables/useRoom'
import { useAuth } from '~/composables/useAuth'
import { FilterMatchMode } from '@primevue/core/api'
import BaseTextFilterColumn from '~/components/common/datatable/columns/BaseTextFilterColumn.vue'
import ActionButton from '~/components/common/buttons/ActionButton.vue'
import RoomForm from '~/components/forms/RoomForm.vue'
import type { IRoomCard, IRoomCreateRequest, IRoomUpdateRequest } from '~/interfaces/RoomsIntefaces'

definePageMeta({
  middleware: 'admin',
  layout: 'admin-dashboard',
})

const { rooms, loading, fetchRooms, createRoom, updateRoom, deleteRoom: deleteRoomAPI } = useRoom()
const { user } = useAuth()
const { rows, paginatorPosition, tableDisplay, onFilter, handleUpdateRows } = useDataTable(rooms, 17)
const toast = useToast()

const rowsPerPage = [17, 34, 51]

const filters = ref({
  roomName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  capacity: { value: null, matchMode: FilterMatchMode.EQUALS },
  size: { value: null, matchMode: FilterMatchMode.EQUALS },
  location: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// Modal state
const showModal = ref(false)
const formLoading = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedRoom = ref<any>(null)
const isEditMode = computed(() => !!selectedRoom.value)

const openAddModal = () => {
  selectedRoom.value = null
  showModal.value = true
}

const openEditModal = (room: IRoomCard) => {
  selectedRoom.value = room as unknown
  showModal.value = true
}

const resetModal = () => {
  selectedRoom.value = null
  showModal.value = false
}

const handleFormSubmit = async (formData: IRoomCreateRequest | IRoomUpdateRequest) => {
  formLoading.value = true
  try {
    if (isEditMode.value && selectedRoom.value && 'roomId' in selectedRoom.value) {
      // Update existing room
      await updateRoom(selectedRoom.value.roomId as string, formData as IRoomUpdateRequest)
      toast.add({
        severity: 'success',
        summary: 'Sukces',
        detail: 'Sala została zaktualizowana',
        life: 3000,
      })
    }
    else {
      // Create new room with organizationId
      console.log('User data:', user.value)
      const organizationId = (user.value as unknown as Record<string, unknown>)?.organizationId as string | undefined
      console.log('organizationId:', organizationId)

      const createData: IRoomCreateRequest = {
        ...formData as IRoomCreateRequest,
        organizationId,
      }
      console.log('Creating room with data:', createData)
      await createRoom(createData)
      toast.add({
        severity: 'success',
        summary: 'Sukces',
        detail: 'Sala została dodana',
        life: 3000,
      })
    }

    showModal.value = false
    selectedRoom.value = null
    await fetchRooms(false)
  }
  catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Błąd',
      detail: error instanceof Error ? error.message : 'Operacja nie powiodła się',
      life: 3000,
    })
  }
  finally {
    formLoading.value = false
  }
}

const deleteRoom = async (roomId: string) => {
  if (confirm('Czy na pewno chcesz usunąć tę salę?')) {
    try {
      await deleteRoomAPI(roomId)
      toast.add({
        severity: 'success',
        summary: 'Sukces',
        detail: 'Sala została usunięta',
        life: 3000,
      })
    }
    catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Błąd',
        detail: error instanceof Error ? error.message : 'Operacja nie powiodła się',
        life: 3000,
      })
    }
  }
}

onMounted(() => {
  fetchRooms(false)
})
</script>
