<template>
  <Card
    pt:header:class="font-extrabold text-3xl text-center pt-4"
    pt:content:class="flex flex-col-reverse lg:flex-row gap-2 w-full"
  >
    <template #header>
      {{ header }}
    </template>
    <template #content>
      <div :class="[{ 'lg:order-1': right }, 'basis-1/2']">
        <img :src="image" />
      </div>
      <div>
        <ol>
          <li
            v-for="(step, index) in steps"
            :key="step"
          >
            {{ (index + 1) + '.' + step }}
          </li>
        </ol>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
defineProps<{
  header: string
  steps: Array<string>
  image: string
  right: string
}>()
</script>
