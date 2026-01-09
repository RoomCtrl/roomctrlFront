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
import { useAuth } from '~/composables/useAuth'
import type { IBookingCreateRequest } from '~/interfaces/BookingsInterfaces'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'

const props = defineProps<{
  visible: boolean
  providedRoomId?: string
  capacity?: number
}>()

const { handleSubmit, resetForm } = useForm<IBookingCreateRequest>({
  validationSchema: {
    title: 'required|min:3',
    roomId: 'required',
    startedAt: 'required',
    endedAt: 'required',
    participantsCount: 'required|min_value:1|max_value:' + (props.capacity),
  },
  initialValues: {
    roomId: props.providedRoomId || '',
  },
})

const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField<string>('title')
const { value: roomId, errorMessage: roomIdError, handleBlur: roomIdBlur } = useField<string>('roomId')
const { value: startedAt, errorMessage: startedAtError, handleBlur: startedAtBlur } = useField<Date>('startedAt')
const { value: endedAt, errorMessage: endedAtError, handleBlur: endedAtBlur } = useField<Date>('endedAt')
const { value: participantsCount, errorMessage: participantsCountError, handleBlur: participantsCountBlur } = useField<number>('participantsCount')
const { value: participantIds, errorMessage: participantIdsError, handleBlur: participantIdsBlur } = useField<string[]>('participantIds')
const { value: isPrivate } = useField<boolean>('isPrivate')

const emit = defineEmits<{
  success: []
  cancel: []
  close: []
}>()

const { t } = useI18n()
const toast = useToast()
const { createBooking, loading } = useBooking()
const { rooms, fetchRooms } = useRoom()
const { users, fetchUsers } = useUser()
const { user, isAdmin } = useAuth()

const availableUsers = computed(() => {
  if (!users.value || !Array.isArray(users.value)) {
    return []
  }
  return users.value
    .filter((u) => {
      if (u.id === user.value?.id) {
        return false
      }
      if (isAdmin.value) {
        return true
      }
      return false
    })
    .map(u => ({
      id: u.id,
      displayName: `${u.firstName} ${u.lastName} (${u.username})`,
    }))
})

watch(() => participantIds.value, (newParticipantIds) => {
  if (newParticipantIds && newParticipantIds.length > 0) {
    participantsCount.value = newParticipantIds.length
  }
})

const addBooking = handleSubmit(async (formValues: IBookingCreateRequest) => {
  try {
    const formatDate = (date: Date): string => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    }

    const bookingData: IBookingCreateRequest = {
      ...formValues,
      startedAt: formatDate(formValues.startedAt),
      endedAt: formatDate(formValues.endedAt),
    }
    if (props.providedRoomId) {
      bookingData.roomId = props.providedRoomId
    }

    await createBooking(bookingData)
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
    if (err?.code === 409) {
      toast.add({
        severity: 'warn',
        summary: t('common.warning'),
        detail: err?.message || 'W tym czasie jest już zarezerwowana inna rezerwacja. Wybierz inny termin.',
        life: 5000,
      })
      return
    }

    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: err?.message || t('common.toast.bookingError'),
      life: 3000,
    })
  }
})

const handleCancel = () => {
  emit('cancel')
  emit('close')
}

onMounted(async () => {
  if (!props.providedRoomId) {
    fetchRooms(false, 'available')
  }
  await fetchUsers(false)
})
</script>
