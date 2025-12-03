<template>
  <Dialog
    :visible="props.open"
    class="min-w-[40rem]"
    modal
    @update:visible="val => emit('update:open', val)"
  >
    <template #header>
      <div class="w-full">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div
              :class="[rentColor(selectedReservation.color), 'w-1 h-16 rounded absolute left-0']"
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
            {{ formatTime(selectedReservation.date) }} - {{ formatEndTime(selectedReservation.date, selectedReservation.duration) }}
          </div>
          <div class="text-sm">
            Czas trwania: {{ selectedReservation.duration }} min
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
          {{ selectedReservation.attendees }} {{ selectedReservation.attendees === 1 ? 'osoba' : 'osoby' }}
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <Button
        :label="$t('common.buttons.delete')"
      />
      <Button
        :label="$t('common.buttons.edit')"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  selectedReservation: {
    title: string
    duration: number
    date: Date
    location: string
    attendees: number
    color: string
  }
}>()

const emit = defineEmits(['update:open'])

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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
  orange: 'bg-orange-500 dark:bg-orange-900',
}

const rentColor = (color: string) => colorMap[color]
</script>
