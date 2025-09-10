<template>
  <NuxtLink
    v-if="!tab.items"
    :to="localePath(tab.route)"
    class="col-start-1 row-start-1 border-b-2 border-[#D74141]/0 font-semibold hover:text-[#D74141] hover:border-[#D74141]"
    exact-active-class="border-b-2 border-[#D74141]/100 text-[#D74141] font-semibold"
  >
    {{ tab.label }}
  </NuxtLink>
  <div
    v-else
    class="flex flex-row gap-1 border-b-2 border-[#D74141]/0 font-semibold hover:text-[#D74141] hover:border-[#D74141] items-center"
    exact-active-class="border-b-2 border-[#D74141]/100 text-[#D74141] font-semibold"
    @click="toggle"
  >
    {{ tab.label }}
    <i
      v-if="tab.items"
      :class="{ 'pi pi-angle-up': arrowPosition, 'pi pi-angle-down': !arrowPosition }"
    />
  </div>

  <Popover
    v-if="tab.items"
    ref="op"
    pt:content:class="grid grid-cols-2"
  >
    <div
      v-for="item in tab.items"
      :key="item.label"
    >
      <NuxtLink
        :to="localePath(item.route)"
        class="border-b-2 font-semibold hover:text-[#D74141] hover:border-[#D74141]"
        exact-active-class="border-b-2 border-[#D74141] text-[#D74141] font-semibold"
        @click="hideDropDown"
      >
        {{ item.label }}
      </NuxtLink>
      <p>
        {{ item.description }}
      </p>
    </div>
  </Popover>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  tab: Object,
})

const localePath = useLocalePath()
const op = ref()
const arrowPosition = ref(false)

const toggle = (event) => {
  op.value.toggle(event)
  arrowPosition.value = !arrowPosition.value
}

const hideDropDown = () => {
  op.value.hide()
  arrowPosition.value = false
}
</script>
