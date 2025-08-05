<template>
  <div class="flex flex-col gap-10">
    <Card>
      <template #title>
        <h1 class="text-4xl md:text-6xl font-extrabold mb-4 text-center">
          {{ $t('pages.aboutUs.title') }}
        </h1>
      </template>
      <template #subtitle>
        <p class="text-lg text-center mb-4 md:mb-8 md:px-[18vw]">
          {{ $t('pages.aboutUs.subtitle') }}
        </p>
      </template>
      <template #content>
        <div class="flex flex-col gap-10 md:gap-20 max-md:items-center">
          <div class="flex flex-col md:flex-row max-md:gap-3 justify-center md:justify-evenly text-center">
            <Card
              v-for="(card, index) in whoWeAre"
              :key="index"
              pt:root:class="w-[70vw] md:w-[30vw] overflow-hidden"
              pt:body:class="bg-[rgba(223,71,71,0.2)]"
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
            <h1 class="font-bold text-2xl md:text-4xl text-center">
              {{ $t('pages.aboutUs.howThisWorks.title') }}
            </h1>
            <div class="flex flex-col md:flex-row max-md:gap-3 justify-center md:justify-evenly text-center pt-[1vh] md:pt-[5vh]">
              <Card
                v-for="(step, index) in howThisWork"
                :key="index"
                pt:root:class="w-[70vw] md:w-[23vw] overflow-hidden"
                pt:body:class="bg-[rgba(47,152,223,0.2)]"
              >
                <template #title>
                  <h1 class="font-semibold">
                    {{ (index + 1) + '. ' + step.header }}
                  </h1>
                </template>
                <template #content>
                  {{ step.content }}
                </template>
              </Card>
            </div>
          </div>

          <div>
            <h1 class="font-bold text-2xl md:text-4xl text-center">
              {{ $t('pages.aboutUs.ourFillars.title') }}
            </h1>
            <div class="flex flex-col md:flex-row max-md:gap-3 justify-evenly text-center pt-[1vh] md:pt-[5vh]">
              <Card
                v-for="(filar, index) in filars"
                :key="index"
                pt:root:class="w-[80vw] md:w-[23vw] overflow-hidden"
                pt:body:class="bg-[rgba(47,152,223,0.2)]"
              >
                <template #title>
                  <h1 class="font-semibold">
                    {{ filar.header }}
                  </h1>
                </template>
                <template #content>
                  {{ filar.content }}
                </template>
              </Card>
            </div>
          </div>

          <div>
            <h2 class="text-2xl md:text-4xl font-bold text-center">
              {{ $t('pages.aboutUs.chooseUs.title') }}
            </h2>
            <ul class="max-w-3xl mx-auto space-y-3 text-lg list-disc list-inside">
              <li
                v-for="(feature, index) in features"
                :key="index"
              >
                {{ feature }}
              </li>
            </ul>
          </div>

          <div class="bg-[rgba(151,151,151,0.2)] border-2 p-10 rounded-2xl text-center inset-shadow-sm">
            <h2 class="text-2xl md:text-4xl font-bold mb-4">
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

    <Card class="text-center p-8 rounded-xl shadow-lg md:w-[50vw] mx-auto">
      <template #title>
        <h2 class="text-2xl font-bold">
          {{ $t('pages.aboutUs.joinUs.title') }}
        </h2>
      </template>
      <template #subtitle>
        <h1 class="text-lg px-[1vw] md:px-[10vw] mb-4">
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

const howThisWork = [
  {
    header: t('pages.aboutUs.howThisWorks.findRoom.title'),
    content: t('pages.aboutUs.howThisWorks.findRoom.description'),
  },
  {
    header: t('pages.aboutUs.howThisWorks.reserve.title'),
    content: t('pages.aboutUs.howThisWorks.reserve.description'),
  },
  {
    header: t('pages.aboutUs.howThisWorks.use.title'),
    content: t('pages.aboutUs.howThisWorks.use.description'),
  },
]

const filars = [
  {
    header: t('pages.aboutUs.ourFillars.strategy.title'),
    content: t('pages.aboutUs.ourFillars.strategy.description'),
  },
  {
    header: t('pages.aboutUs.ourFillars.innovaction.title'),
    content: t('pages.aboutUs.ourFillars.innovaction.description'),
  },
  {
    header: t('pages.aboutUs.ourFillars.teamwork.title'),
    content: t('pages.aboutUs.ourFillars.teamwork.description'),
  },
]

const features = [
  t('pages.aboutUs.chooseUs.features.noAdditionalFees'),
  t('pages.aboutUs.chooseUs.features.fastBooking'),
  t('pages.aboutUs.chooseUs.features.securePayment'),
  t('pages.aboutUs.chooseUs.features.flexible'),
  t('pages.aboutUs.chooseUs.features.coummity'),
]
</script>
