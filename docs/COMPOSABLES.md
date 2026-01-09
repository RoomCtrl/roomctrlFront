# Composables RoomCtrl

## Przegląd

Composables w RoomCtrl to reużywalne funkcje zawierające reaktywną logikę aplikacji. Wykorzystują Vue 3 Composition API i pattern "use\*" (podobnie jak React Hooks).

## Lista Composables

```
composables/
├── useAuth.ts              # Autentykacja i autoryzacja
├── useBooking.ts           # Zarządzanie rezerwacjami
├── useRoom.ts              # Zarządzanie salami
├── useUser.ts              # Zarządzanie użytkownikami
├── useStatistics.ts        # Statystyki i raporty
├── useIssue.ts             # Zgłoszenia problemów
├── useMailer.ts            # Wysyłanie emaili
├── useDataTable.ts         # Logika tabel danych (DataTable)
└── useCustomFilterMatch.ts # Niestandardowe filtry
```

## `useAuth.ts` - Autentykacja

### Odpowiedzialności

- Zarządzanie stanem autoryzacji
- Login/Logout
- Walidacja i odświeżanie tokena
- Monitorowanie sesji
- Zarządzanie rolami użytkownika

### API

```typescript
interface ILoginCredentials {
  username: string;
  password: string;
}

interface UseAuthReturn {
  // State
  user: Ref<IAuthUser | null>;
  token: Ref<string | null>;
  loading: Ref<boolean>;
  roles: Ref<string[]>;

  // Computed
  isAuthenticated: ComputedRef<boolean>;
  isAdmin: ComputedRef<boolean>;
  isUser: ComputedRef<boolean>;

  // Methods
  login: (credentials: ILoginCredentials) => Promise<IUserLoginResponse>;
  logout: (redirectTo?: string) => Promise<void>;
  validateToken: () => Promise<ITokenValidationResponse>;
  refreshToken: () => Promise<IRefreshTokenResponse>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  startSessionMonitoring: () => void;
  stopSessionMonitoring: () => void;
}

export const useAuth = (): UseAuthReturn
```

### Przykład użycia

```vue
<script setup lang="ts">
const { user, isAuthenticated, isAdmin, login, logout } = useAuth()

const handleLogin = async (credentials) => {
  try {
    await login(credentials)
    navigateTo('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div v-if="isAuthenticated">
    <p>Welcome, {{ user?.name }}</p>
    <button @click="logout()">Logout</button>

    <div v-if="isAdmin">
      <NuxtLink to="/admin">Admin Panel</NuxtLink>
    </div>
  </div>
</template>
```

### Kluczowe Funkcje

#### `login(credentials)`

Loguje użytkownika i zapisuje token.

```typescript
const login = async (
  credentials: ILoginCredentials
): Promise<IUserLoginResponse> => {
  loading.value = true
  try {
    const result = await authService.login(credentials)
    user.value = result.user
    token.value = result.token
    roles.value = result.user.roles || []

    if (import.meta.client) {
      startSessionMonitoring()
    }

    return result
  } finally {
    loading.value = false
  }
}
```

#### `logout(redirectTo?)`

Wylogowuje użytkownika i czyści sesję.

```typescript
const logout = async (redirectTo?: string): Promise<void> => {
  loading.value = true
  try {
    stopSessionMonitoring()
    user.value = null
    token.value = null
    roles.value = []

    if (import.meta.client) {
      localStorage.removeItem('auth-token')
    }

    if (redirectTo) {
      await navigateTo(redirectTo)
    }
  } finally {
    loading.value = false
  }
}
```

#### `validateToken()`

Sprawdza ważność tokena JWT.

#### `startSessionMonitoring()`

Uruchamia automatyczne odświeżanie tokena przed wygaśnięciem.

```typescript
const startSessionMonitoring = () => {
  if (sessionMonitoringInterval.value) return

  sessionMonitoringInterval.value = setInterval(
    async () => {
      try {
        await refreshToken()
      } catch (error) {
        await logout('/login')
      }
    },
    15 * 60 * 1000
  ) // Co 15 minut
}
```

