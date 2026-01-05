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
        <div class="flex justify-center">
          <Tag
            :value="$t(translationPrefix + slotProps.data[field])"
            :severity="statusColor[slotProps.data[field] as keyof typeof statusColor]"
          />
        </div>
      </slot>
    </template>
    <template
      v-if="filter"
      #filter="{ filterModel, filterCallback }"
    >
      <Select
        id="rentStatus"
        v-model="filterModel.value"
        class="w-full"
        :placeholder="$t('forms.filters.choose')"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
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
    translationPrefix: string
    statusColor: Record<string, string>
    sortable?: boolean
    filter?: boolean
    optionLabel?: string
    optionValue?: string
    showFilterMenu?: boolean
    options?: {
      label: string
      value: string
    }[]
  }>(), {
    sortable: false,
    filter: false,
    showFilterMenu: false,
  },
)
</script>
