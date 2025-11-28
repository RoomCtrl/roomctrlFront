<template>
  <div class="flex flex-col lg:flex-row justify-around items-center w-full gap-5">
    <div class="order-1">
      <DeviceSysCard
        :content="android"
      />
    </div>
    <div class="order-3">
      <DeviceSysCard
        :content="ios"
      />
    </div>
    <div class="max-lg:flex order-2 max-lg:order-last max-lg:justify-center">
      <Card
        pt:root:class="h-full items-center py-2 max-lg:w-[90vw]"
      >
        <template #title>
          <h1 class="text-3xl text-center mb-[2vh] font-bold">
            {{ t('pages.downloadApp.androidIos') }}
          </h1>
        </template>
        <template #content>
          <ClientOnly>
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
                    :src="'/images/app/' + androidImg"
                    alt="Android"
                    class="compare-image"
                  />
                </template>
                <template #left>
                  <img
                    :src="'/images/app/' + iosImg"
                    alt="iOS"
                    class="compare-image"
                  />
                </template>
              </ImageCompare>
            </div>
            <template #fallback>
              <div class="w-[20rem] md:w-[23rem] h-[40rem] md:h-[45rem] flex justify-center items-center">
                <ProgressSpinner />
              </div>
            </template>
          </ClientOnly>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import DeviceSysCard from '~/components/downloadApp/deviceSysCard.vue'

const { t } = useI18n()
const colorMode = useColorMode()
const containerRef = ref()
const imageCompareRef = ref()
const isMounted = ref(false)

const androidImg = computed(() => {
  if (!isMounted.value) return 'android.png'
  return colorMode.value === 'dark' ? 'android_dark.png' : 'android.png'
})

const iosImg = computed(() => {
  if (!isMounted.value) return 'ios.png'
  return colorMode.value === 'dark' ? 'ios_dark.png' : 'ios.png'
})
const android = {
  id: 'android',
  title: t('pages.downloadApp.android.title'),
  icon: 'pi pi-android',
  iconColor: 'green',
  list: [{
    key: 'minVersion',
    value: 'Android 6.0',
  }, {
    key: 'size',
    value: '20 MB',
  }],
  rating: 4,
}

const ios = {
  od: 'ios',
  title: t('pages.downloadApp.ios.title'),
  icon: 'pi pi-apple',
  iconColor: 'gray',
  list: [{
    key: 'minVersion',
    value: 'iOS 13.0',
  }, {
    key: 'size',
    value: '25 MB',
  }],
  rating: 4,
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

  isMounted.value = true
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
