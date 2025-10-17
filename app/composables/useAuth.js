import { AuthService } from '~/services/AuthService'

export const useAuth = () => {
  const user = useState('auth.user', () => null)
  const token = useState('auth.token', () => null)
  const loading = useState('auth.loading', () => false)
  const roles = useState('auth.roles', () => [])

  const authService = new AuthService()

  const login = async (credentials) => {
    loading.value = true
    try {
      const result = await authService.login(credentials)
      user.value = result.user
      token.value = result.token
      roles.value = result.roles
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
      roles.value = []

      if (import.meta.client && redirectTo) {
        await navigateTo(redirectTo)
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
        roles.value = validation.roles || []
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
      const result = await authService.refreshUserToken(token.value)
      token.value = result.token
      if (result.roles) {
        roles.value = result.roles
      }
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

    if (!roles.value.length) {
      const storedRoles = authService.getStoredRoles?.()
      if (storedRoles) {
        roles.value = storedRoles
      }
    }
  }

  const isAuthenticated = computed(() => {
    return !!user.value && !!token.value
  })

  const isAdmin = computed(() => {
    return roles.value.includes('ROLE_ADMIN')
  })

  const hasRole = (role) => {
    return roles.value.includes(role)
  }

  const hasAnyRole = (rolesList) => {
    return rolesList.some(role => roles.value.includes(role))
  }

  const hasAllRoles = (rolesList) => {
    return rolesList.every(role => roles.value.includes(role))
  }

  if (import.meta.server) {
    syncFromStorage()
  }

  return {
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    roles: readonly(roles),
    isAuthenticated,
    isAdmin,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    login,
    logout,
    checkAuth,
    refreshToken,
    syncFromStorage,
  }
}
