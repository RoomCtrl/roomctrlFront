<template>
  <Card
    pt:header:class="font-extrabold text-3xl text-center pt-4"
    pt:content:class="flex flex-col gap-2 w-full"
  >
    <template #header>
      {{ header }}
    </template>
    <template #content>
      <img :src="image" />
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
}>()
</script>
