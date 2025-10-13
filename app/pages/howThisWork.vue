<template>
  <div class="flex flex-col mx-[3vw] gap-4">
    <Card
      pt:root:class="font-bold bg-[#D74141] rounded-xl text-white text-center"
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
