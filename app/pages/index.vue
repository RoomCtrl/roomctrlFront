<template>
  <div class="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
    <Hero />

    <HowThisWorkSection />

    <ForOrganizations />

    <section class="w-full">
      <Card class="w-full">
        <template #title>
          <div class="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {{ $t('pages.home.benefits.title') }}
            </h2>
          </div>
        </template>
        <template #content>
          <InfoSection />
        </template>
      </Card>
    </section>

    <section class="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-red-400 to-[#ad3636ff]">
      <div class="max-w-4xl mx-auto text-center">
        <div class="space-y-4 sm:space-y-6 md:space-y-8">
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight px-2">
            {{ $t('pages.home.cta.title') }}
          </h2>
          <p class="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto px-4">
            {{ $t('pages.home.cta.description') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4 px-4">
            <NuxtLink
              :to="localePath('/login')"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              {{ $t('pages.home.cta.startNow') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/contact')"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-white/15 text-white border-2 border-white/30 rounded-xl hover:bg-white/25 hover:border-white transition-all duration-200 backdrop-blur-sm"
            >
              {{ $t('pages.home.cta.contact') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ForOrganizations from '~/components/mainPage/ForOrganizations.vue'
import Hero from '~/components/mainPage/Hero.vue'
import HowThisWorkSection from '~/components/mainPage/howThisWorkSection.vue'
import InfoSection from '~/components/mainPage/InfoSection.vue'

const localePath = useLocalePath()
</script>

<style scoped>
.text-accent {
  display: block;
  color: #ad3636ff;
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
