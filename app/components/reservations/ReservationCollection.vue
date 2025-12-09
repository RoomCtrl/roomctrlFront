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
            pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
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
            pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
            icon="pi pi-pencil"
            severity="success"
            variant="outlined"
            @click="openEditModal(data)"
          />
          <Button
            v-show="!completed"
            v-tooltip.left="{ value: $t('common.buttons.cancel') }"
            pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
            icon="pi pi-times"
            variant="outlined"
            @click="openCancelModal(data)"
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

  <!-- Modal edycji rezerwacji -->
  <Dialog
    v-model:visible="editModalVisible"
    modal
    :header="$t('forms.booking.editTitle')"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <BookingEditForm
      v-if="selectedBooking"
      :booking-id="selectedBooking.id"
      @success="handleBookingSuccess"
      @cancel="editModalVisible = false"
    />
  </Dialog>

  <!-- Modal anulowania rezerwacji -->
  <Dialog
    v-model:visible="cancelModalVisible"
    modal
    :header="$t('forms.booking.cancelTitle')"
    :style="{ width: '30vw' }"
    :breakpoints="{ '960px': '50vw', '640px': '90vw' }"
  >
    <p class="mb-4">
      {{ $t('forms.booking.cancelConfirmation') }}
    </p>
    <div class="flex justify-end gap-2">
      <Button
        :label="$t('common.buttons.no')"
        severity="secondary"
        variant="outlined"
        @click="cancelModalVisible = false"
      />
      <Button
        :label="$t('common.buttons.yes')"
        severity="danger"
        :loading="cancelLoading"
        @click="handleCancelBooking"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterService } from '@primevue/core/api'
import { useRoom } from '~/composables/useRoom'
import { useBooking } from '~/composables/useBooking'
import type { IBookingUpdateRequest } from '~/interfaces/BookingsInterfaces'
import BaseTextFilterColumn from '../common/datatable/columns/BaseTextFilterColumn.vue'
import BaseSelectMessageFilter from '../common/datatable/columns/BaseSelectMessageFilter.vue'
import BaseDateFilterColumn from '../common/datatable/columns/BaseDateFilterColumn.vue'
import BaseSelectFilterColumn from '../common/datatable/columns/BaseSelectFilterColumn.vue'
import BookingEditForm from '../forms/BookingEditForm.vue'

const props = defineProps<{
  title?: string
  completed?: boolean
  reservations: any[]
}>()

const emit = defineEmits<{
  refresh: []
}>()

const dataTable = ref()
const { t } = useI18n()
const { customDateAndTimeFilter, customStatusFilter } = useCustomFilterMatch()
const localePath = useLocalePath()
const { rooms } = useRoom()
const { cancelBooking } = useBooking()

const editModalVisible = ref(false)
const cancelModalVisible = ref(false)
const selectedBooking = ref<any>(null)
const cancelLoading = ref(false)

const openEditModal = (booking: any) => {
  selectedBooking.value = booking
  editModalVisible.value = true
}

const openCancelModal = (booking: any) => {
  selectedBooking.value = booking
  cancelModalVisible.value = true
}

const handleBookingSuccess = () => {
  editModalVisible.value = false
  emit('refresh')
}

const handleCancelBooking = async () => {
  if (!selectedBooking.value?.id) return

  cancelLoading.value = true
  try {
    await cancelBooking(selectedBooking.value.id)
    cancelModalVisible.value = false
    emit('refresh')
  }
  catch (error) {
    console.error('Błąd podczas anulowania rezerwacji:', error)
  }
  finally {
    cancelLoading.value = false
  }
}

const filteredRents = computed(() => {
  return (props.reservations || []).map((rent: any) => {
    return {
      ...rent,
      roomName: rent.room?.roomName || rent.roomName || 'Brak danych',
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
