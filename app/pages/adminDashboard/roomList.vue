<template>
  <div class="w-full flex flex-col">
    <div class="flex flex-row justify-between gap-4">
      <Card>
        <template #content>
          <h1 class="font-bold text-4xl">
            {{ $t('tables.titles.roomList') }}
          </h1>
        </template>
      </Card>

      <Card
        pt:body:class="h-full"
        pt:content:class="w-full h-full items-center flex"
      >
        <template #content>
          <Button
            icon="pi pi-plus"
            variant="outlined"
            raised
            severity="success"
            :label="$t('forms.roomForm.buttons.addRoom')"
            @click="openAddModal"
          />
        </template>
      </Card>
    </div>
    <DataTable
      v-model:filters="filters"
      :pt="{
        root: { class: 'flex flex-col' },
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
              v-tooltip.left="{ value: $t('pages.reservationsHistory.comeToRoom') }"
              icon="pi pi-sign-out"
              mode="goRoom"
              raised
              inTable
              :room-id="slotProps.data.roomId"
            />
            <Button
              v-tooltip.left="{ value: $t('common.buttons.edit') }"
              pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
              icon="pi pi-pencil"
              severity="info"
              raised
              variant="outlined"
              @click="openEditModal(slotProps.data)"
            />
            <Button
              v-tooltip.left="{ value: $t('common.buttons.delete') }"
              pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
              icon="pi pi-trash"
              severity="danger"
              raised
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

    <ConfirmDialog />
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

const { rooms, loading, fetchRooms, createRoom, updateRoom, deleteRoom: deleteRoomAPI, uploadImage } = useRoom()
const { user } = useAuth()
const { rows, paginatorPosition, tableDisplay, onFilter, handleUpdateRows } = useDataTable(rooms, 17)
const toast = useToast()
const confirm = useConfirm()
const { t } = useI18n()

const rowsPerPage = [17, 34, 51]

const filters = ref({
  roomName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  capacity: { value: null, matchMode: FilterMatchMode.EQUALS },
  size: { value: null, matchMode: FilterMatchMode.EQUALS },
  location: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

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

const handleFormSubmit = async (formData: IRoomCreateRequest | IRoomUpdateRequest, image?: File) => {
  formLoading.value = true
  try {
    let roomId: string

    if (isEditMode.value && selectedRoom.value && 'roomId' in selectedRoom.value) {
      roomId = selectedRoom.value.roomId as string
      await updateRoom(roomId, formData as IRoomUpdateRequest)

      if (image) {
        await uploadImage(roomId, image)
      }

      toast.add({
        severity: 'success',
        summary: 'Sukces',
        detail: 'Sala została zaktualizowana',
        life: 3000,
      })
    }
    else {
      const organizationId = user.value?.organization.id

      const createData: IRoomCreateRequest = {
        ...formData as IRoomCreateRequest,
        organizationId,
      }
      const createdRoom = await createRoom(createData)
      roomId = createdRoom.roomId

      if (image) {
        await uploadImage(roomId, image)
      }

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
  confirm.require({
    message: t('pages.adminDashboard.main.roomList.deleteRoom.title'),
    header: t('common.toast.danger'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('common.buttons.cancel'),
    rejectProps: {
      label: t('common.buttons.cancel'),
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: t('common.buttons.delete'),
      severity: 'danger',
    },
    accept: async () => {
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
    },
  })
}

onMounted(() => {
  fetchRooms(false)
})
</script>

<style scoped>
.p-datatable {
  @apply min-h-[85vh] h-auto
}
</style>
