<template>
  <form
    class="grid grid-cols-3 gap-x-4 pt-4"
    @submit.prevent="addBooking"
  >
    <div class="col-span-full">
      <CommonFormsTextField
        id="title"
        v-model="title"
        :label="$t('forms.fields.booking.title')"
        :errorMessage="titleError"
        @blur="titleBlur"
      />
    </div>

    <div
      v-if="!providedRoomId"
      class="col-span-full"
    >
      <CommonFormsSelectField
        id="room"
        v-model="roomId"
        :label="$t('forms.fields.booking.roomId')"
        :options="rooms"
        optionLabel="roomName"
        optionValue="roomId"
        :errorMessage="roomIdError"
        @blur="roomIdBlur"
      />
    </div>

    <div class="flex flex-col md:flex-row gap-x-4 col-span-2">
      <div class="flex-1">
        <CommonFormsDateField
          id="startedAt"
          v-model="startedAt"
          :label="$t('forms.fields.booking.startedAt')"
          showTime
          hourFormat="24"
          :errorMessage="startedAtError"
          @blur="startedAtBlur"
        />
      </div>

      <div class="flex-1">
        <CommonFormsDateField
          id="endedAt"
          v-model="endedAt"
          :label="$t('forms.fields.booking.endedAt')"
          showTime
          hourFormat="24"
          :errorMessage="endedAtError"
          @blur="endedAtBlur"
        />
      </div>
    </div>

    <div>
      <CommonFormsNumberField
        id="participantsCount"
        v-model="participantsCount"
        :label="$t('forms.fields.booking.participantsCount')"
        :min="1"
        :errorMessage="participantsCountError"
        @blur="participantsCountBlur"
      />
    </div>

    <div class="col-span-full">
      <CommonFormsMultiSelectField
        id="participantIds"
        v-model="participantIds"
        :label="$t('forms.fields.booking.participantIds')"
        :options="availableUsers"
        optionLabel="displayName"
        optionValue="id"
        :hint="$t('forms.booking.participantsHint')"
        :filter="true"
        :errorMessage="participantIdsError"
        @blur="participantIdsBlur"
      />
    </div>

    <div class="flex items-center gap-2 col-span-full">
      <Checkbox
        id="isPrivate"
        v-model="isPrivate"
        binary
      />
      <label for="isPrivate">{{ $t('pages.roomDetails.bookingForm.isPrivate') }}</label>
    </div>

    <div class="flex gap-2 justify-end col-span-full">
      <Button
        type="button"
        :label="$t('pages.roomDetails.bookingForm.cancel')"
        severity="error"
        variant="outlined"
        @click="handleCancel"
      />
      <Button
        type="submit"
        :label="$t('pages.roomDetails.bookingForm.submit')"
        :loading="loading"
        severity="success"
        variant="outlined"
      />
    </div>
  </form>
  <Toast />
</template>

<script setup lang="ts">
import { useBooking } from '~/composables/useBooking'
import { useRoom } from '~/composables/useRoom'
import { useUser } from '~/composables/useUser'
import type { IBookingCreateRequest } from '~/interfaces/BookingsInterfaces'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'

const props = defineProps<{
  visible: boolean
  providedRoomId?: string
  myBookings?: boolean
}>()

const { t } = useI18n()
const toast = useToast()
const { createBooking, loading, error } = useBooking()
const { rooms, fetchRooms, room, fetchRoom } = useRoom()
const { users, fetchUsers } = useUser()
const { user: currentUser } = useAuth()

const maxCapacity = ref(room.value?.capacity || 10)

const { handleSubmit, resetForm } = useForm<IBookingCreateRequest>({
  validationSchema: {
    title: 'required|min:3',
    roomId: 'required',
    startedAt: 'required',
    endedAt: 'required',
    participantsCount: `required|min_value:1|max_value:${maxCapacity.value}`,
  },
  initialValues: {
    roomId: props.providedRoomId || '',
  },
})

const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField<string>('title')
const { value: roomId, errorMessage: roomIdError, handleBlur: roomIdBlur } = useField<string>('roomId')
const { value: startedAt, errorMessage: startedAtError, handleBlur: startedAtBlur } = useField<Date>('startedAt')
const { value: endedAt, errorMessage: endedAtError, handleBlur: endedAtBlur } = useField<Date>('endedAt')
const { value: participantsCount, errorMessage: participantsCountError, handleBlur: participantsCountBlur, setErrors: setParticipantsCountErrors } = useField<number>('participantsCount')
const { value: participantIds, errorMessage: participantIdsError, handleBlur: participantIdsBlur } = useField<string[]>('participantIds')
const { value: isPrivate } = useField<boolean>('isPrivate')

const emit = defineEmits<{
  success: []
  cancel: []
  close: []
}>()

const availableUsers = computed(() => {
  if (!users.value || !Array.isArray(users.value)) {
    return []
  }
  return users.value
    .filter(u => u.id !== currentUser.value?.id)
    .map(u => ({
      id: u.id,
      displayName: `${u.firstName} ${u.lastName} (${u.username})`,
    }))
})

const addBooking = handleSubmit(async (formValues: IBookingCreateRequest) => {
  try {
    const formatDateTime = (date: Date): string => {
      const utcDate = new Date(date.getTime() - (1 * 60 * 60 * 1000))
      const year = utcDate.getFullYear()
      const month = String(utcDate.getMonth() + 1).padStart(2, '0')
      const day = String(utcDate.getDate()).padStart(2, '0')
      const hours = String(utcDate.getHours()).padStart(2, '0')
      const minutes = String(utcDate.getMinutes()).padStart(2, '0')
      const seconds = String(utcDate.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    }

    const bookingData: IBookingCreateRequest = {
      ...formValues,
      startedAt: formValues.startedAt instanceof Date ? formatDateTime(formValues.startedAt) : formValues.startedAt,
      endedAt: formValues.endedAt instanceof Date ? formatDateTime(formValues.endedAt) : formValues.endedAt,
    }

    if (props.providedRoomId) {
      bookingData.roomId = props.providedRoomId
    }

    await createBooking(bookingData, props.myBookings)

    await fetch
    if (props.providedRoomId) {
      await fetchRoom(props.providedRoomId)
    }
    resetForm()
    toast.add({
      severity: 'success',
      summary: t('common.toast.success'),
      detail: t('common.toast.bookingCreated'),
      life: 3000,
    })
    emit('success')
    emit('close')
  }
  catch (err: any) {
    console.log('Error creating booking:', err, 'Error from composable:', error.value)
    toast.add({
      severity: 'error',
      summary: t('toast.summary.error'),
      detail: error.value,
      life: 5000,
    })
  }
})

const handleCancel = () => {
  emit('cancel')
  emit('close')
}

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
  if (!props.providedRoomId) {
    fetchRooms(false, 'available')
  }
  await fetchUsers(false)
})
</script>
