# Komponenty RoomCtrl

## Przegląd

Komponenty w aplikacji RoomCtrl są zorganizowane modularnie według funkcjonalności biznesowych. Każdy katalog reprezentuje konkretny obszar aplikacji.

## Struktura Katalogów Komponentów

```
components/
├── common/              # Wspólne, reużywalne komponenty
├── layoutParts/         # Części layoutu (Header, Footer, Navigation)
├── booking/             # Komponenty związane z rezerwacjami
├── rooms/               # Komponenty związane z salami
├── adminDashboard/      # Komponenty panelu administracyjnego
├── mainPage/            # Komponenty strony głównej
├── aboutUsPage/         # Komponenty strony "O nas"
├── contactPage/         # Komponenty strony kontaktowej
├── downloadApp/         # Komponenty sekcji pobierania aplikacji
├── forms/               # Komponenty formularzy
├── howThisWorkPage/     # Komponenty strony "Jak to działa"
├── panelSelectorPage/   # Komponenty wyboru panelu
├── reservations/        # Komponenty zarządzania rezerwacjami
├── settings/            # Komponenty ustawień
└── subpagesParts/       # Wspólne części podstron
```

## Konwencje Nazewnictwa

### 1. Nazwy Plików

- **PascalCase**: `UserProfileCard.vue`
- Prefiks według typu:
  - `Base*` - komponenty bazowe (np. `BaseButton.vue`)
  - `The*` - komponenty singleton (np. `TheHeader.vue`)
  - `App*` - komponenty główne aplikacji

### 2. Nazwy Komponentów

```vue
<script setup lang="ts">
// Automatycznie wywnioskowane z nazwy pliku
</script>

<template>
  <!-- Użycie w template: <UserProfileCard /> -->
</template>
```

## Katalog `common/` - Wspólne Komponenty

Zawiera komponenty UI używane w całej aplikacji.

### Przykładowe Komponenty:

#### `BaseButton.vue`

```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="['base-button', `base-button--${variant}`, `base-button--${size}`]"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="spinner" />
    <slot v-else />
  </button>
</template>
```

#### `BaseInput.vue`

```vue
<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number'
  error?: string
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="base-input">
    <label v-if="label" class="base-input__label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <span v-if="error" class="base-input__error">{{ error }}</span>
  </div>
</template>
```

#### `BaseModal.vue`

Komponent modala do wyświetlania dialogów.

#### `BaseCard.vue`

Komponent karty do grupowania treści.

#### `LoadingSpinner.vue`

Komponent animowanego spinnera ładowania.

## Katalog `layoutParts/` - Części Layoutu

### `TheHeader.vue`

Główny nagłówek aplikacji.

**Funkcjonalności:**

- Logo i branding
- Nawigacja główna
- Przełącznik języka
- Przełącznik trybu ciemnego/jasnego
- Menu użytkownika (jeśli zalogowany)
- Przycisk logowania (jeśli nie zalogowany)

```vue
<script setup lang="ts">
const { locale, setLocale } = useI18n()
const { user, logout } = useAuth()
const colorMode = useColorMode()

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="the-header">
    <div class="container">
      <NuxtLink to="/" class="logo">
        <img src="~/public/logos/logo.svg" alt="RoomCtrl" />
      </NuxtLink>

      <nav class="navigation">
        <NuxtLink to="/rooms">{{ $t('nav.rooms') }}</NuxtLink>
        <NuxtLink to="/how-this-work">{{ $t('nav.howItWorks') }}</NuxtLink>
        <NuxtLink to="/about-us">{{ $t('nav.aboutUs') }}</NuxtLink>
        <NuxtLink to="/contact">{{ $t('nav.contact') }}</NuxtLink>
      </nav>

      <div class="actions">
        <LanguageSwitcher />
        <DarkModeToggle />
        <UserMenu v-if="user" :user="user" @logout="logout" />
        <BaseButton v-else to="/login">{{ $t('auth.login') }}</BaseButton>
      </div>
    </div>
  </header>
</template>
```

### `TheFooter.vue`

Stopka aplikacji.

**Zawartość:**

- Informacje o firmie
- Linki do social media
- Linki do polityki prywatności i regulaminu
- Copyright

### `TheSidebar.vue`

Sidebar (używany w panelu administracyjnym).

## Katalog `booking/` - Komponenty Rezerwacji

### `BookingCalendar.vue`

Kalendarz do wyboru daty rezerwacji.

**Props:**

- `availableDates: Date[]` - dostępne daty
- `selectedDate: Date | null` - wybrana data
- `minDate: Date` - minimalna data
- `maxDate: Date` - maksymalna data

**Events:**

- `@date-select` - emitowany przy wyborze daty

### `BookingTimeSlots.vue`

Lista dostępnych slotów czasowych.

**Props:**

