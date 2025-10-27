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
        pt:dayView:class="h-[95%]"
        inline
        @date-select="visible = true"
      />
      <Dialog
        v-model:visible="visible"
        modal
        @hide="date = null"
      >
        <IncomingRentsTable
          :rows="9"
          header="Najblizsze rezerwacje"
        />
      </Dialog>
    </template>
  </Card>
</template>

<script setup lang="ts">
import IncomingRentsTable from './IncomingRentsTable.vue'

const date = ref()
const visible = ref(false)
</script>
