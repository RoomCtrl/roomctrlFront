<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col gap-2 col-span-full">
        <label
          for="title"
          class="font-semibold"
        >{{ $t('forms.booking.title') }}</label>
        <InputText
          id="title"
          v-model="formData.title"
          :placeholder="$t('forms.booking.titlePlaceholder')"
          :invalid="!!errors.title"
        />
        <small
          v-if="errors.title"
          class="text-red-500"
        >{{ errors.title }}</small>
      </div>

      <div class="flex flex-col gap-2 col-span-full">
        <label
          for="roomId"
          class="font-semibold"
        >{{ $t('forms.booking.room') }}</label>
        <Select
          id="roomId"
          v-model="formData.roomId"
          :options="availableRooms"
          optionLabel="roomName"
          optionValue="roomId"
          :placeholder="$t('forms.booking.selectRoom')"
          :loading="roomsLoading"
          :invalid="!!errors.roomId"
        />
        <small
          v-if="errors.roomId"
          class="text-red-500"
        >{{ errors.roomId }}</small>
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="startedAt"
          class="font-semibold"
        >{{ $t('forms.booking.startDate') }}</label>
        <DatePicker
          id="startedAt"
          v-model="formData.startedAt"
          showTime
          hourFormat="24"
          dateFormat="yy/mm/dd"
          :placeholder="$t('forms.booking.startDatePlaceholder')"
          :invalid="!!errors.startedAt"
          fluid
        />
        <small
          v-if="errors.startedAt"
          class="text-red-500"
        >{{ errors.startedAt }}</small>
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="endedAt"
          class="font-semibold"
        >{{ $t('forms.booking.endDate') }}</label>
        <DatePicker
          id="endedAt"
          v-model="formData.endedAt"
          showTime
          dateFormat="yy/mm/dd"
          hourFormat="24"
          :placeholder="$t('forms.booking.endDatePlaceholder')"
          :invalid="!!errors.endedAt"
          fluid
        />
        <small
          v-if="errors.endedAt"
          class="text-red-500"
        >{{ errors.endedAt }}</small>
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="participants"
          class="font-semibold"
        >{{ $t('forms.booking.participants') }}</label>
        <InputNumber
          id="participants"
          v-model="formData.participantsCount"
          :min="1"
          class="w-[5rem]"
          :placeholder="$t('forms.booking.participantsPlaceholder')"
          :invalid="!!errors.participantsCount"
          fluid
        />
        <small
          v-if="errors.participantsCount"
          class="text-red-500"
        >{{ errors.participantsCount }}</small>
      </div>

      <div class="flex flex-col gap-2 col-span-full">
        <label
          for="participantIds"
          class="font-semibold"
        >{{ $t('forms.booking.addParticipants') }}</label>
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

      <div class="flex items-center gap-2 col-span-full">
        <Checkbox
          id="isPrivate"
          v-model="formData.isPrivate"
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

const props = defineProps<{
  bookingId: string
}>()

const emit = defineEmits<{
  success: []
  cancel: []
}>()

const { t } = useI18n()
const toast = useToast()
const { users, fetchUsers, loading: usersLoading } = useUser()
const { rooms, fetchRooms, loading: roomsLoading } = useRoom()
const { user, isAdmin } = useAuth()
const { fetchBooking, updateBooking, booking, loading } = useBooking()

const formData = ref({
  title: '',
  roomId: '',
  startedAt: new Date(),
  endedAt: new Date(),
  participantsCount: 1,
  isPrivate: false,
  participantIds: [] as string[],
})

// Watch dla bookingId - pobierz dane gdy się zmieni
watch(() => props.bookingId, async (newBookingId) => {
  if (newBookingId) {
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

// Reaktywna walidacja liczby uczestników
watch([() => formData.value.participantIds, () => formData.value.participantsCount], () => {
  if (formData.value.participantIds && formData.value.participantIds.length > formData.value.participantsCount) {
    errors.value.participantsCount = `Liczba uczestników (${formData.value.participantsCount}) nie może być mniejsza niż liczba wybranych osób (${formData.value.participantIds.length})`
  }
  else if (errors.value.participantsCount && errors.value.participantsCount.includes('liczba wybranych osób')) {
    // Usuń błąd tylko jeśli był związany z liczbą wybranych osób
    delete errors.value.participantsCount
  }
})

// Lista dostępnych sal
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

const errors = ref<Record<string, string>>({})

const validate = () => {
  errors.value = {}

  if (!formData.value.title || formData.value.title.trim() === '') {
    errors.value.title = 'Tytuł jest wymagany'
  }

  if (!formData.value.roomId) {
    errors.value.roomId = 'Sala jest wymagana'
  }

  if (!formData.value.startedAt) {
    errors.value.startedAt = 'Data rozpoczęcia jest wymagana'
  }

  if (!formData.value.endedAt) {
    errors.value.endedAt = 'Data zakończenia jest wymagana'
  }

  if (formData.value.startedAt && formData.value.endedAt) {
    if (formData.value.startedAt >= formData.value.endedAt) {
      errors.value.endedAt = 'Data zakończenia musi być później niż data rozpoczęcia'
    }
  }

  if (!formData.value.participantsCount || formData.value.participantsCount < 1) {
    errors.value.participantsCount = 'Liczba uczestników musi być większa niż 0'
  }

  if (formData.value.participantIds && formData.value.participantIds.length > formData.value.participantsCount) {
    errors.value.participantsCount = `Liczba uczestników (${formData.value.participantsCount}) nie może być mniejsza niż liczba wybranych osób (${formData.value.participantIds.length})`
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) {
    return
  }

  try {
    // Formatowanie daty do ISO 8601 z offsetem strefy czasowej
    const formatDateWithTimezone = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      // Oblicz offset strefy czasowej
      const timezoneOffset = -date.getTimezoneOffset()
      const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
      const offsetMinutes = Math.abs(timezoneOffset) % 60
      const offsetSign = timezoneOffset >= 0 ? '+' : '-'
      const offset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`
    }

    const updateData: IBookingUpdateRequest = {
      title: formData.value.title,
      roomId: formData.value.roomId,
      startedAt: formatDateWithTimezone(formData.value.startedAt),
      endedAt: formatDateWithTimezone(formData.value.endedAt),
      participantsCount: formData.value.participantsCount,
      isPrivate: formData.value.isPrivate,
      participantIds: formData.value.participantIds,
    }

    await updateBooking(props.bookingId, updateData)
    toast.add({
      severity: 'success',
      summary: t('common.toast.success'),
      detail: t('common.toast.bookingUpdated'),
      life: 3000,
    })
    emit('success')
  }
  catch (error: any) {
    console.error('Błąd podczas aktualizacji rezerwacji:', error)

    // Sprawdź czy to błąd 409 (konflikt - zajęty slot czasowy)
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

    // Domyślna obsługa błędów
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('common.toast.bookingError'),
      life: 3000,
    })
  }
}

// Pobierz użytkowników i sale przy montowaniu komponentu
onMounted(async () => {
  await Promise.all([
    fetchUsers(false),
    fetchRooms(false, 'available'),
  ])
})
</script>
