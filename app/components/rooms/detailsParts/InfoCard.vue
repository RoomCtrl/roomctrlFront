<template>
  <Card
    pt:root:class="border-l-4 border-blue-900 h-full py-2"
    pt:root:style="--p-card-background: rgba(147, 197, 253, 0.6); --p-card-color: var(--p-blue-950)"
    pt:header:class="text-xl lg:text-2xl font-semibold pl-[1rem]"
    pt:body:style="--p-card-body-padding: 0rem 1rem;"
    pt:content:class="flex flex-col max-sm:flex-row max-sm:gap-2 font-medium"
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
