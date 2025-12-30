import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import type { IUserAddResponse, IUserResponse } from '~/interfaces/UsersInterfaces'
import { UserService } from '~/services/UserService'

export const useUser = () => {
  const userService = new UserService()
  const users = useState<IUserResponse[]>('users', () => [])
  const loading = useState<boolean>('users-loading', () => false)

  const fetchUsers = async (withDetails: boolean) => {
    loading.value = true
    try {
      users.value = await userService.getUsers(withDetails)
    }
    finally {
      loading.value = false
    }
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
    await fetchUsers(false)
  }

  const updateUser = async (guid: string, updatedUser: IAddUserForm) => {
    await userService.updateUser(guid, updatedUser)
    await fetchUsers(false)
  }

  const fetchUserNotifications = async () => {
    const notifications = await userService.getUserNotifications()
    return notifications
  }

  const updateUserNotifications = async (emailNotificationsEnabled: boolean) => {
    await userService.updateUserNotifications(emailNotificationsEnabled)
  }

  return {
    fetchUsers,
    fetchUser,
    fetchUserNotifications,
    deleteUser,
    addUser,
    updateUser,
    updateUserNotifications,

    loading,
    users,
  }
}
