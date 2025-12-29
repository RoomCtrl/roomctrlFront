<template>
  <Column
    :field="field"
    :header="header"
    dataType="date"
    :sortable="sortable"
    :showFilterMenu="showFilterMenu"
  >
    <template #body="slotProps">
      <slot
        name="body"
        v-bind="slotProps"
      >
        <div class="flex flex-row gap-2 items-center">
          <div
            v-if="showTime || onlyTime"
            class="flex flex-row gap-1 items-center"
          >
            <h1>
              {{ formatToHoursMinutes(new Date(slotProps.data[field])) }}
            </h1>
            <i class="pi pi-clock" />
          </div>
          <div
            v-if="!onlyTime"
            class="flex flex-row gap-1 items-center"
          >
            <h1>
              {{ formatToDayMonth(new Date(slotProps.data[field])) }}
            </h1>
            <i class="pi pi-calendar" />
          </div>
        </div>
      </slot>
    </template>

    <template
      v-if="filter"
      #filter="{ filterModel, filterCallback }"
    >
      <DatePicker
        v-model="filterModel.value"
        :dateFormat="dateFormat"
        :timeOnly="onlyTime"
        :showTime="showTime && !onlyTime"
        showButtonBar
        :placeholder="$t('forms.filters.search')"
        @date-select="filterCallback()"
        @clear-click="handleClearDate(filterModel, filterCallback)"
      />
    </template>
  </Column>
</template>

<script setup lang="ts">
import { formatToHoursMinutes, formatToDayMonth } from '~/utils/dateHelpers'

withDefaults(
  defineProps<{
    field: string
    header: string
    columnClass?: string
    sortable?: boolean
    showTime?: boolean
    onlyTime?: boolean
    filter?: boolean
    showFilterMenu?: boolean
    placeholder?: string
    dateFormat?: string
  }>(),
  {
    sortable: false,
    showTime: false,
    onlyTime: false,
    filter: false,
    showFilterMenu: false,
    placeholder: '',
    dateFormat: 'dd/mm/yy',
  },
)

const handleClearDate = (filterModel: any, filterCallback: Function) => {
  filterModel.value = null
  filterCallback()
}
</script>
