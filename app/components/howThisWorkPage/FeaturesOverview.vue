<template>
  <div class="space-y-8 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div
        v-for="(feature, index) in features"
        :key="index"
        :style="{ '--delay': `${index * 80}ms` }"
        class="group cursor-default animate-feature-in"
      >
        <div
          :class="[
            'rounded-xl shadow-lg p-8 h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 relative',
            feature.cardBgColor,
            feature.borderColor,
          ]"
        >
          <div class="flex gap-4 mb-4">
            <div
              :class="[
                'w-16 h-16 rounded-lg flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0',
                feature.bgColor,
              ]"
            >
              <i
                :class="feature.icon"
                style="font-size: 1.4rem;"
              />
            </div>
            <div class="flex flex-col justify-center">
              <h3 class="text-xl font-bold mb-1">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>

          <ul class="space-y-2">
            <li
              v-for="(highlight, i) in feature.highlights"
              :key="i"
              class="flex items-center gap-2 text-sm"
            >
              <span
                class="inline-block w-1.5 h-1.5 rounded-full"
                :class="feature.dotColor"
              />
              {{ highlight }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-16 p-8 bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700">
      <h2 class="text-2xl font-bold text-center mb-12">
        {{ t('pages.howThisWork.instructions.workflow.title') }}
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
        <div
          v-for="(step, index) in workflow"
          :key="index"
          class="relative"
        >
          <div class="bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 border">
            <div class="font-bold text-3xl mb-3">
              {{ index + 1 }}
            </div>
            <p class="font-semibold text-sm">
              {{ step.label }}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {{ step.description }}
            </p>
          </div>

          <div
            v-if="index < workflow.length - 1"
            class="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-10"
          >
            <i class="pi pi-arrow-right text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      <div class="bg-white dark:bg-neutral-800 rounded-xl p-8 border border-gray-200 dark:border-neutral-700">
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <i class="pi pi-star-fill text-yellow-500 text-3xl" />
          {{ t('pages.howThisWork.instructions.benefits.title') }}
        </h3>

        <div class="space-y-4">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="flex gap-4 group"
          >
            <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 font-bold group-hover:scale-110 transition-transform duration-300">
              {{ index + 1 }}
            </div>
            <div>
              <p class="font-semibold">
                {{ benefit.title }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {{ benefit.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-neutral-800 rounded-xl p-8 border border-gray-200 dark:border-neutral-700">
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <i class="pi pi-chart-bar text-primary-500 text-3xl" />
          {{ t('pages.howThisWork.instructions.statistics.title') }}
        </h3>

        <div class="space-y-4">
          <div
            v-for="(stat, index) in statistics"
            :key="index"
            class="group"
          >
            <div class="flex items-end justify-between mb-2">
              <p class="font-semibold">
                {{ stat.label }}
              </p>
              <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {{ stat.value }}
              </p>
            </div>
            <div class="w-full bg-blue-300 dark:bg-blue-700 rounded-full h-2 overflow-hidden">
              <div
                class="h-full bg-primary-500 transition-all duration-700"
                :style="{ width: stat.percentage + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-12 p-6 sm:p-8 bg-white dark:bg-neutral-800 rounded-xl w-full">
      <h2 class="text-2xl sm:text-3xl font-bold mb-4">
        {{ t('pages.howThisWork.instructions.cta.title') }}
      </h2>
      <p class="text-base sm:text-lg mb-6">
        {{ t('pages.howThisWork.instructions.cta.subtitle') }}
      </p>
      <div class="flex justify-center gap-3 sm:gap-4 flex-wrap">
        <Button
          as="a"
          :href="localePath('login')"
          :label="t('pages.howThisWork.instructions.cta.loginButton')"
          severity="error"
        />
        <Button
          as="a"
          href="/register"
          :label="t('pages.howThisWork.instructions.cta.registerButton')"
          severity="success"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
const features = [
  {
    icon: 'pi pi-calendar-plus',
    title: t('pages.howThisWork.instructions.functions.bookingRooms.title'),
    description: t('pages.howThisWork.instructions.functions.bookingRooms.description'),
    bgColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    cardBgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
    dotColor: 'bg-blue-500',
    highlights: [
      t('pages.howThisWork.instructions.functions.bookingRooms.steps.stepOne'),
      t('pages.howThisWork.instructions.functions.bookingRooms.steps.stepTwo'),
      t('pages.howThisWork.instructions.functions.bookingRooms.steps.stepThree'),
    ],
  },
  {
    icon: 'pi pi-search',
    title: t('pages.howThisWork.instructions.functions.advancedSearch.title'),
    description: t('pages.howThisWork.instructions.functions.advancedSearch.description'),
    bgColor: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    cardBgColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-300 dark:border-green-700',
    dotColor: 'bg-green-500',
    highlights: [
      t('pages.howThisWork.instructions.functions.advancedSearch.steps.stepOne'),
      t('pages.howThisWork.instructions.functions.advancedSearch.steps.stepTwo'),
      t('pages.howThisWork.instructions.functions.advancedSearch.steps.stepThree'),
    ],
  },
  {
    icon: 'pi pi-users',
    title: t('pages.howThisWork.instructions.functions.teamManagement.title'),
    description: t('pages.howThisWork.instructions.functions.teamManagement.description'),
    bgColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    cardBgColor: 'bg-purple-50 dark:bg-purple-950/20',
    borderColor: 'border-purple-300 dark:border-purple-700',
    dotColor: 'bg-purple-500',
    highlights: [
      t('pages.howThisWork.instructions.functions.teamManagement.steps.stepOne'),
      t('pages.howThisWork.instructions.functions.teamManagement.steps.stepTwo'),
      t('pages.howThisWork.instructions.functions.teamManagement.steps.stepThree'),
    ],
  },
  {
    icon: 'pi pi-bell',
    title: t('pages.howThisWork.instructions.functions.notifications.title'),
    description: t('pages.howThisWork.instructions.functions.notifications.description'),
    bgColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
    cardBgColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-300 dark:border-orange-700',
    dotColor: 'bg-orange-500',
    highlights: [
      t('pages.howThisWork.instructions.functions.notifications.steps.stepOne'),
      t('pages.howThisWork.instructions.functions.notifications.steps.stepTwo'),
      t('pages.howThisWork.instructions.functions.notifications.steps.stepThree'),
    ],
  },
  {
    icon: 'pi pi-lock',
    title: t('pages.howThisWork.instructions.functions.security.title'),
    description: t('pages.howThisWork.instructions.functions.security.description'),
    bgColor: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    cardBgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-300 dark:border-red-700',
    dotColor: 'bg-red-500',
    highlights: [
      t('pages.howThisWork.instructions.functions.security.steps.stepOne'),
      t('pages.howThisWork.instructions.functions.security.steps.stepTwo'),
      t('pages.howThisWork.instructions.functions.security.steps.stepThree'),
    ],
  },
  {
    icon: 'pi pi-mobile',
    title: t('pages.howThisWork.instructions.functions.mobileApp.title'),
    description: t('pages.howThisWork.instructions.functions.mobileApp.description'),
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600',
    cardBgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
    borderColor: 'border-cyan-300 dark:border-cyan-700',
    dotColor: 'bg-cyan-500',
    highlights: [
      t('pages.howThisWork.instructions.functions.mobileApp.steps.stepOne'),
      t('pages.howThisWork.instructions.functions.mobileApp.steps.stepTwo'),
      t('pages.howThisWork.instructions.functions.mobileApp.steps.stepThree'),
    ],
  },
]

const workflow = [
  {
    label: t('pages.howThisWork.instructions.workflow.steps.registration.label'),
    description: t('pages.howThisWork.instructions.workflow.steps.registration.description'),
  },
  {
    label: t('pages.howThisWork.instructions.workflow.steps.browsing.label'),
    description: t('pages.howThisWork.instructions.workflow.steps.browsing.description'),
  },
  {
    label: t('pages.howThisWork.instructions.workflow.steps.booking.label'),
    description: t('pages.howThisWork.instructions.workflow.steps.booking.description'),
  },
  {
    label: t('pages.howThisWork.instructions.workflow.steps.confirmation.label'),
    description: t('pages.howThisWork.instructions.workflow.steps.confirmation.description'),
  },
  {
    label: t('pages.howThisWork.instructions.workflow.steps.meeting.label'),
    description: t('pages.howThisWork.instructions.workflow.steps.meeting.description'),
  },
]

const benefits = [
  {
    title: t('pages.howThisWork.instructions.benefits.items.timeSaving.title'),
    description: t('pages.howThisWork.instructions.benefits.items.timeSaving.description'),
  },
  {
    title: t('pages.howThisWork.instructions.benefits.items.transparency.title'),
    description: t('pages.howThisWork.instructions.benefits.items.transparency.description'),
  },
  {
    title: t('pages.howThisWork.instructions.benefits.items.planning.title'),
    description: t('pages.howThisWork.instructions.benefits.items.planning.description'),
  },
  {
    title: t('pages.howThisWork.instructions.benefits.items.collaboration.title'),
    description: t('pages.howThisWork.instructions.benefits.items.collaboration.description'),
  },
]

const statistics = [
  { label: t('pages.howThisWork.instructions.statistics.items.rooms.label'), value: t('pages.howThisWork.instructions.statistics.items.rooms.value'), percentage: 100 },
  { label: t('pages.howThisWork.instructions.statistics.items.dailyBookings.label'), value: t('pages.howThisWork.instructions.statistics.items.dailyBookings.value'), percentage: 85 },
  { label: t('pages.howThisWork.instructions.statistics.items.activeUsers.label'), value: t('pages.howThisWork.instructions.statistics.items.activeUsers.value'), percentage: 90 },
  { label: t('pages.howThisWork.instructions.statistics.items.satisfaction.label'), value: t('pages.howThisWork.instructions.statistics.items.satisfaction.value'), percentage: 98 },
]
</script>

<style scoped>
@keyframes featureIn {
  from {
    opacity: 0;
    transform: translateY(30px) rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0);
  }
}

.animate-feature-in {
  animation: featureIn 0.6s ease-out forwards;
  animation-delay: var(--delay, 0ms);
}
</style>
