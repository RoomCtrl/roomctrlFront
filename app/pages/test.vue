<template>
  <section class="max-w-6xl mx-auto px-6 py-16 space-y-20">
    <!-- Hero -->
    <div class="text-center">
      <h1 class="text-5xl font-bold text-gray-800 mb-4">
        Kim jesteśmy?
      </h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        Nasza aplikacja to platforma, która łączy właścicieli przestrzeni z osobami ich potrzebującymi.
        Nie posiadamy własnych sal – ułatwiamy rezerwacje i zarządzanie miejscami w prosty, bezpieczny i szybki sposób.
      </p>
    </div>

    <!-- Misja i Wizja -->
    <div class="grid md:grid-cols-2 gap-8 text-center">
      <div class="p-6 bg-white shadow rounded-2xl">
        <h3 class="text-xl font-semibold mb-3">
          Nasza misja
        </h3>
        <p class="text-gray-600">
          Ułatwiamy dostęp do przestrzeni, aby każdy mógł znaleźć idealne miejsce na swoje wydarzenie
          bez zbędnych formalności.
        </p>
      </div>
      <div class="p-6 bg-white shadow rounded-2xl">
        <h3 class="text-xl font-semibold mb-3">
          Nasza wizja
        </h3>
        <p class="text-gray-600">
          Chcemy stworzyć społeczność, w której wolne sale znajdują swoje zastosowanie,
          a proces rezerwacji jest szybki i wygodny.
        </p>
      </div>
    </div>

    <!-- Jak to działa -->
    <div>
      <h2 class="text-3xl font-bold text-center mb-10">
        Jak to działa?
      </h2>
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div class="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow">
          <h3 class="text-xl font-semibold mb-2">
            1. Znajdź salę
          </h3>
          <p class="text-gray-600">
            Przeglądaj dostępne przestrzenie w dogodnej lokalizacji.
          </p>
        </div>
        <div class="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow">
          <h3 class="text-xl font-semibold mb-2">
            2. Zarezerwuj
          </h3>
          <p class="text-gray-600">
            Wybierz termin i dokonaj rezerwacji w kilka kliknięć.
          </p>
        </div>
        <div class="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow">
          <h3 class="text-xl font-semibold mb-2">
            3. Korzystaj
          </h3>
          <p class="text-gray-600">
            Spotkaj się, szkol się, twórz – bez zbędnych formalności.
          </p>
        </div>
      </div>
    </div>

    <!-- Strategia / Innowacje / Zespół -->
    <div>
      <h2 class="text-3xl font-bold text-center mb-10">
        Nasze filary
      </h2>
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div class="p-6 bg-white shadow rounded-2xl">
          <h3 class="text-xl font-semibold mb-3">
            Strategia
          </h3>
          <p class="text-gray-600">
            Łączymy ludzi i miejsca, zapewniając szybki dostęp do sal w różnych lokalizacjach.
          </p>
        </div>
        <div class="p-6 bg-white shadow rounded-2xl">
          <h3 class="text-xl font-semibold mb-3">
            Innowacyjne technologie
          </h3>
          <p class="text-gray-600">
            Wykorzystujemy nowoczesne rozwiązania dla prostego i bezpiecznego procesu rezerwacji.
          </p>
        </div>
        <div class="p-6 bg-white shadow rounded-2xl">
          <h3 class="text-xl font-semibold mb-3">
            Zespół i współpraca
          </h3>
          <p class="text-gray-600">
            Tworzymy społeczność, w której każdy może korzystać z dostępnych przestrzeni.
          </p>
        </div>
      </div>
    </div>

    <!-- Dlaczego warto -->
    <div>
      <h2 class="text-3xl font-bold text-center mb-10">
        Dlaczego warto nas wybrać?
      </h2>
      <ul class="max-w-3xl mx-auto space-y-3 text-lg text-gray-700 list-disc list-inside">
        <li>Brak ukrytych kosztów</li>
        <li>Szybka i prosta rezerwacja online</li>
        <li>Bezpieczne transakcje</li>
        <li>Elastyczność – wynajem na godziny lub dni</li>
        <li>Społeczność zaufanych partnerów</li>
      </ul>
    </div>

    <!-- Opinie -->
    <div class="bg-gray-50 p-10 rounded-2xl text-center">
      <h2 class="text-3xl font-bold mb-4">
        Co mówią nasi użytkownicy?
      </h2>
      <p class="text-gray-600 italic">
        „W końcu proste i szybkie narzędzie do rezerwacji sal – bez telefonów i komplikacji!”
      </p>
      <p class="text-gray-400 mt-2">
        (Sekcja opinii w przygotowaniu)
      </p>
    </div>

    <!-- Twórcy -->
    <div>
      <h2 class="text-3xl font-bold text-center mb-8">
        Nasz zespół
      </h2>
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <!-- <img
            src="/images/dev1.jpg"
            alt="Twórca 1"
            class="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
          /> -->
          <h3 class="text-lg font-semibold">
            Jan Kowalski
          </h3>
          <p class="text-gray-500 text-sm mb-2">
            Frontend Developer
          </p>
          <a
            href="https://github.com/jankowalski"
            target="_blank"
            class="text-blue-600 hover:underline"
          >GitHub</a>
        </div>
        <div>
          <!-- <img
            src="/images/dev2.jpg"
            alt="Twórca 2"
            class="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
          /> -->
          <h3 class="text-lg font-semibold">
            Anna Nowak
          </h3>
          <p class="text-gray-500 text-sm mb-2">
            Backend Developer
          </p>
          <a
            href="https://github.com/annanowak"
            target="_blank"
            class="text-blue-600 hover:underline"
          >GitHub</a>
        </div>
        <div>
          <!-- <img
            src="/images/dev3.jpg"
            alt="Twórca 3"
            class="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
          /> -->
          <h3 class="text-lg font-semibold">
            Piotr Wiśniewski
          </h3>
          <p class="text-gray-500 text-sm mb-2">
            DevOps & Cloud
          </p>
          <a
            href="https://github.com/piotrwisniewski"
            target="_blank"
            class="text-blue-600 hover:underline"
          >GitHub</a>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center mt-16">
      <h2 class="text-2xl font-bold mb-4">
        Chcesz dołączyć?
      </h2>
      <p class="text-gray-600 mb-6">
        Zarejestruj się i sprawdź, jak prosta może być rezerwacja sal!
      </p>
      <NuxtLink
        to="/register"
        class="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Zarejestruj się teraz
      </NuxtLink>
    </div>
  </section>
</template>
