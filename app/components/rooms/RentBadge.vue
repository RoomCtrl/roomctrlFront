<template>
  <Message
    v-if="customColor"
    :pt="{
      root: { style: color },
      content: { style: '--p-message-content-padding: 0.25rem 0.5rem ' },
    }"
  >
    <div
      v-if="startedAt && endedAt"
      class="flex flex-row gap-1 items-center"
    >
      <DateTimeDisplay
        layout="horizontial"
        :started-at="startedAt"
        :ended-at="endedAt"
        :current="current"
        :size="size"
      />
    </div>
    <div
      v-else
      :class="fontSize"
    >
      {{ statusText }}
    </div>
  </Message>
  <Message
    v-else
    :severity="badgeColor"
    variant="outlined"
    pt:root:style="--p-message-border-radius: 1.5rem"
    pt:content:style="--p-message-content-padding: 0.25rem 0.5rem "
  >
    <div
      v-if="startedAt && endedAt"
      class="flex flex-row gap-1 items-center"
    >
      <DateTimeDisplay
        layout="horizontial"
        :started-at="startedAt"
        :ended-at="endedAt"
        :current="current"
        :size="size"
      />
    </div>
    <div
      v-else
      :class="fontSize"
    >
      {{ statusText }}
    </div>
  </Message>
</template>

<script setup lang="ts">
import DateTimeDisplay from '../common/DateTimeDisplay.vue'

const props = defineProps<{
  startedAt?: string
  color?: string
  endedAt?: string
  current?: boolean
  customColor: boolean
  infoType?: boolean
  size: string
}>()
const { t } = useI18n()
const roomStatus = inject<ComputedRef<string>>('roomStatus')

const badgeColor = computed(() => {
  if (props.infoType) {
    return 'info'
  }
  else {
    const map: Record<string, string> = {
      available: 'success',
      occupied: 'error',
      closed: 'warn',
    }
    return map[roomStatus!.value]
  }
})

const statusText = computed(() => {
  if (roomStatus?.value === 'occupied') return t('pages.allRooms.statuses.tags.closed')
  return t('pages.allRooms.statuses.tags.available')
})
const fontSize = computed(() => {
  switch (props.size) {
    case 'sm' : {
      return 'text-sm'
    }
    case 'lg' : {
      return 'text-lg font-medium'
    }
    default: {
      return 'text-base'
    }
  }
})
</script>
