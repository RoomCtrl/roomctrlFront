# API i Serwisy RoomCtrl

## Przegląd

Warstwa API składa się z dwóch głównych elementów:

1. **Repositories** - bezpośrednia komunikacja z API backendu
2. **Services** - logika biznesowa i orkiestracja wywołań

## Architektura Warstwy API

```
┌─────────────┐
│ Composables │
└──────┬──────┘
       │
┌──────▼──────┐
│  Services   │ (Business Logic)
└──────┬──────┘
       │
┌──────▼──────┐
│Repositories │ (HTTP Calls)
└──────┬──────┘
       │
┌──────▼──────┐
│ Backend API │
└─────────────┘
```

## Repositories

Repositories stanowią warstwę abstrakcji nad HTTP requests. Każdy repository odpowiada za komunikację z konkretnym zasobem API.

### Struktura

```
repositories/
├── AuthRepository.ts       # Autentykacja
├── BookingRepository.ts    # Rezerwacje
├── RoomRepository.ts       # Sale
├── UserRepository.ts       # Użytkownicy
├── StatisticsRepository.ts # Statystyki
├── IssueRepository.ts      # Zgłoszenia
├── MailRepository.ts       # Wysyłka emaili
├── DownloadRepository.ts   # Pobieranie plików
└── StorageRepository.js    # LocalStorage/SessionStorage
```

## `AuthRepository.ts`

### Odpowiedzialności

- Logowanie użytkownika
- Walidacja tokena
- Odświeżanie tokena

### API

```typescript
export default {
  /**
   * Logowanie użytkownika
   * @param credentials - dane logowania
   * @returns Promise z tokenem i danymi użytkownika
   */
  login(credentials: { username: string; password: string }): Promise<IUserLoginResponse>

  /**
   * Walidacja tokena JWT
   * @param token - token do walidacji
   * @returns Promise z wynikiem walidacji
   */
  validateToken(token: string): Promise<ITokenValidationResponse>

  /**
   * Odświeżanie tokena
   * @param token - aktualny token
   * @returns Promise z nowym tokenem
   */
  refreshToken(token: string): Promise<IRefreshTokenResponse>
}
```

### Implementacja

```typescript
import type {
  IUserLoginResponse,
  ITokenValidationResponse
} from '~/interfaces/RepositoriesInterface'

export default {
  async login(credentials: {
    username: string
    password: string
  }): Promise<IUserLoginResponse> {
    const { data } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })

    if (!data.value) {
      throw new Error('Login failed')
    }

    return data.value
  },

  async validateToken(token: string): Promise<ITokenValidationResponse> {
    const { data } = await useFetch('/api/auth/validate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data.value || { valid: false }
  },

  async refreshToken(token: string): Promise<IRefreshTokenResponse> {
    const { data } = await useFetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!data.value) {
      throw new Error('Token refresh failed')
    }

    return data.value
  }
}
```

---

## `BookingRepository.ts`

### Odpowiedzialności

- CRUD operacje na rezerwacjach
- Pobieranie rezerwacji użytkownika
- Rezerwacje cykliczne
- Statystyki rezerwacji

### API

```typescript
export default class BookingRepository {
  constructor(private token: string | null)

  /**
   * Pobiera listę rezerwacji
   * @param myBookings - czy pobierać tylko rezerwacje użytkownika
   */
  getBookings(myBookings: boolean): Promise<IBooking[]>

  /**
   * Pobiera szczegóły rezerwacji
   * @param bookingId - ID rezerwacji
   */
  getBooking(bookingId: string): Promise<IBooking>

  /**
   * Tworzy nową rezerwację
   * @param data - dane rezerwacji
   */
  createBooking(data: IBookingCreateRequest): Promise<IBooking>

  /**
   * Aktualizuje rezerwację
   * @param bookingId - ID rezerwacji
   * @param data - dane do aktualizacji
   */
  updateBooking(bookingId: string, data: IBookingUpdateRequest): Promise<IBooking>

  /**
   * Usuwa rezerwację
   * @param bookingId - ID rezerwacji
   */
  deleteBooking(bookingId: string): Promise<void>

  /**
   * Tworzy rezerwacje cykliczne
   * @param data - dane rezerwacji cyklicznej
   */
  createRecurringBooking(data: IBookingRecurringRequest): Promise<IBooking[]>

  /**
   * Pobiera statystyki rezerwacji
   */
  getBookingStats(): Promise<IBookingStats>
}
```

### Przykład Implementacji

