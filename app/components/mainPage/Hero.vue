<template>
  <section class="pr-[2rem] w-full">
    <div class="grid grid-cols-2 gap-24 items-center">
      <div class="hero-left ">
        <Card
          :pt="{
            root: { class: '',
            },
          }"
        >
          <template #title>
            <h1 class="main-heading">
              {{ $t('pages.home.hero.title') }}
              <span class="block text-[#ad3636ff]">{{ $t('pages.home.hero.titleAccent') }}</span>
            </h1>
          </template>
          <template #subtitle>
            <p class="hero-description">
              {{ $t('pages.home.hero.description') }}
            </p>
          </template>
          <template #content>
            <div class="flex flex-wrap gap-4 mb-2">
              <NuxtLink
                to="/rooms"
                class="btn btn-dark"
              >
                {{ $t('pages.home.hero.bookRoom') }}
                <i class="pi pi-arrow-right" />
              </NuxtLink>
              <NuxtLink
                to="/downloadApp"
                class="btn btn-outline"
              >
                <i class="pi pi-download" />
                {{ $t('pages.home.hero.downloadApp') }}
              </NuxtLink>
            </div>
          </template>
          <template #footer>
            <div class="trust-indicators">
              <div class="indicator">
                <i class="pi pi-user" />
                <div>
                  <strong>{{ animatedUsers }}+</strong> {{ $t('pages.home.hero.users') }}
                </div>
              </div>
              <div class="indicator">
                <i class="pi pi-face-smile" />
                <div>
                  <strong>{{ animatedSatisfaction }}%</strong> {{ $t('pages.home.hero.satisfaction') }}
                </div>
              </div>
              <div class="indicator flex items-center gap-2">
                <i class="pi pi-spin pi-clock" />
                <div>
                  <strong>24/7</strong> {{ $t('pages.home.hero.availability') }}
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <CalendarModel />
    </div>
  </section>
</template>

<script setup lang="ts">
import CalendarModel from './CalendarModel.vue'

const days = ref(28)

function randomRentNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const rentsPerDay = ref<number[]>([])
const animatedUsers = ref(0)
const animatedSatisfaction = ref(0)

const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
  const startTime = performance.now()
  const range = end - start

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = Math.floor(start + range * easeOutQuart)

    callback(currentValue)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  rentsPerDay.value = Array.from(
    { length: days.value },
    () => randomRentNumber(0, 4),
  )

  animateValue(0, 2000, 2000, (value) => {
    animatedUsers.value = value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value
  })

  animateValue(0, 98, 2000, (value) => {
    animatedSatisfaction.value = value
  })
})
</script>

<style scoped>
.hero-left {
  animation: slideInLeft 0.8s ease-out;
}

.main-heading {
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.2rem;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  margin-right: 7rem;
}
.dark .hero-description {
  color: #d1d5db;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.btn-dark {
  background: #111827;
  color: white;
}

.dark .btn-dark {
  background: white;
  color: #111827;
}

.btn-dark:hover {
  background: #1f2937d0;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.dark .btn-dark:hover {
  background: lightgray;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.btn-outline {
  background: transparent;
  color: #111827;
  border-color: #e5e7eb;
}

.btn-outline:hover {
  border-color: #111827;
  background: #f9fafb;
}

.dark .btn-outline {
  background: transparent;
  border-color: var(--p-neutral-700);
  color: #e5e7eb;
}

.dark .btn-outline:hover {
  border-color: #f9fafb;
}

.trust-indicators {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.indicator {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.indicator strong {
  font-weight: 700;
  font-size: 1rem;
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
}

.image-wrapper {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.btn-white {
  background: white;
  color: #6366f1;
}

.btn-white:hover {
  background: #f9fafb;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-ghost {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: white;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@media (max-width: 1200px) {
  .hero-grid,
  .split-content {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .hero-right {
    order: -1;
  }

  .hero-visual {
    height: 450px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 5rem 1.5rem 4rem;
  }

  .main-heading {
    font-size: 3rem;
  }

  .section-heading {
    font-size: 2rem;
  }

  .cta-heading {
    font-size: 2.25rem;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-visual {
    height: 400px;
  }

  .floating-card {
    padding: 0.75rem 1rem;
  }

  .card-1,
  .card-2,
  .card-3 {
    position: static;
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .main-heading {
    font-size: 2.25rem;
  }

  .section-heading {
    font-size: 1.75rem;
  }

  .cta-heading {
    font-size: 1.875rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .trust-indicators {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
