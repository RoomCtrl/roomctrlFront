import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import { UserService } from '~/services/UserService'

export const useUser = () => {
  const userService = new UserService()

  const fetchUsers = async () => {
    return await userService.getUsers()
  }

  const fetchUser = async (guid: string) => {
    await userService.getUser(guid)
  }

  const deleteUser = async (guid: string) => {
    await userService.deleteUser(guid)
    fetchUsers()
  }

  const addUser = async (newUser: IAddUserForm) => {
    await userService.addUser(newUser)
  }

  return {
    fetchUsers,
    fetchUser,
    deleteUser,
    addUser,
  }
}
