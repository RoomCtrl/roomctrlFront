<template>
  <div class="flex flex-col justify-center items-center gap-20 h-[100vh]">
    <div class="flex flex-col gap-4 text-center">
      <h1 class="font-extrabold text-7xl">
        {{ $t('pages.panelSelector.title') }}
      </h1>
      <h2 class="text-xl">
        {{ $t('pages.panelSelector.subtitle') }}
      </h2>
    </div>
    <div class="flex flex-col xl:flex-row justify-center items-center gap-8">
      <PanelInfoCard
        image="logo_admin_dark_mode.svg"
        :description="$t('pages.panelSelector.descriptions.admin')"
        :border-class="adminBorderClass"
        account-type="admin"
        color="red"
      />

      <div class="w-[36rem] xl:w-[2px] h-[2px] xl:h-[36rem] bg-gradient-to-r xl:bg-gradient-to-b from-transparent via-gray-400 to-transparent" />

      <PanelInfoCard
        image="logo_dark_mode.svg"
        :description="$t('pages.panelSelector.descriptions.user')"
        :border-class="userBorderClass"
        account-type="user"
        color="green"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PanelInfoCard from '~/components/panelSelectorPage/PanelInfoCard.vue'

definePageMeta({
  layout: false,
  middleware: 'admin',
})

const adminBorderClass = ref('border-red-300 hover:border-red-500')
const userBorderClass = ref('border-green-300 hover:border-green-500')
</script>
