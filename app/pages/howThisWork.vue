<template>
  <div class="flex flex-col gap-4">
    <Card
      pt:root:class="font-bold rounded-xl text-white text-center"
      pt:root:style="--p-card-background: #D74141"
      pt:title:class="text-xl md:text-4xl font-bold text-center"
    >
      <template #title>
        <div class="font-black text-3xl md:text-4xl text-center py-[2vh] text-white">
          {{ $t('pages.howThisWork.title') }}
        </div>
      </template>
    </Card>
    <HowWorkList />
  </div>
</template>

<script setup>
import HowWorkList from '~/components/howThisWorkPage/HowWorkList.vue'
</script>
