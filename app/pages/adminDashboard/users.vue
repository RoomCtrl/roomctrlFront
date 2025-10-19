<template>
  <div class="flex flex-col justify-center h-[100vh] pl-[4rem] pr-[1rem]">
    <Toast />
    <ConfirmDialog />
    <DataTable
      v-model:filters="filters"
      pt:root:class="min-h-[60vh]"
      pt:tableContainer:class="min-h-[60vh]"
      :value="users"
      filterDisplay="row"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPage"
      :loading="loading"
      paginator
      :paginatorPosition="paginatorPosition"
      @update:rows="handelUpdateRows"
    >
      <template #header>
        <div class="flex flex-row justify-between">
          <h1 class="font-extrabold text-4xl">
            {{ $t('pages.adminDashboard.users.title') }}
          </h1>
          <AddUserButton />
        </div>
      </template>
      <Column
        field="username"
        class="w-[10%]"
        sortable
        :header="$t('forms.fields.username')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            class="w-full"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="firstName"
        class="w-[15%]"
        sortable
        :header="$t('forms.fields.firstName')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            class="w-full"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="lastName"
        class="w-[15%]"
        sortable
        :header="$t('forms.fields.lastName')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            class="w-full"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="email"
        class="w-[20%]"
        sortable
        :header="$t('forms.fields.email')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            class="w-full"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="phone"
        class="w-[15%]"
        sortable
        :header="$t('forms.fields.phone')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            class="w-full"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        class="w-[20%]"
        field="roles"
        :header="$t('forms.fields.roles')"
        sortable
      >
        <template #body="{ data }">
          {{ translateRoles(data.roles) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            class="w-full"
            :options="listOfRoles"
            optionLabel="label"
            optionValue="code"
            filter
            :placeholder="$t('forms.filters.search')"
            @change="filterCallback()"
          />
        </template>
      </Column>
      <Column class="w-[5%]">
        <template #body="{ data }">
          <div class="flex flex-row gap-2">
            <EditUserButton :userId="data.id" />
            <DeleteUserButton :userId="data.id" />
          </div>
        </template>
      </Column>
      <template #empty>
        Nie znaleziono uzytkownikow
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

definePageMeta({
  middleware: 'admin',
  layout: 'adminDashboard',
})

const { users, loading, fetchUsers } = useUser()
const { t } = useI18n()
const rows = ref(10)
const rowsPerPage = ref([10, 20, 30])
const paginatorPosition = computed(() => {
  return rows.value > 10 ? 'both' : 'bottom'
})

const listOfRoles = ref([
  {
    label: t('pages.adminDashboard.users.roles.admin'),
    code: 'ROLE_ADMIN',
  },
  {
    label: t('pages.adminDashboard.users.roles.user'),
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
    ROLE_MANAGER: t('pages.adminDashboard.users.roles.manager'),
  }

  return roles.map(role => map[role] || role).join(', ')
}

const handelUpdateRows = (value: number) => {
  rows.value = value
}

onMounted(async () => {
  await fetchUsers(false)
})
</script>
