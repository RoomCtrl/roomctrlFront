<template>
  <div class="space-y-8 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :style="{ '--delay': `${index * 100}ms` }"
        class="group cursor-default animate-step-in"
      >
        <div class="relative h-full">
          <div class="absolute -left-4 -top-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
            {{ index + 1 }}
          </div>

          <div class="bg-blue-50 dark:bg-blue-950/20 rounded-xl shadow-lg p-6 h-full hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-2 border-blue-300 dark:border-blue-700">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110">
                  <i
                    :class="step.icon"
                    style="font-size: 1.4rem;"
                  />
                </div>
              </div>
              <div class="flex flex-col justify-center">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {{ step.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  {{ step.description }}
                </p>
              </div>
            </div>

            <ul
              v-if="step.details"
              class="mt-4 space-y-2"
            >
              <li
                v-for="(detail, i) in step.details"
                :key="i"
                class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <i class="pi pi-check text-green-500 mt-1 text-xs" />
                <span>{{ detail }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div class="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 rounded-r-lg p-6 h-full">
          <div class="flex gap-4 cursor-default">
            <i class="pi pi-info-circle text-blue-600 text-2xl mt-1" />
            <div>
              <h4 class="font-bold text-blue-900 dark:text-blue-200 mb-2">
                {{ $t('pages.howThisWork.instructions.login.securityTips.title') }}
              </h4>
              <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                <li
                  v-for="tip in securityTips"
                  :key="tip"
                >
                  ✓ {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 galleria-glow">
      <Galleria
        :value="images"
        :numVisible="2"
        :circular="true"
        :showThumbnails="true"
        :showItemNavigators="true"
        containerStyle="max-width: 900px; margin: 0 auto;"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.item.src"
            :alt="slotProps.item.alt"
            class="w-full rounded-xl"
          />
        </template>
        <template #thumbnail="slotProps">
          <img
            :src="slotProps.item.src"
            :alt="slotProps.item.alt"
            class="rounded-lg"
            style="max-height: 80px;"
          />
        </template>
      </Galleria>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const steps = [
  {
    icon: 'pi pi-sign-in',
    title: t('pages.howThisWork.instructions.login.goToLoginPage.title'),
    description: t('pages.howThisWork.instructions.login.goToLoginPage.description'),
    details: [
      t('pages.howThisWork.instructions.login.goToLoginPage.steps.stepOne'),
      t('pages.howThisWork.instructions.login.goToLoginPage.steps.stepTwo'),
    ],
  },
  {
    icon: 'pi pi-at',
    title: t('pages.howThisWork.instructions.login.enterCredentials.title'),
    description: t('pages.howThisWork.instructions.login.enterCredentials.description'),
    details: [
      t('pages.howThisWork.instructions.login.enterCredentials.steps.stepOne'),
      t('pages.howThisWork.instructions.login.enterCredentials.steps.stepTwo'),
      t('pages.howThisWork.instructions.login.enterCredentials.steps.stepThree'),
    ],
  },
  {
    icon: 'pi pi-check-circle',
    title: t('pages.howThisWork.instructions.login.loginFinish.title'),
    description: t('pages.howThisWork.instructions.login.loginFinish.description'),
    details: [
      t('pages.howThisWork.instructions.login.loginFinish.steps.stepOne'),
      t('pages.howThisWork.instructions.login.loginFinish.steps.stepTwo'),
      t('pages.howThisWork.instructions.login.loginFinish.steps.stepThree'),
    ],
  },
]

const securityTips = [
  t('pages.howThisWork.instructions.login.securityTips.tipOne'),
  t('pages.howThisWork.instructions.login.securityTips.tipTwo'),
  t('pages.howThisWork.instructions.login.securityTips.tipThree'),
]

const images = [
  { src: '/images/howThisWork/mainPage.png', alt: 'Strona główna' },
  { src: '/images/howThisWork/loginPage.png', alt: 'Strona logowania' },
]
</script>

<style scoped>
@keyframes stepIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-step-in {
  animation: stepIn 0.6s ease-out forwards;
  animation-delay: var(--delay, 0ms);
}

.galleria-glow :deep(.p-galleria) {
  box-shadow: 0 0 20px rgba(44, 44, 44, 0.7);
  border-radius: 1rem;
}

:root.p-dark .galleria-glow :deep(.p-galleria) {
  box-shadow: 0 0 20px rgba(44, 44, 44, 0.5);
}
</style>
