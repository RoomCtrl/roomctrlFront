<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <Card>
        <template #content>
          <h1 class="font-bold text-4xl">
            {{ $t('pages.adminDashboard.reservationList.title') }}
          </h1>
        </template>
      </Card>
      <Card
        pt:body:class="h-full"
        pt:content:class="w-full h-full items-center flex"
      >
        <template #content>
          <RentButton
            button-label="Dodaj rezerwacje"
            buttonIcon="pi pi-plus"
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
      :value="bookingsWithTimeFields"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPageOptions"
      filterDisplay="row"
      size="small"
      paginator
      :paginatorPosition="paginatorPosition"
      :loading="loading"
      removableSort
      @update:rows="handleUpdateRows"
      @filter="onFilter"
    >
      <BaseTextFilterColumn
        key="title"
        field="title"
        :header="$t('tables.headers.reservationTitle')"
        filter
        sortable
        style="width: 20%"
      />
      <BaseTextFilterColumn
        key="roomName"
        field="roomName"
        :header="$t('tables.headers.roomName')"
        filter
        sortable
        style="width: 25%"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data.room.roomName }}</span>
        </template>
      </BaseTextFilterColumn>
      <BaseDateFilterColumn
        key="startedAtDate"
        field="startedAt"
        :header="$t('tables.headers.startDate')"
        filter
        sortable
        style="width: 5%"
      />
      <BaseDateFilterColumn
        key="startedAtTime"
        field="startedAtTime"
        :header="$t('tables.headers.startTime')"
        filter
        sortable
        onlyTime
        style="width: 5%"
      />
      <BaseDateFilterColumn
        key="endedAtDate"
        field="endedAt"
        :header="$t('tables.headers.endDate')"
        filter
        sortable
        style="width: 5%"
      />
      <BaseDateFilterColumn
        key="endedAtTime"
        field="endedAtTime"
        :header="$t('tables.headers.endTime')"
        filter
        sortable
        onlyTime
        style="width: 5%"
      />
      <BaseSelectTagFilter
        key="status"
        field="status"
        :status-color="statusColor"
        :header="$t('tables.headers.status')"
        filter
        sortable
        style="width: 10%"
      />
      <BaseTextFilterColumn
        key="isPrivate"
        field="isPrivate"
        :header="$t('tables.headers.isPrivate')"
        filter
        sortable
        style="width: 10%"
      >
        <template #body="slotProps">
          {{ $t(`tables.fieldValue.${slotProps.data.isPrivate}`) }}
        </template>
      </BaseTextFilterColumn>
      <BaseTextFilterColumn
        key="participantsCount"
        field="participantsCount"
        :header="$t('tables.headers.participantsCount')"
        filter
        sortable
        style="width: 5%"
      />
      <Column style="width: 10%">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              v-tooltip.left="{ value: $t('tables.buttonTooltips.goToRoom') }"
              icon="pi pi-sign-out"
              severity="warn"
              variant="outlined"
              @click="handleGoToRoom(slotProps.data.room.id)"
            />
            <Button
              v-tooltip.left="{ value: $t('tables.buttonTooltips.editRent'), disabled: slotProps.data.status === 'cancelled' }"
              icon="pi pi-pencil"
              severity="info"
              :disabled="slotProps.data.status === 'cancelled'"
              variant="outlined"
              @click="openEditModal(slotProps.data)"
            />
            <Button
              v-tooltip.left="{ value: $t('tables.buttonTooltips.cancelRent'), disabled: slotProps.data.status === 'cancelled' }"
              icon="pi pi-times-circle"
              severity="danger"
              :disabled="slotProps.data.status === 'cancelled'"
              variant="outlined"
              @click="cancelBooking(slotProps.data.id)"
            />
            <Button
              v-tooltip.left="{ value: $t('tables.buttonTooltips.viewParticipants'), disabled: slotProps.data.participants.length === 0 }"
              icon="pi pi-address-book"
              severity="help"
              :disabled="slotProps.data.participants.length === 0"
              variant="outlined"
              @click="openUsersModal(slotProps.data.participants)"
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
      v-model:visible="editModalVisible"
      modal
      :header="$t('forms.booking.editTitle')"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <FormsBookingEditForm
        v-if="selectedBooking"
        :booking-id="selectedBooking.id"
        @success="handleBookingSuccess"
        @cancel="editModalVisible = false"
      />
    </Dialog>
    <Dialog
      v-model:visible="usersModalVisible"
      modal
      header="Lista uzytownikow"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="user in selectedUsers"
          :key="user.isAdmin"
        >
          <div class="border-2 dark:border-neutral-700 flex flex-row p-2 bg-gray-200 dark:bg-neutral-900 rounded justify-between items-center">
            <div>
              <div class="grid grid-cols-2">
                <div>
                  <p>Nazwa uzytkownika</p>
                  {{ user.username }}
                </div>
                <div>
                  <p>Email</p>
                  {{ user.email }}
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div>
                  <p>Imie</p>
                  {{ user.firstName }}
                </div>
                <div>
                  <p>Nazwisko</p>
                  {{ user.lastName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useRoom } from '~/composables/useRoom'
import { FilterMatchMode } from '@primevue/core/api'
import BaseTextFilterColumn from '~/components/common/datatable/columns/BaseTextFilterColumn.vue'
import BaseDateFilterColumn from '~/components/common/datatable/columns/BaseDateFilterColumn.vue'
import BaseSelectTagFilter from '~/components/common/datatable/columns/BaseSelectTagFilter.vue'
import RentButton from '~/components/booking/RentButton.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin-dashboard',
})

