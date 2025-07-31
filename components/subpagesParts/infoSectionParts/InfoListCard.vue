<template>
  <Card
    v-for="(data, index) in infoSectionContent"
    :key="index"
    class="flex flex-col my-[2vh] md:my-[8vh] py-[2vh]"
  >
    <template #content>
      <h1
        :id="data.id"
        class="scroll-mt-[15vh] font-extrabold text-3xl text-center py-[2vh]"
      >
        {{ $t(data.title) }}
      </h1>
      <div v-if="data.contentWithoutList">
        <div
          v-for="(content, subIndex) in data.contentWithoutList"
          :key="subIndex"
          class="text-center md:px-[4vw]"
        >
          {{ $t(content) }}
        </div>
      </div>
      <div
        v-for="(content, subIndex) in data.content"
        :key="subIndex"
        class="px-[5vw] md:px-[8vw]"
      >
        <ul
          v-if="content.list"
          class="px-[5vw] md:px-[2vw]"
          :class="{ 'list-decimal': numberedSubList,
                    'list-disc': !numberedSubList }"
        >
          <li
            v-for="(listItem, subSubIndex) in content.list"
            :key="subSubIndex"
            class="py-[0.3vh]"
          >
            {{ $t(listItem) }}
          </li>
        </ul>

        <div v-else>
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
