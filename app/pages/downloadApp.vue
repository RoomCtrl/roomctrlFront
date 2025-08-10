<template>
  <div class="flex flex-col lg:flex-row justify-between md:justify-center gap-5">
    <div class="flex flex flex-col gap-5">
      <DeviceSysCard
        :content="android"
        class="self-center"
      />
      <DeviceSysCard
        :content="ios"
        class="self-center"
      />
    </div>
    <div class="max-lg:flex max-lg:order-last max-lg:justify-center">
      <Card
        pt:root:class="h-full items-center py-2 max-lg:w-[90vw]"
      >
        <template #title>
          <h1 class="text-3xl text-center mb-[2vh] font-bold">
            {{ t('pages.downloadApp.androidIos') }}
          </h1>
        </template>
        <template #content>
          <div
            ref="containerRef"
            class="w-[20rem] md:w-[23rem] h-[40rem] md:h-[45rem]"
            @mousemove="handleMouseMove"
          >
            <ImageCompare
              ref="imageCompareRef"
              pt:root:class="image-compare-root h-full"
            >
              <template #right>
                <img
                  src="/images/app/android.png"
                  alt="Android"
                  class="compare-image"
                />
              </template>
              <template #left>
                <img
                  src="/images/app/ios.png"
                  alt="iOS"
                  class="compare-image"
                />
              </template>
            </ImageCompare>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import DeviceSysCard from '~/components/downloadApp/deviceSysCard.vue'

const { t } = useI18n()
const containerRef = ref()
const imageCompareRef = ref()

const android = {
  title: t('pages.downloadApp.android.title'),
  icon: 'pi pi-android',
  iconColor: 'green',
  items: [
    t('pages.downloadApp.android.list.1'),
    t('pages.downloadApp.android.list.2'),
    t('pages.downloadApp.android.list.3'),
    t('pages.downloadApp.android.list.4'),
    t('pages.downloadApp.android.list.5'),
  ],
}

const ios = {
  title: t('pages.downloadApp.ios.title'),
  icon: 'pi pi-apple',
  iconColor: 'gray',
  items: [
    t('pages.downloadApp.ios.list.1'),
    t('pages.downloadApp.ios.list.2'),
    t('pages.downloadApp.ios.list.3'),
  ],
}

const handleMouseMove = (event) => {
  if (!containerRef.value || !imageCompareRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = (x / rect.width) * 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage))

  const imageCompareEl = imageCompareRef.value.$el
  const slider = imageCompareEl.querySelector('.p-imagecompare-slider')
  if (slider) {
    slider.value = clampedPercentage
    const inputEvent = new Event('input', { bubbles: true })
    slider.dispatchEvent(inputEvent)
  }
}

onMounted(async () => {
  await nextTick()
})
</script>

<style scoped>
@media screen and (-webkit-min-device-pixel-ratio: 1) {
  .compare-image {
    -webkit-transform: translateZ(0) translate3d(0,0,0) !important;
    -webkit-backface-visibility: hidden !important;
    -webkit-perspective: 1000px !important;
  }
}
</style>
