<template>
  <div class="scroll-wrapper flex flex-col mt-[-2rem] mb-[-2rem] gap-5">
    <section class="section section-1">
      <div class="section-overlay" />
      <div class="section-content">
        <LogoCarousel />
      </div>
    </section>

    <section class="section section-2">
      <div class="section-overlay" />
      <div class="section-content ">
        <InfoSection />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import InfoSection from '~/components/mainPage/InfoSection.vue'
import LogoCarousel from '~/components/mainPage/VisitView.vue'
</script>

<style scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
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
  -webkit-mask-image:
    linear-gradient(to right,
      rgba(0,0,0,0),
      rgba(0,0,0,1) 1%,
      rgba(0,0,0,1) 99%,
      rgba(0,0,0,0)
    ),

    linear-gradient(to bottom,
      rgba(0,0,0,0),
      rgba(0,0,0,1) 0.9%,
      rgba(0,0,0,1) 99.1%,
      rgba(0,0,0,0)
    );

  -webkit-mask-composite: intersect;
  mask-composite: intersect;
  mask-repeat: no-repeat;
  mask-size: cover;
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
}

.section-1 {
  background-image: url('/images/mainPage/planning.jpg');
}

.section-2 {
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
