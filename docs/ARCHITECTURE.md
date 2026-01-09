# Architektura Aplikacji RoomCtrl

## Przegląd Architektury

RoomCtrl Frontend został zbudowany w oparciu o architekturę warstwową z wyraźnym podziałem odpowiedzialności. Aplikacja opiera się na frameworku Nuxt 3, wykorzystując najnowsze standardy Vue 3 i Composition API.

## Wzorce Architektoniczne

### 1. Architektura Warstwowa

```
┌─────────────────────────────────────┐
│        Warstwa Prezentacji          │
│     (Components, Pages, Layouts)    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     Warstwa Logiki Biznesowej       │
│    (Composables, Services, Utils)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Warstwa Dostępu do Danych      │
│         (Repositories, API)         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Backend API (REST)          │
└─────────────────────────────────────┘
```

### 2. Repository Pattern

Repositories stanowią warstwę abstrakcji między logiką biznesową a komunikacją z API:

```typescript
// Przykład: app/repositories/RoomRepository.ts
export default {
  getRooms(params) {
    /* ... */
  },
  getRoomById(id) {
    /* ... */
  },
  createRoom(data) {
    /* ... */
  },
  updateRoom(id, data) {
    /* ... */
  },
  deleteRoom(id) {
    /* ... */
  }
}
```

**Zalety:**

- Centralizacja logiki API
- Łatwe mockowanie w testach
- Jednolity interfejs dostępu do danych
- Możliwość łatwej zmiany backendu

### 3. Service Layer Pattern

Services zawierają logikę biznesową i orkiestrują wywołania repositories:

```typescript
// Przykład: app/services/RoomService.ts
export default class RoomService {
  async getAvailableRooms(filters) {
    // Logika biznesowa, walidacja, transformacje
    return await RoomRepository.getRooms(filters)
  }
}
```

### 4. Composition API & Composables

Composables to reużywalne funkcje zawierające reaktywną logikę:

```typescript
// Przykład: app/composables/useRoom.ts
export const useRoom = () => {
  const rooms = ref([])
  const loading = ref(false)

  const fetchRooms = async () => {
    // Logika pobierania danych
  }

  return { rooms, loading, fetchRooms }
}
```

## Struktura Katalogów

### `/app` - Główny Katalog Aplikacji

#### `/app/components` - Komponenty Vue

Zorganizowane według funkcjonalności:

```
components/
├── common/              # Wspólne komponenty (Button, Input, Modal)
├── layoutParts/         # Części layoutu (Header, Footer, Sidebar)
├── booking/             # Komponenty rezerwacji
├── rooms/               # Komponenty sal
├── adminDashboard/      # Komponenty panelu admin
├── mainPage/            # Komponenty strony głównej
└── ...                  # Inne moduły funkcjonalne
```

**Konwencje:**

- Komponenty w PascalCase
- Jeden komponent na plik
- Grupowanie według funkcji biznesowych

#### `/app/composables` - Logika Composables

Reużywalna logika reaktywna:

```
composables/
├── useAuth.ts          # Autentykacja
├── useBooking.ts       # Rezerwacje
├── useRoom.ts          # Sale
├── useUser.ts          # Użytkownicy
├── useStatistics.ts    # Statystyki
└── ...
```

#### `/app/repositories` - Warstwa Dostępu do API

```
repositories/
├── AuthRepository.ts
├── BookingRepository.ts
├── RoomRepository.ts
├── UserRepository.ts
└── ...
```

**Odpowiedzialności:**

- Komunikacja HTTP z backendem
- Serializacja/deserializacja danych
- Obsługa błędów HTTP

#### `/app/services` - Logika Biznesowa

```
services/
├── AuthService.js
├── BookingService.ts
├── RoomService.ts
├── UserService.ts
└── ...
```

**Odpowiedzialności:**

- Walidacja danych biznesowych
- Transformacje danych
- Orkiestracja wywołań repositories
- Logika biznesowa specyficzna dla domeny

#### `/app/pages` - Routing i Strony

Nuxt wykorzystuje file-based routing:

```
pages/
├── index.vue              # / (strona główna)
├── login.vue              # /login
├── aboutUs.vue            # /aboutUs
├── adminDashboard/        # /adminDashboard/*
│   ├── index.vue          # /adminDashboard
│   ├── users.vue          # /adminDashboard/users
│   └── rooms.vue          # /adminDashboard/rooms
├── reservations/          # /reservations/*
└── rooms/                 # /rooms/*
```