---

## `useBooking.ts` - Rezerwacje

### Odpowiedzialności

- Pobieranie listy rezerwacji
- Tworzenie nowych rezerwacji
- Edycja rezerwacji
- Anulowanie rezerwacji
- Pobieranie statystyk rezerwacji
- Rezerwacje cykliczne

### API

```typescript
interface UseBookingReturn {
  // State
  bookings: Ref<IBooking[]>;
  booking: Ref<IBooking | null>;
  bookingStats: Ref<IBookingStats | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;

  // Methods
  fetchBookings: (myBookings: boolean) => Promise<void>;
  fetchBooking: (bookingId: string) => Promise<void>;
  createBooking: (data: IBookingCreateRequest) => Promise<IBooking>;
  updateBooking: (bookingId: string, data: IBookingUpdateRequest) => Promise<IBooking>;
  deleteBooking: (bookingId: string) => Promise<void>;
  createRecurringBooking: (data: IBookingRecurringRequest) => Promise<IBooking[]>;
  fetchBookingStats: () => Promise<void>;
}

export const useBooking = (): UseBookingReturn
```

### Przykład użycia

```vue
<script setup lang="ts">
const {
  bookings,
  loading,
  error,
  fetchBookings,
  createBooking,
  deleteBooking
} = useBooking()

onMounted(async () => {
  await fetchBookings(true) // Pobierz moje rezerwacje
})

const handleCreateBooking = async (formData) => {
  try {
    await createBooking(formData)
    await fetchBookings(true) // Odśwież listę
  } catch (err) {
    console.error('Failed to create booking:', err)
  }
}

const handleCancelBooking = async (bookingId: string) => {
  if (confirm('Czy na pewno chcesz anulować rezerwację?')) {
    await deleteBooking(bookingId)
    await fetchBookings(true)
  }
}
</script>

<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />

    <BookingList v-else :bookings="bookings" @cancel="handleCancelBooking" />
  </div>
</template>
```

### Kluczowe Funkcje

#### `fetchBookings(myBookings)`

Pobiera listę rezerwacji.

```typescript
const fetchBookings = async (myBookings: boolean) => {
  loading.value = true
  error.value = null
  try {
    bookings.value = await getBookingService().getBookings(myBookings)
  } catch (err) {
    error.value = formatError(err)
    throw err
  } finally {
    loading.value = false
  }
}
```

#### `createBooking(data)`

Tworzy nową rezerwację.

```typescript
const createBooking = async (
  data: IBookingCreateRequest
): Promise<IBooking> => {
  loading.value = true
  error.value = null
  try {
    const newBooking = await getBookingService().createBooking(data)
    bookings.value.push(newBooking)
    return newBooking
  } catch (err) {
    error.value = formatError(err)
    throw err
  } finally {
    loading.value = false
  }
}
```

#### `createRecurringBooking(data)`

Tworzy rezerwacje cykliczne (powtarzające się).

---

## `useRoom.ts` - Sale

### Odpowiedzialności

- Pobieranie listy sal
- Szczegóły sali
- Zarządzanie salami (CRUD)
- Ulubione sale
- Dostępność sal
- QR kody sal

### API

```typescript
interface UseRoomReturn {
  // State
  rooms: Ref<IRoomCard[]>;
  room: Ref<IRoomDetails | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  favoriteRoomIds: Ref<Set<string>>;

  // Methods
  fetchRooms: (withBookings?: boolean, status?: 'available' | 'out_of_use') => Promise<void>;
  fetchRoom: (roomId: string) => Promise<void>;
  createRoom: (data: IRoomCreateRequest) => Promise<IRoomDetails>;
  updateRoom: (roomId: string, data: Partial<IRoomCreateRequest>) => Promise<IRoomDetails>;
  deleteRoom: (roomId: string) => Promise<void>;
  toggleFavorite: (roomId: string) => Promise<void>;
  loadFavorites: () => Promise<void>;
  generateQRCode: (roomId: string) => Promise<Blob>;
}

export const useRoom = (): UseRoomReturn
```

