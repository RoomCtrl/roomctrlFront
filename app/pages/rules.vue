<template>
  <div class="w-full">
    <ListWithContents
      :pageContent="rulesList"
      :title="$t('pages.rules.title')"
      :lastUpdate="$t('pages.rules.lastUpdate')"
      numberedSubList
    />
  </div>
</template>

<script setup>
import rulesList from '@/assets/data/rulesList.json'
import ListWithContents from '~/components/subpagesParts/ListWithContents.vue'
</script>
