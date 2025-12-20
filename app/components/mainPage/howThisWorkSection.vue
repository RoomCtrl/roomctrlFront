<template>
  <section class="flex flex-col items-center">
    <Card
      :pt="{
        root: { class: 'items-center text-center p-4 w-full' },
        caption: { class: 'items-center' },
        title: { class: '[--p-card-title-font-size:3rem] [--p-card-title-font-weight:800]' },
        subtitle: { class: 'text-lg mb-8 w-[70%]' },
      }"
    >
      <template #title>
        {{ $t('pages.home.howThisWork.title') }}
      </template>
      <template #subtitle>
        {{ $t('pages.home.howThisWork.subtitle') }}
      </template>
      <template #content>
        <NuxtLink
          :to="localePath('/howThisWork')"
          class="btn btn-dark btn-large"
        >
          {{ $t('pages.home.howThisWork.seeHowItWorks') }}
          <i class="pi pi-arrow-right" />
        </NuxtLink>
      </template>
    </Card>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>

<style scoped>
.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
}

.btn-dark {
  background: #111827;
  color: white;
}

.dark .btn-dark {
  background: white;
  color: #111827;
}

.btn-dark:hover {
  background: #1f2937;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.dark .btn-dark:hover {
  background: gray;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}
</style>
