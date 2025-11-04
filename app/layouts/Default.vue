<template>
  <div
    class="relative flex flex-col"
  >
    <div class="p-header fixed w-full z-20 bg-white shadow-xl">
      <MainHeader
        :dark-mode="isDarkMode"
        @sidebar-state="handleSideBarState"
      />
    </div>
    <div class="p-content pb-[2rem] lg:pb-[3rem] pt-[7rem] lg:pt-[8rem] min-h-[79vh] justify-center max-lg:px-[3vw]">
      <slot class="flex-none" />
    </div>

    <div class="p-footer w-full z-20 pt-[2vh] bg-[#1B2532]">
      <MainFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainFooter from '../components/layoutParts/MainFooter.vue'
import MainHeader from '../components/layoutParts/MainHeader.vue'

const colorMode = useColorMode()
const isMobile = ref(false)
const isDesktop = () => {
  if (import.meta.client) {
    return window.innerWidth >= 768
  }
  return true
}
const stateFromHeader = ref(isDesktop())
const isDarkMode = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  },
})

const handleSideBarState = (sideBarBoolean: boolean) => {
  if (!isMobile.value) {
    stateFromHeader.value = sideBarBoolean
  }
}

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }

  checkMobile()
  window.addEventListener('resize', checkMobile)

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
})
</script>

<style scoped>
.dark .p-header {
background-color: #1B2532;
}
.dark .p-footer {
  border-top: 1px solid #404040;
}
.light .p-content {
  background-color: var(--p-gray-100);
}
</style>
