<template>
  <div class="grid grid-cols-3 gap-5">
    <LogoCarousel class="col-span-3" />

    <GoodBadSection />

    <InfoSection class="col-span-2" />
  </div>
</template>

<script setup lang="ts">
import GoodBadSection from '~/components/mainPage/GoodBadSection.vue'
import InfoSection from '~/components/mainPage/InfoSection.vue'
import LogoCarousel from '~/components/mainPage/LogoCarousel.vue'
</script>
