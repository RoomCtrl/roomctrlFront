<template>
  <Panel
    :header="$t('pages.roomDetails.equipment.title')"
    pt:content:class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-2 gap-2 w-[95%] self-center"
    pt:header:class="text-xl sm:text-2xl 2xl:text-3xl font-semibold mb-3"
    :toggleable="isMobile"
  >
    <Card
      v-for="equipment in paddedEquipments"
      :key="equipment.name || Math.random()"
      pt:root:class="overflow-hidden"
      pt:body:class="bg-gray-500/20"
    >
      <template #content>
        <div
          class="flex flex-row gap-2 items-center"
          :class="{ 'opacity-30': !equipment.name }"
        >
          <i :class="equipment.name ? equipmentIcon(equipment.category) : 'pi pi-inbox'" class="text-sm sm:text-base" />
          <h1 
            ref="equipmentTextRefs"
            v-tooltip.top="getTooltipConfig(equipment)"
            class="truncate text-xs sm:text-sm"
            @mouseenter="(e) => checkOverflow(e.target, equipment)"
          >
            {{ equipment.name ? equipment.quantity + 'x ' + equipment.name : '---' }}
          </h1>
        </div>
      </template>
    </Card>
  </Panel>
</template>

<script setup lang="ts">
const props = defineProps<{
  equpiments: [{
    name: string
    category: string
    quantity: number
  }]
}>()

const equipmentIcon = (equpiment: string) => {
  switch (equpiment) {
    case 'video': {
      return 'pi pi-desktop'
    }
    default: {
      return 'pi pi-user'
    }
  }
}

const paddedEquipments = computed(() => {
  const arr = [...props.equpiments]
  while (arr.length < 8) {
    arr.push({ name: '', quantity: 0, category: 'empty' })
  }
  return arr
})

const overflowStates = ref<Map<string, boolean>>(new Map())

const checkOverflow = (element: HTMLElement, equipment: any) => {
  if (element && equipment.name) {
    const isOverflowing = element.scrollWidth > element.clientWidth
    overflowStates.value.set(equipment.name, isOverflowing)
  }
}

const getTooltipConfig = (equipment: any) => {
  if (!equipment.name) return null
  const isOverflowing = overflowStates.value.get(equipment.name)
  return isOverflowing ? equipment.quantity + 'x ' + equipment.name : null
}

const isMobile = ref(false)

function checkIsMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobile)
})
</script>
