<template>
  <div class="flex flex-col justify-center items-center gap-20 h-[100vh]">
    <div class="flex flex-col gap-4 text-center">
      <h1 class="font-extrabold text-7xl">
        Witaj w systemie!
      </h1>
      <h2 class="text-xl">
        Wybierz panel, do którego chcesz przejść
      </h2>
    </div>
    <div class="flex flex-col xl:flex-row justify-center items-center gap-8">
      <div class="relative">
        <div class="absolute inset-0 rounded-lg bg-red-500/30 blur-2xl opacity-70 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-700 animate-pulse-slow pointer-events-none" />
        <div
          class="flex flex-col justify-center items-center w-[40rem] h-[20rem] border-8 rounded-lg gap-6 relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group bg-red-950/70 backdrop-blur-sm overflow-hidden"
          :class="adminBorderClass"
          @click="selectRole('admin')"
        >
          <img
            src="/logos/logo_admin_dark_mode.svg"
            class="h-20 group-hover:scale-110 transition-transform duration-300"
          />

          <div class="relative z-10 flex flex-col items-center gap-2">
            <p class="text-lg text-gray-200 text-center px-8">
              Panel administratora - pełny dostęp do zarządzania systemem i użytkownikami
            </p>
          </div>
        </div>
      </div>

      <div class="hidden xl:block w-[2px] h-[36rem] bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
      <div class="block xl:hidden h-[2px] w-[36rem] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />

      <div class="relative">
        <div class="absolute inset-0 rounded-lg bg-green-500/30 blur-2xl opacity-70 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-700 animate-pulse-slow pointer-events-none" />
        <div
          class="flex flex-col justify-center items-center w-[40rem] h-[20rem] border-8 rounded-lg gap-6 relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group bg-green-950/70 backdrop-blur-sm overflow-hidden"
          :class="userBorderClass"
          @click="selectRole('user')"
        >
          <img
            src="/logos/logo_dark_mode.svg"
            class="h-20 group-hover:scale-110 transition-transform duration-300"
          />

          <div class="relative z-10 flex flex-col items-center gap-2">
            <p class="text-lg text-gray-200 text-center px-8">
              Panel użytkownika - dostęp do podstawowych funkcji aplikacji
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'none',
})

const router = useRouter()
const adminBorderClass = ref('border-red-300 hover:border-red-500')
const userBorderClass = ref('border-green-300 hover:border-green-500')

const selectRole = (role: 'admin' | 'user') => {
  if (role === 'admin') {
    router.push('/adminDashboard')
  }
  else {
    router.push('/rooms')
  }
}
</script>

<style scoped>
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

.glow-text-red {
  text-shadow:
    0 0 5px #b91c1c,
    0 0 10px #b91c1c,
    0 0 20px #b91c1c;
}

.glow-text-green {
  text-shadow:
    0 0 5px #15803d,
    0 0 10px #15803d,
    0 0 20px #15803d;
}
</style>
