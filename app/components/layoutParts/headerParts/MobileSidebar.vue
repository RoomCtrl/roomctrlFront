<template>
  <div class="flex gap-4">
    <Drawer
      v-model:visible="visible"
      header="Menu"
      position="full"
    >
      <div class="flex flex-col gap-4 mt-2">
        <div>
          <PanelMenu :model="tabs">
            <template #item="{ item }">
              <NuxtLink
                v-if="item.route"
                :to="item.route"
                class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
                @click="hideDropDown"
              >
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </NuxtLink>
              <a
                v-else
                v-ripple
                class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
                :href="item.url"
                :target="item.target"
              >
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <span
                  v-if="item.items"
                  class="pi pi-angle-down text-primary ml-auto"
                />
              </a>
            </template>
          </PanelMenu>
        </div>

        <Button
          v-if="!user"
          as="a"
          :label="t('common.buttons.logIn')"
          :href="localePath('login')"
        />
        <Button
          v-else
          :label="t('common.buttons.logOut')"
          @click="handleLogout"
        />
        <div class="flex flex-row justify-between">
          <ModeSwitch />
          <LangSelect />
        </div>
      </div>
    </Drawer>
    <Button
      icon="pi pi-bars"
      @click="visible = true"
    />
  </div>
</template>

<script setup lang="ts">
import type { IHeaderTabs } from '~/interfaces/PageInterfaces'
import type { IGetUserProfileResponse } from '~/interfaces/RepositoriesInterface'
import LangSelect from './LangSelect.vue'
import ModeSwitch from './ModeSwitch.vue'

const localePath = useLocalePath()
const { t } = useI18n()

const visible = ref(false)

const { user, logout } = useAuth() as {
  user: Ref<IGetUserProfileResponse | null>
  logout: () => Promise<void>
}

const handleLogout = async () => {
  await logout()
}
defineProps<{
  tabs: IHeaderTabs[]
}>()

const hideDropDown = () => {
  visible.value = false
}
</script>
