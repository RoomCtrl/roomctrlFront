<template>
  <Card
    pt:root:style="--p-card-body-padding:  0.2rem 0rem 0rem 0rem "
    pt:body:class="h-full justify-between"
  >
    <template #title>
      <div
        v-if="header"
        class="flex flex-row justify-between pt-2 px-2"
      >
        <div />
        <h1 class="font-bold text-3xl ">
          {{ header }}
        </h1>
        <Button
          v-tooltip.left="{ value: $t('pages.adminDashboard.dashboard.tables.tooltip') }"
          icon="pi pi-arrow-right"
          class="flex"
          variant="outlined"
          rounded
        />
      </div>
    </template>
    <template #content>
      <DataTable
        :pt="{
          root: {
            class: 'h-full flex flex-col',
            style: '--p-datatable-paginator-bottom-border-width: 0; --p-paginator-border-radius: 0px',
          },
          tableContainer: { class: 'flex flex-col justify-end' },
          emptyMessageCell: { class: 'text-center' },
          emptyMessage: { class: 'flex items-center justify-center h-full' },
        }"
        :value="tableData"
        paginator
        size="small"
        :rows="rows"
      >
        <template #empty>
          <div class="text-xl text-gray-500 py-16">
            {{ $t('tables.emptyMessages.noBookings') }}
          </div>
        </template>
        <Column
          field="room"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.room')"
        />
        <Column
          field="bookedBy"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.reserver')"
        />
        <Column
          field="date"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.day')"
        />
        <Column
          field="hour"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.hour')"
        />
        <Column
          pt:root:class=""
          field="status"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.status')"
        >
          <template #body="{ data }">
            <Message
              pt:content:style="--p-message-content-padding: 0.25rem "
              pt:text:class="text-center w-full text-md"
              :severity="statusColor[ data.status as keyof typeof statusColor]"
            >
              {{ $t('pages.reservationsHistory.statuses.' + data.status) }}
            </Message>
          </template>
        </column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
  rows: number
  header?: string
  toApprove: boolean
  bookings?: any[]
}>()
const reservations = computed(() => {
  if (!props.bookings || props.bookings.length === 0) {
    return []
  }
  return props.bookings.map((booking) => {
    const startDate = new Date(booking.startedAt)
    return {
      hour: startDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
      date: startDate.toLocaleDateString('pl-PL'),
      room: booking.room?.roomName || 'N/A',
      bookedBy: `${booking.user?.firstName || ''} ${booking.user?.lastName || ''}`.trim() || booking.user?.username || 'N/A',
      status: booking.status === 'active' ? 'planned' : booking.status,
    }
  })
})

const toApproveReservations = computed(() =>
  reservations.value.filter(r => r.status === 'toApprove'),
)

const tableData = computed(() => {
  if (props.toApprove) {
    return toApproveReservations.value
  }
  else {
    return reservations.value
  }
})

const statusColor = computed(() => ({
  cancelled: 'error',
  ended: 'success',
  planned: 'info',
  toApprove: 'warn',
}))
</script>
