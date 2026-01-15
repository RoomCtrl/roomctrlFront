# RoomCtrl Frontend 🏢

Nowoczesna aplikacja webowa do zarządzania rezerwacjami sal, zbudowana z wykorzystaniem Nuxt 3, Vue 3, TypeScript i PrimeVue.

![Nuxt](https://img.shields.io/badge/Nuxt-4.0.2-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3.5.17-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)
![PrimeVue](https://img.shields.io/badge/PrimeVue-4.3.6-41B883?style=flat)

## Dokumentacja

- **[Architektura](./docs/ARCHITECTURE.md)** - Szczegółowa architektura aplikacji
- **[Komponenty](./docs/COMPONENTS.md)** - Dokumentacja komponentów Vue
- **[Composables](./docs/COMPOSABLES.md)** - Reużywalna logika reaktywna
- **[API i Serwisy](./docs/API.md)** - Repositories i Services
- **[Przewodnik Developera](./docs/DEVELOPER_GUIDE.md)** - Jak zacząć pracę z projektem
- **[Deployment](./docs/DEPLOYMENT.md)** - Instrukcje wdrożenia

## Funkcjonalności

- **System Autoryzacji** - JWT authentication, role-based access control
- **Zarządzanie Rezerwacjami** - Tworzenie, edycja, anulowanie rezerwacji
- **Panel Administracyjny** - Zarządzanie użytkownikami, salami, organizacjami
- **Statystyki i Raporty** - Wykresy wykorzystania sal
- **Wielojęzyczność** - Wsparcie dla PL/EN (i18n)
- **Tryb Ciemny** - Light/Dark mode
- **Responsywność** - Pełna obsługa urządzeń mobilnych
- **Accessibility** - ARIA labels, keyboard navigation

## Szybki Start

### Wymagania

- Node.js >= 18.0.0
- npm >= 9.0.0 (lub pnpm >= 8.0.0)

### Instalacja

```bash
# Klonowanie repozytorium
git clone <repository-url>
cd roomctrlFront

# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## Dostępne Komendy

```bash
# Development
npm run dev              # Uruchom serwer deweloperski
npm run build            # Build dla produkcji
npm run preview          # Podgląd production build
npm run generate         # Generuj statyczną stronę (SSG)

# Testing
npm run test             # Uruchom testy (Vitest)
npm run test:ui          # Uruchom testy z interfejsem UI
npm run test:coverage    # Raport pokrycia kodu testami

# Code Quality
npm run lint             # Sprawdź kod (ESLint)
npm run lint:fix         # Automatyczna naprawa problemów

# Analysis
npm run analyze          # Analiza rozmiaru bundle
```

## Struktura Projektu

```
roomctrlFront/
├── app/                    # Główny kod aplikacji
│   ├── components/         # Komponenty Vue
│   ├── composables/        # Composables (logika reaktywna)
│   ├── interfaces/         # Typy TypeScript
│   ├── layouts/            # Layouty aplikacji
│   ├── middleware/         # Middleware (auth, guards)
│   ├── pages/              # Strony (routing)
│   ├── plugins/            # Pluginy Nuxt
│   ├── repositories/       # Warstwa dostępu do API
│   ├── services/           # Logika biznesowa
│   └── utils/              # Funkcje pomocnicze
├── docs/                   # Dokumentacja projektu
├── i18n/                   # Pliki tłumaczeń (PL/EN)
├── public/                 # Pliki statyczne
├── theme/                  # Konfiguracja motywu PrimeVue
├── nuxt.config.ts          # Konfiguracja Nuxt
└── package.json            # Zależności projektu
```

## Stack Technologiczny

### Core

- **Nuxt 3** (v4.0.2) - Framework SSR/SSG
- **Vue 3** (v3.5.17) - Composition API
- **TypeScript** - Type safety

### UI & Styling

- **PrimeVue** (v4.3.6) - Komponenty UI
- **TailwindCSS** - Utility-first CSS
- **PrimeIcons** - Zestaw ikon

### Forms & Validation

- **VeeValidate** (v4.15.1) - Walidacja formularzy
- **Zod** - Schema validation

### Charts & Visualization

- **Chart.js** (v4.5.1) - Wykresy i statystyki

### Internationalization

- **@nuxtjs/i18n** (v10.1.2) - Wielojęzyczność

### Testing

- **Vitest** (v3.2.4) - Unit & Integration tests
- **@vue/test-utils** - Vue testing utilities
- **Happy DOM** - DOM implementation

### Dev Tools

- **ESLint** - Linting
- **Prettier** - Code formatting
- **Nuxt DevTools** - Developer experience

## Konfiguracja

Konfiguracja aplikacji znajduje się w `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://185.25.151.154/api/'
    }
  }
})
```

## Testowanie

```bash
# Uruchom wszystkie testy
npm run test

# Testy w trybie watch
npm run test -- --watch

# Testy z interfejsem UI
npm run test:ui

# Raport pokrycia kodu
npm run test:coverage
```

## Deployment

### Docker (Rekomendowane)

```bash
# Build image
docker build -f Dockerfile.prod -t roomctrl-front .

# Uruchom container
docker run -d -p 3000:3000 roomctrl-front
```

### Manual Deployment

```bash
# Build aplikacji
npm run build

# Uruchom w produkcji
node .output/server/index.mjs
```

Szczegółowe instrukcje: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## Przewodnik Developera

Jeśli zaczynasz pracę z projektem, zapoznaj się z [Przewodnikiem Developera](./docs/DEVELOPER_GUIDE.md), który zawiera:

- Konwencje kodowania
- Workflow developmentu
- Best practices
- Najczęstsze problemy
- Tips & tricks

## Contributing

1. Utwórz branch dla swojego feature: `git checkout -b feature/amazing-feature`
2. Commituj zmiany: `git commit -m 'feat: add amazing feature'`
3. Push do brancha: `git push origin feature/amazing-feature`
4. Otwórz Pull Request

### Commit Convention

Używamy [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - nowa funkcjonalność
- `fix:` - naprawa błędu
- `docs:` - dokumentacja
- `style:` - formatowanie kodu
- `refactor:` - refaktoryzacja
- `test:` - testy
- `chore:` - maintenance

## Licencja

Projekt prywatny - wszystkie prawa zastrzeżone.

## Przydatne Linki

- [Nuxt 3 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [PrimeVue Documentation](https://primevue.org)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vitest Documentation](https://vitest.dev)

---
