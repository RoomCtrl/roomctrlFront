<template>
  <div class="space-y-8 w-full">
    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div
        v-for="(feature, index) in features"
        :key="index"
        :style="{ '--delay': `${index * 80}ms` }"
        class="group cursor-pointer animate-feature-in"
      >
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-slate-700 overflow-hidden relative">
          <!-- Background Glow -->
          <div
            :class="[
              'absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300',
              feature.color,
            ]"
          />

          <!-- Icon -->
          <div class="relative mb-4">
            <div
              :class="[
                'w-16 h-16 rounded-lg flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110',
                feature.bgColor,
              ]"
            >
              <i :class="feature.icon" />
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ feature.title }}
          </h3>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {{ feature.description }}
          </p>

          <!-- Highlights -->
          <ul class="space-y-2">
            <li
              v-for="(highlight, i) in feature.highlights"
              :key="i"
              class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400"
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

    <!-- Workflow Diagram -->
    <div class="mt-16 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Przepływ użytkownika w aplikacji
      </h2>

      <!-- Workflow Steps -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        <div
          v-for="(step, index) in workflow"
          :key="index"
          class="relative"
        >
          <!-- Step Box -->
          <div class="bg-white dark:bg-slate-800 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-200 dark:border-indigo-700">
            <div class="text-3xl mb-3">
              {{ step.icon }}
            </div>
            <p class="font-semibold text-gray-900 dark:text-white text-sm">
              {{ step.label }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {{ step.description }}
            </p>
          </div>

          <!-- Arrow -->
          <div
            v-if="index < workflow.length - 1"
            class="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-10"
          >
            <i class="pi pi-arrow-right text-2xl text-indigo-500" />
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      <!-- Left Side -->
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-700">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <i class="pi pi-star-fill text-yellow-500 text-3xl" />
          Główne zalety
        </h3>

        <div class="space-y-4">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="flex gap-4 group"
          >
            <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold group-hover:scale-110 transition-transform duration-300">
              {{ index + 1 }}
            </div>
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">
                {{ benefit.title }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {{ benefit.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Statistics -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 border border-purple-200 dark:border-purple-700">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <i class="pi pi-chart-bar text-blue-500 text-3xl" />
          Liczby na koniec
        </h3>

        <div class="space-y-4">
          <div
            v-for="(stat, index) in statistics"
            :key="index"
            class="group"
          >
            <div class="flex items-end justify-between mb-2">
              <p class="font-semibold text-gray-900 dark:text-white">
                {{ stat.label }}
              </p>
              <p class="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                {{ stat.value }}
              </p>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
                :style="{ width: stat.percentage + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center mt-12 p-6 sm:p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white w-full">
      <h2 class="text-2xl sm:text-3xl font-bold mb-4">
        Gotów do rozpoczęcia?
      </h2>
      <p class="text-base sm:text-lg mb-6 text-blue-100">
        Załóż konto i zarezerwuj swoją pierwszą salę już dzisiaj!
      </p>
      <div class="flex justify-center gap-3 sm:gap-4 flex-wrap">
        <NuxtLink
          to="/pl/login"
          class="px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base"
        >
          Zaloguj się
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 border border-white/30 text-sm sm:text-base"
        >
          Zarejestruj się
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'pi pi-calendar-check',
    title: 'Rezerwacja sal',
    description: 'Łatwa rezerwacja dostępnych sal konferencyjnych',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    dotColor: 'bg-blue-500',
    highlights: [
      'Widok kalendarza w czasie rzeczywistym',
      'Filtrowanie po parametrach',
      'Automatyczne powiadomienia',
    ],
  },
  {
    icon: 'pi pi-search',
    title: 'Wyszukiwanie zaawansowane',
    description: 'Znajdź idealną salę wg Twoich kryteriów',
    color: 'bg-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    dotColor: 'bg-green-500',
    highlights: [
      'Filtr po pojemności',
      'Filtr po wyposażeniu',
      'Sortowanie po lokalizacji',
    ],
  },
  {
    icon: 'pi pi-users',
    title: 'Zarządzanie zespołem',
    description: 'Współpraca z innymi członkami zespołu',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    dotColor: 'bg-purple-500',
    highlights: [
      'Zapraszanie uczestników',
      'Udostępnianie rezerwacji',
      'Historia spotkań',
    ],
  },
  {
    icon: 'pi pi-bell',
    title: 'Powiadomienia',
    description: 'Będź informowany o ważnych wydarzeniach',
    color: 'bg-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
    dotColor: 'bg-orange-500',
    highlights: [
      'Przypomnienia przed spotkaniem',
      'Aktualizacje dostępności',
      'Zmiany w rezerwacjach',
    ],
  },
  {
    icon: 'pi pi-lock',
    title: 'Bezpieczeństwo',
    description: 'Ochrona Twoich danych i prywatności',
    color: 'bg-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    dotColor: 'bg-red-500',
    highlights: [
      'Szyfrowanie danych',
      'Weryfikacja dwuskładnikowa',
      'Kontrola dostępu',
    ],
  },
  {
    icon: 'pi pi-mobile',
    title: 'Aplikacja mobilna',
    description: 'Dostęp do aplikacji na dowolnym urządzeniu',
    color: 'bg-cyan-500',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600',
    dotColor: 'bg-cyan-500',
    highlights: [
      'iOS i Android',
      'Synchronizacja w chmurze',
      'Offline mode',
    ],
  },
]

const workflow = [
  {
    icon: '1️⃣',
    label: 'Rejestracja',
    description: 'Utwórz konto',
  },
  {
    icon: '2️⃣',
    label: 'Przeglądanie',
    description: 'Odkryj dostępne sale',
  },
  {
    icon: '3️⃣',
    label: 'Rezerwacja',
    description: 'Zarezerwuj salę',
  },
  {
    icon: '4️⃣',
    label: 'Potwierdzenie',
    description: 'Otrzymaj potwierdzenie',
  },
  {
    icon: '5️⃣',
    label: 'Spotykanie się',
    description: 'Ciesz się spotkaniem',
  },
]

const benefits = [
  {
    title: 'Oszczędność czasu',
    description: 'Nie szukaj już sal ręcznie - wszystko w jednym miejscu',
  },
  {
    title: 'Pełna transparentność',
    description: 'Widzisz dokładnie co jest dostępne i kiedy',
  },
  {
    title: 'Lepsze planowanie',
    description: 'Organizuj spotkania i rezerwuj miejsca z wyprzedzeniem',
  },
  {
    title: 'Efektywna współpraca',
    description: 'Całe zespoły mogą pracować razem i dzielić się informacjami',
  },
]

const statistics = [
  { label: 'Sal dostępnych', value: '50+', percentage: 100 },
  { label: 'Rezerwacji dziennie', value: '200+', percentage: 85 },
  { label: 'Użytkowników aktywnych', value: '500+', percentage: 90 },
  { label: 'Zadowolenie użytkowników', value: '98%', percentage: 98 },
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
