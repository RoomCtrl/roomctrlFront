<template>
  <div class="space-y-8 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full auto-rows-fr">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :style="{ '--delay': `${index * 100}ms` }"
        class="group cursor-pointer animate-step-in"
      >
        <div class="relative h-full cursor-default">
          <div class="absolute -left-4 -top-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
            {{ index + 1 }}
          </div>

          <div class="bg-purple-50 dark:bg-purple-950/20 rounded-xl shadow-lg p-6 h-full hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-2 border-purple-300 dark:border-purple-700">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110">
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
    </div>

    <div class="flex justify-center">
      <div class="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 rounded-r-lg p-6">
        <div class="flex gap-4">
          <i class="pi pi-check-circle text-green-600 text-2xl flex-shrink-0 mt-1" />
          <div>
            <h4 class="font-bold text-green-900 dark:text-green-200 mb-3">
              {{ t('pages.howThisWork.instructions.registration.registrationRequirements.title') }}
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2 text-sm text-green-800 dark:text-green-300">
                <p class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  <strong>
                    {{ t('pages.howThisWork.instructions.registration.registrationRequirements.name') }}
                  </strong>
                  {{ t('pages.howThisWork.instructions.registration.registrationRequirements.nameRequirement') }}
                </p>
                <p class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  <strong>
                    {{ t('pages.howThisWork.instructions.registration.registrationRequirements.email') }}
                  </strong>
                  {{ t('pages.howThisWork.instructions.registration.registrationRequirements.emailRequirement') }}
                </p>
                <p class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  <strong>
                    {{ t('pages.howThisWork.instructions.registration.registrationRequirements.password') }}
                  </strong>
                  {{ t('pages.howThisWork.instructions.registration.registrationRequirements.passwordRequirement') }}
                </p>
              </div>
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
    icon: 'pi pi-user-plus',
    title: t('pages.howThisWork.instructions.registration.goToRegistrationPage.title'),
    description: t('pages.howThisWork.instructions.registration.goToRegistrationPage.description'),
    details: [
      t('pages.howThisWork.instructions.registration.goToRegistrationPage.steps.stepOne'),
      t('pages.howThisWork.instructions.registration.goToRegistrationPage.steps.stepTwo'),
      t('pages.howThisWork.instructions.registration.goToRegistrationPage.steps.stepThree'),
    ],
  },
  {
    icon: 'pi pi-pencil',
    title: t('pages.howThisWork.instructions.registration.fillRegistrationForm.title'),
    description: t('pages.howThisWork.instructions.registration.fillRegistrationForm.description'),
    details: [
      t('pages.howThisWork.instructions.registration.fillRegistrationForm.steps.stepOne'),
      t('pages.howThisWork.instructions.registration.fillRegistrationForm.steps.stepTwo'),
      t('pages.howThisWork.instructions.registration.fillRegistrationForm.steps.stepThree'),
    ],
  },
  {
    icon: 'pi pi-key',
    title: t('pages.howThisWork.instructions.registration.setPassword.title'),
    description: t('pages.howThisWork.instructions.registration.setPassword.description'),
    details: [
      t('pages.howThisWork.instructions.registration.setPassword.steps.stepOne'),
      t('pages.howThisWork.instructions.registration.setPassword.steps.stepTwo'),
      t('pages.howThisWork.instructions.registration.setPassword.steps.stepThree'),
    ],
  },
  {
    icon: 'pi pi-check-circle',
    title: t('pages.howThisWork.instructions.registration.ready.title'),
    description: t('pages.howThisWork.instructions.registration.ready.description'),
    details: [
      t('pages.howThisWork.instructions.registration.ready.steps.stepOne'),
      t('pages.howThisWork.instructions.registration.ready.steps.stepTwo'),
      t('pages.howThisWork.instructions.registration.ready.steps.stepThree'),
    ],
  },
]

const images = [
  { src: '/images/howThisWork/mainPage.png', alt: 'Strona główna' },
  { src: '/images/howThisWork/registerPage.png', alt: 'Strona rejestracji' },
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
