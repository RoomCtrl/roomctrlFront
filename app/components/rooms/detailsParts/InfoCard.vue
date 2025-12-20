<template>
  <Card
    pt:root:class="border-l-4 border-blue-900 h-full py-2"
    pt:root:style="--p-card-background: rgba(147, 197, 253, 0.6); --p-card-color: var(--p-blue-950)"
    pt:header:class="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold pl-[1rem]"
    pt:body:style="--p-card-body-padding: 0rem 1rem;"
    pt:content:class="flex flex-col gap-1 sm:gap-2 font-medium text-xs sm:text-sm lg:text-base"
  >
    <template #header>
      {{ header }}
    </template>
    <template #content>
      <slot />
    </template>
  </Card>
</template>

<script setup lang="ts">
defineProps<{
  header: string
}>()
</script>
