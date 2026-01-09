<template>
  <div class="flex flex-col w-full gap-4">
    <Toast />
    <ConfirmDialog />
    <div class="flex flex-row justify-between gap-4">
      <Card>
        <template #content>
          <h1 class="font-extrabold text-4xl">
            {{ $t('pages.adminDashboard.users.title') }}
          </h1>
        </template>
      </Card>

      <Card>
        <template #content>
          <AddUserButton />
        </template>
      </Card>
    </div>
    <DataTable
      v-model:filters="filters"
      :pt="{
        root: { class: 'flex flex-col h-full' },
        table: { class: tableDisplay },
      }"
      :value="users"
      filterDisplay="row"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPageOptions"
      size="small"
      paginator
      removableSort
      :paginatorPosition="paginatorPosition"
      @update:rows="handleUpdateRows"
      @filter="onFilter"
    >
      <BaseTextFilterColumn
        :key="'username'"
        field="username"
        :header="$t('tables.headers.username')"
        class="w-[10%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'firstName'"
        field="firstName"
        :header="$t('tables.headers.firstName')"
        class="w-[15%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'lastName'"
        field="lastName"
        :header="$t('tables.headers.lastName')"
        class="w-[15%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'email'"
        field="email"
        :header="$t('tables.headers.email')"
        class="w-[20%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'phone'"
        field="phone"
        :header="$t('tables.headers.phone')"
        class="w-[15%]"
        sortable
        filter
      />
      <BaseSelectFilterColumn
        :key="'roles'"
        field="roles"
        :header="$t('tables.headers.role')"
        class="w-[20%]"
        :options="listOfRoles"
        sortable
        filter
      >
        <template #body="slotProps">
          {{ translateRoles(slotProps.data.roles) }}
        </template>
      </BaseSelectFilterColumn>
      <Column class="w-[5%]">
        <template #body="{ data }">
          <div class="flex flex-row gap-2">
            <EditUserButton :userId="data.id" />
            <DeleteUserButton :userId="data.id" />
          </div>
        </template>
      </Column>
      <template #empty>
        <h1 class="flex justify-center items-center min-h-[60vh] font-bold text-2xl">
          {{ $t('pages.adminDashboard.users.notFoundUsers') }}
        </h1>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api'
import { onMounted } from 'vue'
import { useUser } from '@/composables/useUser'
import EditUserButton from '~/components/adminDasboard/main/users/EditUserButton.vue'
import AddUserButton from '~/components/adminDasboard/main/users/AddUserButton.vue'
import DeleteUserButton from '~/components/adminDasboard/main/users/DeleteUserButton.vue'
import BaseTextFilterColumn from '~/components/common/datatable/columns/BaseTextFilterColumn.vue'
import BaseSelectFilterColumn from '~/components/common/datatable/columns/BaseSelectFilterColumn.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin-dashboard',
})
const { users, fetchUsers } = useUser()
const { t } = useI18n()
const { rows, rowsPerPageOptions, paginatorPosition, tableDisplay, handleUpdateRows, onFilter } = useDataTable(users, 15)

const listOfRoles = ref([
  {
    label: t('pages.adminDashboard.users.roles.admin'),
    value: 'ROLE_ADMIN',
  },
  {
    label: t('pages.adminDashboard.users.roles.user'),
    value: 'ROLE_USER',
  },
])

const filters = ref({
  username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  roles: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const translateRoles = (roles: string[]) => {
  const map = {
    ROLE_ADMIN: t('pages.adminDashboard.users.roles.admin'),
    ROLE_USER: t('pages.adminDashboard.users.roles.user'),
  }

  return roles.map(role => map[role] || role).join(', ')
}

onMounted(async () => {
  await fetchUsers(true)
})
</script>
