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
          <div class="grid grid-cols-2 gap-x-4">
            <Card
              v-for="(card, index) in whoWeAre"
              :key="index"
              pt:root:class="bg-[rgba(223,71,71,0.2)]"
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
            <div class="grid grid-cols-3 grid-rows-2 gap-y-2 gap-x-6 p-6">
              <WhyWeCard
                v-for="item in whyWe"
                :key="item.header"
                :header="item.header"
                :content="item.content"
              />
            </div>
          </div>

          <div class="bg-[rgba(151,151,151,0.2)] border-2 p-10 rounded-2xl text-center inset-shadow-sm">
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
    content: 'Chcemy, aby rezerwacja sal w dużych firmach była szybka, intuicyjna i wolna od chaosu. Zależy nam, by każdy pracownik mógł z łatwością znaleźć i zarezerwować odpowiednią przestrzeń, a menedżerowie mieli pełną kontrolę nad dostępnością, wykorzystaniem i kosztami. \n Naszym priorytetem jest efektywność, przejrzystość i maksymalne uproszczenie procesu zarządzania przestrzenią biurową.',
  },
  {
    header: t('pages.aboutUs.ourVision.title'),
    content: t('pages.aboutUs.ourVision.description'),
  },
]

const whyWe = [
  {
    header: 'Znamy potrzeby korporacji',
    content: 'Rozumiemy wyzwania związane z zarządzaniem dużą liczbą sal, zespołów i spotkań.',
  },
  {
    header: 'Automatyzujemy procesy',
    content: 'Nasz system eliminuje ręczne planowanie i minimalizuje ryzyko podwójnych rezerwacji.',
  },
  {
    header: 'Oferujemy pełną kontrolę i przejrzystość',
    content: 'Zapewniamy raporty, analitykę oraz wgląd w wykorzystanie sal w czasie rzeczywistym.',
  },
  {
    header: 'Stawiamy na prostotę i intuicyjność',
    content: 'Interfejs jest zaprojektowany tak, aby każdy użytkownik mógł szybko znaleźć i zarezerwować odpowiednią salę.',
  },
  {
    header: 'Zapewniamy bezpieczeństwo danych',
    content: 'Stosujemy najwyższe standardy ochrony informacji i zgodność z RODO.',
  },
  {
    header: 'Skalowalność i rozwój',
    content: 'System rozwija się wraz z Twoją firmą — niezależnie od tego, czy obsługujesz jedno biuro, czy globalną sieć oddziałów.',
  },
]
</script>
