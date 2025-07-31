<template>
  <Panel
    class="fixed flex flex-col max-md:self-center w-[80vw] max-md:top-[7vh] p-[1vw] mx-[1vw] mt-[3vh] rounded-lg md:w-[22vw]"
    toggleable
  >
    <template #header>
      <h1 class="text-xl font-semibold">
        {{ $t('pages.privacyPolicy.tableOfContents') }}
      </h1>
    </template>
    <div
      v-for="(content, index) in data"
      :key="index"
    >
      <div
        class="px-[0.5vw]"
        :class="{ 'navbar p-1 flex bg-[#D74141] rounded-xl': acticeSection === content.id }"
      >
        <NuxtLink
          :to="'#' + content.id"
          @click="scrollToSection"
        >{{ (index + 1) + '. ' + $t(content.title) }}</NuxtLink>
      </div>
    </div>
  </Panel>
</template>

<script setup>
const props = defineProps({
  data: Object,
})

const acticeSection = ref('')

watch(() => props.data, () => {
  acticeSection.value = ''
  nextTick(() => {
    updateActiveSection()
  })
}, { immediate: true })

const route = useRoute()
watch(() => route.path, () => {
  acticeSection.value = ''
  nextTick(() => {
    updateActiveSection()
  })
})

const { locale } = useI18n()
watch(locale, () => {
  if (typeof window === 'undefined') return

  if (window.location.hash) {
    const url = new URL(window.location)
    url.hash = ''
    window.history.replaceState({}, '', url.toString())
  }

  acticeSection.value = ''

  setTimeout(() => {
    updateActiveSection()
  }, 200)
})

const scrollToSection = (event) => {
  if (typeof window === 'undefined') return

  event.preventDefault()

  const sectionId = event.target.getAttribute('href').substring(1)
  const element = document.getElementById(sectionId)

  if (element) {
    const scrollMarginTop = window.innerHeight * 0.15
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - scrollMarginTop

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })

    acticeSection.value = sectionId
  }
}

const updateActiveSection = () => {
  if (typeof window === 'undefined') return

  if (!props.data || props.data.length === 0) {
    acticeSection.value = ''
    return
  }

  const scrollPosition = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollMarginTop = windowHeight * 0.15

  if (scrollPosition + windowHeight >= documentHeight - 10) {
    const lastSection = props.data[props.data.length - 1]
    acticeSection.value = lastSection.id
    return
  }

  const viewportCenter = scrollPosition + scrollMarginTop + 50
  let foundSection = false

  for (let i = props.data.length - 1; i >= 0; i--) {
    const content = props.data[i]
    const element = document.getElementById(content.id)
    if (element) {
      const elementTop = element.offsetTop
      if (viewportCenter >= elementTop) {
        acticeSection.value = content.id
        foundSection = true
        break
      }
    }
  }

  if (!foundSection) {
    acticeSection.value = ''
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return

  window.addEventListener('scroll', updateActiveSection)

  window.addEventListener('hashchange', handleHashChange)

  nextTick(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const url = new URL(window.location)
        url.hash = ''
        window.history.replaceState({}, '', url.toString())
      }, 100)
    }
    updateActiveSection()
  })
})

onUnmounted(() => {
  if (typeof window === 'undefined') return

  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('hashchange', handleHashChange)
})

const handleHashChange = () => {
  if (typeof window === 'undefined') return

  const hash = window.location.hash.substring(1)
  if (hash && props.data?.some(item => item.id === hash)) {
    acticeSection.value = hash
    setTimeout(() => {
      const url = new URL(window.location)
      url.hash = ''
      window.history.replaceState({}, '', url.toString())
    }, 50)
  }
}
</script>

<style scoped>
.dark .navbar {
  color: #1a1a1a;
}
.light .navbar {
  color: #ffffff;
}
</style>
