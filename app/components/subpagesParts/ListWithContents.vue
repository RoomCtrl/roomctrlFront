<template>
  <div class="relative flex flex-col md:flex-row">
    <TableOfContents :data="pageContent" />
    <div class="px-[4vw] md:px-[25vw] pt-[10vh] md:pt-[6vh]">
      <div class="px-[10vw]">
        <ClientOnly>
          <Card class="bg-[#D74141]">
            <template #title>
              <h1 class="font-black text-4xl text-center py-[2vh] text-white">
                {{ title }}
              </h1>
            </template>
            <template #subtitle>
              <h2 class="flex justify-center text-gray-300">
                {{ lastUpdate }}
              </h2>
            </template>
          </Card>
          <template #fallback>
            <Skeleton height="10rem" />
          </template>
        </ClientOnly>
      </div>
      <InfoListCard
        :infoSectionContent="pageContent"
        :numberedSubList="numberedSubList"
      />
    </div>
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
