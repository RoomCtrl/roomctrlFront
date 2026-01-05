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
            <h2 class="text-2xl lg:text-4xl font-bold mb-8">
              {{ $t('pages.aboutUs.opinions.title') }}
            </h2>
            <p class="italic text-lg mb-8">
              {{ $t('pages.aboutUs.opinions.feedback') }}
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div
                v-for="(opinion, index) in opinions"
                :key="index"
                class="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-md text-left hover:shadow-lg transition-shadow duration-300"
              >
                <div class="flex items-center gap-1 mb-3">
                  <i
                    v-for="star in 5"
                    :key="star"
                    class="pi pi-star-fill text-sm"
                    :class="star <= opinion.rating ? 'text-yellow-400' : 'text-gray-300'"
                  />
                </div>
                <p class="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{{ opinion.text }}"
                </p>
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <i class="pi pi-user text-xl text-primary" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {{ opinion.name }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ opinion.role }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

const opinions = computed(() => [
  {
    name: t('pages.aboutUs.opinions.opinion1.name'),
    role: t('pages.aboutUs.opinions.opinion1.role'),
    text: t('pages.aboutUs.opinions.opinion1.text'),
    rating: 5,
  },
  {
    name: t('pages.aboutUs.opinions.opinion2.name'),
    role: t('pages.aboutUs.opinions.opinion2.role'),
    text: t('pages.aboutUs.opinions.opinion2.text'),
    rating: 5,
  },
  {
    name: t('pages.aboutUs.opinions.opinion3.name'),
    role: t('pages.aboutUs.opinions.opinion3.role'),
    text: t('pages.aboutUs.opinions.opinion3.text'),
    rating: 5,
  },
  {
    name: t('pages.aboutUs.opinions.opinion4.name'),
    role: t('pages.aboutUs.opinions.opinion4.role'),
    text: t('pages.aboutUs.opinions.opinion4.text'),
    rating: 4,
  },
])
</script>
