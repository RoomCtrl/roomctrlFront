<template>
  <div class="flex justify-between md:justify-evenly items-center my-3 max-md:mx-3">
    <NuxtLink
      to="/"
      class="flex-none"
    >
      <ClientOnly>
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
        <template #fallback>
          <NuxtImg
            src="/logos/logo.svg"
            :alt="t('common.logoAlt')"
            class="flex h-[5vh]"
          />
        </template>
      </ClientOnly>
    </NuxtLink>
    <div class="hidden md:flex flex-row gap-3">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="grid grid-cols-1 grid-rows-1"
      >
        <NuxtLink
          :to="tab.link"
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
      <div class="flex gap-4">
        <Drawer
          v-model:visible="visible"
          header="Menu"
          position="right"
        >
          <div class="flex flex-col gap-4 mt-2">
            <div
              v-for="(tab, index) in tabs"
              :key="index"
            >
              <a :href="tab.link">{{ tab.name }}</a>
            </div>
            <Button
              as="a"
              :label="t('common.logIn')"
              href="/login"
            />
          </div>
        </Drawer>
        <Button
          icon="pi pi-bars"
          @click="visible = true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'
import { Button } from 'primevue'
import UserHeaderOptions from './headerParts/UserHeaderOptions.vue'

defineProps({
  darkMode: Boolean,
})

const visible = ref(false)
const { t } = useI18n()

const tabs = [
  {
    name: t('layouts.main.contact'),
    link: 'contact',
  },
  {
    name: t('layouts.main.aboutAs'),
    link: 'aboutUs',
  },
]
</script>
