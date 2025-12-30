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
          Zdjęcie sali
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
              <img
                :src="image"
                alt="Room image"
                style="cursor: pointer"
                @click="imageClick(index)"
              />
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

const { getRoomImagesURL, getRoomImage } = useRoom()

const activeIndex = ref(0)
const displayCustom = ref(false)
const images = ref<string[]>([])

const { imagePaths } = await getRoomImagesURL(props.roomId)

const imageClick = (index) => {
  activeIndex.value = index
  displayCustom.value = true
}

onMounted(async () => {
  for (let i = 0; i < imagePaths.length; i++) {
    images.value.push(await getRoomImage(props.roomId, i))
  }
})

onUnmounted(() => {
  if (images.value) {
    URL.revokeObjectURL(images.value.toString())
  }
})
</script>
