import { AuthService } from '~/services/AuthService'

export const useAuth = () => {
  const user = useState('auth.user', () => null)
  const token = useState('auth.token', () => null)
  const loading = useState('auth.loading', () => false)
  const authService = new AuthService()

  const login = async (credentials) => {
    loading.value = true

    try {
      const result = await authService.login(credentials)

      // Aktualizuj stan
      user.value = result.user
      token.value = result.token

      return result
    }
    catch (error) {
      throw error
    }
    finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true

    try {
      await authService.logout(token.value)

      // Wyczyść stan
      user.value = null
      token.value = null

      await navigateTo('/login')
    }
    catch (error) {
      console.error('Błąd podczas wylogowania:', error)
    }
    finally {
      loading.value = false
    }
  }

  const checkAuth = async () => {
    // Nie sprawdzaj auth podczas SSR
    if (import.meta.server) {
      return false
    }

    loading.value = true

    try {
      // Sprawdź token w stanie
      let currentToken = token.value

      // Jeśli nie ma tokenu w stanie, sprawdź storage
      if (!currentToken) {
        currentToken = authService.getStoredToken()
        if (currentToken) {
          token.value = currentToken
        }
      }

      if (!currentToken) {
        return false
      }

      // Waliduj token
      const validation = await authService.validateToken(currentToken)

      if (validation.valid) {
        user.value = validation.user
        return true
      }
      else {
        // Token nieprawidłowy, wyczyść
        await logout()
        return false
      }
    }
    catch (error) {
      console.error('Błąd podczas sprawdzania autoryzacji:', error)
      await logout()
      return false
    }
    finally {
      loading.value = false
    }
  }

  const refreshToken = async () => {
    if (!token.value) {
      return false
    }

    try {
      const newToken = await authService.refreshUserToken(token.value)
      token.value = newToken
      return true
    }
    catch (error) {
      console.error('Błąd podczas odświeżania tokenu:', error)
      await logout()
      return false
    }
  }

  const isAuthenticated = computed(() => {
    return !!user.value && !!token.value
  })

  return {
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    isAuthenticated,
    login,
    logout,
    checkAuth,
    refreshToken,
  }
}
