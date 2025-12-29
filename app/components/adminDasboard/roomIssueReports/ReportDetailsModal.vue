<template>
  <Button
    :label="$t('common.buttons.details')"
    severity="info"
    size="small"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    modal
    class="w-[50%]"
    aria-label="Details info about report"
  >
    <template #header>
      <div class="flex justify-between items-start w-full">
        <div class="w-full">
          <div class="flex flex-row justify-between w-full">
            <h2 class="text-3xl font-bold mb-2">
              {{ $t('pages.adminDashboard.roomIssueReports.modal.title', { issueNumber: selectedIssue.id }) }}
            </h2>
            <div class="grid grid-cols-2 gap-10 pr-10">
              <div class="flex flex-col">
                <div class="text-xs font-semibold text-gray-600 dark:text-gray-400 pb-1">
                  {{ $t('pages.adminDashboard.roomIssueReports.modal.status') }}
                </div>
                <span :class="['px-2 py-1 rounded-full text-sm font-medium w-[5rem]', getStatusColor(selectedIssue.status)]">
                  {{ $t('pages.adminDashboard.roomIssueReports.status.' + selectedIssue.status) }}
                </span>
              </div>
              <div>
                <div class="text-xs font-semibold text-gray-600 dark:text-gray-400 pb-1">
                  {{ $t('pages.adminDashboard.roomIssueReports.modal.priority') }}
                </div>
                <span :class="['text-lg font-bold', getPriorityColor(selectedIssue.priority)]">
                  {{ $t('pages.adminDashboard.roomIssueReports.priority.'+ selectedIssue.priority) }}
                </span>
              </div>
            </div>
          </div>

          <p class="text-blue-800 dark:text-blue-100">
            {{ selectedIssue.roomName }}
          </p>
        </div>
      </div>
    </template>
    <div
      class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full overflow-y-auto"
    >
      <div class="p-6 space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">
            {{ $t('pages.adminDashboard.roomIssueReports.modal.baseInfo') }}
          </h3>
          <div
            class="grid grid-cols-2 gap-4"
          >
            <div
              v-for="info in baseReportInfo"
              :key="info.title"
            >
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {{ info.title }}
              </div>
              <div class="text-base font-medium">
                {{ info.value }}
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-3">
            {{ $t('pages.adminDashboard.roomIssueReports.modal.issueDescription') }}
          </h3>
          <div class="bg-gray-300 dark:bg-gray-500 rounded-lg p-4">
            <p class="leading-relaxed">
              {{ selectedIssue.description }}
            </p>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-4">
            {{ $t('pages.adminDashboard.roomIssueReports.modal.historyOfWork') }}
          </h3>
          <div class="space-y-3">
            <div
              v-for="(log, index) in selectedIssue.history"
              :key="index"
              class="flex gap-3 items-start"
            >
              <div class="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div class="flex-1">
                <div class="text-sm font-medium">
                  {{ log.action }}
                </div>
                <div class="text-xs text-gray-600 dark:text-gray-400">
                  {{ log.createdAt }} - {{ log.userName }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-3">
            {{ $t('pages.adminDashboard.roomIssueReports.modal.serviceNotes') }}
          </h3>
          <div
            v-if="selectedIssue.notes && selectedIssue.notes.length > 0"
            class="space-y-3"
          >
            <div
              v-for="(note, index) in selectedIssue.notes"
              :key="index"
              class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
            >
              <p class="text-gray-800 mb-2">
                {{ note.content }}
              </p>
              <div class="text-xs text-gray-600">
                {{ note.authorName }} - {{ note.createdAt }}
              </div>
            </div>
          </div>
          <div
            v-else
            class="text-gray-600 dark:text-gray-400 text-sm italic"
          >
            {{ $t('pages.adminDashboard.roomIssueReports.modal.noNotes') }}
          </div>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-3">
            {{ $t('pages.adminDashboard.roomIssueReports.modal.addNote') }}
          </h3>
          <Textarea
            v-model="newNote"
            placeholder="Wpisz notatkę dotyczącą tego zgłoszenia..."
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Add new note"
          />
          <Button
            class="mt-2"
            :label="$t('pages.adminDashboard.roomIssueReports.modal.addNote')"
            size="small"
            severity="info"
            @click="addNote"
          />
        </div>

        <div class="border-t border-gray-200 pt-6 flex gap-3">
          <Button
            v-if="selectedIssue.status === 'pending'"
            class="flex-1 px-6 py-3"
            :label=" $t('pages.adminDashboard.roomIssueReports.modal.startRepair')"
            severity="warn"
            @click="updateStatusFromModal('in_progress')"
          />
          <Button
            v-if="selectedIssue.status === 'in_progress'"
            class="flex-1 px-6 py-3"
            :label="$t('pages.adminDashboard.roomIssueReports.modal.closeIssue')"
            severity="success"
            @click="updateStatusFromModal('closed')"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Textarea } from 'primevue'
import type { IIssueData } from '~/interfaces/IssuesInterfaces'

const props = defineProps<{
  issueId: string
}>()
const { fetchIssueById } = useIssue()
const selectedIssue = await fetchIssueById(props.issueId) as IIssueData
const visible = ref(false)
const newNote = ref('')
const { t } = useI18n()

const baseReportInfo = computed(() => [
  {
    title: t('pages.adminDashboard.roomIssueReports.modal.category'),
    value: selectedIssue.category,
  },
  {
    title: t('pages.adminDashboard.roomIssueReports.modal.roomNumber'),
    value: selectedIssue.roomName,
  },
  {
    title: t('pages.adminDashboard.roomIssueReports.modal.reportDate'),
    value: selectedIssue.reportedAt,
  },
  {
    title: t('pages.adminDashboard.roomIssueReports.modal.reporter'),
    value: selectedIssue.reporterName,
  },
])

const updateStatus = (id, newStatus) => {
  const issue = selectedIssue
  if (issue) {
    issue.status = newStatus
    const now = new Date()
    issue.history.push({
      action: `Status zmieniony na: ${newStatus}`,
      createdAt: now.toISOString().split('T')[0],
      userName: 'System',
    })
  }
}

const updateStatusFromModal = (newStatus) => {
  if (selectedIssue) {
    updateStatus(selectedIssue.id, newStatus)
  }
}

const addNote = () => {
  if (newNote.value.trim() && selectedIssue) {
    const now = new Date()
    selectedIssue.notes.push({
      content: newNote.value,
      authorName: 'Bieżący użytkownik',
      createdAt: now.toISOString().split('T')[0],
    })
    newNote.value = ''
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'
    case 'in_progress': return 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100'
    case 'closed': return 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'
    default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-red-500'
    case 'high': return 'text-orange-500'
    case 'medium': return 'text-yellow-500'
    case 'low': return 'text-green-500'
    default: return 'text-gray-500'
  }
}
</script>
