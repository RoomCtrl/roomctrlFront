<template>
  <div>
    <Toast />
    <DataTable :value="users">
      <template #header>
        <Button
          icon="pi pi-plus"
          label="Dodaj uzytkownika"
          @click="visible = true"
        />
        <Dialog
          v-model:visible="visible"
          modal
        >
          <AddUserFroms />
        </Dialog>
      </template>
      <Column
        field="username"
        header="username"
      />
      <Column
        field="firstName"
        header="Imie"
      />
      <Column
        field="firstName"
        header="Nazwisko"
      />
      <Column
        field="roles"
        header="Role"
      />
      <Column>
        <template #body="{ data }">
          <Button icon="pi pi-pencil" />
          <Button
            icon="pi pi-trash"
            @click="handleDeleteUser(data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUser } from '@/composables/useUser'
import AddUserFroms from '~/components/forms/AddUserFroms.vue'

const toast = useToast()
const visible = ref(false)
const { fetchUsers, deleteUser } = useUser()

const users = await fetchUsers()

const handleDeleteUser = (guid: string) => {
  deleteUser(guid)
  toast.add({ severity: 'error', summary: 'Delete user', detail: 'Message Content', life: 3000 })
}
onMounted(async () => {
  await fetchUsers()
})
</script>
