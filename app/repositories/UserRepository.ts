import { useAuth } from '~/composables/useAuth'
import type { IAddUserForm } from '~/interfaces/FormInterfaces'

export class UserRepository {
  private token: string | null = null

  constructor() {
    const { token } = useAuth()
    this.token = token.value
  }

  async getUsers() {
    return await fetch('/api/v1/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }

  async getUser(guid: string) {
    return await fetch(`/api/v1/users/${guid}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }

  async addUser(newUser: IAddUserForm) {
    return await fetch('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }

  async deletelUser(guid: string) {
    return await fetch(`/api/v1/users/${guid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }

  async updateUser(guid: string) {
    return await fetch(`/api/v1/users/${guid}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }
}
