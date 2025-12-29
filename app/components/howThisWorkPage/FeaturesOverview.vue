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
        <div
          :class="[
            'rounded-xl shadow-lg p-8 h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 relative',
            feature.cardBgColor,
            feature.borderColor,
          ]"
        >
          <!-- Icon and Title -->
          <div class="flex gap-4 mb-4">
            <div
              :class="[
                'w-16 h-16 rounded-lg flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0',
                feature.bgColor,
              ]"
            >
              <i :class="feature.icon" />
            </div>
            <div class="flex flex-col justify-center">
              <h3 class="text-xl font-bold text-surface-900 dark:text-surface-0 mb-1">
                {{ feature.title }}
              </h3>
              <p class="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>

          <!-- Highlights -->
          <ul class="space-y-2">
            <li
              v-for="(highlight, i) in feature.highlights"
              :key="i"
              class="flex items-center gap-2 text-sm text-surface-700 dark:text-surface-400"
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
    <div class="mt-16 p-8 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
      <h2 class="text-2xl font-bold text-center text-surface-900 dark:text-surface-0 mb-12">
        Przepływ użytkownika w aplikacji
      </h2>

      <!-- Workflow Steps -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
        <div
          v-for="(step, index) in workflow"
          :key="index"
          class="relative"
        >
          <!-- Step Box -->
          <div class="bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 border">
            <div class="font-bold text-3xl mb-3">
              {{ index + 1 }}
            </div>
            <p class="font-semibold text-surface-900 dark:text-surface-0 text-sm">
              {{ step.label }}
            </p>
            <p class="text-xs text-surface-600 dark:text-surface-400 mt-2">
              {{ step.description }}
            </p>
          </div>

          <!-- Arrow -->
          <div
            v-if="index < workflow.length - 1"
            class="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-10"
          >
            <i class="pi pi-arrow-right text-2xl text-primary-500" />
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      <!-- Left Side -->
      <div class="bg-white dark:bg-neutral-800 rounded-xl p-8 border border-gray-200 dark:border-neutral-700">
        <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-6 flex items-center gap-3">
          <i class="pi pi-star-fill text-yellow-500 text-3xl" />
          Główne zalety
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
              <p class="font-semibold text-surface-900 dark:text-surface-0">
                {{ benefit.title }}
              </p>
              <p class="text-sm text-surface-600 dark:text-surface-400 mt-1">
                {{ benefit.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Statistics -->
      <div class="bg-white dark:bg-neutral-800 rounded-xl p-8 border border-gray-200 dark:border-neutral-700">
        <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-6 flex items-center gap-3">
          <i class="pi pi-chart-bar text-primary-500 text-3xl" />
          Liczby na koniec
        </h3>

        <div class="space-y-4">
          <div
            v-for="(stat, index) in statistics"
            :key="index"
            class="group"
          >
            <div class="flex items-end justify-between mb-2">
              <p class="font-semibold text-surface-900 dark:text-surface-0">
                {{ stat.label }}
              </p>
              <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {{ stat.value }}
              </p>
            </div>
            <div class="w-full bg-surface-300 dark:bg-surface-700 rounded-full h-2 overflow-hidden">
              <div
                class="h-full bg-primary-500 transition-all duration-700"
                :style="{ width: stat.percentage + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center mt-12 p-6 sm:p-8 bg-white dark:bg-neutral-800 rounded-xl w-full">
      <h2 class="text-2xl sm:text-3xl font-bold mb-4">
        Gotów do rozpoczęcia?
      </h2>
      <p class="text-base sm:text-lg mb-6">
        Załóż konto i zarezerwuj swoją pierwszą salę już dzisiaj!
      </p>
      <div class="flex justify-center gap-3 sm:gap-4 flex-wrap">
        <Button
          as="a"
          :href="localePath('login')"
          label="Zaloguj się"
          severity="error"
        />
        <Button
          as="a"
          href="/register"
          label="Zarejestruj się"
          severity="success"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const features = [
  {
    icon: 'pi pi-calendar-plus',
    title: 'Rezerwacja sal',
    description: 'Łatwa rezerwacja dostępnych sal konferencyjnych',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    cardBgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
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
    bgColor: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    cardBgColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-300 dark:border-green-700',
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
    bgColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    cardBgColor: 'bg-purple-50 dark:bg-purple-950/20',
    borderColor: 'border-purple-300 dark:border-purple-700',
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
    bgColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
    cardBgColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-300 dark:border-orange-700',
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
    bgColor: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    cardBgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-300 dark:border-red-700',
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
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600',
    cardBgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
    borderColor: 'border-cyan-300 dark:border-cyan-700',
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
