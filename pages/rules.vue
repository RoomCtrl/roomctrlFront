<template>
  <div>
    <ListWithContents
      :pageContent="rulesList"
      :title="$t('pages.rulesPage.title')"
      :lastUpdate="$t('pages.rulesPage.lastUpdate')"
      numberedSubList
    />
  </div>
</template>

<script setup>
import rulesList from '~/assets/data/rulesList.json'
import ListWithContents from '~/components/subpagesParts/ListWithContents.vue'
</script>
