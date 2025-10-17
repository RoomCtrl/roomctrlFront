import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import { UserRepository } from '~/repositories/UserRepository'

export class UserService {
  private repository: UserRepository

  constructor() {
    this.repository = new UserRepository()
  }

  async getUsers() {
    const users = await this.repository.getUsers()
    return users
  }

  async getUser(guid: string) {
    const user = await this.repository.getUser(guid)
    return user
  }

  async addUser(newUser: IAddUserForm) {
    return await this.repository.addUser(newUser)
  }

  async deleteUser(guid: string) {
    return await this.repository.deletelUser(guid)
  }
}
