<template>
  <Card>
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-clock" />
        {{ $t('pages.adminDashboard.settingsAdmin.sections.workingHours.title') }}
      </div>
    </template>
    <template #content>
      <Toast />
      <form
        class="grid grid-cols-1 md:grid-cols-5 grid-rows-2 gap-4"
        @submit.prevent="submitForm"
      >
        <div class="flex flex-col gap-2 col-span-2">
          <label
            for="type"
            class="font-semibold"
          >
            {{ $t('forms.fields.roomName') }}
          </label>
          <Select
            id="roomId"
            v-model="roomId"
            :options="roomOptions"
            optionLabel="label"
            optionValue="value"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="type"
            class="font-semibold"
          >
            {{ $t('forms.fields.workType') }}
          </label>
          <Select
            id="type"
            v-model="type"
            :options="typeOptions"
            optionLabel="label"
            optionValue="value"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label
            for="startTime"
            class="font-semibold"
          >
            {{ $t('forms.fields.startTime') }}
          </label>
          <DatePicker
            id="startTime"
            v-model="startTime"
            updateModelType="string"
            timeOnly
          />
        </div>

        <div class="flex flex-col gap-2">
          {{ endTime }}
          <label
            for="endTime"
            class="font-semibold"
          >
            {{ $t('forms.fields.endTime') }}
          </label>
          <DatePicker
            id="endTime"
            v-model="endTime"
            updateModelType="string"
            timeOnly
          />
        </div>
        <div class="flex flex-col gap-2 col-span-2 justify-center">
          <label
            for="email"
            class="font-semibold"
          >
            {{ $t('forms.fields.daysOfWeek') }}
          </label>
          <CheckboxGroup
            v-model="daysOfWeek"
            class="flex flex-row gap-4 "
          >
            <div
              v-for="day in checkBoxDays"
              :key="day.label"
              class="flex items-center gap-2"
            >
              <Checkbox
                :inputId="day.label"
                :value="day.value"
              />
              <label :for="day.label"> {{ day.label }} </label>
            </div>
          </CheckboxGroup>
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="weeksAhead"
            class="font-semibold"
          >
            {{ $t('forms.fields.weeksAhead') }}
          </label>
          <InputNumber
            id="weeksAhead"
            v-model="weeksAhead"
          />
        </div>
        <div class="flex justify-end col-span-full">
          <Button
            type="submit"
            label="Zapisz zmiany"
            severity="success"
            icon="pi pi-check"
            class="mt-4"
          />
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

interface IOrganizationSettings {
  roomId: string
  type: 'cleaning' | 'maintenance'
  startTime: Date
  endTime: string
  daysOfWeek: number[]
  weeksAhead: number
}
const { createBookingRecurring } = useBooking()
const { fetchRooms, rooms } = useRoom()
const toast = useToast()
const { t } = useI18n()

const roomOptions = computed(() =>
  rooms.value.map(room => ({
    label: room.roomName,
    value: room.roomId,
  })),
)

const typeOptions = [
  { label: 'Sprzątanie', value: 'cleaning' },
  { label: 'Konserwacja', value: 'maintenance' },
]
const loading = ref(false)
const { handleSubmit, resetForm } = useForm<IOrganizationSettings>({
  validationSchema: {
    roomId: 'required',
    type: 'required',
    startTime: 'required',
    endTime: 'required',
    daysOfWeek: 'required',
    weeksAhead: 'required|min:0|max:52',
  },
})

const checkBoxDays = [
  { label: t('date.dayNames.monday'), value: 1 },
  { label: t('date.dayNames.tuesday'), value: 2 },
  { label: t('date.dayNames.wednesday'), value: 3 },
  { label: t('date.dayNames.thursday'), value: 4 },
  { label: t('date.dayNames.friday'), value: 5 },
  { label: t('date.dayNames.saturday'), value: 6 },
  { label: t('date.dayNames.sunday'), value: 7 },
]

const { value: roomId, errorMessage: roomIdError, handleBlur: roomIdBlur } = useField<string>('roomId')
const { value: type, errorMessage: typeError, handleBlur: typeBlur } = useField<'cleaning' | 'maintenance'>('type')
const { value: startTime, errorMessage: startTimeError, handleBlur: startTimeBlur } = useField<Date>('startTime')
const { value: endTime, errorMessage: endTimeError, handleBlur: endTimeBlur } = useField<Date>('endTime')
const { value: daysOfWeek, errorMessage: daysOfWeekError, handleBlur: daysOfWeekBlur } = useField<number[]>('daysOfWeek')
const { value: weeksAhead, errorMessage: weeksAheadError, handleBlur: weeksAheadBlur } = useField<number>('weeksAhead')

const submitForm = handleSubmit(async (formValues: IOrganizationSettings) => {
  loading.value = true

  try {
    await createBookingRecurring(formValues)
  }
  finally {
    loading.value = false
    toast.add({
      severity: 'success',
      summary: 'Sukces',
      detail: 'Zapisano czas sprzątania',
      life: 3000,
    })
  }
})

onMounted(async () => {
  await fetchRooms()
})
</script>