```typescript
export default class BookingRepository {
  private baseUrl = '/api/bookings'

  constructor(private token: string | null) {}

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
  }

  async getBookings(myBookings: boolean = false): Promise<IBooking[]> {
    const endpoint = myBookings ? `${this.baseUrl}/my` : this.baseUrl

    const { data } = await useFetch<IBooking[]>(endpoint, {
      method: 'GET',
      headers: this.getHeaders()
    })

    return data.value || []
  }

  async createBooking(bookingData: IBookingCreateRequest): Promise<IBooking> {
    const { data, error } = await useFetch<IBooking>(this.baseUrl, {
      method: 'POST',
      headers: this.getHeaders(),
      body: bookingData
    })

    if (error.value) {
      throw error.value
    }

    if (!data.value) {
      throw new Error('Failed to create booking')
    }

    return data.value
  }

  async deleteBooking(bookingId: string): Promise<void> {
    const { error } = await useFetch(`${this.baseUrl}/${bookingId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    })

    if (error.value) {
      throw error.value
    }
  }
}
```

---

## `RoomRepository.ts`

### Odpowiedzialności

- CRUD operacje na salach
- Pobieranie listy sal z filtrami
- Zarządzanie ulubionymi salami
- Generowanie QR kodów
- Pobieranie dostępności sal

### API

```typescript
export default class RoomRepository {
  constructor(private token: string | null)

  /**
   * Pobiera listę sal
   * @param withBookings - czy dołączyć informacje o rezerwacjach
   * @param status - filtr statusu ('available' | 'out_of_use')
   */
  getRooms(withBookings?: boolean, status?: string): Promise<IRoomCard[]>

  /**
   * Pobiera szczegóły sali
   * @param roomId - ID sali
   */
  getRoom(roomId: string): Promise<IRoomDetails>

  /**
   * Tworzy nową salę
   * @param data - dane sali
   */
  createRoom(data: IRoomCreateRequest): Promise<IRoomDetails>

  /**
   * Aktualizuje salę
   * @param roomId - ID sali
   * @param data - dane do aktualizacji
   */
  updateRoom(roomId: string, data: Partial<IRoomCreateRequest>): Promise<IRoomDetails>

  /**
   * Usuwa salę
   * @param roomId - ID sali
   */
  deleteRoom(roomId: string): Promise<void>

  /**
   * Dodaje salę do ulubionych
   * @param roomId - ID sali
   */
  addFavorite(roomId: string): Promise<void>

  /**
   * Usuwa salę z ulubionych
   * @param roomId - ID sali
   */
  removeFavorite(roomId: string): Promise<void>

  /**
   * Pobiera listę ulubionych sal
   */
  getFavorites(): Promise<string[]>

  /**
   * Generuje QR kod dla sali
   * @param roomId - ID sali
   */
  generateQRCode(roomId: string): Promise<Blob>

  /**
   * Pobiera dostępność sali
   * @param roomId - ID sali
   * @param dateFrom - data początkowa
   * @param dateTo - data końcowa
   */
  getRoomAvailability(
    roomId: string,
    dateFrom: Date,
    dateTo: Date
  ): Promise<IAvailabilitySlot[]>
}
```

---

## `UserRepository.ts`

### Odpowiedzialności

- CRUD operacje na użytkownikach
- Zarządzanie profilami
- Zmiana haseł
- Zarządzanie rolami

### API

```typescript
export default class UserRepository {
  constructor(private token: string | null)

  /**
   * Pobiera listę użytkowników
   */
  getUsers(): Promise<IUser[]>

  /**
   * Pobiera szczegóły użytkownika
   * @param userId - ID użytkownika
   */
  getUser(userId: string): Promise<IUser>

  /**
   * Tworzy nowego użytkownika
   * @param data - dane użytkownika
   */
  createUser(data: IUserCreateRequest): Promise<IUser>

  /**
   * Aktualizuje użytkownika
   * @param userId - ID użytkownika
   * @param data - dane do aktualizacji
   */
  updateUser(userId: string, data: IUserUpdateRequest): Promise<IUser>

  /**
   * Usuwa użytkownika
   * @param userId - ID użytkownika
   */
  deleteUser(userId: string): Promise<void>

  /**
   * Zmienia hasło użytkownika
   * @param userId - ID użytkownika
   * @param oldPassword - stare hasło
   * @param newPassword - nowe hasło
   */
  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void>

