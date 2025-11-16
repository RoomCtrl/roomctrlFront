<template>
  <div class="flex flex-col gap-10">
    <Card>
      <template #title>
        <h1 class="text-4xl lg:text-6xl font-extrabold my-4 text-center">
          {{ $t('pages.aboutUs.title') }}
        </h1>
      </template>
      <template #subtitle>
        <p class="text-lg text-center mb-4 lg:mb-8 lg:px-[5vw]">
          {{ $t('pages.aboutUs.subtitle') }}
        </p>
      </template>
      <template #content>
        <div class="flex flex-col gap-10 lg:gap-20 max-lg:items-center">
          <div class="grid lg:grid-cols-2 max-lg:gap-y-4 gap-x-4">
            <Card
              v-for="(card, index) in whoWeAre"
              :key="index"
              pt:root:class="[--p-card-background:--p-zinc-300] dark:[--p-card-background:--p-zinc-700]"
            >
              <template #title>
                <h1 class="text-2xl font-semibold text-center">
                  {{ card.header }}
                </h1>
              </template>
              <template #content>
                {{ card.content }}
              </template>
            </Card>
          </div>

          <div>
            <h2 class="text-2xl lg:text-4xl font-bold text-center mb-[2vh]">
              {{ $t('pages.aboutUs.chooseUs.title') }}
            </h2>
            <div class="grid md:grid-cols-2 xl:grid-cols-3 md:grid-rows-3 xl:grid-rows-2 gap-y-2 gap-x-6 p-6">
              <WhyWeCard
                v-for="item in whyWe"
                :key="item.header"
                :header="item.header"
                :content="item.content"
              />
            </div>
          </div>

          <div class="bg-[rgba(150,151,140,0.2)] border-2 p-10 rounded-2xl text-center inset-shadow-sm">
            <h2 class="text-2xl lg:text-4xl font-bold mb-4">
              {{ $t('pages.aboutUs.opinions.title') }}
            </h2>
            <p class="italic">
              {{ $t('pages.aboutUs.opinions.feedback') }}
            </p>
            <p class="mt-2">
              {{ $t('pages.aboutUs.opinions.inProgress') }}
            </p>
          </div>
        </div>
      </template>
    </Card>

    <TeamGitHub class="shadow-lg rounded-xl" />

    <Card class="text-center p-8 rounded-xl shadow-lg lg:w-[50vw] mx-auto">
      <template #title>
        <h2 class="text-2xl font-bold">
          {{ $t('pages.aboutUs.joinUs.title') }}
        </h2>
      </template>
      <template #subtitle>
        <h1 class="text-lg px-[1vw] lg:px-[10vw] mb-4">
          {{ $t('pages.aboutUs.joinUs.subtitle') }}
        </h1>
      </template>
      <template #content>
        <Button
          as="a"
          href="contact"
          :label="t('pages.aboutUs.joinUs.button')"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import TeamGitHub from './TeamGitHub.vue'
import WhyWeCard from './WhyWeCard.vue'

const { t } = useI18n()

const whoWeAre = [
  {
    header: t('pages.aboutUs.ourMission.title'),
    content: t('pages.aboutUs.ourMission.description'),
  },
  {
    header: t('pages.aboutUs.ourVision.title'),
    content: t('pages.aboutUs.ourVision.description'),
  },
]

const whyWe = [
  {
    header: t('pages.aboutUs.chooseUs.corpoNeeds.title'),
    content: t('pages.aboutUs.chooseUs.corpoNeeds.description'),
  },
  {
    header: t('pages.aboutUs.chooseUs.automationProcess.title'),
    content: t('pages.aboutUs.chooseUs.automationProcess.description'),
  },
  {
    header: t('pages.aboutUs.chooseUs.fullControl.title'),
    content: t('pages.aboutUs.chooseUs.fullControl.description'),
  },
  {
    header: t('pages.aboutUs.chooseUs.simplicity.title'),
    content: t('pages.aboutUs.chooseUs.simplicity.description'),
  },
  {
    header: t('pages.aboutUs.chooseUs.dataSecurity.title'),
    content: t('pages.aboutUs.chooseUs.dataSecurity.description'),
  },
  {
    header: t('pages.aboutUs.chooseUs.growthAndScalability.title'),
    content: t('pages.aboutUs.chooseUs.growthAndScalability.description'),
  },
]
</script>
