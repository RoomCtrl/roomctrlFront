import { useAuth } from '~/composables/useAuth'
import type { IAddUserForm } from '~/interfaces/FormInterfaces'
import type { IOrganization } from '~/interfaces/OrganizationInterfaces'
import type { IChangePasswordForm, IUpdateUserProfileForm, IUserAddResponse, IUserResponse } from '~/interfaces/UsersInterfaces'

export class UserRepository {
  private token: string | null = null

  constructor() {
    const { token } = useAuth()
    this.token = token.value
  }

  async getUsers(withDetails: boolean): Promise<IUserResponse[]> {
    return await $fetch(`/api/users?withDetails=${withDetails}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async addUser(newUser: IUserAddResponse) {
    return $fetch('/api/users', {
      method: 'POST',
      body: newUser,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })
  }

  async getUser(guid: string, withDetails: boolean): Promise<IUserResponse> {
    return $fetch(`/api/users/${guid}?withDetails=${withDetails}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async updateUser(guid: string, updatedUser: IAddUserForm) {
    return $fetch(`/api/users/${guid}`, {
      method: 'PUT',
      body: updatedUser,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })
  }

  async deletelUser(guid: string) {
    return $fetch(`/api/users/${guid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async updateUserProfile(guid: string, updatedProfile: IUpdateUserProfileForm) {
    return $fetch(`/api/v1/users/${guid}/profile`, {
      method: 'PUT',
      body: updatedProfile,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })
  }

  async changePassword(guid: string, passwordData: IChangePasswordForm) {
    return $fetch(`/api/v1/users/${guid}/change-password`, {
      method: 'POST',
      body: passwordData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })
  }

  async getUserNotifications(): Promise<boolean> {
    return $fetch('/api/users/settings/notifications', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async updateUserNotifications(emailNotificationsEnabled: boolean) {
    return $fetch('/api/users/settings/notifications', {
      method: 'PATCH',
      body: { emailNotificationsEnabled },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })
  }

  async updateOrganization(organizationId: string, newData: IOrganization) {
    return $fetch(`/api/organizations/${organizationId}`, {
      method: 'PUT',
      body: newData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })
  }
}