- `slots: TimeSlot[]` - dostępne sloty
- `selectedSlot: TimeSlot | null` - wybrany slot

**Events:**

- `@slot-select` - emitowany przy wyborze slotu

### `BookingForm.vue`

Formularz tworzenia rezerwacji.

**Props:**

- `roomId: number` - ID sali
- `initialData?: BookingFormData` - początkowe dane (dla edycji)

**Events:**

- `@submit` - emitowany po zatwierdzeniu formularza
- `@cancel` - emitowany przy anulowaniu

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const bookingSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  participants: z.number().min(1)
})

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(bookingSchema)
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>
```

### `BookingConfirmation.vue`

Potwierdzenie rezerwacji.

## Katalog `rooms/` - Komponenty Sal

### `RoomCard.vue`

Karta pojedynczej sali.

**Props:**

```typescript
interface RoomCardProps {
  room: {
    id: number
    name: string
    capacity: number
    equipment: string[]
    images: string[]
    available: boolean
  }
  showActions?: boolean
}
```

**Template:**

```vue
<template>
  <div class="room-card">
    <div class="room-card__image">
      <img :src="room.images[0]" :alt="room.name" />
      <div v-if="!room.available" class="room-card__badge">
        {{ $t('rooms.unavailable') }}
      </div>
    </div>

    <div class="room-card__content">
      <h3>{{ room.name }}</h3>
      <p class="capacity">
        <i class="pi pi-users" />
        {{ room.capacity }} {{ $t('rooms.people') }}
      </p>

      <div class="equipment">
        <span v-for="eq in room.equipment" :key="eq" class="tag">
          {{ eq }}
        </span>
      </div>

      <div v-if="showActions" class="actions">
        <BaseButton @click="$emit('book', room.id)">
          {{ $t('rooms.book') }}
        </BaseButton>
        <BaseButton variant="secondary" @click="$emit('details', room.id)">
          {{ $t('rooms.details') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
```

### `RoomList.vue`

Lista sal z filtrowaniem i paginacją.

### `RoomFilters.vue`

Filtry dla sal (pojemność, wyposażenie, dostępność).

### `RoomDetails.vue`

Szczegółowy widok sali.

## Katalog `adminDashboard/` - Panel Administracyjny

### `AdminSidebar.vue`

Nawigacja panelu administracyjnego.

### `UserManagementTable.vue`

Tabela zarządzania użytkownikami.

**Funkcjonalności:**

- Wyświetlanie listy użytkowników
- Sortowanie i filtrowanie
- Edycja użytkownika
- Usuwanie użytkownika
- Zmiana ról

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '~/composables/useUser'

const { users, loading, deleteUser, updateUser } = useUser()

const columns = [
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
  { field: 'role', header: 'Role' },
  { field: 'createdAt', header: 'Created' }
]

const selectedUsers = ref([])
</script>

<template>
  <DataTable
    v-model:selection="selectedUsers"
    :value="users"
    :loading="loading"
    paginator
    :rows="10"
  >
    <Column selection-mode="multiple" />
    <Column
      v-for="col in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    />
    <Column header="Actions">
      <template #body="{ data }">
        <Button icon="pi pi-pencil" @click="editUser(data)" />
        <Button
          icon="pi pi-trash"
          severity="danger"
          @click="deleteUser(data.id)"
        />
      </template>
    </Column>
  </DataTable>
</template>
```

### `RoomManagementTable.vue`

Tabela zarządzania salami.

### `StatisticsCard.vue`

Karta statystyk (używana w dashboardzie).

### `StatisticsChart.vue`

Wykres statystyk (Chart.js).

## Katalog `forms/` - Komponenty Formularzy

### `LoginForm.vue`

Formularz logowania.

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema)
})

const { login } = useAuth()

const onSubmit = handleSubmit(async (values) => {
  await login(values.email, values.password)
})
</script>

<template>
  <form @submit="onSubmit">
    <Field name="email" v-slot="{ field, error }">
      <BaseInput
        v-bind="field"
        type="email"
        :label="$t('auth.email')"
        :error="error"
      />
    </Field>

    <Field name="password" v-slot="{ field, error }">
      <BaseInput
        v-bind="field"
        type="password"
        :label="$t('auth.password')"
        :error="error"
      />
    </Field>

    <BaseButton type="submit" :loading="isSubmitting">
      {{ $t('auth.login') }}
    </BaseButton>
  </form>