### Przykład użycia

```vue
<script setup lang="ts">
const { rooms, loading, fetchRooms, toggleFavorite } = useRoom()

const filters = reactive({
  status: 'available',
  withBookings: false
})

onMounted(async () => {
  await fetchRooms(filters.withBookings, filters.status)
})

watch(filters, async () => {
  await fetchRooms(filters.withBookings, filters.status)
})

const handleToggleFavorite = async (roomId: string) => {
  await toggleFavorite(roomId)
  // Stan rooms zostanie automatycznie zaktualizowany
}
</script>

<template>
  <RoomList
    :rooms="rooms"
    :loading="loading"
    @toggle-favorite="handleToggleFavorite"
  />
</template>
```

### Kluczowe Funkcje

#### `fetchRooms(withBookings, status)`

Pobiera listę sal z opcjonalnymi filtrami.

```typescript
const fetchRooms = async (
  withBookings: boolean = false,
  status?: 'available' | 'out_of_use'
) => {
  loading.value = true
  error.value = null
  try {
    const fetchedRooms = await getRoomService().getRooms(withBookings, status)
    rooms.value = fetchedRooms.map((r) => ({
      ...r,
      isFavorite: favoriteRoomIds.value.has(r.roomId)
    }))
  } catch (err) {
    error.value = formatError(err)
    throw err
  } finally {
    loading.value = false
  }
}
```

#### `toggleFavorite(roomId)`

Dodaje/usuwa salę z ulubionych.

```typescript
const toggleFavorite = async (roomId: string) => {
  try {
    const isFavorite = favoriteRoomIds.value.has(roomId)

    if (isFavorite) {
      await getRoomService().removeFavorite(roomId)
      favoriteRoomIds.value.delete(roomId)
    } else {
      await getRoomService().addFavorite(roomId)
      favoriteRoomIds.value.add(roomId)
    }

    // Aktualizuj stan room
    const roomIndex = rooms.value.findIndex((r) => r.roomId === roomId)
    if (roomIndex !== -1) {
      rooms.value[roomIndex].isFavorite = !isFavorite
    }
  } catch (err) {
    error.value = formatError(err)
    throw err
  }
}
```

---

## `useUser.ts` - Użytkownicy

### Odpowiedzialności

- Zarządzanie użytkownikami (CRUD)
- Profile użytkowników
- Zmiana hasła
- Role i uprawnienia

### API

```typescript
interface UseUserReturn {
  // State
  users: Ref<IUser[]>;
  user: Ref<IUser | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;

  // Methods
  fetchUsers: () => Promise<void>;
  fetchUser: (userId: string) => Promise<void>;
  createUser: (data: IUserCreateRequest) => Promise<IUser>;
  updateUser: (userId: string, data: IUserUpdateRequest) => Promise<IUser>;
  deleteUser: (userId: string) => Promise<void>;
  changePassword: (userId: string, newPassword: string) => Promise<void>;
  updateUserRoles: (userId: string, roles: string[]) => Promise<void>;
}

export const useUser = (): UseUserReturn
```

---

## `useStatistics.ts` - Statystyki

### Odpowiedzialności

- Pobieranie statystyk aplikacji
- Wykresy i raporty
- Analiza wykorzystania

### API

```typescript
interface UseStatisticsReturn {
  // State
  statistics: Ref<IStatistics | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;

  // Methods
  fetchStatistics: (dateFrom?: Date, dateTo?: Date) => Promise<void>;
  fetchRoomStatistics: (roomId: string) => Promise<IRoomStatistics>;
  fetchUserStatistics: (userId: string) => Promise<IUserStatistics>;
}

export const useStatistics = (): UseStatisticsReturn
```

### Przykład użycia

```vue
<script setup lang="ts">
const { statistics, loading, fetchStatistics } = useStatistics()

const dateRange = reactive({
  from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  to: new Date()
})

onMounted(async () => {
  await fetchStatistics(dateRange.from, dateRange.to)
})

watch(dateRange, async () => {
  await fetchStatistics(dateRange.from, dateRange.to)
})
</script>

<template>
  <div>
    <StatisticsCharts v-if="statistics" :data="statistics" />
  </div>
</template>
```

