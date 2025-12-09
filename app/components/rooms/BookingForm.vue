<template>
  <Dialog
    :visible="visible"
    modal
    :header="bookingId ? $t('pages.roomDetails.bookingForm.editTitle') : $t('pages.roomDetails.bookingForm.title')"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @update:visible="handleClose"
  >
    <form
      class="grid grid-cols-3 gap-4"
      @submit.prevent="handleSubmit"
    >
      <div class="flex flex-col gap-2 col-span-full">
        <label for="title">{{ $t('pages.roomDetails.bookingForm.meetingTitle') }}</label>
        <InputText
          id="title"
          v-model="formData.title"
          :placeholder="$t('pages.roomDetails.bookingForm.meetingTitlePlaceholder')"
          :invalid="!!errors.title"
        />
        <small
          v-if="errors.title"
          class="text-red-500"
        >{{ errors.title }}</small>
      </div>

      <div
        v-if="!roomId"
        class="flex flex-col gap-2 col-span-full"
      >
        <label for="room">{{ $t('pages.roomDetails.bookingForm.room') }}</label>
        <Select
          id="room"
          v-model="formData.roomId"
          :options="rooms"
          option-label="roomName"
          option-value="roomId"
          :placeholder="$t('pages.roomDetails.bookingForm.roomPlaceholder')"
          :invalid="!!errors.roomId"
        />
        <small
          v-if="errors.roomId"
          class="text-red-500"
        >{{ errors.roomId }}</small>
      </div>

      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex flex-col gap-2 flex-1">
          <label for="startedAt">{{ $t('pages.roomDetails.bookingForm.startDate') }}</label>
          <DatePicker
            id="startedAt"
            v-model="formData.startedAt"
            show-time
            hour-format="24"
            date-format="dd/mm/yy"
            :placeholder="$t('pages.roomDetails.bookingForm.startDatePlaceholder')"
            :invalid="!!errors.startedAt"
          />
          <small
            v-if="errors.startedAt"
            class="text-red-500"
          >{{ errors.startedAt }}</small>
        </div>

        <div class="flex flex-col gap-2 flex-1">
          <label for="endedAt">{{ $t('pages.roomDetails.bookingForm.endDate') }}</label>
          <DatePicker
            id="endedAt"
            v-model="formData.endedAt"
            show-time
            hour-format="24"
            date-format="dd/mm/yy"
            :placeholder="$t('pages.roomDetails.bookingForm.endDatePlaceholder')"
            :invalid="!!errors.endedAt"
          />
          <small
            v-if="errors.endedAt"
            class="text-red-500"
          >{{ errors.endedAt }}</small>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label for="participantsCount">{{ $t('pages.roomDetails.bookingForm.participantsCount') }}</label>
        <InputNumber
          id="participantsCount"
          v-model="formData.participantsCount"
          :min="1"
          :max="capacity"
          :placeholder="$t('pages.roomDetails.bookingForm.participantsCountPlaceholder')"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="participantIds">{{ $t('forms.booking.addParticipants') }}</label>
        <MultiSelect
          id="participantIds"
          v-model="formData.participantIds"
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

      <div class="flex items-center gap-2">
        <Checkbox
          id="isPrivate"
          v-model="formData.isPrivate"
          binary
        />
        <label for="isPrivate">{{ $t('pages.roomDetails.bookingForm.isPrivate') }}</label>
      </div>

      <div class="flex gap-2 justify-end">
        <Button
          type="button"
          :label="$t('pages.roomDetails.bookingForm.cancel')"
          severity="secondary"
          @click="handleCancel"
        />
        <Button
          type="submit"
          :label="bookingId ? $t('common.buttons.save') : $t('pages.roomDetails.bookingForm.submit')"
          :loading="loading"
        />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { useBooking } from '~/composables/useBooking'
import { useRoom } from '~/composables/useRoom'
import { useUser } from '~/composables/useUser'
import { useAuth } from '~/composables/useAuth'
import type { IBookingCreateRequest } from '~/interfaces/BookingsInterfaces'

