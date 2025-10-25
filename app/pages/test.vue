<template>
  <div class="class flex flex-col justify-center items-center gap-20 h-[100vh]">
    <div class="flex flex-col gap-4 text-center">
      <h1 class="font-extrabold text-7xl">
        Witaj w systemie!
      </h1>
      <h2 class="text-xl">
        Wybierz panel, do którego chcesz przejść
      </h2>
    </div>

    <div class="flex flex-row justify-center items-center gap-8">
      <div class="relative">
        <div class="absolute inset-0 rounded-lg bg-red-500/30 blur-2xl opacity-70 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-700 animate-pulse-slow pointer-events-none" />

        <div
          class="flex flex-col justify-center items-center w-[40rem] h-[20rem] border-8 rounded-lg gap-4 relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group bg-red-950/70 backdrop-blur-sm"
          :class="adminBorderClass"
          @click="selectRole('admin')"
        >
          <i
            class="pi pi-hammer text-red-400 group-hover:scale-110 transition-transform duration-300"
            style="font-size: 5rem"
          />
          <div class="flex flex-row font-bold text-5xl text-white drop-shadow-lg">
            <h1 class="text-red-400 glow-text-red">
              A
            </h1>
            <h1>
              dmin
            </h1>
          </div>
          <h2 class="text-xl">
            Pełny dostęp do zarządzania systemem i użytkownikami
          </h2>
        </div>
      </div>

      <div class="w-[2px] h-[36rem] bg-gradient-to-b from-transparent via-gray-400 to-transparent" />

      <div class="relative">
        <div class="absolute inset-0 rounded-lg bg-green-500/30 blur-2xl opacity-70 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-700 animate-pulse-slow pointer-events-none" />

        <div
          class="flex flex-col justify-center items-center w-[40rem] h-[20rem] border-8 rounded-lg gap-4 relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group bg-green-950/70 backdrop-blur-sm"
          :class="userBorderClass"
          @click="selectRole('user')"
        >
          <i
            class="pi pi-user text-green-400 group-hover:scale-110 transition-transform duration-300"
            style="font-size: 5rem"
          />
          <div class="flex flex-row font-bold text-5xl text-white drop-shadow-lg">
            <h1 class="text-green-400 glow-text-green">
              U
            </h1>
            <h1>
              żytkownik
            </h1>
          </div>
          <h2 class="text-xl">
            Dostęp do podstawowych funkcji aplikacji
          </h2>
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
  console.log(`Wybrano rolę: ${role}`)

  // Przekierowanie do odpowiedniego panelu
  if (role === 'admin') {
    router.push('/admin')
  }
  else {
    router.push('/user')
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
    0 0 10px #b91c1c;
}

.glow-text-green {
  text-shadow:
    0 0 5px #15803d,
    0 0 10px #15803d;
}
</style>
