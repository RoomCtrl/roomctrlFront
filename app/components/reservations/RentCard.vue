<template>
  <div
    class="card-container h-full"
    :class="{ animating: playing }"
  >
    <div
      ref="cardRef"
      class="card h-full"
    >
      <Card
        pt:body:class="h-full"
        pt:body:style="--p-card-body-padding: 1.25rem 0.5rem"
        pt:content:class="h-full"
        class="front"
      >
        <template #content>
          <div class="flex flex-row justify-between gap-1">
            <div class="grid grid-cols-3 grid-rows-2 gap-y-2 w-full">
              <div class="col-span-2 flex flex-col">
                <h3>
                  {{ $t('pages.reservationsHistory.rentTitle') }}
                </h3>
                <h2 class="truncate">
                  {{ reservation.title }}
                </h2>
              </div>
              <div class="flex flex-col">
                <h3>
                  {{ $t('pages.reservationsHistory.rentStatus') }}
                </h3>
                <Message
                  pt:content:style="--p-message-content-padding: 0.25rem "
                  pt:text:class="text-center w-full text-md"
                  :severity="statusColor[reservation.status]"
                >
                  {{ $t('pages.reservationsHistory.statuses.' + reservation.status) }}
                </Message>
              </div>
              <div class="flex flex-col">
                <h3>
                  {{ $t('pages.reservationsHistory.rentStart') }}
                </h3>
                <h2>
                  {{ formatToTimeAndDate(reservation.startedAt) }}
                </h2>
              </div>
              <div class="flex flex-col">
                <h3>
                  {{ $t('pages.reservationsHistory.rentEnd') }}
                </h3>
                <h2>
                  {{ formatToTimeAndDate(reservation.endedAt) }}
                </h2>
              </div>
              <div class="flex flex-col">
                <h3>
                  {{ $t('pages.reservationsHistory.participants') }}
                </h3>
                <h2 class="truncate">
                  {{ $t('pages.reservationsHistory.participantsNumber', { number: reservation.participants }) }}
                </h2>
              </div>
            </div>
            <div class="-my-3">
              <i
                v-tooltip.bottom="'Pokaż szczegóły'"
                class="pi pi-eye"
                @click="toggleDetails"
              />
            </div>
          </div>
        </template>
      </Card>
      <Card
        pt:body:class=" h-full px-2"
        pt:content:class=" h-full"
        class="back"
      >
        <template #content>
          <div class="flex flex-row justify-between gap-1 ">
            <div class="grid grid-cols-3 grid-rows-2 gap-y-2 w-full">
              <div class="col-span-3 flex flex-col">
                <h3>
                  {{ $t('pages.reservationsHistory.roomName') }}
                </h3>
                <h2>
                  {{ $t('pages.allRooms.room') + details.roomName }}
                </h2>
              </div>
              <div class="col-span-2 flex flex-col">
                <h3>
                  {{ $t('common.roomParameters.location') }}
                </h3>
                <h2>
                  {{ details.location }}
                </h2>
              </div>
              <div class="flex ">
                <Button
                  :label="$t('pages.reservationsHistory.comeToRoom')"
                  as="a"
                  :href="localePath(`/rooms/` + details?.roomId)"
                  class="flex-none"
                />
              </div>
            </div>
            <div class="-my-3">
              <i
                v-tooltip.bottom="'Ukryj szczegóły'"
                class="pi pi-eye-slash"
                @click="toggleDetails"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs'
import { roomsDetailsData } from '~/assets/data/roomsDetails'

const props = defineProps<{
  reservation: object
}>()
const localePath = useLocalePath()
const details = roomsDetailsData.find(d => d.roomId === props.reservation.roomId)

const cardRef = ref(null)
const playing = ref(false)

const statusColor = computed(() => ({
  cancelled: 'error',
  ended: 'success',
  planned: 'info',
  toApprove: 'warn',
}))

const toggleDetails = () => {
  if (playing.value || !cardRef.value) return

  playing.value = true
  anime({
    targets: cardRef.value,
    scale: [{ value: 1 }, { value: 1.2 }, { value: 1, delay: 250 }],
    rotateY: { value: '+=180', delay: 200 },
    easing: 'easeInOutSine',
    duration: 400,
    complete: () => {
      playing.value = false
    },
  })
}
</script>

<style scoped>
h3 {
  font-size: 0.9rem;
  font-weight: 600;
}

.card
{
    transform-style: preserve-3d;
    position: relative;
}

.front,
.back
{
    display: flex;

    width: 100%;
    height: 100%;

    backface-visibility: hidden;
}

.back
{
    position: absolute;
    top: 0;
    left: 0;

    transform: rotateY(180deg);
}

.card-container
{
    position: relative;
    z-index: 1;
}

.card-container.animating
{
    z-index: 50;
}
</style>
