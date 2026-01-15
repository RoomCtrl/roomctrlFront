<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex flex-row items-center justify-between">
      <Card>
        <template #title>
          <h1 class="font-bold text-4xl">
            {{ $t('pages.reservationsHistory.title') }}
          </h1>
        </template>
      </Card>
      <Button
        icon="pi pi-filter-slash"
        :label="$t('common.buttons.resetFilters')"
        severity="danger"
        variant="outlined"
        @click="resetFilters"
      />
    </div>
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
      removableSort
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
        :key="'startedAtDate'"
        field="startedAt"
        :header="$t('pages.reservationsHistory.rentStartDate')"
        dateFormat="dd/mm/yy"
        class="w-[10%]"
        sortable
        filter
      />
      <BaseDateFilterColumn
        :key="'startedAtTime'"
        field="startedAtTime"
        :header="$t('pages.reservationsHistory.rentStartTime')"
        class="w-[8%]"
        sortable
        filter
        onlyTime
      />
      <BaseDateFilterColumn
        :key="'endedAtDate'"
        field="endedAt"
        :header="$t('pages.reservationsHistory.rentEndDate')"
        dateFormat="dd/mm/yy"
        class="w-[10%]"
        sortable
        filter
      />
      <BaseDateFilterColumn
        :key="'endedAtTime'"
        field="endedAtTime"
        :header="$t('pages.reservationsHistory.rentEndTime')"
        class="w-[8%]"
        sortable
        filter
        onlyTime
      />
      <BaseSelectMessageFilter
        :key="'status'"
        field="status"
        :header="$t('pages.reservationsHistory.rentStatus')"
        class="20%"
        sortable
        translationPrefix="pages.adminDashboard.reservationList.status."
        :status-color="statusColor"
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
              v-tooltip.left="{ value: $t('common.buttons.edit'), disabled: data.status === 'cancelled' || data.status === 'completed' }"
              pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
              icon="pi pi-pencil"
              :disabled="data.status === 'cancelled' || data.status === 'completed'"
              severity="success"
              variant="outlined"
              @click="openEditModal(data)"
            />
            <Button
              v-tooltip.left="{ value: $t('common.buttons.cancel'), disabled: data.status === 'cancelled' || data.status === 'completed' }"
              pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
              :disabled="data.status === 'cancelled' || data.status === 'completed'"
              severity="danger"
              icon="pi pi-times"
              variant="outlined"
              @click="openCancelModal(data)"
            />
            <ReportRoomIssue :room-id="data.roomId || ''" />
          </div>
        </template>
      </Column>

      <template #empty>
        <h1 class="flex justify-center items-center min-h-[50vh] font-bold text-2xl">
          {{ $t('pages.reservationsHistory.noRent') }}
        </h1>
      </template>
    </DataTable>

    <Dialog
      v-model:visible="editModalVisible"
      modal
      :header="$t('forms.titles.editBooking')"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <FormsBookingEditForm
        v-if="selectedBooking"
        :booking-id="selectedBooking.id"
        @update-visible="editModalVisible = $event"
      />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterService } from '@primevue/core/api'
import { useBooking } from '~/composables/useBooking'
import BaseTextFilterColumn from '../common/datatable/columns/BaseTextFilterColumn.vue'
import BaseSelectMessageFilter from '../common/datatable/columns/BaseSelectTagFilter.vue'
import BaseDateFilterColumn from '../common/datatable/columns/BaseDateFilterColumn.vue'
import BaseSelectFilterColumn from '../common/datatable/columns/BaseSelectFilterColumn.vue'
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

const statusColor = computed<Record<'cancelled' | 'completed' | 'active', string>>(() => ({
  cancelled: 'danger',
  completed: 'success',
  active: 'info',
}))

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
      startedAtTime: rent.startedAt,
      endedAtTime: rent.endedAt,
    }
  })
})

const { rows, tableDisplay, paginatorPosition, handleUpdateRows, onFilter } = useDataTable(filteredRents, 13)

const filters = ref({
  roomName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  startedAt: { value: null, matchMode: 'customDateFilter' },
  startedAtTime: { value: null, matchMode: 'customTimeFilter' },
  endedAt: { value: null, matchMode: 'customDateFilter' },
  endedAtTime: { value: null, matchMode: 'customTimeFilter' },
  status: { value: null, matchMode: 'statusEquals' },
  reservationsType: { value: null, matchMode: 'statusEquals' },
})

const statuses = ref([
  { label: t('pages.reservationsHistory.statuses.all'), value: 'all' },
  { label: t('pages.reservationsHistory.statuses.active'), value: 'active' },
  { label: t('pages.reservationsHistory.statuses.cancelled'), value: 'cancelled' },
  { label: t('pages.reservationsHistory.statuses.completed'), value: 'completed' },
])

const typesOfReservation = ref([
  { label: t('pages.reservationsHistory.statuses.all'), value: 'all' },
  { label: t('pages.reservationsHistory.reservationTypes.public'), value: 'public' },
  { label: t('pages.reservationsHistory.reservationTypes.private'), value: 'private' },
])

const resetFilters = () => {
  filters.value = {
    roomName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startedAt: { value: null, matchMode: 'customDateFilter' },
    startedAtTime: { value: null, matchMode: 'customTimeFilter' },
    endedAt: { value: null, matchMode: 'customDateFilter' },
    endedAtTime: { value: null, matchMode: 'customTimeFilter' },
    status: { value: null, matchMode: 'statusEquals' },
    reservationsType: { value: null, matchMode: 'statusEquals' },
  }
}

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
