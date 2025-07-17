import { AuthRepository } from '~/repositories/AuthRepository'
import { StorageRepository } from '~/repositories/StorageRepository'

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository()
    this.storageRepository = new StorageRepository()
  }

  async login(credentials) {
    try {
      // Wywołaj API logowania
      const loginResponse = await this.authRepository.login(credentials)

      // if (!loginResponse.success || !loginResponse.data?.token) {
      //   throw new Error('Nieprawidłowa odpowiedź serwera')
      // }

      const { token } = loginResponse

      // Pobierz dane użytkownika
      const userData = await this.authRepository.getUserProfile(token)

      // Zapisz token i dane użytkownika
      this.storageRepository.saveToken(token)
      this.storageRepository.saveUser(userData)

      return {
        success: true,
        user: userData,
        token,
      }
    }
    catch (error) {
      throw new Error(error.message || 'Nieoczekiwany błąd podczas logowania')
    }
  }

  async logout() {
    await this.storageRepository.clearToken?.()
    await this.storageRepository.clearAll?.()
  }

  async refreshUserToken(token) {
    try {
      const response = await this.authRepository.refreshToken(token)

      if (response.success && response.data?.token) {
        this.storageRepository.saveToken(response.data.token)
        return response.data.token
      }

      throw new Error('Nie udało się odświeżyć tokenu')
    }
    catch (error) {
      throw new Error(error.message || 'Błąd podczas odświeżania tokenu')
    }
  }

  getStoredToken() {
    return this.storageRepository.getToken()
  }

  getStoredUser() {
    return this.storageRepository.getUser()
  }
}
