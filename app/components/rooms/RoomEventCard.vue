<template>
  <Card
    pt:root:class="max-sm:rounded-t flex-grow lg:-mr-6 -my-1 z-10"
    pt:header:class="py-2 px-3"
    pt:body:class="h-full"
    pt:body:style="--p-card-body-padding: 0.25rem 1.25rem"
    :pt:subtitle:class="['h-full', { 'blur-sm': animationClass === 'show' }]"
    pt:caption:class="flex flex-col justify-around lg:justify-between h-full"
    :style="{ borderColor: statusColor }"
  >
    <template #header>
      <div
        v-if="room.status !== 'out_of_order'"
        class="flex flex-row justify-between items-center gap-2 w-full"
      >
        <h1
          v-if="!room.current_booking.isPrivate"
          v-tooltip.bottom="{
            value: room.current_booking.title,
            pt: {
              root: 'max-w-[20rem]',
              text: 'text-center',
            },
          }"
          :class="{ 'blur-sm': animationClass === 'show' }"
          class="text-lg lg:text-xl font-semibold lg:truncate"
        >
          {{ currentEvent }}
        </h1>
        <h1
          v-else
          :class="{ 'blur-sm': animationClass === 'show' }"
          class="text-xl font-semibold truncate"
        >
          Prywatna rezerwacja
        </h1>
        <div class="hidden lg:block">
          <i
            class="pi pi-info-circle"
            style="font-size: 1.25rem;"
            @mouseenter="playShow"
            @mouseleave="playHide"
          />
        </div>
      </div>
    </template>

    <template #subtitle>
      <EventTag
        v-if="room.status !== 'out_of_order'"
        :title="room.next_booking.title"
        :started-at="room.next_booking.startedAt"
        :ended-at="room.next_booking.endedAt"
        :is-private="room.next_booking.isPrivate"
        color="info"
      />
      <div
        v-else
        class="h-full text-center m-auto flex text-2xl font-black"
      >
        Sala tymczasowo wyłączona z użytku
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
  room: IRoomAvailability
}>()

const animationClass = ref('')

const playShow = () => {
  animationClass.value = '' // usuń poprzednią animację
  requestAnimationFrame(() => {
    animationClass.value = 'show'
  })
  this.$emit.animationClass
}

const playHide = () => {
  animationClass.value = ''
  requestAnimationFrame(() => {
    animationClass.value = 'hide'
  })
}
</script>
