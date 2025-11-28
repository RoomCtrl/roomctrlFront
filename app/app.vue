<template>
  <NuxtLayout>
    <ClientOnly>
      <template #default>
        <NuxtPage />
      </template>
      <template #fallback>
        <div class="flex w-full items-center">
          <ProgressSpinner />
        </div>
      </template>
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locale } = useI18n()

onMounted(() => {
  watch(locale,
    (newLocale) => {
      document.documentElement.lang = newLocale
    },
    { immediate: true },
  )
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.page-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
</style>
