<template>
  <Column
    :field="field"
    :header="header"
    :sortable="sortable"
    :showFilterMenu="showFilterMenu"
  >
    <template #body="slotProps">
      <slot name="body" v-bind="slotProps">
        <Message
          pt:content:style="--p-message-content-padding: 0.25rem "
          pt:text:class="text-center w-full text-md"
          :severity="statusColor[slotProps.data[field] as keyof typeof statusColor]"
        >
          {{ $t('pages.reservationsHistory.statuses.' +slotProps.data[field]) }}
        </Message>
      </slot>
    </template>
    <template v-if="filter" #filter="{ filterModel, filterCallback }">
      <Select
        id="rentStatus"
        v-model="filterModel.value"
        class="w-full"
        :placeholder="$t('forms.filters.choose')"
        :options="options"
        optionLabel="name"
        optionValue="code"
        @change="filterCallback()"
      />
    </template>
  </Column>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    field: string
    header: string
    sortable?: boolean
    filter?: boolean
    showFilterMenu?: boolean
    options?: {
      name: string
      code: string
    }[]
  }>(), {
    sortable: false,
    filter: false,
    showFilterMenu: false,
  }
)

const statusColor = computed<Record<'cancelled' | 'ended' | 'planned' | 'toApprove' | 'all', string>>(() => ({
  cancelled: 'error',
  ended: 'success',
  planned: 'info',
  toApprove: 'warn',
  all: 'primary',
}))
</script>
