<template>
  <div class="p-content flex min-h-screen overflow-hidden">
    <aside>
      <Menu
        :model="items"
        :pt:root:class="['fixed flex flex-col justify-between py-4 h-full z-10', isCollapsed ? 'w-[4rem] px-2' : 'w-[22rem] px-4']"
        pt:root:style="min-width: 4rem; --p-menu-background: #1B2532; --p-menu-item-color: #ffffff "
        :pt:list:class="['h-full', { 'items-center': isCollapsed }]"
        :pt:start:class="['flex flex-col']"
        :pt:end:class="['flex flex-col', isCollapsed ? 'justify-center items-center' : 'justify-between']"
      >
        <template #start>
          <div :class="['flex flex-row', isCollapsed ? 'justify-center' : 'justify-between items-center']">
            <img
              v-if="!isCollapsed"
              src="/logos/logo_admin_dark_mode.svg"
              class="h-[2.65rem]"
              alt="Dark mode admin panel logo"
            />
            <Button
              icon="pi pi-bars"
              raised
              variant="outlined"
              @click="isCollapsed = !isCollapsed"
            />
          </div>
          <Divider pt:root:style="border-color: #1B2532" />
          <div
            v-if="!isCollapsed"
            class="flex flex-row justify-between pb-4"
          >
            <div class="flex flex-row items-center gap-2">
              <i
                class="pi pi-globe"
                style="color: white"
              />
              <LanguageSelect size="small" />
            </div>
          </div>
        </template>

        <template #item="{ item, props }">
          <router-link
            v-slot="{ href, navigate }"
            v-tooltip.right="{ value: item.label, disabled: !isCollapsed }"
            :to="localePath(item.link)"
            custom
          >

            <a
              v-ripple
              :href="href"
              v-bind="props.action"
              :class="[
                'hover:text-white flex items-center transition-colors p-2 rounded-md',
                isActive(item)
                  ? 'p-menuitem-active text-white font-semibold bg-[#D74141]'
                  : 'text-gray-400',
              ]"
              @click="navigate"
            >

              <i
                :class="item.icon"
                style="font-size: 1.4rem;"
              />
              <span
                v-if="!isCollapsed"
                class="ml-2"
              >{{ item.label }}</span>

            </a>
          </router-link>
        </template>

        <template #end>
          <Button
            v-tooltip.right="{ value: $t('common.userDashboard'), disabled: !isCollapsed }"
            as="a"
            :href="localePath('/rooms')"
            icon="pi pi-chevron-circle-left"
            raised
            variant="outlined"
            :label="isCollapsed ? '' : $t('common.userDashboard')"
          />

          <Divider />

          <div class="flex flex-row justify-between">
            <ColorModeSwitch
              v-if="!isCollapsed"
              class="text-white"
            />
            <Button
              v-tooltip.right="{ value: $t('common.buttons.logOut'), disabled: !isCollapsed }"
              raised
              variant="outlined"
              icon="pi pi-sign-out"
              aria-label="logout"
              :label="isCollapsed ? '' : $t('common.buttons.logOut')"
              @click="handleLogout"
            />
          </div>
        </template>
      </Menu>
    </aside>

    <main class="flex-1 overflow-hidden ml-[4.5rem] mr-[0.5rem] my-[0.5rem]">
      <div class="flex-1 min-h-0 flex h-full">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ColorModeSwitch from '~/components/layoutParts/ColorModeSwitch.vue'
import LanguageSelect from '~/components/layoutParts/LanguageSelect.vue'

const localePath = useLocalePath()
const { t } = useI18n()
const { logout } = useAuth()
const route = useRoute()
const router = useRouter()

const isCollapsed = ref(true)

const normalizePath = (path) => {
  if (!path) return '/'
  return path.replace(/\/+$/, '')
}

const isActive = (item) => {
  const current = normalizePath(route.path)
  const target = normalizePath(router.resolve(localePath(item.link)).path)

  return current === target
}

const items = computed(() => [
  {
    label: t('layouts.adminSidebar.items.dashboard'),
    link: '/adminDashboard',
    icon: 'pi pi-home',
  },
  {
    label: t('layouts.adminSidebar.items.dashboard'),
    link: '/adminDashboard/roomList',
    icon: 'pi pi-clone',
  },
  {
    label: t('layouts.adminSidebar.items.users'),
    link: '/adminDashboard/users',
    icon: 'pi pi-users',
  },
  {
    label: t('layouts.adminSidebar.items.rentsToConfirm'),
    link: '/adminDashboard/rentsToConfirm',
    icon: 'pi pi-check-circle',
  },
  {
    label: t('layouts.adminSidebar.items.reportsOfRooms'),
    link: '/adminDashboard/roomIssueReports',
    icon: 'pi pi-exclamation-circle',
  },
  {
    label: t('layouts.adminSidebar.items.statistics'),
    link: '/',
    icon: 'pi pi-chart-bar',
  },
  {
    label: t('layouts.adminSidebar.items.settings'),
    link: '/',
    icon: 'pi pi-cog',
  },
])

const handleLogout = async () => {
  await logout('/')
}
</script>

<style scoped>
.light .p-content {
  background-color: var(--p-gray-300);
}
</style>
