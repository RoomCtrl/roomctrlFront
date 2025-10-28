<template>
  <div class="flex flex-col gap-5">
    <LogoCarousel />

    <GoodBadSection />

    <InfoSection />
  </div>
</template>

<script setup lang="ts">
import GoodBadSection from '~/components/mainPage/GoodBadSection.vue'
import InfoSection from '~/components/mainPage/InfoSection.vue'
import LogoCarousel from '~/components/mainPage/LogoCarousel.vue'
</script>