  /**
   * Aktualizuje role użytkownika
   * @param userId - ID użytkownika
   * @param roles - nowe role
   */
  updateUserRoles(userId: string, roles: string[]): Promise<void>
}
```

---

## `StatisticsRepository.ts`

### Odpowiedzialności

- Pobieranie statystyk aplikacji
- Raporty wykorzystania
- Analiza danych

### API

```typescript
export default class StatisticsRepository {
  constructor(private token: string | null)

  /**
   * Pobiera ogólne statystyki
   * @param dateFrom - data początkowa
   * @param dateTo - data końcowa
   */
  getStatistics(dateFrom?: Date, dateTo?: Date): Promise<IStatistics>

  /**
   * Pobiera statystyki dla konkretnej sali
   * @param roomId - ID sali
   */
  getRoomStatistics(roomId: string): Promise<IRoomStatistics>

  /**
   * Pobiera statystyki dla użytkownika
   * @param userId - ID użytkownika
   */
  getUserStatistics(userId: string): Promise<IUserStatistics>

  /**
   * Pobiera dane do wykresów
   * @param type - typ wykresu
   * @param dateFrom - data początkowa
   * @param dateTo - data końcowa
   */
  getChartData(
    type: 'bookings' | 'rooms' | 'users',
    dateFrom?: Date,
    dateTo?: Date
  ): Promise<IChartData>
}
```

---

## `IssueRepository.ts`

### Odpowiedzialności

- Zgłaszanie problemów
- Zarządzanie zgłoszeniami
- Aktualizacja statusów

### API

```typescript
export default class IssueRepository {
  constructor(private token: string | null)

  /**
   * Pobiera listę zgłoszeń
   */
  getIssues(): Promise<IIssue[]>

  /**
   * Tworzy nowe zgłoszenie
   * @param data - dane zgłoszenia
   */
  createIssue(data: IIssueCreateRequest): Promise<IIssue>

  /**
   * Aktualizuje status zgłoszenia
   * @param issueId - ID zgłoszenia
   * @param status - nowy status
   */
  updateIssueStatus(issueId: string, status: string): Promise<void>

  /**
   * Usuwa zgłoszenie
   * @param issueId - ID zgłoszenia
   */
  deleteIssue(issueId: string): Promise<void>
}
```

---

## `MailRepository.ts`

### Odpowiedzialności

- Wysyłanie emaili
- Formularze kontaktowe

### API

```typescript
export default class MailRepository {
  /**
   * Wysyła email
   * @param data - dane emaila
   */
  sendEmail(data: IEmailData): Promise<void>

  /**
   * Wysyła formularz kontaktowy
   * @param data - dane formularza
   */
  sendContactForm(data: IContactFormData): Promise<void>
}
```

---

## `StorageRepository.js`

### Odpowiedzialności

- Zapis i odczyt z LocalStorage
- Zapis i odczyt z SessionStorage
- Zarządzanie cache

### API

```typescript
export default {
  /**
   * Zapisuje dane w LocalStorage
   * @param key - klucz
   * @param value - wartość
   */
  setLocal(key: string, value: any): void

  /**
   * Pobiera dane z LocalStorage
   * @param key - klucz
   */
  getLocal(key: string): any

  /**
   * Usuwa dane z LocalStorage
   * @param key - klucz
   */
  removeLocal(key: string): void

  /**
   * Czyści całe LocalStorage
   */
  clearLocal(): void

  /**
   * Zapisuje dane w SessionStorage
   * @param key - klucz
   * @param value - wartość
   */
  setSession(key: string, value: any): void

  /**
   * Pobiera dane z SessionStorage
   * @param key - klucz
   */
  getSession(key: string): any
}
```

---

## Services

Services zawierają logikę biznesową i orkiestrują wywołania repositories. Dodają walidację, transformacje danych i obsługę błędów.

### Struktura

```
services/
├── AuthService.js         # Autentykacja
├── BookingService.ts      # Rezerwacje
├── RoomService.ts         # Sale
├── UserService.ts         # Użytkownicy
├── StatisticsService.ts   # Statystyki
└── IssueService.ts        # Zgłoszenia
```

## `AuthService.js`

### Odpowiedzialności

- Logika autoryzacji
- Zarządzanie tokenami
- Walidacja sesji

### API

```typescript
export class AuthService {
  /**
   * Loguje użytkownika
   * @param credentials - dane logowania
   */
  async login(credentials: ILoginCredentials): Promise<IUserLoginResponse>

  /**
   * Wylogowuje użytkownika
   */
  async logout(): Promise<void>

  /**
   * Waliduje token
   * @param token - token do walidacji
   */
  async validateToken(token: string): Promise<boolean>

  /**
   * Odświeża token
   * @param token - aktualny token
   */
  async refreshToken(token: string): Promise<string>

