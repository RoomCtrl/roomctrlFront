<template>
  <div class="relative w-full">
    <Drawer
      v-model:visible="visible"
      :dismissable="false"
      :modal="false"
      :showCloseIcon="false"
      class="!h-[calc(100vh-theme(spacing.10))] !bottom-0 !top-[calc(theme(spacing.12)+1px)] flex flex-col justify-between"
      :baseZIndex="1"
    >
      <template #header>
        <h1 class="text-3xl font-bold">
          Menu
        </h1>
      </template>
      <template #default>
        <Menu
          :model="menuItems"
          class="font-semibold text-lg"
        />
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  sidebarState: Boolean,
})

const emit = defineEmits(['update:sidebarState'])
// Add to menuItems when create routes
// const localePath = useLocalePath()

const visible = computed({
  get: () => props.sidebarState,
  set: value => emit('update:sidebarState', value),
})
const menuItems = [
  {
    label: 'Moje sale',
  },
  {
    label: 'Ustawienia',
  },
]
</script>
