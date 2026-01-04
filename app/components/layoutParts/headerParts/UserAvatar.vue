<template>
  <div>
    <Button
      icon="pi pi-user"
      variant="outlined"
      rounded
      @click="toggle"
    />
    <Popover ref="op">
      <div class="flex flex-col gap-2">
        <h1 class=" font-bold">
          {{ user?.firstName }} {{ user?.lastName }}
        </h1>

        <ul class="px-[1vw]">
          <li
            v-for="option in options"
            :key="option.id"
          >
            <NuxtLink :to="localePath(option.route)">
              <i :class="option.icon" />
              {{ option.title }}
            </NuxtLink>
          </li>
        </ul>

        <div class="flex justify-end">
          <Button
            :label="t('common.buttons.logOut')"
            size="small"
            variant="text"
            raised
            @click="handleLogout"
          />
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import type { IGetUserProfileResponse } from '~/app/interfaces/RepositoriesInterface'

const op = ref()
const { t } = useI18n()
const localePath = useLocalePath()
const { user, logout, isAdmin } = useAuth() as {
  user: Ref<IGetUserProfileResponse | null>
  logout: (redirectTo?: string) => Promise<void>
  isAdmin: ComputedRef<boolean>
}

const handleLogout = async () => {
  // Zamknij popover przed wylogowaniem
  if (op.value) {
    op.value.hide()
  }
  
  // Poczekaj chwilę na zamknięcie popovera
  await new Promise(resolve => setTimeout(resolve, 100))
  
  await logout('/')
}
const toggle = (event) => {
  op.value.toggle(event)
}

const options = computed(() => [
  {
    id: 'settings',
    title: 'Ustawienia',
    icon: 'pi pi-cog',
    route: '/settings',
    auth: true,
  },
  {
    id: 'adminPanel',
    title: 'Panel admin',
    icon: 'pi pi-hammer',
    route: '/adminDashboard',
    auth: isAdmin.value,
  },
].filter(option => option.auth === true))
</script>
