<template>
  <form
    v-if="booking"
    @submit.prevent="submitForm"
  >
    <div class="grid grid-cols-3 gap-x-4 pt-4">
      <div class="flex flex-col gap-2 col-span-full">
        <CommonFormsTextField
          id="title"
          v-model="title"
          :label="$t('forms.fields.booking.title')"
          :errorMessage="titleError"
          @blur="titleBlur"
        />
      </div>

      <div class="flex flex-col gap-2 col-span-full">
        <CommonFormsSelectField
          id="roomId"
          v-model="roomId"
          :options="availableRooms"
          optionLabel="roomName"
          optionValue="roomId"
          :label="$t('forms.fields.booking.roomId')"
          :errorMessage="roomIdError"
          @blur="roomIdBlur"
        />
      </div>

      <div class="flex flex-col gap-2">
        <CommonFormsDateField
          id="startedAt"
          v-model="startedAt"
          showTime
          hourFormat="24"
          dateFormat="yy/mm/dd"
          :label="$t('forms.fields.booking.startedAt')"
          :errorMessage="startedAtError"
          fluid
          @blur="startedAtBlur"
        />
      </div>

      <div class="flex flex-col gap-2">
        <CommonFormsDateField
          id="endedAt"
          v-model="endedAt"
          showTime
          dateFormat="yy/mm/dd"
          hourFormat="24"
          :label="$t('forms.fields.booking.endedAt')"
          :errorMessage="endedAtError"
          fluid
          @blur="endedAtBlur"
        />
      </div>

      <div class="flex flex-col gap-2">
        <CommonFormsNumberField
          id="participants"
          v-model="participantsCount"
          :min="1"
          :label="$t('forms.fields.booking.participantsCount')"
          :errorMessage="participantsCountError"
          fluid
          @blur="participantsCountBlur"
        />
      </div>

      <div class="flex flex-col gap-2 col-span-full">
        <CommonFormsMultiSelectField
          id="participantIds"
          v-model="participantIds"
          :options="availableUsers"
          optionLabel="displayName"
          optionValue="id"
          :label="$t('forms.fields.booking.participantIds')"
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
        >{{ $t('forms.fields.booking.isPrivate') }}</label>
      </div>

      <div class="flex justify-end gap-2 mt-4 col-span-full">
        <Button
          type="button"
          :label="$t('common.buttons.cancel')"
          severity="danger"
          variant="outlined"
          @click="$emit('updateVisible', false)"
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
const { users, fetchUsers } = useUser()
const { rooms, room, fetchRooms, fetchRoom } = useRoom()
const { user, isAdmin } = useAuth()
const { fetchBooking, updateBooking, loading, booking, error } = useBooking()

const maxCapacity = ref(room.value ? room.value.capacity : 10)

const { handleSubmit, resetForm } = useForm<IBookingUpdateRequest>({
  validationSchema: {
    title: 'required',
    roomId: 'required',
    startedAt: 'required',
    endedAt: 'required',
    participantsCount: `required|min_value:1|max_value:${maxCapacity.value}`,
  },
})

const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField<string>('title')
const { value: roomId, errorMessage: roomIdError, handleBlur: roomIdBlur } = useField<string>('roomId')
const { value: startedAt, errorMessage: startedAtError, handleBlur: startedAtBlur } = useField<Date | null>('startedAt')
const { value: endedAt, errorMessage: endedAtError, handleBlur: endedAtBlur } = useField<Date | null>('endedAt')
const { value: participantsCount, errorMessage: participantsCountError, handleBlur: participantsCountBlur, setErrors: setParticipantsCountErrors } = useField<number>('participantsCount')
const { value: isPrivate } = useField<boolean>('isPrivate')
const { value: participantIds, errorMessage: participantIdsError, handleBlur: participantIdsBlur } = useField<string[]>('participantIds')

const customParticipantsError = ref<string>('')

const emit = defineEmits(['updateVisible'])

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
      summary: t('toast.summary.success'),
      detail: t('toast.messages.success.bookingUpdated'),
      life: 3000,
    })
    emit('updateVisible', false)
  }
  catch (err: any) {
    const errorMessage = error.value || err?.message || t('toast.error')
    toast.add({
      severity: 'error',
      summary: t('toast.summary.error'),
      detail: errorMessage,
      life: 5000,
    })
  }
})

watch(() => participantIds.value, (newParticipantIds) => {
  if (newParticipantIds && newParticipantIds.length > 0) {
    if (newParticipantIds.length > participantsCount.value) {
      participantsCount.value = newParticipantIds.length
    }
  }
})

watch(() => roomId.value, async (newRoomId) => {
  if (newRoomId) {
    await fetchRoom(newRoomId)
    if (room.value && room.value.capacity) {
      maxCapacity.value = room.value.capacity

      if (participantsCount.value > maxCapacity.value) {
        const errorMsg = t('forms.fieldMessages.error.maxValue', {
          fieldName: t('forms.fields.booking.participantsCount'),
          length: maxCapacity.value,
        })
        setParticipantsCountErrors(errorMsg)
      }
    }
  }
})

watch(() => participantsCount.value, (newCount) => {
  if (newCount > maxCapacity.value) {
    const errorMsg = t('forms.fieldMessages.error.maxValue', {
      fieldName: t('forms.fields.booking.participantsCount'),
      length: maxCapacity.value,
    })
    setParticipantsCountErrors(errorMsg)
  }
  else if (newCount < 1) {
    const errorMsg = t('forms.fieldMessages.error.minValue', {
      fieldName: t('forms.fields.booking.participantsCount'),
      length: 1,
    })
    setParticipantsCountErrors(errorMsg)
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
  await fetchRoom(roomId.value)
})
</script>
