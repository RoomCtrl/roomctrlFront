<template>
  <Card
    class="col-span-1 md:col-span-4 lg:col-span-4"
    pt:root:class="overflow-hidden"
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
        v-if="!hasImage"
        class="text-center py-8 text-gray-400"
      >
        Brak zdjęcia
      </div>
      <div
        v-else
        class="flex justify-center"
      >
        <img
          :src="imageUrl"
          alt="Room image"
          class="max-w-full max-h-96 object-contain rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
          @click="showPreview = true"
          @error="handleImageError"
        />
      </div>
    </template>
  </Card>

  <Dialog
    v-model:visible="showPreview"
    :modal="true"
    :closable="true"
    class="w-[80vw] max-w-4xl"
    header="Podgląd"
  >
    <div class="flex justify-center">
      <img
        :src="imageUrl"
        alt="Preview"
        class="max-w-full max-h-[70vh] object-contain"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useRoom } from '~/composables/useRoom'

const props = defineProps<{
  roomId: string
}>()

const { getRoomImages } = useRoom()

const hasImage = ref(true)
const showPreview = ref(false)

const imageUrl = computed(() => getRoomImages(props.roomId))

const handleImageError = () => {
  hasImage.value = false
}
</script>