const props = defineProps<{
  visible: boolean
  roomId?: string
  capacity?: number
  bookingId?: string
}>()

const emit = defineEmits<{
  success: []
  cancel: []
  close: []
}>()

const { t } = useI18n()
const { createBooking, updateBooking, fetchBooking, booking, loading } = useBooking()
const { rooms, fetchRooms } = useRoom()
const { users, fetchUsers, loading: usersLoading } = useUser()
const { user, isAdmin } = useAuth()

// Filtruj użytkowników - admin widzi wszystkich, zwykły użytkownik tylko siebie
const availableUsers = computed(() => {
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

// Watch for bookingId changes to load booking data
watch(() => props.bookingId, async (newBookingId) => {
  if (newBookingId && props.visible) {
    await fetchBooking(newBookingId)
    if (booking.value) {
      const participantIds = booking.value.participants?.map(p => p.id) || []
      formData.value = {
        title: booking.value.title,
        roomId: booking.value.room.id,
        startedAt: new Date(booking.value.startedAt),
        endedAt: new Date(booking.value.endedAt),
        participantsCount: booking.value.participantsCount,
        isPrivate: booking.value.isPrivate,
        participantIds,
      }
    }
  }
}, { immediate: true })

const formData = ref<{
  title: string
  roomId: string
  startedAt: Date | null
  endedAt: Date | null
  participantsCount: number
  isPrivate: boolean
  participantIds: string[]
}>({
  title: '',
  roomId: props.roomId || '',
  startedAt: null,
  endedAt: null,
  participantsCount: 1,
  isPrivate: false,
  participantIds: [],
})

const errors = ref<{
  title?: string
  roomId?: string
  startedAt?: string
  endedAt?: string
}>({})

const validateForm = (): boolean => {
  errors.value = {}
  let isValid = true

  if (!formData.value.title || formData.value.title.trim().length === 0) {
    errors.value.title = t('pages.roomDetails.bookingForm.errors.titleRequired')
    isValid = false
  }

  if (!formData.value.roomId) {
    errors.value.roomId = t('pages.roomDetails.bookingForm.errors.roomRequired')
    isValid = false
  }

  if (!formData.value.startedAt) {
    errors.value.startedAt = t('pages.roomDetails.bookingForm.errors.startDateRequired')
    isValid = false
  }

  if (!formData.value.endedAt) {
    errors.value.endedAt = t('pages.roomDetails.bookingForm.errors.endDateRequired')
    isValid = false
  }

  if (formData.value.startedAt && formData.value.endedAt) {
    if (formData.value.startedAt >= formData.value.endedAt) {
      errors.value.endedAt = t('pages.roomDetails.bookingForm.errors.endDateBeforeStart')
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    // Format dates to ISO 8601 without timezone (YYYY-MM-DDTHH:mm:ss)
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
      title: formData.value.title,
      startedAt: formatDate(formData.value.startedAt!),
      endedAt: formatDate(formData.value.endedAt!),
      participantsCount: formData.value.participantsCount,
      isPrivate: formData.value.isPrivate,
      roomId: formData.value.roomId,
      participantIds: formData.value.participantIds,
    }

    if (props.bookingId) {
      // Update existing booking
      await updateBooking(props.bookingId, bookingData)
    }
    else {
      // Create new booking
      await createBooking(bookingData)
    }

    // Reset form
    formData.value = {
      title: '',
      roomId: props.roomId || '',
      startedAt: null,
      endedAt: null,
      participantsCount: 1,
      isPrivate: false,
      participantIds: [],
    }

    emit('success')
  }
  catch (err) {
    console.error('Error creating booking:', err)
  }
}

const handleCancel = () => {
  emit('cancel')
  emit('close')
}

const handleClose = () => {
  emit('close')
}

// Fetch rooms and users when component is mounted
onMounted(async () => {
  if (!props.roomId) {
    fetchRooms(false, 'available')
  }
  await fetchUsers(false)
})
</script>
