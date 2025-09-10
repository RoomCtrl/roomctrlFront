<template>
  <div>
    <Card
      pt:root:class="w-[80vw] lg:w-[25vw]"
      pt:body:class="h-full"
      pt:content:class="flex-grow"
      pt:footer:class="flex justify-center"
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
            v-for="(item, index) in content.items"
            :key="index"
          >
            <i
              class="pi pi-check"
              style="color: green"
            />
            {{ item }}
          </li>
        </ul>
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
      <div class="w-[20rem] h-[20rem] border-2 text-center" />
      <div class="flex flex-row items-center gap-2 justify-center">
        <h1>
          some
        </h1>
        <Button label="skopiuj" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
const { t } = useI18n()
const visible = ref(false)

defineProps({
  content: Object,
})
</script>
