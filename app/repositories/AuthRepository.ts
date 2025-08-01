import type { ICredentials, IGetUserProfileResponse, ILoginResponse } from '~/interfaces/RepositoriesInterface'

export class AuthRepository {
  async login(credentials: ICredentials): Promise<ILoginResponse> {
    return await $fetch('/api/v1/login_check', {
      method: 'POST',
      body: credentials,
    })
  }

  async getUserProfile(token: string): Promise<IGetUserProfileResponse> {
    return await $fetch('/api/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  async refreshToken(token: string): Promise<string> {
    return await $fetch('/api/v1/token_refresh', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
