<template>
  <Dialog
    :visible="open"
    modal
    class="min-w-[40rem]"
    @update:visible="(val) => emit('update:open', val)"
  >
    <template #header>
      <h3 class="text-xl font-semibold">
        {{ $t('pages.myCalendar.editReservation') }}
      </h3>
    </template>

    <form class="space-y-4" @submit.prevent="handleSave">
      <div>
        <label class="block text-sm font-medium mb-2">
          {{ $t('reservations.form.title') }}
        </label>
        <InputText v-model="formData.title" class="w-full" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">
            {{ $t('reservations.form.date') }}
          </label>
          <DatePicker v-model="formData.date" class="w-full" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            {{ $t('reservations.form.time') }}
          </label>
          <InputText v-model="formData.time" type="time" class="w-full" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">
            {{ $t('reservations.form.duration') }} (min)
          </label>
          <InputNumber
            v-model="formData.duration"
            class="w-full"
            :min="15"
            :step="15"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">
            {{ $t('reservations.form.attendees') }}
          </label>
          <InputNumber v-model="formData.attendees" class="w-full" :min="1" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">
          {{ $t('reservations.form.location') }}
        </label>
        <InputText v-model="formData.location" class="w-full" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">
          {{ $t('reservations.form.color') }}
        </label>
        <Select
          v-model="formData.color"
          :options="colorOptions"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </div>
    </form>

    <template #footer>
      <Button
        :label="$t('common.buttons.cancel')"
        severity="secondary"
        @click="emit('update:open', false)"
      />
      <Button
        :label="$t('common.buttons.save')"
        severity="success"
        @click="handleSave"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  reservation?: {
    id?: number
    title: string
    duration: number
    date: Date
    location: string
    attendees: number
    color: string
  }
}>()

const emit = defineEmits(['update:open', 'save'])

const formData = ref({
  title: '',
  duration: 30,
  date: new Date(),
  time: '09:00',
  location: '',
  attendees: 1,
  color: 'blue'
})

const colorOptions = [
  { label: 'Niebieski', value: 'blue' },
  { label: 'Zielony', value: 'green' },
  { label: 'Żółty', value: 'yellow' },
  { label: 'Fioletowy', value: 'purple' },
  { label: 'Czerwony', value: 'red' },
  { label: 'Pomarańczowy', value: 'orange' }
]

watch(
  () => props.reservation,
  (newReservation) => {
    if (newReservation) {
      formData.value = {
        title: newReservation.title,
        duration: newReservation.duration,
        date: new Date(newReservation.date),
        time: formatTimeForInput(newReservation.date),
        location: newReservation.location,
        attendees: newReservation.attendees,
        color: newReservation.color
      }
    }
  },
  { deep: true }
)

const formatTimeForInput = (date: Date) => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

const handleSave = () => {
  const [hours, minutes] = formData.value.time.split(':').map(Number)
  const newDate = new Date(formData.value.date)
  newDate.setHours(hours, minutes, 0, 0)

  emit('save', {
    id: props.reservation?.id,
    title: formData.value.title,
    duration: formData.value.duration,
    date: newDate,
    location: formData.value.location,
    attendees: formData.value.attendees,
    color: formData.value.color
  })

  emit('update:open', false)
}
</script>