  /**
   * Sprawdza czy użytkownik ma rolę
   * @param role - nazwa roli
   */
  hasRole(role: string): boolean
}
```

### Implementacja

```typescript
import AuthRepository from '~/repositories/AuthRepository'
import StorageRepository from '~/repositories/StorageRepository'

export class AuthService {
  async login(credentials: ILoginCredentials): Promise<IUserLoginResponse> {
    // Walidacja credentials
    if (!credentials.username || !credentials.password) {
      throw new Error('Username and password are required')
    }

    // Wywołanie repository
    const result = await AuthRepository.login(credentials)

    // Zapis tokena
    if (import.meta.client) {
      StorageRepository.setLocal('auth-token', result.token)
      StorageRepository.setLocal('auth-user', JSON.stringify(result.user))
    }

    return result
  }

  async logout(): Promise<void> {
    if (import.meta.client) {
      StorageRepository.removeLocal('auth-token')
      StorageRepository.removeLocal('auth-user')
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const result = await AuthRepository.validateToken(token)
      return result.valid
    } catch (error) {
      return false
    }
  }

  hasRole(role: string): boolean {
    const userStr = StorageRepository.getLocal('auth-user')
    if (!userStr) return false

    try {
      const user = JSON.parse(userStr)
      return user.roles?.includes(role) || false
    } catch {
      return false
    }
  }
}
```

---

## `BookingService.ts`

### Odpowiedzialności

- Walidacja rezerwacji
- Sprawdzanie konfliktów
- Transformacja danych rezerwacji

### API

```typescript
export class BookingService {
  constructor(private token: string | null)

  /**
   * Pobiera rezerwacje
   * @param myBookings - czy pobierać tylko własne
   */
  async getBookings(myBookings: boolean): Promise<IBooking[]>

  /**
   * Tworzy rezerwację
   * @param data - dane rezerwacji
   */
  async createBooking(data: IBookingCreateRequest): Promise<IBooking>

  /**
   * Sprawdza czy sala jest dostępna
   * @param roomId - ID sali
   * @param startDate - data rozpoczęcia
   * @param endDate - data zakończenia
   */
  async checkAvailability(
    roomId: string,
    startDate: Date,
    endDate: Date
  ): Promise<boolean>

  /**
   * Waliduje dane rezerwacji
   * @param data - dane do walidacji
   */
  validateBookingData(data: IBookingCreateRequest): void
}
```

### Implementacja

```typescript
import BookingRepository from '~/repositories/BookingRepository'

export class BookingService {
  private repository: BookingRepository

  constructor(token: string | null) {
    this.repository = new BookingRepository(token)
  }

  validateBookingData(data: IBookingCreateRequest): void {
    // Walidacja dat
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)

    if (start >= end) {
      throw new Error('Start date must be before end date')
    }

    if (start < new Date()) {
      throw new Error('Cannot book in the past')
    }

    // Walidacja długości rezerwacji (max 8 godzin)
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    if (hours > 8) {
      throw new Error('Booking cannot exceed 8 hours')
    }

    // Walidacja tytułu
    if (!data.title || data.title.length < 3) {
      throw new Error('Title must be at least 3 characters')
    }
  }

  async createBooking(data: IBookingCreateRequest): Promise<IBooking> {
    // Walidacja
    this.validateBookingData(data)

    // Sprawdzenie dostępności
    const isAvailable = await this.checkAvailability(
      data.roomId,
      new Date(data.startDate),
      new Date(data.endDate)
    )

    if (!isAvailable) {
      throw new Error('Room is not available for selected time')
    }

    // Utworzenie rezerwacji
    return await this.repository.createBooking(data)
  }

  async checkAvailability(
    roomId: string,
    startDate: Date,
    endDate: Date
  ): Promise<boolean> {
    const availability = await this.repository.getRoomAvailability(
      roomId,
      startDate,
      endDate
    )

    // Sprawdź czy jest jakiś slot dostępny w tym czasie
    return availability.some((slot) => slot.available)
  }
}
```

---

## `RoomService.ts`

### Odpowiedzialności

- Walidacja danych sal
- Zarządzanie statusami sal
- Filtrowanie i sortowanie

### API

```typescript
export class RoomService {
  constructor(private token: string | null)

  /**
   * Pobiera listę sal
   * @param withBookings - czy dołączyć rezerwacje
   * @param status - filtr statusu
   */
  async getRooms(withBookings?: boolean, status?: string): Promise<IRoomCard[]>

