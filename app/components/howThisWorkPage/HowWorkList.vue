<template>
  <div
    v-for="instruction in instructions"
    :key="instruction.header"
    class="flex flex-col"
  >
    <InsctructionCard
      :class="[{ 'self-start': !instruction.right, 'self-end': instruction.right }, 'self-start lg:w-[75%]']"
      :header="instruction.header"
      :steps="instruction.steps"
      :image="instruction.image"
      :right="instruction.right"
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
    right: false,
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
    right: true,
  },
]
</script>
