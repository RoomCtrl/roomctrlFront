<template>
  <section>
    <Card>
      <template #content>
        <div class="split-content">
          <div class="split-text">
            <h2 class="section-heading">
              {{ $t('pages.home.forOrganizations.title') }}
            </h2>
            <p class="split-description">
              {{ $t('pages.home.forOrganizations.description') }}
            </p>
          </div>
          <div class="split-image">
            <Galleria
              :value="images"
              :showThumbnails="false"
              :showItemNavigators="true"
              :circular="true"
            >
              <template #item="slotProps">
                <img
                  :src="slotProps.item"
                  alt="Images of universities and companies which works with RoomCtrl"
                />
              </template>
            </Galleria>
          </div>
        </div>
      </template>
    </Card>
  </section>
</template>

<script setup lang="ts">
const images = ref([
  '/images/mainPage/room.jpg',
  '/images/mainPage/office.jpg',
  '/images/mainPage/office-building.jpg',
  '/images/mainPage/classroom.jpg',
])
</script>

<style scoped>
.section-heading {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.split-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  @apply xl:gap-[6rem]
}

.split-text .section-heading {
  margin-bottom: 1.5rem;
}

.split-description {
  font-size: 1.125rem;
  color: var(--p-gray-400);
  line-height: 1.7;
  @apply text-gray-600 dark:text-gray-400
}

.split-image {
  position: relative;
}

@media (max-width: 1200px) {
  .split-content {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .section-heading {
    font-size: 1.75rem;
  }
}
</style>
