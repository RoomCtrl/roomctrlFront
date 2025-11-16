<template>
  <Panel>
    <template #header>
      <h1 class="mx-auto text-3xl font-bold">
        {{ $t('pages.aboutUs.authors.title') }}
      </h1>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:justify-evenly gap-2 lg:gap-2">
      <div
        v-for="(member, index) in ourTeam"
        :key="index"
      >
        <Card
          pt:root:class="w-full overflow-hidden h-full"
          pt:body:class="bg-[rgba(215,65,65,0.7)] h-full"
          pt:title:class="flex-none"
          pt:content:class="flex-grow bg-white dark:bg-[#262626] rounded-xl border-2 text-center flex items-center p-2"
          pt:footer:class="flex-none"
        >
          <template #title>
            <div class="flex flex-row gap-3">
              <i
                class="pi pi-user flex-none self-center"
                style="font-size: 2rem;"
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
          </template>

          <template #content>
            <p>
              {{ member.description }}
            </p>
          </template>

          <template #footer>
            <div class="flex justify-end">
              <NuxtLink
                :to="member.link"
                target="_blank"
                aria-label="GitHub profile"
              >
                <i
                  class="pi pi-github"
                  style="font-size: 1.7rem"
                />
              </NuxtLink>
            </div>
          </template>
        </Card>
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
  background-color: rgba(219, 147, 147, 0.7);
}
</style>
