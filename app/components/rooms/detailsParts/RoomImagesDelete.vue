<template>
  <Card
    class="col-span-1 md:col-span-4 lg:col-span-3"
    pt:root:class="overflow-hidden"
    pt:content:class="h-full"
    pt:body:class="h-full"
  >
    <template #header>
      <div class="p-4 pb-0">
        <h2 class="text-xl font-semibold">
          Obecne zdjęcia pokoju - kliknij aby usunąć
        </h2>
      </div>
    </template>
    <template #content>
      <div
        v-if="images.length === 0"
        class="flex items-center justify-center py-8 text-gray-400 h-full"
      >
        Brak zdjęcia
      </div>
      <div
        v-else
        class="flex justify-center"
      >
        <div class="card flex justify-center">
          <Galleria
            v-model:activeIndex="activeIndex"
            v-model:visible="displayCustom"
            :value="images"
            :numVisible="7"
            containerStyle="max-width: 850px"
            :circular="true"
            :fullScreen="true"
            :showItemNavigators="true"
            :showThumbnails="true"
          >
            <template #item="slotProps">
              <img
                :src="slotProps.item"
                alt="TEST"
                style="width: 100%; display: block"
              />
            </template>
            <template #thumbnail="slotProps">
              <img
                :src="slotProps.item"
                alt="Test"
                style="display: block"
              />
            </template>
          </Galleria>
          <div
            v-if="images"
            class="grid grid-cols-12 gap-4"
            style="max-width: 400px"
          >
            <div
              v-for="(image, index) of images"
              :key="index"
              class="col-span-4"
            >
              <div class="flex items-center justify-center w-full bg-red-500 z-20 flex">
                <i
                  class="pi pi-times absolute z-10"
                  style="color: var(--p-red-950)"
                />
                <img
                  :src="image"
                  alt="Room image"
                  style="cursor: pointer"
                  class="hover:opacity-10 z-20"
                  @click="deleteImage(index)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useRoom } from '~/composables/useRoom'

const props = defineProps<{
  roomId: string
}>()

const { getRoomImagesURL, getRoomImage, deleteSingleRoomImage } = useRoom()
const confirm = useConfirm()

const activeIndex = ref(0)
const displayCustom = ref(false)
const images = ref<string[]>([])

const { imagePaths } = await getRoomImagesURL(props.roomId)

const loadImages = async () => {
  images.value = []
  for (let i = 0; i < imagePaths.length; i++) {
    images.value.push(await getRoomImage(props.roomId, i))
  }

  if (activeIndex.value >= images.value.length) {
    activeIndex.value = images.value.length - 1
  }
}

const deleteImage = async (index: number) => {
  confirm.require({
    message: 'Czy na pewno chcesz usunąć to zdjęcie?',
    header: 'Potwierdzenie usunięcia',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Tak, usuń',
    rejectLabel: 'Anuluj',
    acceptClass: 'p-button-danger',
    accept: async () => {
      await deleteSingleRoomImage(props.roomId, index)
      await loadImages()
    },
  })
}

watch(imagePaths, async () => {
  images.value = []
  for (let i = 0; i < imagePaths.length; i++) {
    images.value.push(await getRoomImage(props.roomId, i))
  }
})

watch(imagePaths, async () => {
  await loadImages()
})

onMounted(loadImages)

onUnmounted(() => {
  images.value.forEach(url => URL.revokeObjectURL(url))
})
</script>

<style scoped>
.p-card {
  --p-card-background: var(--p-gray-200)
}
.dark .p-card {
  --p-card-background: var(--p-neutral-900)
}
</style>
