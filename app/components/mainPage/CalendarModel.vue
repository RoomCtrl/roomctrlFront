<template>
  <div class="hero-visual hero-right max-xl:w-[85vw]">
    <div class="floating-card card-1 left-[-5%] xl:left:-10%;">
      <i
        class="pi pi-calendar-plus"
        style="color: var(--p-green-500)"
      />
      <div>
        <div class="card-title">
          Nowa Rezerwacja
        </div>
        <div class="card-subtitle">
          Sala A-201
        </div>
      </div>
    </div>
    <div class="floating-card card-2">
      <i
        class="pi pi-check-circle"
        style="color: var(--p-green-600)"
      />
      <div>
        <div class="card-title">
          Potwierdzona
        </div>
        <div class="card-subtitle">
          Dziś o 14:00
        </div>
      </div>
    </div>
    <div class="floating-card card-3">
      <i
        class="pi pi-bell"
        style="color: var(--p-yellow-500)"
      />
      <div>
        <div class="card-title">
          Przypomnienie
        </div>
        <div class="card-subtitle">
          Za 30 minut
        </div>
      </div>
    </div>
    <div class="main-visual-card">
      <div class="calendar-preview">
        <div class="calendar-header">
          Grudzień 2025
        </div>
        <div class="calendar-grid">
          <div
            v-for="i in days"
            :key="i"
            class="calendar-day"
            :class="{ active: i === today }"
          >
            {{ i }}
            <div class="flex flex-col w-full items-center gap-1">
              <div
                v-for="j in rentsPerDay[i-1]"
                :key="j"
                :class="[
                  { 'bg-blue-400 dark:bg-blue-800': i < 13, 'bg-green-500 dark:bg-green-800': i >= 13, 'bg-red-500 dark:bg-red-800': j % 3 === 0 && i <13 },
                  'h-1 2xl:h-2 w-[80%] rounded-full',
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const days = ref(28)
const today = new Date().getDate()

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
    () => randomRentNumber(0, 3),
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
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-right {
  position: relative;
  animation: slideInRight 0.8s ease-out;
}

.hero-visual {
  position: relative;
  height: 600px;
}

.floating-card {
  position: absolute;
  background: white;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #f3f4f6;
  z-index: 2;
}

.dark .floating-card {
  background: var(--p-gray-800);
  border: 1px solid #262626;
  box-shadow: 0 4px 16px rgba(161, 158, 158, 0.08);
}

.floating-card i {
  font-size: 1.5rem;
}

.card-title {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.card-subtitle {
  font-size: 0.75rem;
  color: #6b7280;
}

.card-1 {
  top: 20%;
  animation: float 3s ease-in-out infinite;
}

.card-2 {
  top: 40%;
  animation: float 3s ease-in-out infinite 0.5s;
  @apply right-[-3%];
}

.card-3 {
  bottom: 15%;
  left: 0;
  animation: float 3s ease-in-out infinite 1s;
}

.main-visual-card {
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  @apply flex flex-col items-center bg-white;
}

.dark .main-visual-card {
  background: #262626;
  border: 1px solid #262626;
  box-shadow: 0 20px 60px rgba(255, 255, 255, 0.1);
}

.calendar-preview {
  @apply flex flex-col justify-center w-[80%] xl:w-full;
}

.calendar-header {
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #6b7280;
  transition: all 0.2s;
  background-color: #e5e7eb4f ;
  box-shadow: 2px 4px #e5e7eb;
  gap: 1rem;
}

.dark .calendar-day {
  background-color: var(--p-zinc-900) ;
  box-shadow: 2px 4px var(--p-neutral-700);
}

.calendar-day:hover {
  background: var(--p-gray-200);
  box-shadow: 2px 4px var(--p-gray-300);
}

.dark .calendar-day:hover {
  background: #374151;
}

.calendar-day.active {
  background: var(--p-amber-400);
  box-shadow: 2px 4px var(--p-amber-900);
  color: white;
  font-weight: 600;
}

.dark .calendar-day.active {
  background: var(--p-yellow-700);
  box-shadow: 2px 4px var(--p-yellow-900);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-intro {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-heading {
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
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

/* Animations */
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
