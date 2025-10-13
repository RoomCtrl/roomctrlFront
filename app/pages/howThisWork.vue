<template>
  <div class="flex flex-col mx-[3vw] gap-4">
    <Card
      pt:root:class="font-bold rounded-xl text-white text-center"
      pt:root:style="--p-card-background: #D74141"
      pt:title:class="text-xl md:text-4xl font-bold text-center"
    >
      <template #title>
        {{ $t('pages.howThisWork.title') }}
      </template>
    </Card>
    <HowWorkList />
  </div>
</template>

<script setup>
import HowWorkList from '~/components/howThisWorkPage/HowWorkList.vue'
</script>
