<template>
  <div>
    <ListWithContents
      :pageContent="privacyPolicyPageContent"
      :title="$t('pages.privacyPolicy.title')"
      :lastUpdate="$t('pages.privacyPolicy.lastUpdate')"
      :numberedSubList="false"
    />
  </div>
</template>

<script setup>
import privacyPolicyPageContent from '@/assets/data/privacyPolicyPageContent.json'
import ListWithContents from '~/components/subpagesParts/ListWithContents.vue'
</script>
