import { useAuth } from '~/composables/useAuth'
import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import type { IChangePasswordForm, IUpdateUserProfileForm, IUserAddResponse, IUserResponse } from '~/interfaces/UsersInterfaces'

export class UserRepository {
  private token: string | null = null

  constructor() {
    const { token } = useAuth()
    this.token = token.value
  }

  async getUsers(withDetails: boolean): Promise<IUserResponse[]> {
    return await fetch(`/api/v1/users?withDetails=${withDetails}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }

  async addUser(newUser: IUserAddResponse) {
    return await fetch('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }

  async getUser(guid: string, withDetails: boolean): Promise<IUserResponse> {
    return await fetch(`/api/v1/users/${guid}?withDetails=${withDetails}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }

  async updateUser(guid: string, updatedUser: IAddUserForm) {
    return await fetch(`/api/v1/users/${guid}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
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

  async updateUserProfile(guid: string, updatedProfile: IUpdateUserProfileForm) {
    return await fetch(`/api/v1/users/${guid}/profile`, {
      method: 'PUT',
      body: JSON.stringify(updatedProfile),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }

  async changePassword(guid: string, passwordData: IChangePasswordForm) {
    return await fetch(`/api/v1/users/${guid}/change-password`, {
      method: 'POST',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(res => res.json())
  }
}
