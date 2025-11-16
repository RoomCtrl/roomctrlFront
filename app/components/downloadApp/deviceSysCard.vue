<template>
  <Card
    :class="[animationClass]"
    pt:root:class="w-full lg:w-[30vw]"
    pt:body:class="h-full"
    pt:content:class="flex-grow"
    pt:footer:class="flex justify-center"
    @mouseenter="showAnimation"
    @focusin="showAnimation"
    @mouseleave="hideAnimation"
    @focusout="hideAnimation"
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
            :max="5"
            :rate-value="content.rating"
          />
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
    :header="content.title"
    pt:content:class="flex flex-col gap-2"
    modal
  >
    <Toast />
    <div class="border-2">
      <Qrcode :value="qrValue" />
    </div>
    <div class="flex justify-center">
      <div class="grid grid-cols-4">
        <div class="col-span-3 rounded-l-xl">
          <h1 class="flex h-full justify-center items-center text-center border-y-2 border-l-2 rounded-l-xl truncate px-2">
            {{ qrValue }}
          </h1>
        </div>
        <Button
          :label="$t('pages.downloadApp.copy')"
          pt:root:class="rounded-l-none"
          @click="copyText(qrValue)"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { item } from '@primeuix/themes/aura/breadcrumb'
import UserRating from '../common/UserRating.vue'

const props = defineProps<{
  content: {
    id: number
    title: string
    icon: string
    iconColor: string
    list: {
      key: string
      value: string
    }[]
    rating: number
  }
}>()

const { t } = useI18n()
const visible = ref(false)
const toast = useToast()

const animate = ref(false)
const hasInteracted = ref(false)

const isAndroid = computed(() => props.content.title === 'Android')

const qrValue = computed(() => {
  if (isAndroid.value) {
    return 'http://185.25.151.154/api/v1/download/android'
  }
  else {
    return 'http://185.25.151.154/api/v1/download/ios'
  }
})

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
function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    toast.add({ severity: 'success', summary: t('toast.success'), detail: t('toast.messages.copied'), life: 3000 })
    return navigator.clipboard.writeText(text)
  }

  return new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text

      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'

      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()

      const success = document.execCommand('copy')
      document.body.removeChild(textarea)

      if (success) resolve()
      else reject()
    }
    catch (err) {
      reject(err)
    }
  })
  toast.add({ severity: 'success', summary: t('toast.success'), detail: t('toast.messages.copied'), life: 3000 })
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
  background-position: calc(100% - 10px) center;
  animation: showIos 0.5s forwards;
}

.iosHide {
  background-image: url('/images/mobileOS/apple_logo_grey.png');
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: calc(100% - 10px) center;
  animation: hideIos 0.5s forwards;
}
</style>