</template>
```

### `RegisterForm.vue`

Formularz rejestracji.

### `PasswordResetForm.vue`

Formularz resetowania hasła.

### `ContactForm.vue`

Formularz kontaktowy.

## Katalog `reservations/` - Zarządzanie Rezerwacjami

### `ReservationsList.vue`

Lista rezerwacji użytkownika.

### `ReservationCard.vue`

Karta pojedynczej rezerwacji.

### `ReservationActions.vue`

Akcje dla rezerwacji (edycja, anulowanie).

## Katalog `settings/` - Ustawienia

### `ProfileSettings.vue`

Ustawienia profilu użytkownika.

### `NotificationSettings.vue`

Ustawienia powiadomień.

### `SecuritySettings.vue`

Ustawienia bezpieczeństwa (zmiana hasła).

## Wzorce i Best Practices

### 1. Kompozycja Komponentów

**Prezentacyjne vs Kontenerowe:**

```vue
<!-- Komponent prezentacyjny (dumb component) -->
<script setup lang="ts">
defineProps<{
  data: any[]
  loading: boolean
}>()

defineEmits<{
  itemClick: [id: number]
}>()
</script>

<!-- Komponent kontenerowy (smart component) -->
<script setup lang="ts">
const { data, loading, fetchData } = useData()

onMounted(() => {
  fetchData()
})

const handleItemClick = (id: number) => {
  navigateTo(`/item/${id}`)
}
</script>

<template>
  <PresentationalComponent
    :data="data"
    :loading="loading"
    @item-click="handleItemClick"
  />
</template>
```

### 2. Props Validation

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  items: Array<{ id: number; name: string }>
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  variant: 'primary'
})
</script>
```

### 3. Events

```vue
<script setup lang="ts">
// Typed emits
const emit = defineEmits<{
  submit: [data: FormData]
  cancel: []
  error: [message: string]
}>()

const handleSubmit = () => {
  emit('submit', formData)
}
</script>
```

### 4. Slots

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card__header">
      <slot name="header" />
    </div>

    <div class="card__body">
      <slot />
      <!-- default slot -->
    </div>

    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

### 5. Provide/Inject dla Głębokiej Hierarchii

```vue
<!-- Parent Component -->
<script setup lang="ts">
import { provide } from 'vue'

const theme = ref('light')
provide('theme', theme)
</script>

<!-- Child Component (deep nested) -->
<script setup lang="ts">
import { inject } from 'vue'

const theme = inject<Ref<string>>('theme')
</script>
```

### 6. Async Components

```vue
<script setup lang="ts">
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'))
</script>

<template>
  <Suspense>
    <template #default>
      <HeavyChart />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>
```

### 7. Teleport

```vue
<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal">
      <!-- Modal content -->
    </div>
  </Teleport>
</template>
```

## Testowanie Komponentów

### Unit Test Example

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RoomCard from './RoomCard.vue'

describe('RoomCard', () => {
  const mockRoom = {
    id: 1,
    name: 'Conference Room A',
    capacity: 10,
    equipment: ['Projector', 'Whiteboard'],
    images: ['/room1.jpg'],
    available: true
  }

  it('renders room information correctly', () => {
    const wrapper = mount(RoomCard, {
      props: { room: mockRoom }
    })

    expect(wrapper.text()).toContain('Conference Room A')
    expect(wrapper.text()).toContain('10')
  })

  it('emits book event when book button is clicked', async () => {
    const wrapper = mount(RoomCard, {
      props: { room: mockRoom, showActions: true }
    })

    await wrapper.find('.book-button').trigger('click')
    expect(wrapper.emitted('book')).toBeTruthy()
    expect(wrapper.emitted('book')?.[0]).toEqual([1])
  })
})
```

## Style i CSS

### 1. Scoped Styles

```vue
<style scoped>
.room-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.room-card__image {
  position: relative;
  height: 200px;
}

.room-card__content {
  padding: 1rem;
}
</style>
```

### 2. CSS Modules

```vue
<style module>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

<template>
  <div :class="$style.container">
    <!-- content -->
  </div>
</template>
```

### 3. TailwindCSS

```vue
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <!-- content -->
    </div>
  </div>
</template>
```

## Accessibility

### 1. ARIA Labels

```vue
<template>
  <button aria-label="Close dialog" aria-pressed="false" @click="closeDialog">
    <i class="pi pi-times" aria-hidden="true" />
  </button>
</template>
```

### 2. Keyboard Navigation

```vue
<script setup lang="ts">
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    emit('select')
  }
}
</script>

<template>
  <div
    role="button"
    tabindex="0"
    @click="emit('select')"
    @keydown="handleKeydown"
  >
    <!-- content -->
  </div>
</template>
```

### 3. Focus Management

```vue
<script setup lang="ts">
const firstFocusableElement = ref<HTMLElement>()

onMounted(() => {
  firstFocusableElement.value?.focus()
})
</script>
```

## Wnioski

System komponentów w RoomCtrl jest:

- **Modularny**: Komponenty zorganizowane według funkcjonalności
- **Reużywalny**: Wspólne komponenty w katalogu `common/`
- **Type-safe**: TypeScript dla props i events
- **Testowany**: Unit testy dla kluczowych komponentów
- **Dostępny**: ARIA labels i keyboard navigation
- **Wydajny**: Lazy loading i code splitting
