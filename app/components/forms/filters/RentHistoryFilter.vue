<template>
  <div>
    <form @submit.prevent="submitFilter">
      <div class="flex flex-col">
        <h1 class="hidden lg:block text-xl font-bold pb-4">
          {{ $t('forms.filters.title') }}
        </h1>
        <div class="flex flex-col lg:flex-row items-center gap-2">
          <FloatLabel
            class="max-lg:w-full"
            variant="on"
          >
            <InputText
              id="rentTitle"
              v-model="reservationTitle"
              class="w-full"
            />
            <label for="reservationTitle">
              {{ $t('forms.filters.fields.rentTitle') }}
            </label>
          </FloatLabel>

          <FloatLabel
            class="max-lg:w-full"
            variant="on"
          >
            <Select
              v-model="reservationStatus"
              if="rentStatus"
              class="w-full lg:w-[10rem]"
              :options="statuses"
              optionLabel="name"
            />
            <label for="rentStatus">
              {{ $t('forms.filters.fields.rentStatus') }}
            </label>
          </FloatLabel>

          <FloatLabel variant="on">
            <DatePicker
              id="rentDate"
              ref="datepicker"
              v-model="reservationDateRange"
              selectionMode="range"
              :manualInput="false"
              dateFormat="dd/mm/yy"
              showIcon
              showButtonBar
              @clear-click="handleClear"
            />
            <label for="rentDate">
              {{ $t('forms.filters.fields.rentDateRange') }}
            </label>
          </FloatLabel>

          <Button
            type="submit"
            :label="$t('forms.filters.search')"
            :loading="loading"
            class="w-[65vw] md:w-[15rem]"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  reservations: Array<{ id: number, title: string, startedAt: string, endedAt: string, status: string }>
}>()
const { t } = useI18n()
const emit = defineEmits(['filterRents'])
const statuses = ref([
  {
    name: t('pages.reservationsHistory.statuses.all'),
    code: 'all',
  },
  {
    name: t('pages.reservationsHistory.statuses.planned'),
    code: 'planned',
  },
  {
    name: t('pages.reservationsHistory.statuses.cancelled'),
    code: 'cancelled',
  },
  {
    name: t('pages.reservationsHistory.statuses.ended'),
    code: 'ended',
  },
  {
    name: t('pages.reservationsHistory.statuses.toApprove'),
    code: 'toApprove',
  },
])

const reservationTitle = ref('')
const reservationStatus = ref(statuses.value.find(s => s.code === 'all'))
const reservationDateRange = ref()
const loading = ref(false)

const datepicker = ref(null)

const handleClear = () => {
  reservationDateRange.value = null
  nextTick(() => {
    datepicker.value?.$forceUpdate()
  })
  submitFilter()
}

const filteredRents = ref(props.reservations)

const submitFilter = () => {
  loading.value = true
  filteredRents.value = props.reservations.filter((r) => {
    const matchesTitle = r.title?.toLowerCase().includes(reservationTitle.value.toLowerCase()) ?? false

    let matchesStatus = true
    if (reservationStatus.value.code && reservationStatus.value.code != 'all') {
      matchesStatus = r.status?.includes(reservationStatus.value.code) ?? false
    }

    let matchesDateRange = true
    if (reservationDateRange.value) {
      const isRange = Array.isArray(reservationDateRange.value)

      if (isRange && reservationDateRange.value.length === 2) {
        const [rangeStart, rangeEnd] = reservationDateRange.value

        if (r.startedAt && r.endedAt) {
          const reservationStart = new Date(r.startedAt)
          const reservationEnd = new Date(r.endedAt)

          const normalizeDate = (date) => {
            const normalized = new Date(date)
            normalized.setHours(0, 0, 0, 0)
            return normalized
          }

          const normalizedRangeStart = normalizeDate(rangeStart)
          const normalizedRangeEnd = normalizeDate(rangeEnd)
          const normalizedReservationStart = normalizeDate(reservationStart)
          const normalizedReservationEnd = normalizeDate(reservationEnd)

          matchesDateRange = normalizedReservationStart <= normalizedRangeEnd
            && normalizedReservationEnd >= normalizedRangeStart
        }
        else {
          matchesDateRange = false
        }
      }
      else {
        const selectedDate = isRange ? reservationDateRange.value[0] : reservationDateRange.value
        const selectedYear = selectedDate.getFullYear()
        const selectedMonth = selectedDate.getMonth()
        const selectedDay = selectedDate.getDate()

        if (r.startedAt && r.endedAt) {
          const start = new Date(r.startedAt)
          const end = new Date(r.endedAt)
          const startDay = start.getDate()
          const startMonth = start.getMonth()
          const startYear = start.getFullYear()
          const endDay = end.getDate()
          const endMonth = end.getMonth()
          const endYear = end.getFullYear()

          const isAfterStart
            = selectedYear > startYear
              || (selectedYear === startYear && selectedMonth > startMonth)
              || (selectedYear === startYear && selectedMonth === startMonth && selectedDay >= startDay)

          const isBeforeEnd
            = selectedYear < endYear
              || (selectedYear === endYear && selectedMonth < endMonth)
              || (selectedYear === endYear && selectedMonth === endMonth && selectedDay <= endDay)

          matchesDateRange = isAfterStart && isBeforeEnd
        }
        else {
          matchesDateRange = false
        }
      }
    }

    return matchesTitle && matchesDateRange && matchesStatus
  })

  emit('filterRents', filteredRents.value)
  loading.value = false
}
</script>
