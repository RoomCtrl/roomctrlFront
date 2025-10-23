<template>
  <div class="flex h-screen bg-gray-950 overflow-hidden">
    <!-- Lewa strona - Admin -->
    <div class="flex-1 flex justify-center items-center relative group cursor-pointer">
      <!-- Czerwona poświata -->
      <div class="absolute inset-0 bg-gradient-radial-right-red opacity-70 animate-pulse-slow transition-all duration-700 group-hover:scale-125 group-hover:opacity-90" />

      <!-- Tekst Admin -->
      <h1 class="relative z-10 text-7xl font-bold uppercase tracking-wider text-red-400 transition-transform duration-500 group-hover:scale-110">
        Admin
      </h1>
    </div>

    <!-- Prawa strona - Użytkownik -->
    <div class="flex-1 flex justify-center items-center relative group cursor-pointer">
      <!-- Zielona poświata -->
      <div class="absolute inset-0 bg-gradient-radial-left-green opacity-70 animate-pulse-slow transition-all duration-700 group-hover:scale-125 group-hover:opacity-90" />

      <!-- Tekst Użytkownik -->
      <h1 class="relative z-10 text-7xl font-bold uppercase tracking-wider text-green-400 transition-transform duration-500 group-hover:scale-110">
        Użytkownik
      </h1>
    </div>
  </div>
</template>

<script setup>
// Nuxt 3 component - no additional logic needed
</script>

<style scoped>
/* Custom gradients for half-circle glow effect */
.bg-gradient-radial-right-red {
  background: radial-gradient(circle at right center,
    rgba(239, 68, 68, 0.5) 0%,
    rgba(239, 68, 68, 0.35) 20%,
    rgba(239, 68, 68, 0.25) 35%,
    rgba(239, 68, 68, 0.15) 50%,
    rgba(239, 68, 68, 0.08) 65%,
    rgba(239, 68, 68, 0.03) 80%,
    transparent 100%);
}

.bg-gradient-radial-left-green {
  background: radial-gradient(circle at left center,
    rgba(74, 222, 128, 0.5) 0%,
    rgba(74, 222, 128, 0.35) 20%,
    rgba(74, 222, 128, 0.25) 35%,
    rgba(74, 222, 128, 0.15) 50%,
    rgba(74, 222, 128, 0.08) 65%,
    rgba(74, 222, 128, 0.03) 80%,
    transparent 100%);
}

/* Custom pulse animation */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

/* Text glow effects */
h1 {
  text-shadow:
    0 0 5px currentColor,
    0 0 10px currentColor;
}
</style>
