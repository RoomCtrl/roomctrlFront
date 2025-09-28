<template>
  <Panel
    :header="$t('pages.roomDetails.equipment.title')"
    pt:content:class="flex flex-col lg:grid lg:grid-cols-1 xl:grid-cols-2 gap-2 w-[95%] self-center"
    pt:header:class="text-2xl 2xl:text-3xl font-semibold mb-3"
    :toggleable="isMobile"
  >
    <Card
      v-for="equipment in equpiments"
      :key="equipment.name"
      pt:root:class="overflow-hidden"
      pt:body:class="bg-gray-500/20"
    >
      <template #content>
        <div class="flex flex-row gap-2 items-center">
          <i :class="equipmentIcon(equipment.category)" />
          <h1 class="truncate">
            {{ equipment.quantity + 'x ' + equipment.name }}
          </h1>
        </div>
      </template>
    </Card>
  </Panel>
</template>

<script setup lang="ts">
defineProps<{
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
