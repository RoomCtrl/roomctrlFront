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
                <img :src="slotProps.item" />
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
  '/images/mainPage/meeting.jpg',
  '/images/mainPage/school.jpg',
])
</script>

<style scoped>
.section-heading {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.split-section {
  padding: 6rem 2rem;
  background: #fafafa;
}

.split-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.split-text .section-heading {
  margin-bottom: 1.5rem;
}

.split-description {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 3rem;
}

.split-image {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.image-wrapper img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  inset: 0;
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

/* Responsive */
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