#### `/app/layouts` - Layouty

```
layouts/
├── Default.vue           # Domyślny layout
└── AdminDashboard.vue    # Layout panelu admin
```

#### `/app/middleware` - Middleware

```
middleware/
├── auth.js              # Sprawdzanie autoryzacji
├── admin.js             # Sprawdzanie uprawnień admin
└── guest.js             # Przekierowanie zalogowanych
```

#### `/app/interfaces` - Typy TypeScript

```
interfaces/
├── BookingsInterfaces.ts
├── RoomsInterfaces.ts
├── UsersInterfaces.ts
├── OrganizationInterfaces.ts
└── ...
```

#### `/app/plugins` - Pluginy Nuxt

```
plugins/
├── auth-init.client.js    # Inicjalizacja auth (tylko klient)
├── primevue.client.js     # Konfiguracja PrimeVue
└── vee-validate.client.ts # Konfiguracja VeeValidate
```

#### `/app/utils` - Narzędzia Pomocnicze

```
utils/
├── dateHelpers.ts          # Funkcje daty
├── CustomFilterMatchModes.ts
└── contactSubjects.js
```

### `/i18n` - Internacjonalizacja

```
i18n/
└── locales/
    ├── en/              # Tłumaczenia angielskie
    │   └── index.js
    └── pl/              # Tłumaczenia polskie
        └── index.js
```

### `/public` - Zasoby Statyczne

```
public/
├── robots.txt
├── gifs/
├── images/
└── logos/
```

### `/theme` - Konfiguracja Motywu

```
theme/
└── primevue-preset.ts   # Preset PrimeVue
```

## Flow Danych

### 1. Pobieranie Danych (Read Flow)

```
┌──────────┐      ┌────────────┐      ┌────────────┐      ┌──────────┐
│Component │─────>│ Composable │─────>│  Service   │─────>│Repository│
└──────────┘      └────────────┘      └────────────┘      └──────────┘
                                                                 │
                                                                 ▼
                                                           ┌──────────┐
                                                           │   API    │
                                                           └──────────┘
```

Przykład:

```typescript
// 1. Komponent wywołuje composable
const { rooms, fetchRooms } = useRoom()
await fetchRooms()

// 2. Composable wywołuje service
const rooms = await RoomService.getAvailableRooms(filters)

// 3. Service wywołuje repository
return await RoomRepository.getRooms(filters)

// 4. Repository wykonuje request HTTP
const { data } = await $fetch('/api/rooms', { params: filters })
```

### 2. Zapisywanie Danych (Write Flow)

```
┌──────────┐      ┌────────────┐      ┌────────────┐      ┌──────────┐
│Component │─────>│ Composable │─────>│  Service   │─────>│Repository│
│          │<─────│  (validate)│<─────│ (validate) │<─────│          │
└──────────┘      └────────────┘      └────────────┘      └──────────┘
                                                                 │
                                                                 ▼
                                                           ┌──────────┐
                                                           │   API    │
                                                           └──────────┘
```

## State Management

### 1. Local State (Reactive)

Zarządzanie stanem lokalnym w komponentach za pomocą Composition API:

```typescript
const state = reactive({
  rooms: [],
  filters: {},
  loading: false
})
```

### 2. Composables (Shared State)

Stan współdzielony między komponentami:

```typescript
// useAuth.ts - singleton pattern
const user = ref(null)
const isAuthenticated = computed(() => !!user.value)

export const useAuth = () => {
  return { user, isAuthenticated }
}
```

### 3. Storage (Persistence)

- **LocalStorage**: Token JWT, preferencje użytkownika
- **SessionStorage**: Dane tymczasowe sesji
- **Cookies**: Ustawienia językowe, tryb kolorów

## Zarządzanie Routingiem

### File-based Routing

Nuxt automatycznie generuje routing na podstawie struktury `/pages`:

```typescript
// pages/rooms/[id].vue
// Generuje: /rooms/:id
```

### Middleware Guards

```typescript
// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
```

Użycie w stronie:

```typescript
definePageMeta({
  middleware: ['auth', 'admin']
})
```

## SSR vs CSR

### Server-Side Rendering (SSR)

- Strony publiczne (główna, about, contact)
- SEO-friendly
- Szybsze pierwsze załadowanie

### Client-Side Rendering (CSR)

- Panel użytkownika (wymaga auth)
- Panel administracyjny
- Dynamiczne dashboardy

