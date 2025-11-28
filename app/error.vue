<template>
  <NuxtLayout :name="layout">
    <div class="flex w-full justify-center">
      <div class="flex flex-col gap-2 justify-center items-center ">
        <h1
          v-if="error.data"
          class="font-bold text-9xl"
        >
          {{ error.statusCode }}
        </h1>
        <h2 class="font-semibold text-4xl">
          {{ $t('pages.notFound.title') }}
        </h2>
        <NuxtLink
          :to="goBackPage"
          class="flex items-center gap-1"
        >
          <i class="pi pi-arrow-circle-left" />
          {{ $t('pages.notFound.goBack') }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const route = useRoute()

const layout = computed(() => {
  return route.path.includes('adminDashboard')
    ? 'admin-dashboard'
    : 'default'
})

const goBackPage = computed(() => {
  return route.path.includes('adminDashboard')
    ? '/adminDashboard'
    : '/'
})

defineProps<{
  error: NuxtError
}>()
</script>
