<template>
  <Card
    pt:body:class="p-0 h-full"
    pt:content:class="flex h-full"
    pt:title:class="font-bold text-3xl px-2 pt-2"
  >
    <template #title>
      Mini kalendarz
    </template>
    <template #content>
      <DatePicker
        v-model="date"
        pt:panel:class="border-2 min-h-[36vh]"
        pt:dayView:class="items-center"
        class="w-full self-end"
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
