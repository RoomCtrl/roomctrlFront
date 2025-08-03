<template>
  <Panel>
    <template #header>
      <h1 class="mx-auto text-3xl font-bold">
        {{ $t('pages.aboutUs.authors.title') }}
      </h1>
    </template>
    <div class="flex flex-col md:flex-row md:justify-evenly gap-2 md:gap-2">
      <div
        v-for="(member, index) in ourTeam"
        :key="index"
      >
        <Chip class="flex flex-col md:justify-between py-[2vh] gap-1 w-full md:w-[19vw] h-[21vh] md:h-[26vh] bg-[rgba(215,65,65,0.7)]">
          <div class="flex-grow flex-col justify-start">
            <div class="flex flex-row self-start gap-2 pt-[0.5vh] mb-1">
              <Avatar
                icon="pi pi-user"
                size="large"
                class="flex-none self-center"
                shape="circle"
              />
              <div class="flex flex-col">
                <h2 class="text-xl font-bold">
                  {{ member.person }}
                </h2>
                <h1 class="ml-[0.5vw] font-semibold text-sm">
                  {{ member.role }}
                </h1>
              </div>
            </div>

            <p class="text-center">
              {{ member.description }}
            </p>
          </div>

          <NuxtLink
            :to="member.link"
            target="_blank"
            class="flex-none self-end"
          >
            <i
              class="pi pi-github"
              style="font-size: 1.7rem"
            />
          </NuxtLink>
        </Chip>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
const { t } = useI18n()

const ourTeam = [
  { person: 'Jakub Pluta', role: 'Frontend Developer', description: t('pages.aboutUs.authors.descriptions.jp'), link: 'https://github.com/MrPuta' },
  { person: 'Kamil Rogalski', role: 'Full-stack Developer', description: t('pages.aboutUs.authors.descriptions.kr'), link: 'https://github.com/RogalXRogal' },
  { person: 'Adrian Sengar', role: 'Frontend Developer', description: t('pages.aboutUs.authors.descriptions.as'), link: 'https://github.com/SquatcH3962' },
  { person: 'Filip Maciborski', role: 'Tester', description: t('pages.aboutUs.authors.descriptions.fm'), link: 'https://github.com/prokofiew' },
]
</script>

<style scoped>
.test {
  background-color: rgba(215,65,65,0.7);
}
</style>
