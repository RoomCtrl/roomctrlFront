<template>
  <div class="flex h-full">
    <ReportsDataView :issues="issues" />
  </div>
</template>

<script setup>
import ReportsDataView from '~/components/adminDasboard/roomIssueReports/ReportsDataView.vue'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: 'admin',
})

const issues = ref([
  {
    id: 1,
    room: 'Sala 101',
    category: 'Sprzęt',
    description: 'Nie działa projektor - brak obrazu. Po włączeniu zasilania urządzenie nie reaguje, dioda zasilania nie świeci. Sprawdzono przewód zasilający - jest prawidłowo podłączony.',
    priority: 'high',
    status: 'new',
    reporter: 'Jan Kowalski',
    date: '2024-11-01',
    time: '09:15',
    activityLog: [
      { action: 'Zgłoszenie utworzone', date: '2024-11-01', time: '09:15', user: 'Jan Kowalski' },
    ],
    notes: [],
  },
  {
    id: 2,
    room: 'Sala 205',
    category: 'Infrastruktura',
    description: 'Przeciek w suficie przy oknie. Widoczne ślady wilgoci i przebarwienia. W czasie deszczu kapie woda.',
    priority: 'critical',
    status: 'inProgress',
    reporter: 'Anna Nowak',
    date: '2024-10-31',
    time: '14:30',
    activityLog: [
      { action: 'Zgłoszenie utworzone', date: '2024-10-31', time: '14:30', user: 'Anna Nowak' },
      { action: 'Przypisano do serwisu', date: '2024-10-31', time: '15:00', user: 'System' },
      { action: 'Rozpoczęto naprawę', date: '2024-11-01', time: '08:00', user: 'Marek Dach' },
    ],
    notes: [
      { text: 'Zlecono firmę zewnętrzną do naprawy dachu', author: 'Marek Dach', date: '2024-11-01' },
    ],
  },
  {
    id: 3,
    room: 'Sala 103',
    category: 'Meble',
    description: 'Połamane krzesło nr 12. Jedno z nóg krzesła jest uszkodzone, krzesło jest niebezpieczne do użytku.',
    priority: 'low',
    status: 'closed',
    reporter: 'Piotr Wiśniewski',
    date: '2024-10-30',
    time: '11:00',
    activityLog: [
      { action: 'Zgłoszenie utworzone', date: '2024-10-30', time: '11:00', user: 'Piotr Wiśniewski' },
      { action: 'Rozpoczęto naprawę', date: '2024-10-30', time: '12:00', user: 'Tomasz Meble' },
      { action: 'Krzesło wymienione', date: '2024-10-30', time: '13:30', user: 'Tomasz Meble' },
      { action: 'Zgłoszenie zamknięte', date: '2024-10-30', time: '13:35', user: 'Tomasz Meble' },
    ],
    notes: [
      { text: 'Krzesło zostało wymienione na nowe z magazynu', author: 'Tomasz Meble', date: '2024-10-30' },
    ],
  },
])
</script>
