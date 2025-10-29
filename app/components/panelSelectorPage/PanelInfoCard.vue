<template>
  <div class="relative">
    <div
      :class="[
        backgroundFirstColor,
        'absolute inset-0 rounded-lg blur-2xl opacity-70 group-hover:opacity-100 cale-100 group-hover:scale-150 transition-all duration-700 animate-pulse-slow pointer-events-none',
      ]"
    />
    <div
      class="flex flex-col justify-center items-center w-[40rem] h-[20rem] border-8 rounded-lg gap-6 relative opacity-70 hover:opacity-100 cursor-pointer transition-all  duration-300 hover:scale-105 hover:shadow-2xl group backdrop-blur-sm overflow-hidden"
      :class="[borderClass, backgroundSecondColor]"
      @click="selectRole(accountType)"
    >
      <img
        :src="'/logos/' + image"
        class="h-20 group-hover:scale-110 transition-transform duration-300"
      />

      <div class="relative z-10 flex flex-col items-center gap-2">
        <p class="text-lg text-gray-200 text-center px-8">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string
  description: string
  borderClass: string
  accountType: 'admin' | 'user'
  color: string
}>()

const router = useRouter()

const backgroundFirstColor = computed(() => {
  if (props.color === 'red') {
    return 'bg-red-500/30'
  }
  else {
    return 'bg-green-500/30'
  }
})
const backgroundSecondColor = computed(() => {
  if (props.color === 'red') {
    return 'bg-red-950/70'
  }
  else {
    return 'bg-green-950/70'
  }
})

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
