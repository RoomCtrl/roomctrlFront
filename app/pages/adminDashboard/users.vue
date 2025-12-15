<template>
  <div class="flex flex-col w-full">
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
      :rowsPerPageOptions="rowsPerPage"
      :loading="loading"
      size="small"
      paginator
      :paginatorPosition="paginatorPosition"
      @update:rows="handleUpdateRows"
      @filter="onFilter"
    >
      <BaseTextFilterColumn
        :key="'username'"
        field="username"
        :header="$t('forms.fields.username')"
        class="w-[10%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'firstName'"
        field="firstName"
        :header="$t('forms.fields.firstName')"
        class="w-[15%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'lastName'"
        field="lastName"
        :header="$t('forms.fields.lastName')"
        class="w-[15%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'email'"
        field="email"
        :header="$t('forms.fields.email')"
        class="w-[20%]"
        sortable
        filter
      />
      <BaseTextFilterColumn
        :key="'phone'"
        field="phone"
        :header="$t('forms.fields.phone')"
        class="w-[15%]"
        sortable
        filter
      />
      <BaseSelectFilterColumn
        :key="'roles'"
        field="roles"
        :header="$t('forms.fields.roles')"
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

const { users, loading, fetchUsers } = useUser()
const { t } = useI18n()
const rowsPerPage = ref([12, 24, 36])
const { rows, paginatorPosition, tableDisplay, handleUpdateRows, onFilter } = useDataTable(users, 12)

const listOfRoles = ref([
  {
    name: t('pages.adminDashboard.users.roles.admin'),
    code: 'ROLE_ADMIN',
  },
  {
    name: t('pages.adminDashboard.users.roles.user'),
    code: 'ROLE_USER',
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
  await fetchUsers(false)
})
</script>
