<template>
  <Card>
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-clock" />
        {{ $t('pages.adminDashboard.settingsAdmin.sections.workingHours') }}
      </div>
    </template>
    <template #content>
      <Toast />
      <form
        class="grid grid-cols-1 md:grid-cols-5 gap-x-4"
        @submit.prevent="submitForm"
      >
        <div class="col-span-2">
          <CommonFormsSelectField
            id="roomId"
            v-model="roomId"
            :options="roomOptions"
            optionLabel="label"
            optionValue="value"
            :label="$t('forms.fields.room.name')"
            :errorMessage="roomIdError"
            @blur="roomIdBlur"
          />
        </div>

        <CommonFormsSelectField
          id="type"
          v-model="type"
          :options="typeOptions"
          :label="$t('forms.fields.workType')"
          :errorMessage="typeError"
          @blur="typeBlur"
        />

        <CommonFormsDateField
          id="startTime"
          v-model="startTime"
          :label="$t('forms.fields.startTime')"
          :errorMessage="startTimeError"
          timeOnly
          @blur="startTimeBlur"
        />

        <CommonFormsDateField
          id="endTime"
          v-model="endTime"
          :label="$t('forms.fields.endTime')"
          :errorMessage="endTimeError"
          timeOnly
          @blur="endTimeBlur"
        />

        <div class="flex flex-col gap-2 col-span-2 justify-center">
          <label
            for="daysOfWeek"
            class="font-semibold"
          >
            {{ $t('forms.fields.daysOfWeek') }}
          </label>
          <CheckboxGroup
            id="daysOfWeek"
            v-model="daysOfWeek"
            class="grid grid-cols-4 gap-2 "
            @blur="daysOfWeekBlur"
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
          <small
            v-if="daysOfWeekError"
            class="text-red-500"
          >
            {{ daysOfWeekError }}
          </small>
        </div>

        <CommonFormsNumberField
          id="weeksAhead"
          v-model="weeksAhead"
          :label="$t('forms.fields.weeksAhead')"
          :errorMessage="weeksAheadError"
          :min="0"
          :max="52"
          @blur="weeksAheadBlur"
        />

        <div class="flex justify-end col-span-full">
          <Button
            type="submit"
            :label="$t('pages.adminDashboard.settingsAdmin.sections.submitHours')"
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
import type { IBookingRecurringRequest } from '~/interfaces/BookingsInterfaces'

const { createBookingRecurring, error } = useBooking()
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
  { label: t('forms.fields.workTypes.cleaning'), value: 'cleaning' },
  { label: t('forms.fields.workTypes.maintenance'), value: 'maintenance' },
]
const loading = ref(false)
const { handleSubmit, resetForm } = useForm<IBookingRecurringRequest>({
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
const { value: daysOfWeek, errorMessage: daysOfWeekError, handleBlur: daysOfWeekBlur, setErrors: setDaysOfWeekErrors } = useField<number[]>('daysOfWeek')
const { value: weeksAhead, errorMessage: weeksAheadError, handleBlur: weeksAheadBlur } = useField<number>('weeksAhead')

watch(() => daysOfWeek.value, (newValue) => {
  if (!newValue || newValue.length === 0) {
    setDaysOfWeekErrors(t('forms.fieldMessages.error.atLeastOneDay'))
  }
  else {
    setDaysOfWeekErrors(undefined)
  }
})

const submitForm = handleSubmit(async (formValues: IBookingRecurringRequest) => {
  if (!formValues.daysOfWeek || formValues.daysOfWeek.length === 0) {
    setDaysOfWeekErrors(t('forms.fieldMessages.error.atLeastOneDay'))
    return
  }

  loading.value = true

  try {
    formValues.startTime = formatToHoursMinutes(formValues.startTime)
    formValues.endTime = formatToHoursMinutes(formValues.endTime)
    await createBookingRecurring(formValues)

    toast.add({
      severity: 'success',
      summary: t('common.toast.success'),
      detail: t(`toast.details.savedWorkTime.${formValues.type}`),
      life: 3000,
    })

    resetForm()
  }
  catch (err: any) {
    toast.add({
      severity: 'error',
      summary: t('common.toast.error'),
      detail: error || t('forms.messages.error.whileSavingData'),
      life: 3000,
    })
  }

  finally {
    loading.value = false
  }
})

onMounted(async () => {
  await fetchRooms()
})
</script>

<style scoped>
.p-checkbox-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
</style>
