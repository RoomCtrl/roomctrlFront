<template>
  <Card
    :class="[animationClass]"
    pt:root:class="w-[80vw] lg:w-[25vw]"
    pt:body:class="h-full"
    pt:content:class="flex-grow"
    pt:footer:class="flex justify-center"
    @mouseenter="showAnimation"
    @mouseleave="hideAnimation"
  >
    <template #title>
      <div class="flex flex-row gap-2 justify-center">
        <i
          :class="content.icon"
          :style="{ color: content.iconColor }"
          style="font-size: 1.8rem"
        />
        <h1 class="text-3xl text-center font-bold">
          {{ content.title }}
        </h1>
      </div>
    </template>
    <template #content>
      <ul>
        <li
          v-for="item in content.list"
          :key="item.key"
          class="flex flex-row gap-1 items-center"
        >
          <i
            class="pi pi-check"
            style="color: green;font-size: 1.2rem;font-weight: bolder;"
          />
          <h2 class="font-semibold">
            {{ $t('pages.downloadApp.' + item.key) }}
          </h2>
          {{ item.value }}
        </li>
      </ul>
      <div class="flex flex-col pt-4">
        <h2 class="font-semibold">
          {{ $t('pages.downloadApp.usersRate') }}
        </h2>
        <div class="flex max-lg:flex-row max-lg:gap-2 max-lg:items-center">
          <UserRating
            v-tooltip.bottom="ratingHint"
            :max="5"
            :rate-value="content.rating"
          />
          <p class="block lg:hidden">
            {{ ratingHint }}
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <Button
        :label="t('common.download')"
        severity="info"
        @click="visible = true"
      />
    </template>
  </Card>
  <Dialog
    v-model:visible="visible"
    pt:content:class="flex flex-col gap-2"
    modal
  >
    <div class="w-[20rem] h-[20rem] border-2" />
    <div class="flex justify-center">
      <div class="grid grid-cols-2">
        <div class="border-2 rounded-l-xl">
          <h1 class=" text-center y-auto">
            some
          </h1>
        </div>
        <Button
          label="skopiuj"
          class="rounded-l-none"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import UserRating from '../common/UserRating.vue'

const { t } = useI18n()
const visible = ref(false)
const props = defineProps({
  content: Object,
})
const ratingHint = props.content.rating + '/5'

const animate = ref(false)
const hasInteracted = ref(false)

const isAndroid = computed(() => props.content.title === 'Android')

const animationClass = computed(() => {
  if (!hasInteracted.value) {
    return ''
  }

  if (isAndroid.value) {
    return animate.value ? 'androidAnimation' : 'androidHide'
  }
  else {
    return animate.value ? 'iosAnimation' : 'iosHide'
  }
})

const showAnimation = () => {
  hasInteracted.value = true
  animate.value = true
}

const hideAnimation = () => {
  if (hasInteracted.value) {
    animate.value = false
  }
}
</script>

<style scoped>
@keyframes showAndroid {
  from { background-position-y: 200px; }
  to { background-position-y: 150px; }
}
@keyframes hideAndroid {
  from { background-position-y: 150px; }
  to { background-position-y: 300px; }
}

@keyframes showIos {
  from { background-position-y: -200px; }
  to { background-position-y: 145px; }
}
@keyframes hideIos {
  from { background-position-y: 145px; }
  to { background-position-y: 300px; }
}

.androidAnimation {
  background-image: url('/gifs/mobileOS/waving_android.gif');
  background-repeat: no-repeat;
  background-size: 100px;
  background-position: right;
  animation: showAndroid 0.5s forwards;
}

.androidHide {
  background-image: url('/gifs/mobileOS/waving_android.gif');
  background-repeat: no-repeat;
  background-size: 100px;
  background-position: right;
  animation: hideAndroid 0.5s forwards;
}

.iosAnimation {
  background-image: url('/images/mobileOS/apple_logo_grey.png');
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: 410px;
  animation: showIos 0.5s forwards;
}

.iosHide {
  background-image: url('/images/mobileOS/apple_logo_grey.png');
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: 410px;
  animation: hideIos 0.5s forwards;
}
</style>
