# Przewodnik Developera RoomCtrl

## Spis Treści

1. [Wprowadzenie](#wprowadzenie)
2. [Wymagania](#wymagania)
3. [Instalacja](#instalacja)
4. [Struktura Projektu](#struktura-projektu)
5. [Konwencje Kodowania](#konwencje-kodowania)
6. [Workflow Developmentu](#workflow-developmentu)
7. [Testowanie](#testowanie)
8. [Debugowanie](#debugowanie)
9. [Narzędzia i Pluginy](#narzędzia-i-pluginy)
10. [Najczęstsze Problemy](#najczęstsze-problemy)

## Wprowadzenie

RoomCtrl to aplikacja webowa do zarządzania rezerwacjami sal, zbudowana z wykorzystaniem Nuxt 3, Vue 3, TypeScript i PrimeVue.

## Wymagania

### Wymagane

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 lub **pnpm**: >= 8.0.0
- **Git**: >= 2.0

### Rekomendowane

- **VS Code**: Najnowsza wersja
- **Vue DevTools**: Extension dla przeglądarki
- **Nuxt DevTools**: Wbudowane w Nuxt 3

### Rozszerzenia VS Code (Rekomendowane)

- **Vue - Official** (Vue.volar)
- **TypeScript Vue Plugin** (Vue.vscode-typescript-vue-plugin)
- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier** (esbenp.prettier-vscode)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **GitLens** (eamodio.gitlens)
- **Error Lens** (usernamehw.errorlens)

## Instalacja

### 1. Klonowanie Repozytorium

```bash
git clone <repository-url>
cd roomctrlFront
```

### 2. Instalacja Zależności

```bash
npm install
# lub
pnpm install
```

### 3. Konfiguracja Środowiska

Aplikacja nie wymaga pliku `.env` - konfiguracja znajduje się w `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    apiBase: 'http://185.25.151.154/api/'
  }
}
```

Jeśli chcesz zmienić URL backendu, edytuj `nuxt.config.ts`.

### 4. Uruchomienie Deweloperskie

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

### 5. Weryfikacja Instalacji

Sprawdź czy:

- [ ] Aplikacja uruchamia się bez błędów
- [ ] Hot reload działa (zmień jakiś plik i zapisz)
- [ ] DevTools są dostępne (ikona w prawym dolnym rogu)

## Struktura Projektu

```
roomctrlFront/
├── app/                      # Główny kod aplikacji
│   ├── components/           # Komponenty Vue
│   ├── composables/          # Composables (logika reaktywna)
│   ├── interfaces/           # Typy TypeScript
│   ├── layouts/              # Layouty
│   ├── middleware/           # Middleware (guards)
│   ├── pages/                # Strony (routing)
│   ├── plugins/              # Pluginy Nuxt
│   ├── repositories/         # Warstwa API
│   ├── services/             # Logika biznesowa
│   ├── utils/                # Narzędzia pomocnicze
│   ├── app.vue               # Root component
│   └── error.vue             # Strona błędu
├── docs/                     # Dokumentacja
├── i18n/                     # Tłumaczenia
│   └── locales/
│       ├── en/               # Angielski
│       └── pl/               # Polski
├── public/                   # Pliki statyczne
├── server/                   # Kod serwerowy
├── theme/                    # Konfiguracja motywu
├── nuxt.config.ts            # Konfiguracja Nuxt
├── package.json              # Zależności
├── tsconfig.json             # Konfiguracja TypeScript
├── vitest.config.ts          # Konfiguracja testów
└── eslint.config.mjs         # Konfiguracja ESLint
```

## Konwencje Kodowania

### 1. Nazewnictwo

#### Pliki

- **Komponenty**: `PascalCase.vue` (np. `UserProfileCard.vue`)
- **Composables**: `camelCase.ts` z prefiksem `use` (np. `useAuth.ts`)
- **Utilities**: `camelCase.ts` (np. `dateHelpers.ts`)
- **Services**: `PascalCase.ts` z sufiksem `Service` (np. `AuthService.ts`)
- **Repositories**: `PascalCase.ts` z sufiksem `Repository` (np. `UserRepository.ts`)
- **Interfaces**: `PascalCase.ts` z sufiksem `Interfaces` (np. `UsersInterfaces.ts`)

#### Zmienne i Funkcje

```typescript
// ✅ Dobre
const userName = 'John'
const fetchUserData = async () => {}
const isAuthenticated = computed(() => true)

// ❌ Złe
const UserName = 'John'
const FetchUserData = async () => {}
const is_authenticated = computed(() => true)
```

#### Komponenty

```typescript
// ✅ Dobre - multi-word
<UserProfileCard />
<RoomBookingForm />

// ❌ Złe - single word
<User />
<Form />
```

### 2. TypeScript

#### Zawsze używaj typów

```typescript
// ✅ Dobre
const user: IUser = { ... };
const fetchData = async (): Promise<IData[]> => { ... };

// ❌ Złe
const user = { ... }; // implicit any
const fetchData = async () => { ... }; // brak typu zwracanego
```

#### Interface vs Type

```typescript
// ✅ Używaj interface dla obiektów
interface IUser {
  id: string
  name: string
}

// ✅ Używaj type dla union/intersection
type Status = 'active' | 'inactive' | 'pending'
type UserWithRole = IUser & { role: string }
```

#### Props w komponentach

```typescript
// ✅ Dobre
interface Props {
  userId: string
  userName: string
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: true
})

// ❌ Złe - brak typów
const props = defineProps(['userId', 'userName'])
```

### 3. Vue 3 Composition API

#### Script Setup

```vue
<!-- ✅ Używaj <script setup> -->
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
</script>

<!-- ❌ Unikaj Options API -->
<script>
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    double() {
      return this.count * 2
    }
  }
}
</script>
```

#### Reactive vs Ref

```typescript
// ✅ ref dla prostych wartości
const count = ref(0)
const name = ref('John')

// ✅ reactive dla obiektów
const user = reactive({
  name: 'John',
  age: 30
})

// ❌ Unikaj reactive dla prostych wartości
const count = reactive({ value: 0 }) // Niepotrzebnie skomplikowane
```

### 4. CSS i Style

#### Scoped Styles

```vue
<!-- ✅ Zawsze używaj scoped dla komponentów -->
<style scoped>
.user-card {
  padding: 1rem;
}
</style>

<!-- Tylko dla globalnych stylów -->
<style>
/* Global styles */
</style>
```

#### Tailwind CSS

```vue
<!-- ✅ Używaj Tailwind dla utility classes -->
<template>
  <div
    class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
  >
    <!-- content -->
  </div>
</template>
```

#### BEM dla niestandardowych klas

```css
/* ✅ Dobre - BEM notation */
.user-card {
}
.user-card__header {
}
.user-card__title {
}
.user-card--highlighted {
}
```

### 5. Komentarze i Dokumentacja

#### JSDoc dla funkcji publicznych

```typescript
/**
 * Pobiera dane użytkownika z API
 * @param userId - ID użytkownika
 * @returns Promise z danymi użytkownika
 * @throws Error jeśli użytkownik nie istnieje
 */
async function fetchUser(userId: string): Promise<IUser> {
  // ...
}
```

#### Komentarze TODO

```typescript
// TODO: Dodać walidację email
// FIXME: Poprawić wydajność tego algorytmu
// NOTE: Ta funkcja będzie usunięta w v2.0
```

### 6. Import Statements

#### Kolejność importów

```typescript
// 1. Node modules
import { ref, computed } from 'vue'

// 2. Nuxt auto-imports (jeśli nie auto-imported)
import { useNuxtApp } from '#app'

// 3. Composables
import { useAuth } from '~/composables/useAuth'

// 4. Services
import { UserService } from '~/services/UserService'

// 5. Interfaces
import type { IUser } from '~/interfaces/UsersInterfaces'

// 6. Komponenty
import UserCard from '~/components/UserCard.vue'

// 7. Utilities
import { formatDate } from '~/utils/dateHelpers'
```

#### Alias ścieżek

```typescript
// ✅ Używaj alias
import UserCard from '~/components/UserCard.vue'
import { useAuth } from '~/composables/useAuth'

// ❌ Unikaj relative paths
import UserCard from '../../components/UserCard.vue'
import { useAuth } from '../composables/useAuth'
```

## Workflow Developmentu

### 1. Tworzenie Nowego Feature

```bash
# 1. Utwórz branch z feature
git checkout -b feature/room-filters

# 2. Zaplanuj implementację
# - Jakie komponenty są potrzebne?
# - Jakie composables?
# - Jakie typy?

# 3. Implementuj od dołu do góry:
# a) Typy/Interfaces
# b) Repository (jeśli nowe API)
# c) Service (jeśli nowa logika)
# d) Composable
# e) Komponenty
# f) Strony

# 4. Testuj na bieżąco
npm run test

# 5. Lint i fix
npm run lint:fix

# 6. Commit
git add .
git commit -m "feat: add room filtering functionality"

# 7. Push
git push origin feature/room-filters
```

### 2. Tworzenie Komponentu

```vue
<!-- 1. Utwórz plik komponentu -->
<!-- app/components/rooms/RoomFilterPanel.vue -->

<script setup lang="ts">
// 2. Zdefiniuj interfejsy
interface Props {
  filters: IRoomFilters
}

interface Emits {
  (e: 'update:filters', filters: IRoomFilters): void
}

// 3. Props i emits
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 4. Logika komponentu
const localFilters = ref({ ...props.filters })

const applyFilters = () => {
  emit('update:filters', localFilters.value)
}
</script>

<template>
  <!-- 5. Template -->
  <div class="filter-panel">
    <!-- Filtry -->
  </div>
</template>

<style scoped>
/* 6. Style */
.filter-panel {
  /* ... */
}
</style>
```

### 3. Dodawanie Nowej Strony

```typescript
// 1. Utwórz plik w pages/
// pages/rooms/[id].vue

// 2. Zdefiniuj metadata
definePageMeta({
  middleware: ['auth'], // Jeśli wymaga autoryzacji
  layout: 'default'
})

// 3. Użyj composables
const route = useRoute()
const { room, fetchRoom } = useRoom()

// 4. Fetch danych
onMounted(async () => {
  await fetchRoom(route.params.id as string)
})
```

### 4. Dodawanie Tłumaczeń

```javascript
// 1. Angielski: i18n/locales/en/index.js
export default {
  rooms: {
    title: 'Rooms',
    filter: 'Filter',
    available: 'Available'
  }
}

// 2. Polski: i18n/locales/pl/index.js
export default {
  rooms: {
    title: 'Sale',
    filter: 'Filtruj',
    available: 'Dostępna'
  }
}

// 3. Użycie w komponencie
<template>
  <h1>{{ $t('rooms.title') }}</h1>
</template>
```

## Testowanie

### Uruchamianie Testów

```bash
# Wszystkie testy
npm run test

# Watch mode
npm run test -- --watch

# UI mode
npm run test:ui

# Coverage
npm run test:coverage
```

### Pisanie Testów

#### Test Composable

```typescript
// useAuth.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuth } from './useAuth'

describe('useAuth', () => {
  beforeEach(() => {
    // Reset state
  })

  it('should login successfully', async () => {
    const { login, isAuthenticated } = useAuth()
    await login({ username: 'test', password: 'pass' })
    expect(isAuthenticated.value).toBe(true)
  })
})
```

#### Test Komponentu

```typescript
// RoomCard.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RoomCard from './RoomCard.vue'

describe('RoomCard', () => {
  it('renders room name', () => {
    const wrapper = mount(RoomCard, {
      props: {
        room: { id: '1', name: 'Room A' }
      }
    })

    expect(wrapper.text()).toContain('Room A')
  })
})
```

#### Test Utility

```typescript
// dateHelpers.spec.ts
import { describe, it, expect } from 'vitest'
import { formatDate } from './dateHelpers'

describe('dateHelpers', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('15.01.2024')
  })
})
```

## Debugowanie

### 1. Vue DevTools

```typescript
// Przydatne dla debugowania:
// - Component tree
// - Component state
// - Events
// - Routes
```

### 2. Nuxt DevTools

Uruchamia się automatycznie w dev mode. Kliknij ikonę w prawym dolnym rogu.

**Funkcje:**

- Component inspector
- Page routes
- Composables state
- Modules
- Plugins
- Server routes

### 3. Console Debugging

```typescript
// ✅ Development
if (import.meta.dev) {
  console.log('Debug info:', data)
}

// ✅ Computed debugging
const user = computed(() => {
  console.log('User computed')
  return userData.value
})

// ❌ Nigdy nie commituj console.log do produkcji
console.log('This is bad') // Remove before commit
```

### 4. VS Code Debugger

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Client: Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### 5. Network Debugging

```typescript
// Sprawdzanie requestów
const { data, error, pending } = await useFetch('/api/rooms', {
  onRequest({ request, options }) {
    console.log('Request:', request)
  },
  onResponse({ response }) {
    console.log('Response:', response)
  },
  onRequestError({ error }) {
    console.error('Request error:', error)
  }
})
```

## Narzędzia i Pluginy

### ESLint

```bash
# Sprawdź błędy
npm run lint

# Automatyczna naprawa
npm run lint:fix
```

### Prettier

Konfiguracja w `package.json` lub `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### TypeScript

```bash
# Sprawdź typy
npx nuxi typecheck
```

### Analyze Bundle

```bash
npm run analyze
```

## Najczęstsze Problemy

### 1. "Module not found"

**Problem**: Import nie działa

```typescript
import { useAuth } from '~/composables/useAuth'
// Error: Module not found
```

**Rozwiązanie**:

- Sprawdź czy plik istnieje
- Użyj poprawnego aliasu (`~/` dla app/)
- Sprawdź czy eksport jest poprawny

### 2. "Hydration mismatch"

**Problem**: SSR/CSR mismatch

**Rozwiązanie**:

```vue
<template>
  <!-- Użyj ClientOnly dla zawartości tylko klient -->
  <ClientOnly>
    <div>{{ localStorage.getItem('data') }}</div>
  </ClientOnly>
</template>
```

### 3. "Cannot access before initialization"

**Problem**: Composable wywołany w złym miejscu

**Rozwiązanie**:

```typescript
// ❌ Źle - poza setup
const { user } = useAuth()

export default {
  setup() {
    // ✅ Dobrze - w setup
    const { user } = useAuth()
  }
}
```

### 4. Reactivity Lost

**Problem**: Reaktywność nie działa

```typescript
// ❌ Destructuring niszczy reaktywność
const { name, age } = user.value

// ✅ Użyj toRefs
const { name, age } = toRefs(user)

// lub
const userName = computed(() => user.value.name)
```

### 5. "fetch is not defined"

**Problem**: Próba użycia fetch poza kontekstem Nuxt

**Rozwiązanie**:

```typescript
// ✅ Użyj useFetch lub $fetch
const { data } = await useFetch('/api/data')

// lub w funkcjach
const fetchData = async () => {
  const data = await $fetch('/api/data')
}
```

## Przydatne Komendy

```bash
# Development
npm run dev              # Uruchom dev server
npm run build            # Build dla produkcji
npm run preview          # Preview production build
npm run generate         # Generuj static site

# Testing
npm run test             # Uruchom testy
npm run test:ui          # UI dla testów
npm run test:coverage    # Coverage raport

# Linting
npm run lint             # Sprawdź kod
npm run lint:fix         # Napraw automatycznie

# Analysis
npm run analyze          # Analiza bundle size

# Cleanup
rm -rf node_modules      # Usuń node_modules
rm -rf .nuxt             # Usuń cache Nuxt
npm install              # Reinstall dependencies
```

## Git Workflow

### Commit Messages

Używamy [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature
git commit -m "feat: add room filtering"

# Fix
git commit -m "fix: resolve booking date validation"

# Documentation
git commit -m "docs: update API documentation"

# Style
git commit -m "style: format code with prettier"

# Refactor
git commit -m "refactor: simplify user service logic"

# Test
git commit -m "test: add tests for useAuth composable"

# Chore
git commit -m "chore: update dependencies"
```

### Branch Naming

```bash
feature/room-filters     # Nowa funkcjonalność
fix/booking-validation   # Naprawa błędu
refactor/auth-service    # Refaktoryzacja
docs/api-documentation   # Dokumentacja
```

## Tips & Tricks

### 1. Auto-imports

Nuxt 3 automatycznie importuje:

- Komponenty z `components/`
- Composables z `composables/`
- Utilities z `utils/`
- Vue API (`ref`, `computed`, etc.)

```typescript
// ❌ Nie musisz importować
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

// ✅ Możesz użyć bezpośrednio
const count = ref(0)
const { user } = useAuth()
```

### 2. Type Imports

```typescript
// ✅ Używaj type imports dla typów
import type { IUser } from '~/interfaces/UsersInterfaces'

// Lepsze dla tree-shaking i bundle size
```

### 3. Lazy Loading

```typescript
// Lazy load komponentów
const HeavyComponent = defineAsyncComponent(
  () => import('~/components/HeavyComponent.vue')
)

// Lazy load w routing (automatyczne w Nuxt pages)
```

### 4. Environment Detection

```typescript
// Sprawdź środowisko
if (import.meta.client) {
  // Kod tylko dla klienta
  localStorage.setItem('key', 'value')
}

if (import.meta.server) {
  // Kod tylko dla serwera
}

if (import.meta.dev) {
  // Kod tylko w development
  console.log('Debug info')
}
```

## Dodatkowe Zasoby

### Dokumentacja

- [Nuxt 3 Docs](https://nuxt.com)
- [Vue 3 Docs](https://vuejs.org)
- [PrimeVue Docs](https://primevue.org)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Vitest Docs](https://vitest.dev)

### Narzędzia

- [Vue DevTools](https://devtools.vuejs.org)
- [Nuxt DevTools](https://devtools.nuxt.com)

### Community

- [Nuxt Discord](https://discord.com/invite/ps2h6QT)
- [Vue Discord](https://discord.com/invite/vue)

## Podsumowanie

Teraz jesteś gotowy do pracy z RoomCtrl Frontend! Pamiętaj:

1. ✅ Zawsze używaj TypeScript
2. ✅ Przestrzegaj konwencji nazewnictwa
3. ✅ Pisz testy dla nowego kodu
4. ✅ Używaj ESLint i Prettier
5. ✅ Commituj zgodnie z Conventional Commits
6. ✅ Dokumentuj skomplikowaną logikę
7. ✅ Pytaj zespół gdy masz wątpliwości

Happy coding! 🚀
