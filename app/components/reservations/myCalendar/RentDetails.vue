<template>
  <Dialog
    :visible="props.open"
    class="min-w-[40rem]"
    modal
    @update:visible="(val) => emit('update:open', val)"
  >
    <template #header>
      <div class="w-full">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div
              :class="[
                rentColor(selectedReservation.color),
                'w-1 h-16 rounded absolute left-0'
              ]"
            />
            <h3 class="text-xl font-semibold ml-4">
              {{ selectedReservation.title }}
            </h3>
            <p class="text-sm ml-4 mt-1">
              {{ formatDate(selectedReservation.date) }}
            </p>
          </div>
        </div>
      </div>
    </template>
    <div class="p-6 mb-3 space-y-4 border-y border-gray-200">
      <div class="flex flex-row items-center gap-3">
        <i class="pi pi-clock" />
        <div>
          <div class="text-sm font-medium">
            {{ formatTime(selectedReservation.date) }} -
            {{
              formatEndTime(
                selectedReservation.date,
                selectedReservation.duration
              )
            }}
          </div>
          <div class="text-sm">
            {{ $t('reservations.rentDetails.duration') }}:
            {{ selectedReservation.duration }}
            {{ $t('reservations.rentDetails.minutes') }}
          </div>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <i class="pi pi-map-marker" />
        <div class="text-sm">
          {{ selectedReservation.location }}
        </div>
      </div>

      <div class="flex items-start gap-3">
        <i class="pi pi-users" />
        <div class="text-sm">
          {{ selectedReservation.attendees }}
          {{
            selectedReservation.attendees === 1
              ? $t('reservations.rentDetails.person')
              : $t('reservations.rentDetails.persons')
          }}
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <Button
        :label="$t('common.buttons.delete')"
        severity="danger"
        @click="handleDelete"
      />
      <Button
        :label="$t('common.buttons.edit')"
        severity="success"
        @click="handleEdit"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  selectedReservation: {
    id?: number
    title: string
    duration: number
    date: Date
    location: string
    attendees: number
    color: string
  }
}>()

const emit = defineEmits(['update:open', 'edit', 'delete'])

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatEndTime = (startDate: Date, duration: number) => {
  const endDate = new Date(startDate.getTime() + duration * 60000)
  return formatTime(endDate)
}

const colorMap = {
  blue: 'bg-blue-500 dark:bg-blue-900',
  green: 'bg-green-500 dark:bg-green-900',
  yellow: 'bg-yellow-500 dark:bg-yellow-900',
  purple: 'bg-purple-500 dark:bg-purple-900',
  red: 'bg-red-500 dark:bg-red-900',
  orange: 'bg-orange-500 dark:bg-orange-900'
}

const rentColor = (color: string) => colorMap[color]

const handleEdit = () => {
  emit('edit', props.selectedReservation)
  emit('update:open', false)
}

const handleDelete = () => {
  emit('delete', props.selectedReservation.id)
  emit('update:open', false)
}
</script>
