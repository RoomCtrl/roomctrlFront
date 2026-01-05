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
          {{ $t('pages.roomDetails.images.title') }}
        </h2>
      </div>
    </template>
    <template #content>
      <div
        v-if="images.length === 0"
        class="flex items-center justify-center py-8 text-gray-400 h-full"
      >
        {{ $t('pages.roomDetails.images.noImages') }}
      </div>
      <div v-else class="gallery-wrapper">
        <Galleria
          v-model:activeIndex="activeIndex"
          :value="images"
          :numVisible="5"
          :circular="true"
          :showItemNavigators="false"
          :showThumbnails="true"
          :showIndicators="false"
          :responsiveOptions="responsiveOptions"
          :pt="{
            root: { class: 'gallery-root' },
            content: { class: 'gallery-content' },
            itemsContainer: { class: 'gallery-items-container' },
            item: { class: 'gallery-item' },
            thumbnails: { class: 'gallery-thumbnails' },
            thumbnailItem: { class: 'gallery-thumbnail-item' }
          }"
        >
          <template #item="slotProps">
            <div class="main-image-container">
              <img
                :src="slotProps.item"
                alt="Room image"
                class="main-image"
                @click="openFullscreen"
              />
              <div class="zoom-overlay" @click="openFullscreen">
                <i class="pi pi-expand text-white text-2xl" />
              </div>
              <!-- Custom navigation arrows inside image -->
              <button v-if="images.length > 1" class="image-nav image-nav-prev" @click.stop="prevImage">
                <i class="pi pi-chevron-left" />
              </button>
              <button v-if="images.length > 1" class="image-nav image-nav-next" @click.stop="nextImage">
                <i class="pi pi-chevron-right" />
              </button>
            </div>
          </template>
          <template #thumbnail="slotProps">
            <img
              :src="slotProps.item"
              alt="Thumbnail"
              class="thumbnail-image"
            />
          </template>
        </Galleria>

        <!-- Fullscreen Overlay -->
        <Teleport to="body">
          <div v-if="displayFullscreen" class="fullscreen-overlay" @click.self="displayFullscreen = false">
            <button class="fullscreen-close" @click="displayFullscreen = false">
              <i class="pi pi-times" />
            </button>
            <button class="fullscreen-nav fullscreen-prev" @click="prevImage">
              <i class="pi pi-chevron-left" />
            </button>
            <img
              :src="images[activeIndex]"
              alt="Room image"
              class="fullscreen-image"
            />
            <button class="fullscreen-nav fullscreen-next" @click="nextImage">
              <i class="pi pi-chevron-right" />
            </button>
            <div class="fullscreen-counter">
              {{ activeIndex + 1 }} / {{ images.length }}
            </div>
          </div>
        </Teleport>
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
const displayFullscreen = ref(false)
const images = ref<string[]>([])

const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 5,
  },
  {
    breakpoint: '768px',
    numVisible: 4,
  },
  {
    breakpoint: '560px',
    numVisible: 3,
  },
])

const { imagePaths } = await getRoomImagesURL(props.roomId)

const openFullscreen = () => {
  displayFullscreen.value = true
}

const prevImage = () => {
  activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : images.value.length - 1
}

const nextImage = () => {
  activeIndex.value = activeIndex.value < images.value.length - 1 ? activeIndex.value + 1 : 0
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

<style scoped>
.gallery-wrapper {
  width: 100%;
}

/* Main gallery styles */
:deep(.gallery-root) {
  width: 100%;
}

:deep(.gallery-content) {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

:deep(.gallery-items-container) {
  position: relative;
}

:deep(.gallery-item) {
  display: flex;
  justify-content: center;
}

.main-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  max-height: 280px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: var(--p-surface-100);
}

.dark .main-image-container {
  background: var(--p-surface-800);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-image-container:hover .main-image {
  transform: scale(1.02);
}

.zoom-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.main-image-container:hover .zoom-overlay {
  opacity: 1;
}

/* Custom navigation buttons inside image container */
.image-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.image-nav:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.image-nav .pi {
  font-size: 1rem;
}

.image-nav-prev {
  left: 0.75rem;
}

.image-nav-next {
  right: 0.75rem;
}

/* Thumbnails */
:deep(.gallery-thumbnails) {
  padding: 0;
}

:deep(.gallery-thumbnail-item) {
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

:deep(.gallery-thumbnail-item:hover),
:deep(.p-galleria-thumbnail-item-current) {
  opacity: 1;
}

.thumbnail-image {
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

/* Fullscreen overlay */
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10000;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.fullscreen-close:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: white;
}

.fullscreen-close .pi {
  font-size: 1.25rem;
}

.fullscreen-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10000;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.fullscreen-nav:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: white;
}

.fullscreen-nav .pi {
  font-size: 1.5rem;
}

.fullscreen-prev {
  left: 1.5rem;
}

.fullscreen-next {
  right: 1.5rem;
}

.fullscreen-image {
  max-width: calc(100vw - 10rem);
  max-height: calc(100vh - 4rem);
  object-fit: contain;
  border-radius: 8px;
}

.fullscreen-counter {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .thumbnail-image {
    height: 50px;
  }

  .fullscreen-nav {
    width: 2.75rem;
    height: 2.75rem;
  }

  .fullscreen-prev {
    left: 0.5rem;
  }

  .fullscreen-next {
    right: 0.5rem;
  }

  .fullscreen-close {
    width: 2.5rem;
    height: 2.5rem;
  }

  .fullscreen-image {
    max-width: calc(100vw - 5rem);
    max-height: calc(100vh - 3rem);
  }
}
</style>
