<template>
  <div class="space-y-8 w-full">
    <!-- Steps -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
      <!-- Step Cards -->
      <div
        v-for="(step, index) in steps"
        :key="index"
        :style="{ '--delay': `${index * 100}ms` }"
        class="group cursor-pointer animate-step-in"
      >
        <div class="relative">
          <!-- Number Badge -->
          <div class="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
            {{ index + 1 }}
          </div>

          <!-- Card -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 h-full hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 dark:border-slate-700">
            <!-- Icon -->
            <div class="mb-4">
              <i :class="[step.icon, 'text-4xl text-blue-600']" />
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ step.title }}
            </h3>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ step.description }}
            </p>

            <!-- Details List -->
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

          <!-- Connector Line -->
          <div
            v-if="index < steps.length - 1"
            class="hidden md:block absolute top-full left-6 w-1 h-12 bg-gradient-to-b from-blue-400 to-transparent"
          />
        </div>
      </div>
    </div>

    <!-- Screenshot -->
    <div class="mt-12">
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700">
        <div class="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
          <div class="text-center">
            <i class="pi pi-image text-6xl text-gray-400 mb-4 block" />
            <p class="text-gray-500 dark:text-gray-400 font-semibold">
              Placeholder: Zrzut ekranu ekranu logowania
            </p>
            <p class="text-sm text-gray-400 dark:text-gray-500">
              Obraz będzie tutaj
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg p-6">
      <div class="flex gap-4">
        <i class="pi pi-info-circle text-blue-600 text-2xl flex-shrink-0 mt-1" />
        <div>
          <h4 class="font-bold text-blue-900 dark:text-blue-200 mb-2">
            Wskazówka bezpieczeństwa
          </h4>
          <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li>✓ Zawsze używaj bezpiecznego hasła (min. 8 znaków)</li>
            <li>✓ Nigdy nie udostępniaj swojego loginu innym osobom</li>
            <li>✓ Jeśli zapomnisz hasła, skontaktuj się z administratorem</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    icon: 'pi pi-sign-in',
    title: 'Przejdź do strony logowania',
    description: 'Otwórz aplikację RoomCtrl i kliknij przycisk "Loguj się" na stronie głównej.',
    details: [
      'Przycisk znajduje się w prawym górnym rogu',
      'Możesz również kliknąć "Zaloguj się" w menu nawigacyjnym',
    ],
  },
  {
    icon: 'pi pi-at',
    title: 'Wpisz swoje dane',
    description: 'Wprowadź swoją nazwę użytkownika lub adres email oraz hasło.',
    details: [
      'Email musi być prawidłowy',
      'Hasło jest wrażliwe na wielkość liter',
      'Nie zapisuj hasła w przeglądarce',
    ],
  },
  {
    icon: 'pi pi-lock',
    title: 'Weryfikacja bezpieczeństwa',
    description: 'System może prosić o dodatkową weryfikację dla bezpieczeństwa konta.',
    details: [
      'Kod wysyłany SMS lub email',
      'Wpisz kod w ciągu 5 minut',
      'Jeśli nie otrzymasz kodu, kliknij "Wyślij ponownie"',
    ],
  },
  {
    icon: 'pi pi-check-circle',
    title: 'Logowanie zakończone!',
    description: 'Zostałeś zalogowany i masz dostęp do pełnej aplikacji.',
    details: [
      'Będziesz mieć dostęp do rezerwacji sal',
      'Możesz przeglądać harmonogram',
      'Twój profil jest teraz aktywny',
    ],
  },
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
</style>
