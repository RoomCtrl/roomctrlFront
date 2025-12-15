<template>
  <div class="flex flex-col gap-10 w-full">
    <Hero />

    <HowThisWorkSection />

    <ForOrganizations />

    <section class="w-full">
      <Card class="w-full">
        <template #title>
          <div class="section-intro centered b">
            <h2 class="section-heading">
              {{ $t('pages.home.benefits.title') }}
            </h2>
          </div>
        </template>
        <template #content>
          <InfoSection />
        </template>
      </Card>
    </section>

    <section class="final-cta">
      <div class="cta-card">
        <div class="cta-content-wrapper">
          <h2 class="cta-heading">
            {{ $t('pages.home.cta.title') }}
          </h2>
          <p class="cta-text">
            {{ $t('pages.home.cta.description') }}
          </p>
          <div class="cta-actions">
            <NuxtLink
              to="/login"
              class="btn btn-white"
            >
              {{ $t('pages.home.cta.startNow') }}
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="btn btn-ghost"
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
</script>

<style scoped>
.main-heading {
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.text-accent {
  display: block;
  color: #ad3636ff;
}

.hero-description {
  font-size: 1.25rem;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 540px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
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
  background: #1f2937;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.dark .btn-dark:hover {
  background: gray;
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

.trust-indicators {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.indicator {
  font-size: 0.875rem;
  color: #6b7280;
}

.indicator strong {
  color: #111827;
  font-weight: 700;
  font-size: 1rem;
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

.floating-card i {
  font-size: 1.5rem;
  color: #6366f1;
}

.card-title {
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.card-subtitle {
  font-size: 0.75rem;
  color: #6b7280;
}

.card-1 {
  top: 10%;
  left: -10%;
  animation: float 3s ease-in-out infinite;
}

.card-2 {
  top: 40%;
  right: -5%;
  animation: float 3s ease-in-out infinite 0.5s;
}

.card-3 {
  bottom: 15%;
  left: 0;
  animation: float 3s ease-in-out infinite 1s;
}

.main-visual-card {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
}

.calendar-preview {
  width: 100%;
}

.calendar-header {
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #6b7280;
  transition: all 0.2s;
}

.calendar-day:hover {
  background: #f3f4f6;
}

.calendar-day.active {
  background: #6366f1;
  color: white;
  font-weight: 600;
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
  letter-spacing: -0.02em;
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
}

/* Split Section */
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
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%);
}

/* Info Wrapper */
.info-wrapper {
  padding: 6rem 2rem;
  background: white;
}

/* Benefits Section */
.benefits-section {
  padding: 6rem 2rem;
  background: #fafafa;
}

.section-intro.centered {
  text-align: center;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.benefit-item {
  display: flex;
  gap: 1.5rem;
}

.benefit-icon-wrapper {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: #6366f1;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.benefit-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
}

.benefit-text {
  color: #6b7280;
  line-height: 1.6;
}

/* Final CTA */
.final-cta {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgb(177, 77, 77) 0%, #ad3636ff 100%);
}

.cta-card {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.cta-heading {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.cta-text {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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
