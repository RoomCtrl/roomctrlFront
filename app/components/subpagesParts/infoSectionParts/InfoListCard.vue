<template>
  <Card
    v-for="(data, index) in infoSectionContent"
    :key="index"
    pt:body:class="items-center"
    pt:content:class="w-[60rem]"
    class="flex flex-col my-[2vh] lg:my-[8vh] py-[2vh]"
  >
    <template #content>
      <h1
        :id="data.id"
        class="scroll-mt-[15vh] font-extrabold text-2xl md:text-3xl text-center py-[2vh]"
      >
        {{ (index + 1) + '. ' + $t(data.title) }}
      </h1>
      <div v-if="data.contentWithoutList">
        <div
          v-for="(content, subIndex) in data.contentWithoutList"
          :key="subIndex"
          class="max-sm:text-sm text-center"
        >
          {{ $t(content) }}
        </div>
      </div>
      <div
        v-for="(content, subIndex) in data.content"
        :key="subIndex"
        class="flex flex-row"
      >
        <ul
          v-if="content.list"
          class="px-[2rem]"
          :class="{ 'list-decimal': numberedSubList,
                    'list-disc': !numberedSubList }"
        >
          <li
            v-for="(listItem, subSubIndex) in content.list"
            :key="subSubIndex"
            class="py-[0.3vh] max-sm:text-sm"
            v-html="$t(listItem)"
          >
          </li>
        </ul>

        <div
          v-else
          class="max-sm:text-sm"
        >
          {{ $t(content) }}
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
defineProps({
  infoSectionContent: Object,
  numberedSubList: Boolean,
})
</script>
