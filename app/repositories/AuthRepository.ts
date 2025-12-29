import type { ICredentials, IGetUserProfileResponse, ILoginResponse, IPasswordResetRequest, IPasswordResetConfirm, IPasswordResetResponse, IRegisterRequest } from '~/interfaces/RepositoriesInterface'

export class AuthRepository {
  async login(credentials: ICredentials): Promise<ILoginResponse> {
    return await $fetch('/api/login_check', {
      method: 'POST',
      body: credentials,
    })
  }

  async getUserProfile(token: string, withOrganization: boolean = true): Promise<IGetUserProfileResponse> {
    const params = new URLSearchParams()
    if (withOrganization) {
      params.append('withOrganization', 'true')
    }

    return await $fetch(`/api/me?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  async refreshToken(token: string): Promise<string> {
    return await $fetch('/api/token_refresh', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  async passwordResetRequest(data: IPasswordResetRequest): Promise<IPasswordResetResponse> {
    return await $fetch('/api/users/password_reset/request', {
      method: 'POST',
      body: data,
    })
  }

  async passwordResetConfirm(data: IPasswordResetConfirm): Promise<IPasswordResetResponse> {
    return await $fetch('/api/users/password_reset/confirm', {
      method: 'POST',
      body: data,
    })
  }

  async register(data: IRegisterRequest): Promise<void> {
    return await $fetch('/api/register', {
      method: 'POST',
      body: data,
    })
  }
}
