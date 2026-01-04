<template>
  <Card
    pt:root:style="--p-card-body-padding:  0.2rem 0rem 0rem 0rem"
    pt:body:class="h-full"
    pt:content:class="h-full"
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
          root: { class: 'flex flex-col h-full' },
          table: { class: tableDisplay },
        }"
        :value="reservations"
        paginator
        size="small"
        :rows="rows"
      >
        <template #empty>
          <div class="flex justify-center items-center text-xl font-semibold min-h-[10rem]">
            {{ $t('tables.emptyMessages.noBookings') }}
          </div>
        </template>
        <Column
          class="w-[25%]"
          field="room"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.room')"
        />
        <Column
          class="w-[30%]"
          field="bookedBy"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.reserver')"
        />
        <Column
          class="w-[25%]"
          field="date"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.day')"
        />
        <Column
          class="w-[25%]"
          field="hour"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.hour')"
        />
        <Column
          class="w-[10%]"
          field="status"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.status')"
        >
          <template #body="slotProps">
            <Tag
              :value="$t(`pages.adminDashboard.dashboard.calendar.statuses.${slotProps.data.status}`)"
              :severity="statusColor[slotProps.data.status]"
              class="w-full text-center"
            />
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
  bookings?: any[]
}>()

const reservations = computed(() => {
  if (!props.bookings || props.bookings.length === 0) {
    return []
  }
  return props.bookings.map((booking) => {
    const startDate = new Date(booking.startedAt)
    const endDate = new Date(booking.endedAt)
    const now = new Date()
    const status = endDate < now ? 'ended' : 'planned'

    return {
      hour: startDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
      date: startDate.toLocaleDateString('pl-PL'),
      room: booking.room?.roomName || 'N/A',
      bookedBy: `${booking.user?.firstName || ''} ${booking.user?.lastName || ''}`.trim() || booking.user?.username || 'N/A',
      status: status,
    }
  })
})

const { tableDisplay } = useDataTable(reservations, 4)

const statusColor = computed(() => ({
  cancelled: 'error',
  ended: 'success',
  planned: 'info',
  toApprove: 'warn',
}))
</script>
