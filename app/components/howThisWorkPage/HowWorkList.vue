<template>
  <div class="grid grid-cols-2 gap-2">
    <InsctructionCard
      v-for="instruction in instructions"
      :key="instruction.header"
      :header="instruction.header"
      :steps="instruction.steps"
      :image="instruction.image"
    />
  </div>
</template>

<script setup>
import InsctructionCard from './InsctructionCard.vue'

const { t } = useI18n()
const instructions = [
  {
    header: t('pages.howThisWork.instructions.login.title'),
    steps: [
      t('pages.howThisWork.instructions.login.steps.stepOne'),
      t('pages.howThisWork.instructions.login.steps.stepTwo'),
      t('pages.howThisWork.instructions.login.steps.stepThree'),
      t('pages.howThisWork.instructions.login.steps.stepFour'),
      t('pages.howThisWork.instructions.login.steps.stepFive'),
    ],
    image: '/images/screens/login_screen.png',
  },
  {
    header: t('pages.howThisWork.instructions.login.title'),
    steps: [
      t('pages.howThisWork.instructions.login.steps.stepOne'),
      t('pages.howThisWork.instructions.login.steps.stepTwo'),
      t('pages.howThisWork.instructions.login.steps.stepThree'),
      t('pages.howThisWork.instructions.login.steps.stepFour'),
      t('pages.howThisWork.instructions.login.steps.stepFive'),
    ],
    image: '/images/screens/login_screen.png',
  },
]
</script>
