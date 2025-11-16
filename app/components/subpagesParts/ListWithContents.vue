<template>
  <div class="relative flex flex-col lg:flex-row gap-4">
    <div class="w-full flex flex-col items-start">
      <div class="min-lg:flex-1 w-[75%]">
        <Card
          pt:root:class="overflow-hidden"
          pt:body:class="bg-[#ad3636ff]"
        >
          <template #title>
            <h1 class="font-black text-4xl md:text-5xl text-center py-[2vh] text-white">
              {{ title }}
            </h1>
          </template>
          <template #subtitle>
            <h2 class="flex justify-center font-semibold text-white">
              {{ lastUpdate }}
            </h2>
          </template>
        </Card>
        <InfoListCard
          :infoSectionContent="pageContent"
          :numberedSubList="numberedSubList"
        />
      </div>
    </div>
    <TableOfContents
      :data="pageContent"
      class="min-lg:flex-1"
    />
  </div>
</template>

<script setup lang="ts">
import type { IPageList } from '~/app/interfaces/PageInterfaces'
import InfoListCard from './infoSectionParts/InfoListCard.vue'
import TableOfContents from './infoSectionParts/TableOfContents.vue'

defineProps<{
  pageContent: IPageList[]
  title: string
  lastUpdate: string
  numberedSubList: boolean
}
>()
</script>
