import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import type { IOrganization } from '~/interfaces/OrganizationInterfaces'
import type { IChangePasswordForm, IUpdateUserProfileForm, IUserAddResponse, IUserResponse } from '~/interfaces/UsersInterfaces'
import { UserService } from '~/services/UserService'

export const useUser = () => {
  const userService = new UserService()
  const users = useState<IUserResponse[]>('users', () => [])
  const loading = useState<boolean>('users-loading', () => false)
  const error = useState<string | null>('users-error', () => null)

  const { t } = useI18n()

  const formatError = (err: any): string => {
    const errorData = err.data

    if (errorData.violations && Array.isArray(errorData.violations)) {
      return errorData.violations.map((v: any) => `${v.field}: ${v.message}`).join(', ')
    }

    if (errorData.message) {
      return errorData.message
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
      await fetchUsers(false)
    }
    catch (err: any) {
      error.value = t(err.message)
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
      console.log('composables', err)
      error.value = t(err.message)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const updateUserPartially = async (guid: string, updatedUser: IUpdateUserProfileForm) => {
    loading.value = true
    error.value = null
    try {
      await userService.updateUserPartially(guid, updatedUser)
    }
    catch (err: any) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const changePassword = async (guid: string, passwordData: IChangePasswordForm) => {
    loading.value = true
    error.value = null
    try {
      await userService.changePassword(guid, passwordData)
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
    updateUserPartially,
    changePassword,

    loading,
    error,
    users,
  }
}
