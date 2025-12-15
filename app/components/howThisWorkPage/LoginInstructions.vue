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
          <div class="absolute -left-4 -top-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
            {{ index + 1 }}
          </div>

          <!-- Card -->
          <div class="bg-blue-50 dark:bg-blue-950/20 rounded-xl shadow-lg p-6 h-full hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-2 border-blue-300 dark:border-blue-700">
            <!-- Icon, Title and Description -->
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110">
                  <i :class="step.icon" />
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
        </div>
      </div>
    </div>

    <div class="absolute flex right-0">
      <div class="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 rounded-r-lg p-6">
        <div class="flex gap-4">
          <i class="pi pi-info-circle text-blue-600 text-2xl mt-1" />
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

    <!-- Screenshot -->
    <div class="flex justify-center pt-20">
      <div class="h-[40rem] aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
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