---

## `useDataTable.ts` - Tabele Danych

### Odpowiedzialności

- Sortowanie danych
- Filtrowanie danych
- Paginacja
- Selekcja wierszy
- Export danych

### API

```typescript
interface UseDataTableReturn {
  // State
  selectedRows: Ref<any[]>;
  filters: Ref<Record<string, any>>;
  sortField: Ref<string | null>;
  sortOrder: Ref<1 | -1>;
  page: Ref<number>;
  rowsPerPage: Ref<number>;

  // Methods
  onSort: (event: SortEvent) => void;
  onFilter: (event: FilterEvent) => void;
  onPageChange: (event: PageEvent) => void;
  exportCSV: (data: any[], filename: string) => void;
  exportPDF: (data: any[], filename: string) => void;
  clearFilters: () => void;
  clearSelection: () => void;
}

export const useDataTable = (): UseDataTableReturn
```

### Przykład użycia

```vue
<script setup lang="ts">
const { users, fetchUsers } = useUser()
const {
  selectedRows,
  filters,
  sortField,
  sortOrder,
  onSort,
  onFilter,
  exportCSV
} = useDataTable()

onMounted(() => fetchUsers())

const handleExport = () => {
  exportCSV(users.value, 'users.csv')
}
</script>

<template>
  <DataTable
    v-model:selection="selectedRows"
    :value="users"
    :filters="filters"
    :sort-field="sortField"
    :sort-order="sortOrder"
    @sort="onSort"
    @filter="onFilter"
  >
    <!-- Kolumny -->
  </DataTable>

  <Button @click="handleExport">Export CSV</Button>
</template>
```

---

## `useIssue.ts` - Zgłoszenia

### Odpowiedzialności

- Zgłaszanie problemów
- Zarządzanie zgłoszeniami
- Status zgłoszeń

### API

```typescript
interface UseIssueReturn {
  // State
  issues: Ref<IIssue[]>;
  issue: Ref<IIssue | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;

  // Methods
  fetchIssues: () => Promise<void>;
  createIssue: (data: IIssueCreateRequest) => Promise<IIssue>;
  updateIssueStatus: (issueId: string, status: string) => Promise<void>;
  deleteIssue: (issueId: string) => Promise<void>;
}

export const useIssue = (): UseIssueReturn
```

---

## `useMailer.ts` - Wysyłanie Emaili

### Odpowiedzialności

- Wysyłanie emaili
- Walidacja adresów email
- Obsługa błędów wysyłki

### API

```typescript
interface UseMailerReturn {
  // State
  sending: Ref<boolean>;
  error: Ref<string | null>;

  // Methods
  sendEmail: (data: IEmailData) => Promise<void>;
  sendContactForm: (data: IContactFormData) => Promise<void>;
}

export const useMailer = (): UseMailerReturn
```

---

## `useCustomFilterMatch.ts` - Niestandardowe Filtry

### Odpowiedzialności

- Niestandardowe funkcje filtrowania dla PrimeVue DataTable
- Filtrowanie po datach
- Filtrowanie po zakresach
- Filtrowanie po obiektach zagnieżdżonych

### API

```typescript
interface UseCustomFilterMatchReturn {
  dateRangeFilter: (value: Date, filter: [Date, Date]) => boolean;
  multiSelectFilter: (value: any[], filter: any[]) => boolean;
  nestedPropertyFilter: (value: any, filter: string, path: string) => boolean;
}

export const useCustomFilterMatch = (): UseCustomFilterMatchReturn
```

---

## Best Practices

### 1. Używanie `useState` dla Shared State

```typescript
// ✅ Dobre - shared state między komponentami
const user = useState<IUser | null>('auth.user', () => null)

// ❌ Złe - każde wywołanie tworzy nową instancję
const user = ref<IUser | null>(null)
```

### 2. Namespace dla State Keys

