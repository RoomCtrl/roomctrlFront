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
        v-if="imagesTest.length === 0"
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
            :value="imagesTest"
            :numVisible="7"
            containerStyle="max-width: 850px"
            :circular="true"
            :fullScreen="true"
            :showItemNavigators="true"
            :showThumbnails="false"
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
                :src="slotProps.item.thumbnailImageSrc"
                :alt="slotProps.item.alt"
                style="display: block"
              />
            </template>
          </Galleria>
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
const imageUrl = ref<string[]>([])

const imagesTest = ref<string[]>([])

const loadImage = async () => {
  imageUrl.value = await getRoomImagesURL(props.roomId)

  for (let i = 0; i < imageUrl.value.length; i++) {
    imagesTest.value.push(await getRoomImage(props.roomId, i))
  }
}

onMounted(() => {
  loadImage()
})

onUnmounted(() => {
  if (imagesTest.value) {
    URL.revokeObjectURL(imagesTest.value)
  }
})
</script>
