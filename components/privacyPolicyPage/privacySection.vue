<template>
  <Panel
    class="sticky max-md:top-[9vh] md:fixed flex flex-col p-[1vw] mx-[1vw] mt-[3vh] rounded-lg md:w-[22vw]"
    toggleable
  >
    <template #header>
      <h1 class="text-lg font-semibold">
        {{ $t('pages.privacyPolicy.tableOfContents') }}
      </h1>
    </template>

    <div
      v-for="(content, index) in privacyPolicyPageContent"
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
import privacyPolicyPageContent from '~/assets/data/privacyPolicyPageContent.json'

const acticeSection = ref('')

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const scrollMarginTop = window.innerHeight * 0.15
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - scrollMarginTop

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const updateActiveSection = () => {
  const scrollPosition = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  const scrollMarginTop = windowHeight * 0.15

  if (scrollPosition + windowHeight >= documentHeight - 10) {
    const lastSection = privacyPolicyPageContent[privacyPolicyPageContent.length - 1]
    acticeSection.value = lastSection.id
    return
  }

  const viewportCenter = scrollPosition + scrollMarginTop + 50

  for (let i = privacyPolicyPageContent.length - 1; i >= 0; i--) {
    const content = privacyPolicyPageContent[i]
    const element = document.getElementById(content.id)

    if (element) {
      const elementTop = element.offsetTop

      if (viewportCenter >= elementTop) {
        acticeSection.value = content.id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped>
.dark .navbar {
  color: #1a1a1a;
}
.light .navbar {
  color: #ffffff;
}
</style>