```typescript
// ✅ Dobre - namespace zapobiega kolizjom
const user = useState<IUser | null>('auth.user', () => null)
const token = useState<string | null>('auth.token', () => null)

// ❌ Złe - brak namespace
const user = useState<IUser | null>('user', () => null)
```

### 3. Error Handling

```typescript
// ✅ Dobre - formatowanie błędów
const formatError = (err: any): string => {
  if (err.data?.violations) {
    return err.data.violations
      .map((v: any) => `${v.field}: ${v.message}`)
      .join(', ')
  }
  return err.message || 'Unknown error'
}

try {
  await someAsyncOperation()
} catch (err) {
  error.value = formatError(err)
  throw err
}
```

### 4. Loading States

```typescript
// ✅ Dobre - loading state w try/finally
const fetchData = async () => {
  loading.value = true
  try {
    data.value = await api.getData()
  } finally {
    loading.value = false // Zawsze wykonane
  }
}
```

### 5. Computed Properties dla Derived State

```typescript
// ✅ Dobre - computed dla pochodnych wartości
const isAuthenticated = computed(() => !!user.value && !!token.value)

// ❌ Złe - funkcja zwracająca wartość
const isAuthenticated = () => !!user.value && !!token.value
```

### 6. Cleanup w onUnmounted

```typescript
const usePolling = () => {
  const intervalId = ref<number | null>(null)

  const startPolling = () => {
    intervalId.value = setInterval(() => {
      // Polling logic
    }, 5000)
  }

  const stopPolling = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }

  onUnmounted(() => {
    stopPolling() // ✅ Cleanup
  })

  return { startPolling, stopPolling }
}
```

### 7. Separation of Concerns

```typescript
// ✅ Dobre - composable skupiony na jednej odpowiedzialności
export const useAuth = () => {
  // Tylko logika autoryzacji
}

export const useUser = () => {
  // Tylko logika użytkowników
}

// ❌ Złe - zbyt dużo odpowiedzialności
export const useApp = () => {
  // Auth, users, rooms, bookings... wszystko w jednym
}
```

## Testowanie Composables

### Example Test

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuth } from './useAuth'

describe('useAuth', () => {
  beforeEach(() => {
    // Reset state przed każdym testem
    const { logout } = useAuth()
    logout()
  })

  it('should login user successfully', async () => {
    const { login, user, isAuthenticated } = useAuth()

    const credentials = {
      username: 'test@example.com',
      password: 'password123'
    }

    await login(credentials)

    expect(user.value).not.toBeNull()
    expect(isAuthenticated.value).toBe(true)
  })

  it('should handle login failure', async () => {
    const { login, error } = useAuth()

    const credentials = {
      username: 'invalid@example.com',
      password: 'wrong'
    }

    await expect(login(credentials)).rejects.toThrow()
    expect(error.value).not.toBeNull()
  })
})
```

## Wzorce Kompozycji

### 1. Kompozycja Composables

```typescript
// useBookingWithAuth.ts
export const useBookingWithAuth = () => {
  const { token, isAuthenticated } = useAuth()
  const booking = useBooking()

  const createAuthenticatedBooking = async (data) => {
    if (!isAuthenticated.value) {
      throw new Error('Not authenticated')
    }
    return booking.createBooking(data)
  }

  return {
    ...booking,
    createAuthenticatedBooking
  }
}
```

### 2. Dependency Injection

```typescript
export const useBooking = (authToken?: Ref<string | null>) => {
  const { token: defaultToken } = useAuth()
  const token = authToken || defaultToken

  // Użyj przekazanego lub domyślnego tokena
}
```

## Wnioski

Composables w RoomCtrl:

- **Reużywalne**: Logika może być używana w wielu komponentach
- **Testowalne**: Łatwe do testowania jednostkowego
- **Type-safe**: Pełne wsparcie TypeScript
- **Reactive**: Automatyczna reaktywność Vue 3
- **Composable**: Mogą być komponowane razem
- **Maintainable**: Jednoznaczny podział odpowiedzialności
