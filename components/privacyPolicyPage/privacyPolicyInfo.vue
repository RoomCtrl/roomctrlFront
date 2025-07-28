<template>
  <Card
    v-for="(data, index) in privacyPolicyData"
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
        class="px-[5vw] md:px-[10vw]"
      >
        <ul
          v-if="content.list"
          class="list-disc px-[5vw] md:px-[2vw]"
        >
          <li
            v-for="(listItem, subSubIndex) in content.list"
            :key="subSubIndex"
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

<script setup>
import { Card } from 'primevue'
import privacyPolicyData from '~/assets/data/privacyPolicyPageContent.json'
</script>
