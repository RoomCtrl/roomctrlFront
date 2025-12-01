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
      <InputText
        v-model="filterModel.value"
        class="w-full"
        :placeholder="$t('forms.filters.search')"
        @input="filterCallback()"
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
  }>(), {
    sortable: false,
    filter: false,
    showFilterMenu: false,
  },
)
</script>
