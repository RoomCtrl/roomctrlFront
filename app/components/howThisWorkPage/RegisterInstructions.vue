<template>
  <div class="space-y-8 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full auto-rows-fr">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :style="{ '--delay': `${index * 100}ms` }"
        class="group cursor-pointer animate-step-in"
      >
        <div class="relative">
          <div class="absolute -left-4 -top-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
            {{ index + 1 }}
          </div>

          <div class="bg-purple-50 dark:bg-purple-950/20 rounded-xl shadow-lg p-6 h-full hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-2 border-purple-300 dark:border-purple-700">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110">
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
      <div class="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 rounded-r-lg p-6">
        <div class="flex gap-4">
          <i class="pi pi-check-circle text-green-600 text-2xl flex-shrink-0 mt-1" />
          <div>
            <h4 class="font-bold text-green-900 dark:text-green-200 mb-3">
              Wymagania rejestracji
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2 text-sm text-green-800 dark:text-green-300">
                <p class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  <strong>Imię i nazwisko:</strong> Twoje pełne dane
                </p>
                <p class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  <strong>Email:</strong> Musi być prawidłowy
                </p>
                <p class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  <strong>Hasło:</strong> Min. 8 znaków, 1 wielka litera
                </p>
              </div>
              <div class="space-y-2 text-sm text-green-800 dark:text-green-300">
                <p class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  <strong>Rola:</strong> Pracownik lub administrator
                </p>
                <p class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  <strong>Kod zaproszenia:</strong> Od administratora
                </p>
                <p class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  <strong>Akceptacja:</strong> Regulaminu i polityki
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center pt-20">
      <div class="h-[40rem] aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
        <div class="text-center">
          <i class="pi pi-image text-6xl text-gray-400 mb-4 block" />
          <p class="text-gray-500 dark:text-gray-400 font-semibold">
            Placeholder: Zrzut ekranu formularza rejestracji
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
    icon: 'pi pi-user-plus',
    title: 'Przejdź do rejestracji',
    description: 'Kliknij link "Zarejestruj się" na stronie logowania lub na stronie głównej.',
    details: [
      'Link znajduje się pod formularzem logowania',
      'Możesz też znaleźć go w stopce strony',
      'Rejestracja jest bezpłatna',
    ],
  },
  {
    icon: 'pi pi-pencil',
    title: 'Wypełnij formularz',
    description: 'Wprowadź swoje dane osobowe oraz informacje kontaktowe.',
    details: [
      'Imię i nazwisko powinny być prawdziwe',
      'Email musi być aktywny i unikalny',
      'Numer telefonu jest opcjonalny',
    ],
  },
  {
    icon: 'pi pi-key',
    title: 'Ustaw hasło',
    description: 'Utwórz silne hasło dla bezpieczeństwa swojego konta.',
    details: [
      'Minimum 8 znaków',
      'Co najmniej jedna wielka litera',
      'Przynajmniej jedna cyfra',
    ],
  },
  {
    icon: 'pi pi-envelope',
    title: 'Potwierdź email',
    description: 'Otrzymasz email z linkiem potwierdzającym. Kliknij go, aby aktywować konto.',
    details: [
      'Sprawdź folder spam jeśli nie widzisz emaila',
      'Link wygasa po 24 godzinach',
      'Po potwierdzeniu możesz się zalogować',
    ],
  },
  {
    icon: 'pi pi-info-circle',
    title: 'Czekaj na akceptację',
    description: 'Administrator musi zatwierdzić Twoją rejestrację zanim uzyskasz pełny dostęp.',
    details: [
      'Powiadomienie przez email',
      'Zazwyczaj do 24 godzin',
      'Możesz znaleźć status w profilu',
    ],
  },
  {
    icon: 'pi pi-check-circle',
    title: 'Gotowe!',
    description: 'Twoje konto jest aktywne. Możesz teraz w pełni korzystać z aplikacji.',
    details: [
      'Przejdź do logowania z nowych danych',
      'Uzupełnij swój profil',
      'Zarezerwuj swoją pierwszą salę!',
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
