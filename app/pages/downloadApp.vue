<template>
  <div class="w-full">
    <section class="bg-white dark:bg-neutral-800 py-8 rounded-2xl shadow-md">
      <div class="flex justify-center w-full ">
        <div>
          <h1 class="hero-title">
            {{ t('pages.downloadApp.title') }}
          </h1>
          <p class="hero-description">
            {{ t('pages.downloadApp.description') }}
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="pi pi-download" />
              </div>
              <div>
                <div class="stat-value">
                  10K+
                </div>
                <div class="stat-label">
                  {{ t('pages.downloadApp.downloads') }}
                </div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="pi pi-star-fill" />
              </div>
              <div>
                <div class="stat-value">
                  4.8
                </div>
                <div class="stat-label">
                  {{ t('pages.downloadApp.rating') }}
                </div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="pi pi-users" />
              </div>
              <div>
                <div class="stat-value">
                  5K+
                </div>
                <div class="stat-label">
                  {{ t('pages.downloadApp.users') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full">
      <div class="w-full">
        <div class="flex justify-center">
          <div class="text-center mt-8 p-4 bg-white dark:bg-neutral-800 rounded-xl">
            <h2 class="text-3xl font-bold">
              {{ t('pages.downloadApp.chooseYourPlatform') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              {{ t('pages.downloadApp.availableOn') }}
            </p>
          </div>
        </div>
        <div class="download-preview-grid">
          <div class="flex justify-center items-center h-full">
            <div class="side-card">
              <DeviceSysCard :content="android" />
            </div>
          </div>

          <div class="flex justify-center">
            <div class="preview-card">
              <div class="preview-header">
                <h2>{{ t('pages.downloadApp.androidIos') }}</h2>
                <p>{{ t('pages.downloadApp.compareText') }}</p>
              </div>

              <!-- Wybór ekranu -->
              <div class="screen-selector">
                <button
                  v-for="screen in screens"
                  :key="screen.key"
                  :class="['screen-btn', { active: selectedScreen === screen.key }]"
                  @click="selectedScreen = screen.key"
                >
                  <i :class="screen.icon" />
                  <span>{{ t(`pages.downloadApp.screens.${screen.key}`) }}</span>
                </button>
              </div>

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

              <!-- Platformy indicator -->
              <div class="platform-indicators">
                <div class="platform-label android">
                  <i class="pi pi-android" />
                  <span>Android</span>
                </div>
                <div class="platform-label ios">
                  <i class="pi pi-apple" />
                  <span>iOS</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center h-full">
            <div class="side-card">
              <DeviceSysCard :content="ios" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="w-full">
        <div class="text-center">
          <h2 class="text-2xl font-bold">
            {{ t('pages.downloadApp.featuresTitle') }}
          </h2>
          <p>{{ t('pages.downloadApp.featuresSubtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 mt-8">
          <div
            v-for="feature in features"
            :key="feature.icon"
            class="feature-card"
          >
            <div class="flex flex-col items-center gap-3 pb-4 text-center">
              <div class="feature-icon">
                <i :class="feature.icon" />
              </div>
              <h3>{{ t(`pages.downloadApp.features.${feature.key}.title`) }}</h3>
            </div>

            <p>{{ t(`pages.downloadApp.features.${feature.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import DeviceSysCard from '~/components/downloadApp/deviceSysCard.vue'

const { t } = useI18n()
const colorMode = useColorMode()
const containerRef = ref()
const imageCompareRef = ref()
const isMounted = ref(false)
const selectedScreen = ref('main')

const screens = [
  { key: 'main', icon: 'pi pi-home' },
  { key: 'rooms', icon: 'pi pi-building' },
  { key: 'roomDetails', icon: 'pi pi-info-circle' },
  { key: 'calendar', icon: 'pi pi-calendar' },
  { key: 'booking', icon: 'pi pi-check-square' },
]

const screenFileMap = {
  main: { android: 'android_main', ios: 'ios_main' },
  rooms: { android: 'android_rooms', ios: 'ios_rooms' },
  roomDetails: { android: 'android_room_det', ios: 'ios_room_det' },
  calendar: { android: 'android_calendar', ios: 'ios_calendar' },
  booking: { android: 'android_booking', ios: 'ios_booking' },
}

const androidImg = computed(() => {
  if (!isMounted.value) return 'android_main.png'
  const base = screenFileMap[selectedScreen.value].android
  return colorMode.value === 'dark' ? `${base}_dark.png` : `${base}.png`
})

const iosImg = computed(() => {
  if (!isMounted.value) return 'ios_main.png'
  const base = screenFileMap[selectedScreen.value].ios
  return colorMode.value === 'dark' ? `${base}_dark.png` : `${base}.png`
})

const android = {
  id: 'android',
  title: t('pages.downloadApp.android.title'),
  icon: 'pi pi-android',
  iconColor: '#3DDC84',
  list: [{
    key: 'minVersion',
    value: 'Android 6.0',
  }, {
    key: 'size',
    value: '20 MB',
  }, {
    key: 'lastUpdate',
    value: t('pages.downloadApp.recentlyUpdated'),
  }],
  rating: 4.5,
}

const ios = {
  id: 'ios',
  title: t('pages.downloadApp.ios.title'),
  icon: 'pi pi-apple',
  iconColor: '#555555',
  list: [{
    key: 'minVersion',
    value: 'iOS 13.0',
  }, {
    key: 'size',
    value: '25 MB',
  }, {
    key: 'lastUpdate',
    value: t('pages.downloadApp.recentlyUpdated'),
  }],
  rating: 4.5,
}

const features = [
  { icon: 'pi pi-calendar', key: 'booking' },
  { icon: 'pi pi-bell', key: 'notifications' },
  { icon: 'pi pi-qrcode', key: 'qrcode' },
  { icon: 'pi pi-shield', key: 'security' },
  { icon: 'pi pi-mobile', key: 'responsive' },
  { icon: 'pi pi-sync', key: 'sync' },
]

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
.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #111827;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.dark .hero-title {
  color: #f9fafb;
}

.hero-description {
  font-size: 1.25rem;
  color: #6b7280;
  line-height: 1.7;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.dark .hero-description {
  color: #9ca3af;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 3rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 16px;
  background: var(--p-red-800);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(246, 59, 59, 0.3);
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
}

.dark .stat-value {
  color: #f9fafb;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.dark .stat-label {
  color: #9ca3af;
}

.download-preview-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 2rem;
  align-items: start;
  margin-top: 3rem;
}

.side-card {
  display: flex;
  justify-content: center;
}

.preview-section {
  padding: 4rem 0;
}

.preview-wrapper {
  display: flex;
  justify-content: center;
}

.preview-card {
  background: white;
  border-radius: 32px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.dark .preview-card {
  background: var(--p-neutral-800);
  border-color: rgba(255, 255, 255, 0.1);
}

.preview-header {
  text-align: center;
  margin-bottom: 2rem;
}

.preview-header h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

/* Screen Selector */
.screen-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.screen-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .screen-btn {
  background: var(--p-neutral-700);
  border-color: var(--p-neutral-600);
  color: #9ca3af;
}

.screen-btn:hover {
  border-color: var(--p-red-400);
  color: var(--p-red-600);
}

.dark .screen-btn:hover {
  border-color: var(--p-red-400);
  color: var(--p-red-400);
}

.screen-btn.active {
  background: var(--p-red-800);
  border-color: var(--p-red-800);
  color: white;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.screen-btn i {
  font-size: 1rem;
}

/* Platform Indicators */
.platform-indicators {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1.5rem;
  padding: 0 1rem;
}

.platform-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.platform-label.android {
  background: rgba(61, 220, 132, 0.15);
  color: #3DDC84;
}

.platform-label.ios {
  background: rgba(100, 100, 100, 0.15);
  color: #666;
}

.dark .platform-label.ios {
  background: rgba(200, 200, 200, 0.15);
  color: #ccc;
}

.platform-label i {
  font-size: 1.1rem;
}

.download-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

/* Features Section */
.features-section {
  padding: 4rem 0 6rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dark .feature-card {
  background: var(--p-neutral-800);
  border-color: rgba(255, 255, 255, 0.1);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 14px;
  background: var(--p-red-800);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(246, 59, 59, 0.3);
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.dark .feature-card h3 {
  color: #f9fafb;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.975rem;
}

.dark .feature-card p {
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 1280px) {
  .side-card > * {
    max-width: 350px;
  }
}

@media (max-width: 1024px) {
  .download-preview-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .download-preview-grid > div:first-child {
    order: 2;
  }

  .download-preview-grid > div:nth-child(2) {
    order: 1;
  }

  .download-preview-grid > div:last-child {
    order: 3;
  }

  .side-card {
    width: 100%;
  }

  .side-card > * {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .preview-card {
    padding: 1.5rem;
  }

  .image-compare-container {
    height: 400px;
  }

  .download-cards {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .screen-selector {
    gap: 0.4rem;
  }

  .screen-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }

  .screen-btn i {
    font-size: 0.875rem;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1) {
  .compare-image {
    -webkit-transform: translateZ(0) translate3d(0,0,0) !important;
    -webkit-backface-visibility: hidden !important;
    -webkit-perspective: 1000px !important;
  }
}
</style>
