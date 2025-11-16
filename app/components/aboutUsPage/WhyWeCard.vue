<template>
  <Card
    :pt:root:class="[
      { slideCard: toMoveCard, slideBackCard: !toMoveCard },
      '[--p-card-background:--p-zinc-300] dark:[--p-card-background:--p-zinc-700] border-y border-r border-l-4 border-black dark:border-white',
    ]"
    pt:title:class="text-center text-xl font-bold"
    @mouseenter="moveCard"
    @focusin="moveCard"
    @mouseleave="moveCard"
    @focusout="moveCard"
  >
    <template #title>
      {{ header }}
    </template>
    <template #content>
      {{ content }}
    </template>
  </Card>
</template>

<script setup lang="ts">
defineProps<{
  header: string
  content: string
}>()

const toMoveCard = ref(false)

const moveCard = () => {
  toMoveCard.value = !toMoveCard.value
}
</script>

<style scoped>
@keyframes slideToRight {
  from{
    transform: translateX(0px);
  }
  to{
    transform: translate(10px);
  }
}
@keyframes slideBackFromRight {
  from{
    transform: translateX(10px);
  }
  to{
    transform: translate(0px);
  }
}

.slideCard {
  animation: slideToRight 0.3s forwards;
}
.slideBackCard {
  animation: slideBackFromRight 0.3s forwards;
}
</style>
