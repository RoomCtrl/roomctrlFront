<template>
  <div class="scroll-wrapper mt-[-5rem] mb-[-4rem]">
    <!-- Sekcja 1: Logo Carousel -->
    <section class="section section-1">
      <div class="section-overlay" />
      <div class="section-content">
        <LogoCarousel />
      </div>
    </section>

    <!-- Sekcja 2: Good/Bad Section -->
    <section class="section section-2">
      <div class="section-overlay" />
      <div class="section-content">
        <GoodBadSection />
      </div>
    </section>

    <!-- Sekcja 3: Info Section -->
    <section class="section section-3">
      <div class="section-overlay" />
      <div class="section-content">
        <InfoSection />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import GoodBadSection from '~/components/mainPage/GoodBadSection.vue'
import InfoSection from '~/components/mainPage/InfoSection.vue'
import LogoCarousel from '~/components/mainPage/LogoCarousel.vue'
</script>

<style scoped>
.scroll-wrapper {
  width: 100%;
  height: 79vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 4rem 2rem;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.section-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.section-content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
}

.section-1 {
  background-image: url('/images/mainPage/planning.jpg');
}

.section-2 {
  background-image: url('/images/mainPage/compare.jpg');
}

.section-3 {
  background-image: url('/images/mainPage/school.jpg');
}

@media (max-width: 1024px) {
  .section {
    padding: 3rem 1.5rem;
    background-attachment: scroll;
  }
}

@media (max-width: 768px) {
  .section {
    min-height: auto;
    padding: 2rem 1rem;
  }
}
</style>
