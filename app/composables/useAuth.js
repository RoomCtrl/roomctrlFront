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
      user.value = result.user
      token.value = result.token
      return result
    }
    finally {
      loading.value = false
    }
  }

  const logout = async (redirectTo) => {
    loading.value = true
    try {
      await authService.logout(token.value)
      user.value = null
      token.value = null
      if (import.meta.client) {
        window.location.href = redirectTo || '/'
      }
    }
    finally {
      loading.value = false
    }
  }

  const checkAuth = async () => {
    loading.value = true
    try {
      let currentToken = token.value

      if (!currentToken) {
        currentToken = authService.getStoredToken()
        if (currentToken) {
          token.value = currentToken
        }
      }

      if (!currentToken) {
        return false
      }

      if (authService.isTokenExpired?.(currentToken)) {
        await logout()
        return false
      }

      const validation = await authService.validateToken(currentToken)
      if (validation.valid) {
        user.value = validation.user
        return true
      }
      else {
        await logout()
        return false
      }
    }
    catch {
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
    catch {
      await logout()
      return false
    }
  }

  const syncFromStorage = () => {
    if (!token.value) {
      const storedToken = authService.getStoredToken()
      if (storedToken) {
        token.value = storedToken
      }
    }

    if (!user.value) {
      const storedUser = authService.getStoredUser()
      if (storedUser) {
        user.value = storedUser
      }
    }
  }

  const isAuthenticated = computed(() => {
    return !!user.value && !!token.value
  })

  if (import.meta.server) {
    syncFromStorage()
  }

  return {
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    isAuthenticated,
    login,
    logout,
    checkAuth,
    refreshToken,
    syncFromStorage,
  }
}
