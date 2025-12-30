import { AuthRepository } from '~/repositories/AuthRepository'
import { StorageRepository } from '~/repositories/StorageRepository'

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository()
    this.storageRepository = new StorageRepository()
  }

  async login(credentials) {
    try {
      const { token } = await this.authRepository.login(credentials)
      if (!token) {
        throw new Error('Nieprawidłowa odpowiedź serwera')
      }

      const userData = await this.authRepository.getUserProfile(token)

      this.storageRepository.saveToken(token)
      this.storageRepository.saveUser(userData)

      if (userData.roles) {
        this.storageRepository.saveRoles(userData.roles)
      }

      return {
        success: true,
        user: userData,
        token,
        roles: userData.roles || [],
      }
    }
    catch (error) {
      throw new Error(error.message || 'Nieoczekiwany błąd podczas logowania')
    }
  }

  async logout() {
    await this.storageRepository.clearAll()
  }

  async refreshUserToken(token) {
    try {
      const response = await this.authRepository.refreshToken(token)
      if (response.success && response.data?.token) {
        this.storageRepository.saveToken(response.data.token)

        if (response.data.user?.roles) {
          this.storageRepository.saveRoles(response.data.user.roles)
        }

        return {
          token: response.data.token,
          roles: response.data.user?.roles,
        }
      }
      throw new Error('Nie udało się odświeżyć tokenu')
    }
    catch (error) {
      throw new Error(error.message || 'Błąd podczas odświeżania tokenu')
    }
  }

  async validateToken(token) {
    try {
      const userData = await this.authRepository.getUserProfile(token)
      if (userData) {
        this.storageRepository.saveUser(userData)

        if (userData.roles) {
          this.storageRepository.saveRoles(userData.roles)
        }

        return {
          valid: true,
          user: userData,
          roles: userData.roles || [],
        }
      }
      return { valid: false }
    }
    catch {
      return { valid: false }
    }
  }

  isTokenExpired(token) {
    if (!token) return true
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp < currentTime
    }
    catch {
      return true
    }
  }

  getStoredToken() {
    return this.storageRepository.getToken()
  }

  getStoredUser() {
    return this.storageRepository.getUser()
  }

  getStoredRoles() {
    return this.storageRepository.getRoles()
  }
}