const emit = defineEmits<{
  refresh: []
}>()
const usersModalVisible = ref(false)
const selectedUsers = ref(null)
const selectedBooking = ref<any>(null)
const { loading } = useRoom()
const { fetchBookings, cancelBooking, bookings } = useBooking()
const { rows, rowsPerPageOptions, paginatorPosition, tableDisplay, onFilter, handleUpdateRows } = useDataTable(bookings, 12)
const filters = ref({
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  roomName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  user: { value: null, matchMode: FilterMatchMode.CONTAINS },
  startedAt: { value: null, matchMode: 'customDateFilter' },
  startedAtTime: { value: null, matchMode: 'customTimeFilter' },
  endedAt: { value: null, matchMode: 'customDateFilter' },
  endedAtTime: { value: null, matchMode: 'customTimeFilter' },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  isPrivate: { value: null, matchMode: FilterMatchMode.EQUALS },
  participantsCount: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// Dodaj pola czasu do bookings
const bookingsWithTimeFields = computed(() => {
  if (!bookings.value) return []
  return bookings.value.map(booking => ({
    ...booking,
    startedAtTime: booking.startedAt,
    endedAtTime: booking.endedAt,
  }))
})

const editModalVisible = ref(false)
const showModal = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedRoom = ref<any>(null)

const openAddModal = () => {
  selectedRoom.value = null
  showModal.value = true
}
const handleGoToRoom = (roomId: string) => {
  navigateTo(`/rooms/${roomId}`)
}

const openEditModal = (booking: any) => {
  selectedBooking.value = booking
  editModalVisible.value = true
}

const openUsersModal = (users: any) => {
  selectedUsers.value = users
  usersModalVisible.value = true
}
const handleBookingSuccess = () => {
  editModalVisible.value = false
  emit('refresh')
}

const statusColor = computed<Record<'cancelled' | 'completed' | 'active', string>>(() => ({
  cancelled: 'danger',
  completed: 'success',
  active: 'info',
}))

onMounted(() => {
  fetchBookings()
})
</script>

<style scoped>
.p-datatable {
  @apply min-h-[85vh] h-auto
}
p {
  @apply text-sm font-bold
}
</style>
