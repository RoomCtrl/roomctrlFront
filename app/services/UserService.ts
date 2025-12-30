import type { IAddUserForm } from '~/interfaces/FormInterfaces'
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
    return await this.repository.addUser(newUser)
  }

  async deleteUser(guid: string) {
    return await this.repository.deletelUser(guid)
  }

  async updateUser(guid: string, updatedUser: IAddUserForm) {
    return await this.repository.updateUser(guid, updatedUser)
  }

  async updateUserProfile(guid: string, updatedProfile: IUpdateUserProfileForm) {
    return await this.repository.updateUserProfile(guid, updatedProfile)
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
}
