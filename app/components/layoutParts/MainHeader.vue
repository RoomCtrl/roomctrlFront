<template>
  <div class="flex justify-between md:justify-evenly items-center my-3 max-md:mx-3">
    <div class="flex flex-row gap-8">
      <ClientOnly>
        <Button
          v-if="user"
          class="hidden self-center md:flex"
          :icon="sidebarButton"
          @click="moveSideBar"
        />
        <NuxtLink
          :to="localePath('index')"
          class="flex-none"
        >

          <NuxtImg
            v-if="darkMode"
            src="/logos/logo_dark_mode.svg"
            :alt="t('common.logoAlt')"
            class="flex h-[5vh]"
          />
          <NuxtImg
            v-else
            src="/logos/logo.svg"
            :alt="t('common.logoAlt')"
            class="flex h-[5vh]"
          />

        </NuxtLink>
        <template #fallback>
          <Skeleton
            width="10rem"
            height="3rem"
          />
        </template>
      </ClientOnly>
    </div>

    <div class="hidden md:flex flex-row gap-3">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="grid grid-cols-1 grid-rows-1"
      >
        <NuxtLink
          :to="localePath(tab.link)"
          class="col-start-1 row-start-1 border-b-2 hover:font-semibold hover:text-[#D74141] hover:border-[#D74141]"
          exact-active-class="border-b-2 border-[#D74141] text-[#D74141] font-semibold"
        >
          {{ tab.name }}
        </NuxtLink>

        <span
          class="col-start-1 row-start-1 font-semibold invisible pointer-events-none"
          aria-hidden="true"
        >
          {{ tab.name }}
        </span>
      </div>
    </div>
    <UserHeaderOptions :dark-mode="darkMode" />
    <div
      class="block md:hidden"
    >
      <MobileHeader />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'
import MobileHeader from './headerParts/MobileHeader.vue'
import UserHeaderOptions from './headerParts/UserHeaderOptions.vue'

defineProps({
  darkMode: Boolean,
})

const emit = defineEmits(['sidebar-state'])
const visible = ref<boolean>(true)
const localePath = useLocalePath()
const { t } = useI18n()
const { user } = useAuth()

const tabs = computed(() => [
  {
    name: t('layouts.main.pages.howThisWork'),
    link: 'howThisWork',
  },
  {
    name: t('layouts.main.pages.rules'),
    link: 'rules',
  },
  {
    name: t('layouts.main.pages.aboutUs'),
    link: 'aboutUs',
  },
  {
    name: t('layouts.main.pages.contact'),
    link: 'contact',
  },
])
const moveSideBar = () => {
  visible.value = !visible.value
  emit('sidebar-state', visible.value)
}

const sidebarButton = computed(() => {
  return visible.value ? 'pi pi-arrow-left' : 'pi pi-arrow-right'
})
</script>
