<template>
  <Column
    :field="field"
    :header="header"
    :sortable="sortable"
    :showFilterMenu="showFilterMenu"
  >
    <template #body="slotProps">
      <slot
        name="body"
        v-bind="slotProps"
      >
        {{ slotProps.data[field] }}
      </slot>
    </template>
    <template
      v-if="filter"
      #filter="{ filterModel, filterCallback }"
    >
      <MultiSelect
        v-if="multiSelect"
        v-model="filterModel.value"
        class="w-full"
        :options="options"
        optionLabel="label"
        optionValue="code"
        filter
        :placeholder="$t('forms.filters.search')"
        @change="filterCallback()"
      />
      <Select
        v-else
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
    multiSelect?: boolean
    options: {
      name: string
      code: string
    }[]
  }>(), {
    sortable: false,
    filter: false,
    multiSelect: false,
    showFilterMenu: false,
  },
)
</script>
