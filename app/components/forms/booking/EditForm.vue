<template>
  <form
    v-if="booking"
    @submit.prevent="submitForm"
  >
    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col gap-2 col-span-full">
        <label
          for="title"
          class="font-semibold"
        >{{ $t('forms.booking.title') }}</label>
        <InputText
          id="title"
          v-model="title"
          :invalid="!!titleError"
        />
        <small
          v-if="titleError"
          class="text-red-500"
        >{{ titleError }}</small>
      </div>

      <div class="flex flex-col gap-2 col-span-full">
        <label
          for="roomId"
          class="font-semibold"
        >{{ $t('forms.booking.room') }}</label>
        <Select
          id="roomId"
          v-model="roomId"
          :options="availableRooms"
          optionLabel="roomName"
          optionValue="roomId"
          :placeholder="$t('forms.booking.selectRoom')"
          :loading="roomsLoading"
          :invalid="!!roomIdError"
        />
        <small
          v-if="roomIdError"
          class="text-red-500"
        >{{ roomIdError }}</small>
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="startedAt"
          class="font-semibold"
        >{{ $t('forms.booking.startDate') }}</label>
        <DatePicker
          id="startedAt"
          v-model="startedAt"
          showTime
          hourFormat="24"
          dateFormat="yy/mm/dd"
          :placeholder="$t('forms.booking.startDatePlaceholder')"
          :invalid="!!startedAtError"
          fluid
        />
        <small
          v-if="startedAtError"
          class="text-red-500"
        >{{ startedAtError }}</small>
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="endedAt"
          class="font-semibold"
        >{{ $t('forms.booking.endDate') }}</label>
        <DatePicker
          id="endedAt"
          v-model="endedAt"
          showTime
          dateFormat="yy/mm/dd"
          hourFormat="24"
          :placeholder="$t('forms.booking.endDatePlaceholder')"
          :invalid="!!endedAtError"
          fluid
        />
        <small
          v-if="endedAtError"
          class="text-red-500"
        >{{ endedAtError }}</small>
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="participants"
          class="font-semibold"
        >{{ $t('forms.booking.participants') }}</label>
        <InputNumber
          id="participants"
          v-model="participantsCount"
          :min="1"
          class="w-[5rem]"
          :invalid="!!participantsCountError || !!customParticipantsError"
          fluid
        />
        <small
          v-if="customParticipantsError || participantsCountError"
          class="text-red-500"
        >{{ customParticipantsError || participantsCountError }}</small>
      </div>

      <div class="flex flex-col gap-2 col-span-full">
        <label
          for="participantIds"
          class="font-semibold"
        >{{ $t('forms.booking.addParticipants') }}</label>
        <MultiSelect
          id="participantIds"
          v-model="participantIds"
          :options="availableUsers"
          optionLabel="displayName"
          optionValue="id"
          :placeholder="$t('forms.booking.selectParticipants')"
          :filter="true"
          :loading="usersLoading"
          display="chip"
          class="w-full"
        />
        <small class="text-gray-500">{{ $t('forms.booking.participantsHint') }}</small>
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
          severity="secondary"
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

const props = defineProps<{
  bookingId: string
}>()

const { t } = useI18n()
const toast = useToast()
const { users, fetchUsers, loading: usersLoading } = useUser()
const { rooms, fetchRooms, loading: roomsLoading } = useRoom()
const { user, isAdmin } = useAuth()
const { fetchBooking, updateBooking, loading, booking } = useBooking()

const { handleSubmit, resetForm } = useForm<IBookingUpdateRequest>({
  validationSchema: {
    title: 'required',
    roomId: 'required',
    startedAt: 'required',
    endedAt: 'required',
    participantsCount: 'required|min:1',
    isPrivate: 'required',
  },
})

const { value: title, errorMessage: titleError } = useField<string>('title')
const { value: roomId, errorMessage: roomIdError } = useField<string>('roomId')
const { value: startedAt, errorMessage: startedAtError } = useField<Date | null>('startedAt')
const { value: endedAt, errorMessage: endedAtError } = useField<Date | null>('endedAt')
const { value: participantsCount, errorMessage: participantsCountError } = useField<number>('participantsCount')
const { value: isPrivate, errorMessage: isPrivateError } = useField<boolean>('isPrivate')
const { value: participantIds, errorMessage: participantIdsError } = useField<string[]>('participantIds')

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
    // Konwersja Date do ISO string format (bez Z i milisekund)
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
