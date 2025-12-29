<template>
  <div
    class="border-b border-gray-200 dark:border-gray-600 p-4 flex flex-col gap-4 w-full"
  >
    <h1 class="text-4xl font-bold">
      {{ $t('pages.myCalendar.title') }}
    </h1>
    <div class="flex justify-between items-center w-full">
      <div class="flex items-center gap-4">
        <Button
          :label="$t('date.today')"
          :variant="activeButton"
          @click="handleToday"
        />
        <div class="flex items-center gap-2">
          <Button
            icon="pi pi-arrow-left"
            severity="info"
            variant="outlined"
            rounded
            @click="previousPeriod"
          />
          <Button
            icon="pi pi-arrow-right"
            severity="info"
            variant="outlined"
            rounded
            @click="nextPeriod"
          />
        </div>
        <h2 class="text-xl">
          {{ formattedDate }}
        </h2>
      </div>
      <div class="flex items-center gap-2">
        <!-- Rozwijana lista dla widoku dnia -->
        <SplitButton
          v-if="viewMode === 'day'"
          :model="[
            {
              label: $t('date.week'),
              icon: 'pi pi-list',
              command: () => $emit('change-view', 'week'),
            },
            {
              label: $t('date.month'),
              icon: 'pi pi-calendar',
              command: () => $emit('change-view', 'month'),
            },
          ]"
          icon="pi pi-arrow-right-arrow-left"
          :label="$t('date.day')"
          severity="info"
        />
        <SplitButton
          v-else-if="viewMode === 'week'"
          :model="[
            {
              label: $t('date.day'),
              icon: 'pi pi-calendar-times',
              command: () => $emit('change-view', 'day'),
            },
            {
              label: $t('date.month'),
              icon: 'pi pi-calendar',
              command: () => $emit('change-view', 'month'),
            },
          ]"
          icon="pi pi-arrow-right-arrow-left"
          :label="$t('date.week')"
          severity="info"
        />
        <SplitButton
          v-else
          :model="[
            {
              label: $t('date.day'),
              icon: 'pi pi-calendar-times',
              command: () => $emit('change-view', 'day'),
            },
            {
              label: $t('date.week'),
              icon: 'pi pi-list',
              command: () => $emit('change-view', 'week'),
            },
          ]"
          icon="pi pi-arrow-right-arrow-left"
          :label="$t('date.month')"
          severity="info"
          variant="outlined"
        />
        <Button
          severity="success"
          :label="$t('common.buttons.add')"
          icon="pi pi-plus"
          @click="$emit('addBooking')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dayOfWeekFullNames, monthNamesShort } from '~/utils/dateHelpers'

const props = defineProps<{
  currentDate: Date
  weekDays: Array<Date>
  viewMode?: 'day' | 'week' | 'month'
}>()

const emit = defineEmits(['updateDate', 'toggle-view', 'change-view', 'addBooking'])
const { t } = useI18n()

const formattedDate = computed(() => {
  if (props.viewMode === 'day') {
    const dayString = t(
      dayOfWeekFullNames[
        props.currentDate.getDay() === 0 ? 6 : props.currentDate.getDay() - 1
      ],
    )
    const monthString = t(
      monthNamesShort[props.currentDate.getMonth()] as string,
    )
    return `${dayString}, ${props.currentDate.getDate()} ${monthString} ${props.currentDate.getFullYear()}`
  }

  if (props.viewMode === 'month') {
    const monthString = t(
      monthNamesShort[props.currentDate.getMonth()] as string,
    )
    return `${monthString} ${props.currentDate.getFullYear()}`
  }

  // Widok tygodniowy
  const start = props.weekDays[0]
  const end = props.weekDays[6]
  if (start != null && end != null) {
    const startMonthString = t(monthNamesShort[start.getMonth()] as string)
    const endMonthString = t(monthNamesShort[end.getMonth()] as string)
    return `${start?.getDate()} ${startMonthString} - ${end?.getDate()} ${endMonthString} ${end?.getFullYear()}`
  }
  return ''
})

const activeButton = computed(() => {
  const today = new Date()
  return props.currentDate.getDate() === today.getDate()
    && props.currentDate.getMonth() === today.getMonth()
    && props.currentDate.getFullYear() === today.getFullYear()
    ? 'outlined'
    : ''
})

const previousPeriod = () => {
  const newDate = new Date(props.currentDate)
  if (props.viewMode === 'day') {
    newDate.setDate(props.currentDate.getDate() - 1)
  }
  else if (props.viewMode === 'month') {
    newDate.setMonth(props.currentDate.getMonth() - 1)
  }
  else {
    newDate.setDate(props.currentDate.getDate() - 7)
  }
  emit('updateDate', newDate)
}

const nextPeriod = () => {
  const newDate = new Date(props.currentDate)
  if (props.viewMode === 'day') {
    newDate.setDate(props.currentDate.getDate() + 1)
  }
  else if (props.viewMode === 'month') {
    newDate.setMonth(props.currentDate.getMonth() + 1)
  }
  else {
    newDate.setDate(props.currentDate.getDate() + 7)
  }
  emit('updateDate', newDate)
}

const handleToday = () => {
  emit('updateDate', new Date())
}
</script>
