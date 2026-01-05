<template>
  <div>
    <Button
      icon="pi pi-user"
      variant="outlined"
      rounded
      @click="toggle"
    />
    <Popover ref="op">
      <div class="flex flex-col gap-4 min-w-[250px]">
        <!-- Header z avatarem i danymi użytkownika -->
        <div class="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-600">
          <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <i class="pi pi-user text-2xl text-primary-600 dark:text-primary-400" />
          </div>
          <div class="flex flex-col">
            <h1 class="font-bold text-lg text-gray-800 dark:text-white">
              {{ user?.firstName }} {{ user?.lastName }}
            </h1>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ user?.email }}
            </span>
          </div>
        </div>

        <!-- Menu opcji -->
        <nav>
          <ul class="flex flex-col gap-1">
            <li
              v-for="option in options"
              :key="option.id"
            >
              <NuxtLink
                :to="localePath(option.route)"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                @click="op.hide()"
              >
                <i :class="[option.icon, 'text-lg text-gray-500 dark:text-gray-400']" />
                <span class="font-medium">{{ option.title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Przycisk wylogowania -->
        <div class="pt-3 border-t border-gray-200 dark:border-gray-600">
          <Button
            :label="t('common.buttons.logOut')"
            icon="pi pi-sign-out"
            severity="danger"
            variant="outlined"
            class="w-full"
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
    title: t('pages.settings.title'),
    icon: 'pi pi-cog',
    route: '/settings',
    auth: true,
  },
  {
    id: 'adminPanel',
    title: t('common.navigation.adminPanel'),
    icon: 'pi pi-shield',
    route: '/adminDashboard',
    auth: isAdmin.value,
  },
].filter(option => option.auth === true))
</script>
