<template>
  <Card
    pt:root:style="--p-card-body-padding: 0rem"
    pt:body:class="h-full"
    pt:content:class="flex h-full"
  >
    <template #title>
      <div class="font-bold text-3xl text-center px-2 pt-2">
        {{ $t('pages.adminDashboard.dashboard.calendar.title') }}
      </div>
    </template>
    <template #content>
      <DatePicker
        v-model="date"
        pt:root:class="h-full w-full"
        pt:root:style="--p-datepicker-panel-border-radius: 0.75rem"
        pt:monthView:class="flex flex-wrap h-[80%] justify-center font-semibold text-xl"
        pt:yearView:class="flex flex-wrap h-[80%] justify-center font-semibold text-xl"
        pt:panel:class="h-full"
        inline
        @date-select="visible = true"
      />
      <Dialog
        v-model:visible="visible"
        class="w-[70vw]"
        :header="`Rezerwacje - ${date ? new Date(date).toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' }) : ''}`"
        modal
        @hide="date = null"
      >
        <IncomingRentsTable
          :rows="9"
          :to-approve="false"
          :bookings="selectedDayBookings"
        />
      </Dialog>
    </template>
  </Card>
</template>

<script setup lang="ts">
import IncomingRentsTable from './IncomingRentsTable.vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  bookings?: any[]
}>()

const date = ref()
const visible = ref(false)

const selectedDayBookings = computed(() => {
  if (!date.value || !props.bookings) {
    return []
  }

  const selectedDate = new Date(date.value)
  selectedDate.setHours(0, 0, 0, 0)

  return props.bookings.filter((booking) => {
    const bookingDate = new Date(booking.startedAt)
    bookingDate.setHours(0, 0, 0, 0)
    return bookingDate.getTime() === selectedDate.getTime()
  })
})
</script>
