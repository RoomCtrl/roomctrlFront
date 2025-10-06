<template>
  <Card pt:capation:class="m-0">
    <template #title>
      <div class="flex flex-row gap-2 justify-between">
        <h1 class="text-2xl 2xl:text-3xl font-semibold">
          {{ $t('pages.allRooms.room') + roomName }}
        </h1>
        <RentBadge
          :started-at="startedAt"
          :ended-at="endedAt"
          :info-type="false"
          size="lg"
        />
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-row justify-between">
        <h2 class="lg:truncate lg:w-[70%]">
          {{ roomDescription }}
        </h2>
        <UserRating
          class="hidden lg:block"
          :max="max"
          :rate-value="value"
        />
      </div>
    </template>
    <template #footer>
      <UserRating
        class="block lg:hidden flex justify-center mb-3"
        :max="max"
        :rate-value="value"
      />
      <div class="flex flex-wrap max-lg:justify-around gap-2">
        <Button
          v-for="button in buttons"
          :key="button"
          :label="button"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import UserRating from '~/components/common/UserRating.vue'
import RentBadge from '../RentBadge.vue'

defineProps<{
  roomName: string
  roomDescription: string
  startedAt?: string
  endedAt?: string
}>()

const { t } = useI18n()
const max = 5
const value = 4

const buttons = [
  t('pages.roomDetails.buttons.rentNow'),
  t('pages.roomDetails.buttons.addFavorite'),
]
</script>
