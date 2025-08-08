<template>
  <div>
    <Card
      pt:root:class="w-[80vw] md:w-[25vw]"
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
        />
      </template>
    </Card>
  </div>
</template>

<script setup>
const { t } = useI18n()

defineProps({
  content: Object,
})
</script>
