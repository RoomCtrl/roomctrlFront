<template>
  <DataTable
    ref="dataTable"
    v-model:filters="filters"
    :pt="{
      root: { class: 'flex flex-col h-full' },
      table: { class: tableDisplay },
    }"
    :value="filteredRents"
    filterDisplay="row"
    paginator
    size="small"
    stripedRows
    :loading="loading"
    :paginatorPosition="paginatorPosition"
    :rows="rows"
    :rowsPerPageOptions="[13, 26, 39]"
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
    >
      <template #body="{ data }">
        <span>{{ $t(`pages.reservationsHistory.reservationTypes.${data.reservationsType}`) }}</span>
      </template>
    </BaseSelectFilterColumn>
    <Column
      :key="'actions'"
      class="w-[10%] "
    >
      <template #body="{ data }">
        <div class="flex justify-center gap-2">
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
            v-show="data.status === 'active'"
            v-tooltip.left="{ value: $t('common.buttons.edit') }"
            pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
            icon="pi pi-pencil"
            severity="success"
            variant="outlined"
            @click="openEditModal(data)"
          />
          <Button
            v-show="data.status === 'active'"
            v-tooltip.left="{ value: $t('common.buttons.cancel') }"
            pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
            severity="danger"
            icon="pi pi-times"
            variant="outlined"
            @click="openCancelModal(data)"
          />
          <ReportRoomIssue :room-id="data.roomId" />
        </div>
      </template>
    </Column>

    <template #empty>
      <h1 class="flex justify-center items-center min-h-[50vh] font-bold text-2xl">
        {{ $t('pages.reservationsHistory.noRent') }}
      </h1>
    </template>
    <template #loading>
      <div class="flex justify-center items-center bg-white border-2 w-full h-full">
        <ProgressSpinner />
      </div>
    </template>
  </DataTable>

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
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterService } from '@primevue/core/api'
import { useBooking } from '~/composables/useBooking'
import BaseTextFilterColumn from '../common/datatable/columns/BaseTextFilterColumn.vue'
import BaseSelectMessageFilter from '../common/datatable/columns/BaseSelectMessageFilter.vue'
import BaseDateFilterColumn from '../common/datatable/columns/BaseDateFilterColumn.vue'
import BaseSelectFilterColumn from '../common/datatable/columns/BaseSelectFilterColumn.vue'
import BookingEditForm from '../forms/BookingEditForm.vue'
import ReportRoomIssue from '../forms/ReportRoomIssue.vue'

const props = defineProps<{
  title?: string
  loading?: boolean
  reservations: any[]
}>()

const emit = defineEmits<{
  refresh: []
}>()

const { t } = useI18n()
const toast = useToast()
const { customDateAndTimeFilter, customStatusFilter } = useCustomFilterMatch()
const localePath = useLocalePath()
const { cancelBooking } = useBooking()
const confirm = useConfirm()

const editModalVisible = ref(false)
const selectedBooking = ref<any>(null)
const cancelLoading = ref(false)

const openEditModal = (booking: any) => {
  selectedBooking.value = booking
  editModalVisible.value = true
}

const openCancelModal = (booking: any) => {
  selectedBooking.value = booking
  handleCancelBooking()
}

const handleBookingSuccess = () => {
  editModalVisible.value = false
  emit('refresh')
}

const handleCancelBooking = async () => {
  if (!selectedBooking.value?.id) return

  confirm.require({
    message: t('pages.reservationsHistory.collection.cancelReservation.title'),
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
      cancelLoading.value = true
      try {
        await cancelBooking(selectedBooking.value.id)
        toast.add({
          severity: 'success',
          summary: t('common.toast.success'),
          detail: t('common.toast.bookingCancelled'),
          life: 3000,
        })
        emit('refresh')
      }
      catch (error) {
        console.error('Błąd podczas anulowania rezerwacji:', error)
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: t('common.toast.bookingCancelError'),
          life: 3000,
        })
      }
      finally {
        cancelLoading.value = false
      }
    },
  })
}

const filteredRents = computed(() => {
  return (props.reservations || []).map((rent: any) => {
    return {
      ...rent,
      roomName: rent.room?.roomName || rent.roomName || 'Brak danych',
    }
  })
})

const { rows, tableDisplay, paginatorPosition, handleUpdateRows, onFilter } = useDataTable(filteredRents, 13)

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
  { name: t('pages.reservationsHistory.statuses.active'), code: 'active' },
  { name: t('pages.reservationsHistory.statuses.cancelled'), code: 'cancelled' },
  { name: t('pages.reservationsHistory.statuses.completed'), code: 'completed' },
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
