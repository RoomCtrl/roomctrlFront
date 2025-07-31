<template>
  <Card class="flex items-center py-[2vh]">
    <template #title>
      <h1 class="flex justify-center text-4xl font-bold py-[3vh] my-[3vh] bg-[#D74141] rounded-xl text-white text-center">
        {{ $t('pages.howThisWork.title') }}
      </h1>
    </template>
    <template #content>
      <div class="flex flex-col gap-4 text-lg">
        <h1 class="font-semibold">
          {{ $t('pages.howThisWork.content.useApp') }}
        </h1>
        <ol class="px-[3vw] md:px-[1vw]">
          <li
            v-for="(step, index) in stepsList"
            :key="index"
          >
            {{ (index + 1) + '. ' + step }}
          </li>
        </ol>
        <h1 class="font-semibold">
          {{ $t('pages.howThisWork.content.procesIsSafe') }}
        </h1>
      </div>
    </template>
  </Card>
</template>

<script setup>
const { t } = useI18n()
const stepsList = [
  t('pages.howThisWork.content.stepsList.stepOne'),
  t('pages.howThisWork.content.stepsList.stepTwo'),
  t('pages.howThisWork.content.stepsList.stepThree'),
  t('pages.howThisWork.content.stepsList.stepFour'),
  t('pages.howThisWork.content.stepsList.stepFive'),
]
</script>
