<template>
  <div class="min-h-screen py-12 px-4 lg:px-8 w-full">
    <div class="mb-16">
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
          {{ $t('pages.howThisWork.title') }}
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-delay">
          {{ $t('pages.howThisWork.subtitle') }}
        </p>
      </div>

      <div class="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform text-sm sm:text-base',
            activeTab === tab.id
              ? tab.activeColor
              : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:shadow-md',
          ]"
          @click="activeTab = tab.id"
        >
          <i :class="[tab.icon, 'mr-1 sm:mr-2']" />
          {{ tab.label }}
        </button>
      </div>

      <div class="relative w-full">
        <div
          v-if="activeTab === 'login'"
          class="animate-fade-in w-full"
        >
          <LoginInstructions />
        </div>

        <div
          v-if="activeTab === 'register'"
          class="animate-fade-in w-full"
        >
          <RegisterInstructions />
        </div>

        <div
          v-if="activeTab === 'features'"
          class="animate-fade-in w-full"
        >
          <FeaturesOverview />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginInstructions from '~/components/howThisWorkPage/LoginInstructions.vue'
import RegisterInstructions from '~/components/howThisWorkPage/RegisterInstructions.vue'
import FeaturesOverview from '~/components/howThisWorkPage/FeaturesOverview.vue'

const activeTab = ref('login')
const { t } = useI18n()

const tabs = [
  {
    id: 'login',
    label: t('pages.howThisWork.instructions.login.title'),
    icon: 'pi pi-sign-in',
    activeColor: 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg scale-105',
  },
  {
    id: 'register',
    label: t('pages.howThisWork.instructions.registration.title'),
    icon: 'pi pi-user-plus',
    activeColor: 'bg-purple-600 dark:bg-purple-500 text-white shadow-lg scale-105',
  },
  {
    id: 'features',
    label: t('pages.howThisWork.instructions.functions.title'),
    icon: 'pi pi-star',
    activeColor: 'bg-green-600 dark:bg-green-500 text-white shadow-lg scale-105',
  },
]
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDelay {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-delay {
  animation: fadeInDelay 0.8s ease-out;
}
</style>
