import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import type { IOrganization } from '~/interfaces/OrganizationInterfaces'
import type { IUserAddResponse, IUserResponse } from '~/interfaces/UsersInterfaces'
import { UserService } from '~/services/UserService'

export const useUser = () => {
  const userService = new UserService()
  const users = useState<IUserResponse[]>('users', () => [])
  const loading = useState<boolean>('users-loading', () => false)
  const error = useState<string | null>('users-error', () => null)

  const formatError = (err: any): string => {
    if (err.violations && Array.isArray(err.violations)) {
      return err.violations.map((v: any) => `${v.field}: ${v.message}`).join(', ')
    }
    return err.message || 'An unknown error occurred.'
  }

  const fetchUsers = async (withDetails: boolean) => {
    loading.value = true
    error.value = null
    try {
      users.value = await userService.getUsers(withDetails)
    }
    catch (err: any) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const fetchUser = async (guid: string, withDetails: boolean) => {
    loading.value = true
    error.value = null
    try {
      const user = await userService.getUser(guid, withDetails)
      return user
    }
    catch (err: any) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const deleteUser = async (guid: string) => {
    loading.value = true
    error.value = null
    try {
      await userService.deleteUser(guid)
      users.value = users.value.filter(user => user.id !== guid)
    }
    catch (err: any) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const addUser = async (newUser: IUserAddResponse) => {
    loading.value = true
    error.value = null
    try {
      await userService.addUser(newUser)
    }
    catch (err: any) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const updateUser = async (guid: string, updatedUser: IAddUserForm) => {
    loading.value = true
    error.value = null
    try {
      await userService.updateUser(guid, updatedUser)
      await fetchUsers(false)
    }
    catch (err: any) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const fetchUserNotifications = async () => {
    loading.value = true
    error.value = null
    try {
      const notifications = await userService.getUserNotifications()
      return notifications
    }
    catch (err: any) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const updateUserNotifications = async (emailNotificationsEnabled: boolean) => {
    loading.value = true
    error.value = null
    try {
      await userService.updateUserNotifications(emailNotificationsEnabled)
    }
    catch (err: any) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const updateOrganization = async (organizationId: string, newData: IOrganization) => {
    loading.value = true
    error.value = null
    try {
      await userService.updateOrganization(organizationId, newData)
    }
    catch (err: any) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  return {
    fetchUsers,
    fetchUser,
    fetchUserNotifications,
    deleteUser,
    addUser,
    updateUser,
    updateUserNotifications,
    updateOrganization,

    loading,
    error,
    users,
  }
}