Konfiguracja:

```typescript
// W komponencie
definePageMeta({
  ssr: false // Wyłącza SSR dla tej strony
})
```

## Bezpieczeństwo

### 1. Autentykacja

- JWT tokens przechowywane w localStorage
- Automatyczne odświeżanie tokenów
- Middleware sprawdzające autoryzację

### 2. Autoryzacja

- Role-based access control (RBAC)
- Middleware dla różnych poziomów dostępu
- Guards na poziomie routingu

### 3. Sanityzacja

- Walidacja formularzy (VeeValidate + Zod)
- XSS protection (Vue automatic escaping)
- CSRF protection

### 4. HTTPS

- Wymuszone połączenia SSL w produkcji
- Secure cookies

## Optymalizacja Wydajności

### 1. Code Splitting

- Automatyczny code splitting per route
- Lazy loading komponentów
- Dynamic imports

```typescript
const HeavyComponent = defineAsyncComponent(
  () => import('~/components/HeavyComponent.vue')
)
```

### 2. Image Optimization

- `@nuxt/image` dla optymalizacji obrazów
- Lazy loading obrazów
- Responsive images

### 3. Bundle Size

- Tree-shaking
- Minimalizacja CSS/JS
- Kompresja gzip/brotli

### 4. Caching

- Static assets caching
- API response caching
- Service worker (PWA)

## Testowanie

### 1. Unit Tests (Vitest)

```typescript
// useDataTable.spec.ts
import { describe, it, expect } from 'vitest'
import { useDataTable } from './useDataTable'

describe('useDataTable', () => {
  it('should filter data correctly', () => {
    // Test logic
  })
})
```

### 2. Component Tests

```typescript
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

it('renders properly', () => {
  const wrapper = mount(MyComponent)
  expect(wrapper.text()).toContain('Hello')
})
```

### 3. Coverage

- Cel: > 80% pokrycia kodu
- Monitorowanie przez Vitest coverage

## Deployment Architecture

```
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
┌──────▼───────┐
│ CDN/Nginx    │ (Static files)
└──────┬───────┘
       │
┌──────▼───────┐
│  Nuxt Server │ (SSR)
└──────┬───────┘
       │
┌──────▼───────┐
│  Backend API │
└──────────────┘
```

## Monitorowanie i Logging

### Development

- Vue DevTools
- Nuxt DevTools
- Console logging

### Production

- Error tracking (opcjonalnie: Sentry)
- Performance monitoring
- User analytics

## Dobre Praktyki

### 1. Komponenty

- Małe, reużywalne komponenty
- Props validation
- Emits declaration
- Proper TypeScript types

### 2. Composables

- Jeden composable = jedna odpowiedzialność
- Zwracanie reactive objects
- Proper cleanup (onUnmounted)

### 3. Services & Repositories

- Async/await dla wszystkich wywołań API
- Proper error handling
- Consistent naming conventions

### 4. TypeScript

- Strict mode enabled
- Explicit types dla publicznych API
- Unikanie `any`
- Wykorzystanie interfaces

### 5. Performance

- Lazy loading dla dużych komponentów
- Virtual scrolling dla długich list
- Debouncing dla search/filter
- Memoization gdzie potrzebne

## Diagram Zależności Modułów

```
┌─────────────────────────────────────────────┐
│                 Nuxt Core                   │
└──────────────────┬──────────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
┌───▼────┐  ┌──────▼───────┐  ┌──▼─────┐
│PrimeVue│  │  TailwindCSS │  │  i18n  │
└───┬────┘  └──────────────┘  └────────┘
    │
┌───▼──────────────────────────────────┐
│       Application Modules            │
│  ┌────────────────────────────────┐  │
│  │  Components ─> Composables     │  │
│  │       │             │           │  │
│  │       └─> Services ─┘           │  │
│  │               │                 │  │
│  │         Repositories            │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

## Wnioski

Architektura RoomCtrl Frontend została zaprojektowana z myślą o:

- **Skalowalności**: Łatwe dodawanie nowych funkcji
- **Maintainability**: Czytelny i uporządkowany kod
- **Testability**: Łatwe pisanie testów
- **Performance**: Optymalizacja wydajności
- **Developer Experience**: Przyjemna praca dla developerów

Wykorzystanie wzorców architektonicznych i best practices zapewnia solidne fundamenty dla dalszego rozwoju aplikacji.
