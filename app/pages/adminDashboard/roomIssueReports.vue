<template>
  <div class="flex flex-col h-full w-full gap-4">
    <div class="flex">
      <Card>
        <template #content>
          <h1 class="font-bold text-4xl">
            {{ $t('pages.adminDashboard.roomIssueReports.title') }}
          </h1>
        </template>
      </Card>
    </div>

    <ReportsDataView :issues="issues" />
  </div>
</template>

<script setup>
import ReportsDataView from '~/components/adminDasboard/roomIssueReports/ReportsDataView.vue'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: 'admin',
})

const { fetchIssues, issues } = useIssue()

onMounted(async () => {
  await fetchIssues()
})
</script>
