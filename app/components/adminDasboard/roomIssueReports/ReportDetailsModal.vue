<template>
  <Button
    label="Szczegóły"
    severity="info"
    size="small"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    modal
    class="w-[50%]"
  >
  <template #header>
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-2xl font-bold mb-2">
              Szczegóły zgłoszenia #{{ selectedIssue.id }}
            </h2>
            <p class="text-blue-100">
              {{ selectedIssue.room }}
            </p>
          </div>
        </div>
  </template>
    <div
      class="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full overflow-y-auto"
    >

      <div class="p-6 space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-200/60 rounded-lg p-4">
            <div class="text-sm text-gray-600 mb-2">
              Status
            </div>
            <span :class="['inline-block px-4 py-2 rounded-full text-sm font-medium', getStatusColor(selectedIssue.status)]">
              {{ selectedIssue.status }}
            </span>
          </div>
          <div class="bg-gray-200/60 rounded-lg p-4">
            <div class="text-sm text-gray-600 mb-2">
              Priorytet
            </div>
            <span :class="['text-lg font-bold', getPriorityColor(selectedIssue.priority)]">
              {{ selectedIssue.priority }}
            </span>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-4">
            Informacje podstawowe
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-sm text-gray-600 mb-1">
                Kategoria
              </div>
              <div class="text-base font-medium">
                {{ selectedIssue.category }}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-600 mb-1">
                Numer sali
              </div>
              <div class="text-base font-medium">
                {{ selectedIssue.room }}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-600 mb-1">
                Data zgłoszenia
              </div>
              <div class="text-base font-medium">
                {{ selectedIssue.date }} {{ selectedIssue.time }}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-600 mb-1">
                Zgłaszający
              </div>
              <div class="text-base font-medium">
                {{ selectedIssue.reporter }}
              </div>
            </div>
          </div>
        </div>

        <!-- Opis problemu -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-3">
            Opis problemu
          </h3>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-gray-800 leading-relaxed">
              {{ selectedIssue.description }}
            </p>
          </div>
        </div>

        <!-- Historia działań -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-4">
            Historia działań
          </h3>
          <div class="space-y-3">
            <div
              v-for="(log, index) in selectedIssue.activityLog"
              :key="index"
              class="flex gap-3 items-start"
            >
              <div class="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div class="flex-1">
                <div class="text-sm font-medium">
                  {{ log.action }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ log.date }} {{ log.time }} - {{ log.user }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notatki serwisowe -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-3">
            Notatki serwisowe
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
                {{ note.text }}
              </p>
              <div class="text-xs text-gray-600">
                {{ note.author }} - {{ note.date }}
              </div>
            </div>
          </div>
          <div
            v-else
            class="text-gray-500 text-sm italic"
          >
            Brak notatek
          </div>
        </div>

        <!-- Dodaj notatkę -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-3">
            Dodaj notatkę
          </h3>
          <textarea
            v-model="newNote"
            placeholder="Wpisz notatkę dotyczącą tego zgłoszenia..."
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            @click="addNote"
          >
            Dodaj notatkę
          </button>
        </div>

        <!-- Akcje -->
        <div class="border-t border-gray-200 pt-6 flex gap-3">
          <button
            v-if="selectedIssue.status === 'Nowe'"
            class="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
            @click="updateStatusFromModal('W trakcie')"
          >
            Rozpocznij naprawę
          </button>
          <button
            v-if="selectedIssue.status === 'W trakcie'"
            class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            @click="updateStatusFromModal('Zamknięte')"
          >
            Zamknij zgłoszenie
          </button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const visible = ref(false)

const props = defineProps<{
  selectedIssue: {
    id: number
    room: string
    category: string
    description: string
    priority: string
    status: string
    reporter: string
    date: string
    time: string
    activityLog: [{
      action: string
      date: string
      time: string
      user: string
    }]
    notes: Array<string>
  }
}>()

const updateStatusFromModal = (newStatus) => {
  if (props.selectedIssue) {
    updateStatus(props.selectedIssue.id, newStatus)
  }
}

const addNote = () => {
  if (newNote.value.trim() && props.selectedIssue) {
    const now = new Date()
    props.selectedIssue.notes.push({
      text: newNote.value,
      author: 'Bieżący użytkownik',
      date: now.toISOString().split('T')[0],
    })
    newNote.value = ''
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800'
    case 'inProgress': return 'bg-yellow-100 text-yellow-800'
    case 'closed': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'critical': return 'text-red-600'
    case 'high': return 'text-orange-600'
    case 'mid': return 'text-yellow-600'
    case 'low': return 'text-green-600'
    default: return 'text-gray-600'
  }
}
</script>
