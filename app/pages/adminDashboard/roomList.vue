<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-row justify-between">
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
          <div class="flex gap-2">
            <Button
              icon="pi pi-filter-slash"
              variant="outlined"
              raised
              severity="danger"
              :label="$t('common.buttons.resetFilters')"
              @click="resetFilters"
            />
            <Button
              icon="pi pi-plus"
              variant="outlined"
              raised
              severity="success"
              :label="$t('forms.roomForm.buttons.addRoom')"
              @click="openAddModal"
            />
          </div>
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
      :rowsPerPageOptions="rowsPerPageOptions"
      filterDisplay="row"
      size="small"
      paginator
      removableSort
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
        :noData="$t('pages.adminDashboard.roomList.tableNoData.description')"
        class="w-[20%]"
        filter
        sortable
      />
      <BaseTextFilterColumn
        key="access"
        field="access"
        :header="$t('tables.headers.access')"
        :noData="$t('pages.adminDashboard.roomList.tableNoData.access')"
        class="w-[10%]"
        filter
        sortable
      />
      <BaseTextFilterColumn
        key="lighting"
        field="lighting"
        :header="$t('tables.headers.lighting')"
        :noData="$t('tables.noData.lighting')"
        class="w-[10%]"
        filter
        sortable
      />
      <BaseSelectFilterColumn
        key="status"
        field="status"
        :header="$t('tables.headers.status')"
        :options="statusOptions"
        filter
        sortable
      >
        <template #body="slotProps">
          {{ $t(`pages.adminDashboard.roomList.statuses.${slotProps.data.status}`) }}
        </template>
      </BaseSelectFilterColumn>
      <Column :header="$t('tables.headers.actions')">
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <ActionButton
              v-tooltip.left="{ value: $t('pages.reservationsHistory.comeToRoom') }"
              icon="pi pi-sign-in"
              mode="goRoom"
              raised
              inTable
              :room-id="slotProps.data.roomId"
            />
            <RoomUploadDialog :room-id="slotProps.data.roomId" />
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
      :header="$t('pages.adminDashboard.roomList.dialogs.addRoom')"
      :modal="true"
      :closable="true"
      class="w-[50vw]"
      @hide="resetModal"
    >
      <RoomForm
        :room="selectedRoom"
        :loading="formLoading"
        @cancel="showModal = false"
      />
    </Dialog>

    <Dialog
      v-model:visible="showEditModal"
      :header="$t('pages.adminDashboard.roomList.dialogs.editRoom')"
      :modal="true"
      :closable="true"
      class="w-[50vw]"
    >
      <FormsRoomEditForm
        v-if="editRoomId"
        :room-id="editRoomId"
        @update-visible="showEditModal = $event"
      />
    </Dialog>

    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api'
import BaseTextFilterColumn from '~/components/common/datatable/columns/BaseTextFilterColumn.vue'
import ActionButton from '~/components/common/buttons/ActionButton.vue'
import RoomForm from '~/components/forms/RoomForm.vue'
import type { IRoomCard } from '~/interfaces/RoomsIntefaces'
import BaseSelectFilterColumn from '~/components/common/datatable/columns/BaseSelectFilterColumn.vue'
import RoomUploadDialog from '~/components/forms/room/RoomUploadDialog.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin-dashboard',
})

const { rooms, loading, fetchRooms, deleteRoom: deleteRoomAPI } = useRoom()
const { rows, rowsPerPageOptions, paginatorPosition, tableDisplay, onFilter, handleUpdateRows } = useDataTable(rooms, 15)
const toast = useToast()
const confirm = useConfirm()
const { t } = useI18n()

const filters = ref({
  roomName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  capacity: { value: null, matchMode: FilterMatchMode.EQUALS },
  size: { value: null, matchMode: FilterMatchMode.EQUALS },
  location: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  access: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lighting: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
})

const statusOptions = [
  { label: t('pages.adminDashboard.roomList.statuses.available'), value: 'available' },
  { label: t('pages.adminDashboard.roomList.statuses.out_of_use'), value: 'out_of_use' },
]

const showModal = ref(false)
const showEditModal = ref(false)
const formLoading = ref(false)
const selectedRoom = ref<IRoomCard | null>(null)
const editRoomId = ref<string | null>(null)

const openAddModal = () => {
  selectedRoom.value = null
  showModal.value = true
}

const openEditModal = (room: IRoomCard) => {
  editRoomId.value = room.roomId
  showEditModal.value = true
}

const resetModal = () => {
  selectedRoom.value = null
  showModal.value = false
}

const resetFilters = () => {
  filters.value = {
    roomName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    capacity: { value: null, matchMode: FilterMatchMode.EQUALS },
    size: { value: null, matchMode: FilterMatchMode.EQUALS },
    location: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    access: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lighting: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  }
}

const deleteRoom = async (roomId: string) => {
  confirm.require({
    message: t('pages.adminDashboard.roomList.deleteRoomConfirmation.message'),
    header: t('common.toast.danger'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('common.buttons.cancel'),
    rejectProps: {
      label: t('common.buttons.cancel'),
      severity: 'contrast',
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
          summary: t('common.toast.success'),
          detail: t('pages.adminDashboard.roomList.toasts.roomDeleted'),
          life: 3000,
        })
      }
      catch (error) {
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: error instanceof Error ? error.message : t('pages.adminDashboard.roomList.toasts.operationFailed'),
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
