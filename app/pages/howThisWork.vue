<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="w-full mx-auto mb-16">
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in">
          {{ $t('pages.howThisWork.title') }}
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mx-auto animate-fade-in-delay">
          Poznaj kroki niezbędne do zalogowania się i pełnego korzystania z platformy RoomCtrl
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform text-sm sm:text-base',
            activeTab === tab.id
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:shadow-md',
          ]"
          @click="activeTab = tab.id"
        >
          <i :class="[tab.icon, 'mr-1 sm:mr-2']" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Content Area -->
      <div class="relative">
        <!-- Login Instructions -->
        <div
          v-if="activeTab === 'login'"
          class="animate-fade-in w-full"
        >
          <LoginInstructions />
        </div>

        <!-- Register Instructions -->
        <div
          v-if="activeTab === 'register'"
          class="animate-fade-in w-full"
        >
          <RegisterInstructions />
        </div>

        <!-- Features -->
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

const tabs = [
  {
    id: 'login',
    label: 'Logowanie',
    icon: 'pi pi-sign-in',
  },
  {
    id: 'register',
    label: 'Rejestracja',
    icon: 'pi pi-user-plus',
  },
  {
    id: 'features',
    label: 'Funkcje',
    icon: 'pi pi-star',
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
