<template>
  <ClientOnly>
    <NuxtLink
      v-if="!tab.items"
      :to="localePath(tab.route)"
      class="relative px-4 py-3 font-semibold transition-all duration-200 hover:text-[#D74141] group inline-flex items-center"
      exact-active-class="text-[#D74141] font-semibold"
    >
      {{ tab.label }}
      <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D74141] transition-all duration-200 group-hover:w-full" />
      <span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#D74141] scale-x-0 transition-transform duration-200 group-[.router-link-exact-active]:scale-x-100" />
    </NuxtLink>

    <div
      v-else
      class="relative cursor-pointer px-4 py-3 font-semibold transition-all duration-200 hover:text-[#D74141] group inline-flex items-center"
      :class="{ 'text-[#D74141]': arrowPosition }"
      @mouseenter="showDropdown"
      @focusin="showDropdown"
      @mouseleave="scheduleHide"
      @focusout="scheduleHide"
    >
      <div class="flex items-center gap-2">
        {{ tab.label }}
        <i
          class="transition-transform duration-200"
          style="font-size:0.875rem ;"
          :class="{
            'pi pi-angle-up': arrowPosition,
            'pi pi-angle-down': !arrowPosition,
          }"
        />
      </div>

      <span
        class="absolute bottom-0 left-0 h-0.5 bg-[#D74141] transition-all duration-200"
        :class="arrowPosition ? 'w-full' : 'w-0 group-hover:w-full'"
      />
    </div>

    <Popover
      v-if="tab.items"
      ref="op"
      pt:content:class=".p-card-link rounded-lg shadow-xl p-6 min-w-[500px]"
      :dismissable="false"
      @mouseenter="cancelHide"
      @focusin="cancelHide"
      @mouseleave="scheduleHide"
      @focusout="scheduleHide"
    >
      <div class="mb-6 pb-3 border-b border-gray-200">
        <h2 class="text-2xl font-bold">
          {{ tab.label }}
        </h2>
      </div>

      <div class="grid grid-cols-2 gap-6 max-w-[500px] mx-auto">
        <div
          v-for="item in tab.items"
          :key="item.label"
          class="group cursor-pointer"
        >
          <NuxtLink
            :to="localePath(item.route)"
            class="p-card-link block p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 border border-transparent hover:border-gray-200 h-full"
            exact-active-class="bg-[#D74141]/20 border-[#D74141]/20"
            @click="hideDropDown"
          >
            <div class="flex items-center gap-2 mb-2">
              <h3 class="font-semibold group-hover:text-[#D74141] transition-colors duration-200">
                {{ item.label }}
              </h3>
              <i
                class="pi pi-arrow-right text-[#D74141] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style="font-size: 0.75rem;"
              />
            </div>

            <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {{ item.description }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </Popover>
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps<{
  tab: object
}>()

const localePath = useLocalePath()
const op = ref()
const arrowPosition = ref(false)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const showDropdown = (event: Event) => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  op.value.show(event)
  arrowPosition.value = true
}

const scheduleHide = () => {
  hideTimeout = setTimeout(() => {
    hideDropDown()
    hideTimeout = null
  }, 200)
}

const cancelHide = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const hideDropDown = () => {
  op.value.hide()
  arrowPosition.value = false
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

onUnmounted(() => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
})
</script>

<style scoped>
.dark .p-card-link:hover {
  background-color: #0f1419;
  border-color: #ad3636ff;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pi {
  transition: transform 0.2s ease;
}
</style>
