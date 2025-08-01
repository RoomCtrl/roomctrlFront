<template>
  <div class="flex flex-col gap-4 mx-5 lg:gap-10 lg:mx-10 2xl:mx-20 2xl:gap-20">
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
