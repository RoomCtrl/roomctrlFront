<template>
  <Card
    :pt:root:class="[{ slideCard: toMoveCard, slideBackCard: !toMoveCard }, ' border-y border-r border-l-4 border-red-900']"
    pt:root:style="--p-card-background: rgba(223,71,71,0.2)"
    pt:title:class="text-center text-xl font-bold"
    @mouseenter="moveCard"
    @mouseleave="moveCard"
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
