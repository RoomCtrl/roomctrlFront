import type { ICredentials, IGetUserProfileResponse, ILoginResponse, IPasswordResetRequest, IPasswordResetConfirm, IPasswordResetResponse } from '~/interfaces/RepositoriesInterface'

export class AuthRepository {
  async login(credentials: ICredentials): Promise<ILoginResponse> {
    return await $fetch('/api/login_check', {
      method: 'POST',
      body: credentials,
    })
  }

  async getUserProfile(token: string): Promise<IGetUserProfileResponse> {
    return await $fetch('/api/me', {
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
}
