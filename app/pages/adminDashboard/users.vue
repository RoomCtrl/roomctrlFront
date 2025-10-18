<template>
  <div class="flex flex-col justify-center h-[100vh] pl-[4rem] pr-[1rem]">
    <Toast />
    <DataTable
      v-model:filters="filters"
      class="w-full"
      :value="users"
      filterDisplay="row"
      :rows="10"
      :rowsPerPageOptions="[10, 20, 30]"
      :loading="loading"
      paginator
    >
      <template #header>
        <div class="flex flex-row justify-between">
          <h1 class="font-extrabold text-4xl">
            {{ $t('pages.adminDashboard.users.title') }}
          </h1>
          <AddButton />
        </div>
      </template>
      <Column
        class="w-[5%]"
        field="username"
        sortable
        :header="$t('forms.fields.username')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        class="w-[20%]"
        field="firstName"
        sortable
        :header="$t('forms.fields.firstName')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        class="w-[10%]"
        field="lastName"
        sortable
        :header="$t('forms.fields.lastName')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        class="w-[20%]"
        field="email"
        sortable
        :header="$t('forms.fields.email')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        class="w-[10%]"
        field="phone"
        sortable
        :header="$t('forms.fields.phone')"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            :placeholder="$t('forms.filters.search')"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column
        class="w-[20%]"
        field="roles"
        :header="$t('forms.fields.roles')"
      />
      <Column class="w-[10%]">
        <template #body="{ data }">
          <div class="flex flex-row gap-2">
            <EditButton :userId="data.id" />
            <Button
              icon="pi pi-user-minus"
              @click="handleDeleteUser(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api'
import { onMounted } from 'vue'
import { useUser } from '@/composables/useUser'
import EditButton from '~/components/adminDasboard/main/users/EditButton.vue'
import AddButton from '~/components/adminDasboard/main/users/AddButton.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'adminDashboard',
})

const toast = useToast()
const { users, loading, fetchUsers, deleteUser } = useUser()

const handleDeleteUser = async (guid: string) => {
  await deleteUser(guid)
  toast.add({ severity: 'error', summary: 'Delete user', detail: 'Message Content', life: 3000 })
}

const filters = ref({
  username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

onMounted(async () => {
  await fetchUsers(false)
})
</script>
