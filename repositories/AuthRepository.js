export class AuthRepository {
  async login(credentials) {
    try {
      const response = await $fetch('/api/v1/login_check', {
        method: 'POST',
        body: credentials,
      })
      console.log(response)
      return response
    }
    catch (error) {
      throw new Error(error.data?.message || 'Błąd podczas logowania')
    }
  }

  async getUserProfile(token) {
    try {
      const response = await $fetch('/api/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    }
    catch (error) {
      throw new Error(error.data?.message || 'Błąd podczas pobierania profilu')
    }
  }

  async refreshToken(token) {
    try {
      const response = await $fetch(`${this.baseUrl}/api/refresh`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    }
    catch (error) {
      throw new Error(error.data?.message || 'Błąd podczas odświeżania tokenu')
    }
  }
}
