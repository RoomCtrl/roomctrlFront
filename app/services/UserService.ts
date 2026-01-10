import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import type { IOrganization } from '~/interfaces/OrganizationInterfaces'
import type { IChangePasswordForm, IUpdateUserProfileForm, IUserAddResponse } from '~/interfaces/UsersInterfaces'
import { UserRepository } from '~/repositories/UserRepository'

export class UserService {
  private repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }

  async getUsers(withDetails: boolean) {
    const users = await this.repository.getUsers(withDetails)
    return users
  }

  async getUser(guid: string, withDetails: boolean) {
    const user = await this.repository.getUser(guid, withDetails)
    return user
  }

  async addUser(newUser: IUserAddResponse) {
    try {
      return await this.repository.addUser(newUser)
    }
    catch (error) {
      if (error.data.message === 'This username is already taken.') {
        throw new Error('services.userService.errors.addUser.usernameAlreadyExists')
      }
      else if (error.data.message === 'This email is already in use.') {
        throw new Error('services.userService.errors.addUser.emailAlreadyExists')
      }
      else if (error.data.message === 'This phone number is already in use.') {
        throw new Error('services.userService.errors.addUser.phoneAlreadyExists')
      }
    }
  }

  async deleteUser(guid: string) {
    return await this.repository.deletelUser(guid)
  }

  async updateUser(guid: string, updatedUser: IAddUserForm) {
    try {
      return await this.repository.updateUser(guid, updatedUser)
    }
    catch (error) {
      console.log('service', error.data)
      if (error.data.message === 'This username is already taken.') {
        throw new Error('services.userService.errors.addUser.usernameAlreadyExists')
      }
      else if (error.data.message === 'This email is already in use.') {
        throw new Error('services.userService.errors.addUser.emailAlreadyExists')
      }
      else if (error.data.message === 'This phone number is already in use.') {
        throw new Error('services.userService.errors.addUser.phoneAlreadyExists')
      }
      else {
        throw new Error(error.data.message)
      }
    }
  }

  async updateUserPartially(guid: string, updatedUser: IUpdateUserProfileForm) {
    return await this.repository.updateUserPartrially(guid, updatedUser)
  }

  async changePassword(guid: string, passwordData: IChangePasswordForm) {
    return await this.repository.changePassword(guid, passwordData)
  }

  async getUserNotifications() {
    return await this.repository.getUserNotifications()
  }

  async updateUserNotifications(emailNotificationsEnabled: boolean) {
    return await this.repository.updateUserNotifications(emailNotificationsEnabled)
  }

  async updateOrganization(organizationId: string, newData: IOrganization) {
    return await this.repository.updateOrganization(organizationId, newData)
  }
}
