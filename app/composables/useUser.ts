import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import type { IUserAddResponse, IUserResponse } from '~/interfaces/UsersInterfaces'
import { UserService } from '~/services/UserService'

export const useUser = () => {
  const userService = new UserService()
  const users = ref<IUserResponse[]>([])
  const loading = ref(false)

  const fetchUsers = async (withDetails: boolean) => {
    loading.value = true
    users.value = await userService.getUsers(withDetails)
    loading.value = false
  }

  const fetchUser = async (guid: string, withDetails: boolean) => {
    const user = await userService.getUser(guid, withDetails)

    return user
  }

  const deleteUser = async (guid: string) => {
    users.value = users.value.filter(user => user.id !== guid)

    await userService.deleteUser(guid)
  }

  const addUser = async (newUser: IUserAddResponse) => {
    await userService.addUser(newUser)
  }

  const updateUser = async (guid: string, updatedUser: IAddUserForm) => {
    await userService.updateUser(guid, updatedUser)
  }

  return {
    fetchUsers,
    fetchUser,
    deleteUser,
    addUser,
    updateUser,

    loading,
    users,
  }
}
