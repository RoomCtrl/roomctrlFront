# Dokumentacja RoomCtrl Frontend

Witamy w dokumentacji aplikacji RoomCtrl Frontend - nowoczesnej platformy do zarządzania rezerwacjami sal.

## Spis treści

1. [Architektura Aplikacji](./ARCHITECTURE.md)
2. [Komponenty](./COMPONENTS.md)
3. [Composables](./COMPOSABLES.md)
4. [API i Serwisy](./API.md)
5. [Przewodnik Developera](./DEVELOPER_GUIDE.md)
6. [Deployment](./DEPLOYMENT.md)

## Przegląd Projektu

RoomCtrl to aplikacja webowa zbudowana na frameworku Nuxt 3 (Vue.js), która umożliwia:

- Rezerwację sal i zasobów
- Zarządzanie rezerwacjami
- Panel administracyjny
- System użytkowników z różnymi rolami
- Wielojęzyczność (PL/EN)
- Tryb ciemny/jasny

## Technologie

### Core

- **Nuxt 3** (v4.0.2) - Framework SSR/SSG dla Vue.js
- **Vue 3** (v3.5.17) - Progressive JavaScript Framework
- **TypeScript** - Typowany superset JavaScript

### UI Framework

- **PrimeVue** (v4.3.6) - Biblioteka komponentów UI
- **PrimeFlex** - System CSS Utility
- **TailwindCSS** - Framework CSS
- **PrimeIcons** - Zestaw ikon

### Walidacja i Formularze

- **VeeValidate** (v4.15.1) - Walidacja formularzy
- **Zod** - Schema validation

### Internacjonalizacja

- **@nuxtjs/i18n** (v10.1.2) - Wsparcie wielojęzyczności

### Wykresy i Wizualizacja

- **Chart.js** (v4.5.1) - Biblioteka wykresów
- **chartjs-plugin-datalabels** - Plugin dla etykiet danych

### Animacje

- **@hypernym/nuxt-anime** - Animacje anime.js dla Nuxt

### Testowanie

- **Vitest** (v3.2.4) - Framework testowy
- **@vue/test-utils** - Narzędzia do testowania Vue
- **@vitest/ui** - UI dla testów
- **@vitest/coverage-v8** - Pokrycie kodu testami
- **happy-dom** - DOM implementation

### Narzędzia deweloperskie

- **ESLint** - Linter dla JavaScript/TypeScript
- **Prettier** - Code formatter
- **@nuxt/eslint** - Konfiguracja ESLint dla Nuxt

## Struktura Projektu

```
roomctrlFront/
├── app/                    # Główny katalog aplikacji
│   ├── components/         # Komponenty Vue
│   ├── composables/        # Logika composables (hooks)
│   ├── interfaces/         # Definicje typów TypeScript
│   ├── layouts/           # Layouty aplikacji
│   ├── middleware/        # Middleware (auth, guards)
│   ├── pages/             # Strony aplikacji (routing)
│   ├── plugins/           # Pluginy Nuxt
│   ├── repositories/      # Warstwa dostępu do API
│   ├── services/          # Logika biznesowa
│   └── utils/             # Funkcje pomocnicze
├── docs/                  # Dokumentacja
├── i18n/                  # Pliki tłumaczeń
├── public/                # Pliki statyczne
├── server/                # Kod serwerowy Nuxt
└── theme/                 # Konfiguracja motywu PrimeVue
```

## Kluczowe Funkcjonalności

### 1. System Autoryzacji

- Logowanie i rejestracja użytkowników
- JWT token authentication
- Reset hasła
- Middleware ochrony tras

### 2. Zarządzanie Rezerwacjami

- Przeglądanie dostępnych sal
- Tworzenie rezerwacji
- Edycja i anulowanie rezerwacji
- Filtrowanie i wyszukiwanie

### 3. Panel Administracyjny

- Zarządzanie użytkownikami
- Zarządzanie salami
- Statystyki i raporty
- Zarządzanie organizacjami

### 4. Responsywność

- Dostosowanie do urządzeń mobilnych
- Progressive Web App (PWA)
- Tryb offline (częściowy)

## Wymagania Systemowe

- Node.js >= 18.0.0
- npm >= 9.0.0 lub pnpm >= 8.0.0

## Szybki Start

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu produkcyjnego
npm run preview

# Uruchomienie testów
npm run test

# Uruchomienie testów z UI
npm run test:ui

# Pokrycie kodu testami
npm run test:coverage

# Linting
npm run lint

# Automatyczna naprawa problemów z lintem
npm run lint:fix
```

## Środowisko i Konfiguracja

Aplikacja korzysta z następujących zmiennych środowiskowych (konfiguracja w `nuxt.config.ts`):

- `apiBase`: URL do API backendu (domyślnie: `http://185.25.151.154/api/`)

## Wsparcie i Kontakt

Aby uzyskać więcej informacji, zapoznaj się z pozostałymi dokumentami w katalogu `docs/`.

## Licencja

Projekt prywatny - wszystkie prawa zastrzeżone.