  /**
   * Tworzy nową salę
   * @param data - dane sali
   */
  async createRoom(data: IRoomCreateRequest): Promise<IRoomDetails>

  /**
   * Waliduje dane sali
   * @param data - dane do walidacji
   */
  validateRoomData(data: IRoomCreateRequest): void

  /**
   * Filtruje sale według kryteriów
   * @param rooms - lista sal
   * @param filters - filtry
   */
  filterRooms(rooms: IRoomCard[], filters: IRoomFilters): IRoomCard[]
}
```

---

## `UserService.ts`

### Odpowiedzialności

- Walidacja danych użytkowników
- Zarządzanie uprawnieniami
- Hashowanie haseł

### API

```typescript
export class UserService {
  constructor(private token: string | null)

  /**
   * Tworzy użytkownika
   * @param data - dane użytkownika
   */
  async createUser(data: IUserCreateRequest): Promise<IUser>

  /**
   * Waliduje dane użytkownika
   * @param data - dane do walidacji
   */
  validateUserData(data: IUserCreateRequest): void

  /**
   * Waliduje hasło
   * @param password - hasło do walidacji
   */
  validatePassword(password: string): void
}
```

### Implementacja

```typescript
export class UserService {
  validatePassword(password: string): void {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters')
    }

    if (!/[A-Z]/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter')
    }

    if (!/[0-9]/.test(password)) {
      throw new Error('Password must contain at least one number')
    }
  }

  validateUserData(data: IUserCreateRequest): void {
    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format')
    }

    // Hasło
    this.validatePassword(data.password)

    // Imię i nazwisko
    if (!data.firstName || data.firstName.length < 2) {
      throw new Error('First name must be at least 2 characters')
    }

    if (!data.lastName || data.lastName.length < 2) {
      throw new Error('Last name must be at least 2 characters')
    }
  }
}
```

---

## Error Handling

### Wzorzec Obsługi Błędów

```typescript
// Repository
async createResource(data: any) {
  const { data: result, error } = await useFetch('/api/resource', {
    method: 'POST',
    body: data
  })

  if (error.value) {
    throw error.value
  }

  if (!result.value) {
    throw new Error('Failed to create resource')
  }

  return result.value
}

// Service
async createResource(data: any) {
  try {
    // Walidacja
    this.validateData(data)

    // Wywołanie repository
    return await this.repository.createResource(data)
  } catch (error) {
    // Logowanie błędu
    console.error('Failed to create resource:', error)

    // Przekazanie błędu dalej
    throw error
  }
}

// Composable
const createResource = async (data: any) => {
  loading.value = true
  error.value = null

  try {
    const result = await service.createResource(data)
    resources.value.push(result)
    return result
  } catch (err: any) {
    error.value = formatError(err)
    throw err
  } finally {
    loading.value = false
  }
}
```

## Best Practices

### 1. Dependency Injection

```typescript
// ✅ Dobre - token przekazywany przez konstruktor
export class BookingService {
  constructor(private token: string | null) {
    this.repository = new BookingRepository(token)
  }
}

// ❌ Złe - hardcoded dependency
export class BookingService {
  constructor() {
    this.repository = new BookingRepository()
  }
}
```

### 2. Interface Segregation

```typescript
// ✅ Dobre - małe, skupione interfejsy
interface IReadRepository {
  get(id: string): Promise<T>
  getAll(): Promise<T[]>
}

interface IWriteRepository {
  create(data: T): Promise<T>
  update(id: string, data: T): Promise<T>
  delete(id: string): Promise<void>
}

// ❌ Złe - zbyt duży interfejs
interface IRepository {
  // 20+ methods...
}
```

### 3. Error Handling

```typescript
// ✅ Dobre - szczegółowe błędy
throw new Error('Room not available for selected time')

// ❌ Złe - ogólny błąd
throw new Error('Error')
```

### 4. Validation

```typescript
// ✅ Dobre - walidacja w service
class BookingService {
  validateData(data) {
    // Walidacja logiki biznesowej
  }
}

// ❌ Złe - walidacja w repository
class BookingRepository {
  create(data) {
    // Repository nie powinno walidować
  }
}
```

## Wnioski

Warstwa API w RoomCtrl:

- **Separation of Concerns**: Repositories vs Services
- **Type Safety**: Pełne wsparcie TypeScript
- **Error Handling**: Spójny wzorzec obsługi błędów
- **Testability**: Łatwe mockowanie i testowanie
- **Reusability**: Serwisy mogą być używane przez wiele composables
- **Maintainability**: Czytelna struktura i podział odpowiedzialności
