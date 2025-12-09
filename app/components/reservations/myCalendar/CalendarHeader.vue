<template>
  <div class="border-b border-gray-200 dark:border-gray-600 p-4 flex flex-col gap-4 w-full">
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
            @click="prevWeek"
          />
          <Button
            icon="pi pi-arrow-right"
            severity="info"
            variant="outlined"
            rounded
            @click="nextWeek"
          />
        </div>
        <h2 class="text-xl">
          {{ weekRange }}
        </h2>
      </div>
      <Button
        severity="success"
        :label="$t('common.buttons.add')"
        icon="pi pi-plus"
        @click="emit('addBooking')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentDate: Date
  weekDays: Array<Date>
}>()

const emit = defineEmits(['updateDate', 'addBooking'])
const { t } = useI18n()

const weekRange = computed(() => {
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

const nextWeek = () => {
  const newDate = new Date(props.currentDate)
  newDate.setDate(props.currentDate.getDate() + 7)
  emit('updateDate', newDate)
}

const prevWeek = () => {
  const newDate = new Date(props.currentDate)
  newDate.setDate(props.currentDate.getDate() - 7)
  emit('updateDate', newDate)
}

const handleToday = () => {
  emit('updateDate', new Date())
}
</script>
