<template>
  <form
    v-if="booking"
    @submit.prevent="submitForm"
  >
    <div class="grid grid-cols-3 gap-4 pt-4">
      <div class="flex flex-col gap-2 col-span-full">
        <FormTextField
          id="title"
          v-model="title"
          :label="$t('forms.booking.title')"
          :errorMessage="titleError"
          @blur="titleBlur"
        />
      </div>

      <div class="flex flex-col gap-2 col-span-full">
        <FormSelectField
          id="roomId"
          v-model="roomId"
          :options="availableRooms"
          optionLabel="roomName"
          optionValue="roomId"
          :label="$t('forms.booking.selectRoom')"
          :errorMessage="roomIdError"
          @blur="roomIdBlur"
        />
      </div>

      <div class="flex flex-col gap-2">
        <FormDateField
          id="startedAt"
          v-model="startedAt"
          showTime
          hourFormat="24"
          dateFormat="yy/mm/dd"
          :label="$t('forms.booking.startDatePlaceholder')"
          :errorMessage="startedAtError"
          fluid
          @blur="startedAtBlur"
        />
      </div>

      <div class="flex flex-col gap-2">
        <FormDateField
          id="endedAt"
          v-model="endedAt"
          showTime
          dateFormat="yy/mm/dd"
          hourFormat="24"
          :label="$t('forms.booking.endDatePlaceholder')"
          :errorMessage="endedAtError"
          fluid
          @blur="endedAtBlur"
        />
      </div>

      <div class="flex flex-col gap-2">
        <FormNumberField
          id="participants"
          v-model="participantsCount"
          :min="1"
          :label="$t('forms.booking.participants')"
          :errorMessage="participantsCountError"
          fluid
          @blur="participantsCountBlur"
        />
      </div>

      <div class="flex flex-col gap-2 col-span-full">
        <FormMultiSelectField
          id="participantIds"
          v-model="participantIds"
          :options="availableUsers"
          optionLabel="displayName"
          optionValue="id"
          :label="$t('forms.booking.selectParticipants')"
          :filter="true"
          :errorMessage="customParticipantsError || participantIdsError"
          @blur="participantIdsBlur"
        />
      </div>

      <div class="flex items-center gap-2 col-span-full">
        <Checkbox
          id="isPrivate"
          v-model="isPrivate"
          :binary="true"
        />
        <label
          for="isPrivate"
          class="font-semibold"
        >{{ $t('forms.booking.isPrivate') }}</label>
      </div>

      <div class="flex justify-end gap-2 mt-4 col-span-full">
        <Button
          type="button"
          :label="$t('common.buttons.cancel')"
          severity="danger"
          variant="outlined"
          @click="$emit('cancel')"
        />
        <Button
          type="submit"
          :label="$t('common.buttons.save')"
          severity="success"
          :loading="loading"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { IBookingUpdateRequest } from '~/interfaces/BookingsInterfaces'
import { useUser } from '~/composables/useUser'
import { useRoom } from '~/composables/useRoom'
import { useAuth } from '~/composables/useAuth'
import { useBooking } from '~/composables/useBooking'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'
import FormTextField from '~/components/common/FormTextField.vue'
import FormSelectField from '~/components/common/FormSelectField.vue'
import FormDateField from '~/components/common/FormDateField.vue'
import FormNumberField from '~/components/common/FormNumberField.vue'
import FormMultiSelectField from '~/components/common/FormMultiSelectField.vue'

const props = defineProps<{
  bookingId: string
}>()

const { t } = useI18n()
const toast = useToast()
const { users, fetchUsers } = useUser()
const { rooms, fetchRooms } = useRoom()
const { user, isAdmin } = useAuth()
const { fetchBooking, updateBooking, loading, booking } = useBooking()

const { handleSubmit, resetForm } = useForm<IBookingUpdateRequest>({
  validationSchema: {
    title: 'required',
    roomId: 'required',
    startedAt: 'required',
    endedAt: 'required',
    participantsCount: 'required|min:1',
  },
})

const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField<string>('title')
const { value: roomId, errorMessage: roomIdError, handleBlur: roomIdBlur } = useField<string>('roomId')
const { value: startedAt, errorMessage: startedAtError, handleBlur: startedAtBlur } = useField<Date | null>('startedAt')
const { value: endedAt, errorMessage: endedAtError, handleBlur: endedAtBlur } = useField<Date | null>('endedAt')
const { value: participantsCount, errorMessage: participantsCountError, handleBlur: participantsCountBlur } = useField<number>('participantsCount')
const { value: isPrivate, errorMessage: isPrivateError, handleBlur: isPrivateBlur } = useField<boolean>('isPrivate')
const { value: participantIds, errorMessage: participantIdsError, handleBlur: participantIdsBlur } = useField<string[]>('participantIds')

const customParticipantsError = ref<string>('')

watch([() => participantIds.value, () => participantsCount.value], () => {
  if (participantIds.value && participantIds.value.length > participantsCount.value) {
    customParticipantsError.value = `Liczba uczestników (${participantsCount.value}) nie może być mniejsza niż liczba wybranych osób (${participantIds.value.length})`
  }
  else {
    customParticipantsError.value = ''
  }
})

const availableRooms = computed(() => {
  if (!rooms.value || !Array.isArray(rooms.value)) {
    return []
  }
  return rooms.value.filter(r => r.status === 'available')
})

const availableUsers = computed(() => {
  if (!users.value || !Array.isArray(users.value)) {
    return []
  }
  return users.value
    .filter((u) => {
      if (isAdmin.value) {
        return true
      }
      return u.id === user.value?.id
    })
    .map(u => ({
      id: u.id,
      displayName: `${u.firstName} ${u.lastName} (${u.username})`,
    }))
})

const submitForm = handleSubmit(async (formValue: IBookingUpdateRequest) => {
  if (customParticipantsError.value) {
    return
  }

  try {
    const formatDateTime = (date: Date | null | undefined) => {
      if (!date || !(date instanceof Date)) return undefined
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    }

    const payload = {
      ...formValue,
      startedAt: formatDateTime(startedAt.value),
      endedAt: formatDateTime(endedAt.value),
    }

    await updateBooking(props.bookingId, payload)
    toast.add({
      severity: 'success',
      summary: t('common.toast.success'),
      detail: t('common.toast.bookingUpdated'),
      life: 3000,
    })
  }
  catch (error: any) {
    console.error('Błąd podczas aktualizacji rezerwacji:', error)

    if (error?.status === 409 || error?.response?.status === 409) {
      const errorMessage = error?.data?.message || error?.response?.data?.message || ''

      if (errorMessage.toLowerCase().includes('time slot already booked')
        || errorMessage.toLowerCase().includes('already booked')) {
        toast.add({
          severity: 'warn',
          summary: t('common.warning'),
          detail: 'W tym czasie jest już zarezerwowana inna rezerwacja. Wybierz inny termin.',
          life: 5000,
        })
        return
      }
    }

    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('common.toast.bookingError'),
      life: 3000,
    })
  }
})

onMounted(async () => {
  await fetchBooking(props.bookingId)
  if (booking.value) {
    resetForm({
      values: {
        title: booking.value.title,
        roomId: booking.value.room.id,
        startedAt: new Date(booking.value.startedAt),
        endedAt: new Date(booking.value.endedAt),
        participantsCount: Number(booking.value.participantsCount),
        isPrivate: booking.value.isPrivate,
        participantIds: booking.value.participants.map(p => p.id),
      },
    })
  }
  await fetchUsers(false)
  await fetchRooms(false)
})
</script>
