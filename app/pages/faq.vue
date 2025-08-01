<template>
  <div class="flex justify-center">
    <div class="flex flex-col gap-4">
      <div
        v-for="(faq, index) in faqData"
        :key="index"
        class="flex flex-col gap-2 w-[80vw]"
      >
        <h1 class="font-bold text-2xl">
          {{ $t(faq.category) }}
        </h1>

        <Accordion value="0">
          <AccordionPanel
            v-for="(item, itemIndex) in faq.items"
            :key="itemIndex"
            :value="itemIndex"
          >
            <AccordionHeader class="font-bold text-lg">
              {{ $t(item.question) }}
            </AccordionHeader>
            <AccordionContent>
              <p>
                {{ getAnswer(item.answer) }}
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import faqData from '@/assets/data/faq.json'

const { t } = useI18n()

const getAnswer = (key: string) => {
  return t(key, {
    email: 'roomctrlinfo@gmail.com',
  })
}
</script>
