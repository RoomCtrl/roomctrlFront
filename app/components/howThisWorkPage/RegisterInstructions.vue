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
          <div class="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
            {{ index + 1 }}
          </div>

          <!-- Card -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 h-full hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 dark:border-slate-700">
            <!-- Icon -->
            <div class="mb-4">
              <i :class="[step.icon, 'text-4xl text-purple-600']" />
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
            class="hidden md:block absolute top-full left-6 w-1 h-12 bg-gradient-to-b from-purple-400 to-transparent"
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
              Placeholder: Zrzut ekranu formularza rejestracji
            </p>
            <p class="text-sm text-gray-400 dark:text-gray-500">
              Obraz będzie tutaj
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Requirements -->
    <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg p-6">
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
      'Nie może zawierać Twojego adresu email',
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
