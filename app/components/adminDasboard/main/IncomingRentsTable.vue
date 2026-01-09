<template>
  <Card
    pt:root:style="--p-card-body-padding:  0.2rem 0rem 0rem 0rem"
    pt:body:class="h-full"
    pt:content:class="h-full"
  >
    <template #title>
      <div class="flex flex-row justify-between pt-2 px-2">
        <div />
        <h1 class="font-bold text-3xl ">
          {{ header }}
        </h1>
        <Button
          v-tooltip.left="{ value: $t('pages.adminDashboard.dashboard.tables.tooltip') }"
          icon="pi pi-arrow-right"
          class="flex"
          as="a"
          :href="localePath(path)"
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
        :value="bookings"
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
          style="width: 15%;"
          field="room.roomName"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.room')"
        />
        <Column
          style="width: 25%;"
          field="title"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.room')"
        />
        <Column
          style="width: 15%;"
          field="user.username"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.reserver')"
        />
        <Column
          style="width: 10%;"
          field="startedAt"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.day')"
        >
          <template #body="slotProps">
            {{ formatDate(slotProps.data.startedAt) }}
          </template>
        </Column>
        <Column
          style="width: 10%;"
          field="endedAt"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.hour')"
        >
          <template #body="slotProps">
            {{ formatDate(slotProps.data.startedAt) }}
          </template>
        </Column>
        <Column
          style="width: 5%;"
          field="participantsCount"
          :header="$t('tables.headers.participantsCount')"
        />
        <Column
          class="w-[20%]"
          style="width: 10%;"
          field="status"
          :header="$t('pages.adminDashboard.dashboard.tables.headers.status')"
        >
          <template #body="slotProps">
            <Tag
              :value="$t(`pages.adminDashboard.reservationList.status.${slotProps.data.status}`)"
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
  path: string
}>()

const localePath = useLocalePath()

const bookingsRef = computed(() => props.bookings || [])
const { tableDisplay } = useDataTable(bookingsRef, props.rows)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes} ${day}.${month}`
}

const statusColor = computed(() => ({
  cancelled: 'error',
  completed: 'success',
  active: 'info',
}))
</script>

<style scoped>
.p-datatable {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
