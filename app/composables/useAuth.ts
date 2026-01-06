import type { IAuthUser } from '~/interfaces/UsersInterfaces'
import type { IUserLoginResponse } from '~/interfaces/RepositoriesInterface'
import { AuthService } from '~/services/AuthService'

interface ILoginCredentials {
  username: string
  password: string
}

interface ITokenValidationResponse {
  valid: boolean
  user?: IAuthUser
  roles?: string[]
}

interface IRefreshTokenResponse {
  token: string
  roles?: string[]
}

export const useAuth = () => {
  const user = useState<IAuthUser | null>('auth.user', () => null)
  const token = useState<string | null>('auth.token', () => null)
  const loading = useState<boolean>('auth.loading', () => false)
  const roles = useState<string[]>('auth.roles', () => [])
  const sessionMonitoringInterval = useState<number | null>('auth.sessionMonitoring', () => null)

  const authService = new AuthService()

  const login = async (credentials: ILoginCredentials): Promise<IUserLoginResponse> => {
    loading.value = true
    try {
      const result = await authService.login(credentials)
      user.value = result.user
      token.value = result.token
      roles.value = result.user.roles || []

      if (import.meta.client) {
        startSessionMonitoring()
      }

      return result
    }
    finally {
      loading.value = false
    }
  }

  const logout = async (redirectTo?: string): Promise<void> => {
    loading.value = true

    if (sessionMonitoringInterval.value) {
      clearInterval(sessionMonitoringInterval.value)
      sessionMonitoringInterval.value = null
    }

    try {
      if (token.value) {
        await authService.logout(token.value)
      }
    }
    catch (error) {
      console.error('Logout error:', error)
    }
    finally {
      user.value = null
      token.value = null
      roles.value = []
      loading.value = false

      if (import.meta.client && redirectTo) {
        await navigateTo(redirectTo)
      }
    }
  }

  const checkAuth = async (): Promise<boolean> => {
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

      const validation = await authService.validateToken(currentToken) as ITokenValidationResponse

      if (validation.valid) {
        user.value = validation.user || null
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

  const refreshToken = async (): Promise<boolean> => {
    if (!token.value) {
      return false
    }

    try {
      const result = await authService.refreshUserToken(token.value) as IRefreshTokenResponse
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

  const syncFromStorage = (): void => {
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
      if (storedRoles && Array.isArray(storedRoles)) {
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

  const hasRole = (role: string): boolean => {
    return roles.value.includes(role)
  }

  const hasAnyRole = (rolesList: string[]): boolean => {
    return rolesList.some(role => roles.value.includes(role))
  }

  const hasAllRoles = (rolesList: string[]): boolean => {
    return rolesList.every(role => roles.value.includes(role))
  }

  const startSessionMonitoring = () => {
    if (import.meta.server) return

    if (sessionMonitoringInterval.value) {
      clearInterval(sessionMonitoringInterval.value)
      sessionMonitoringInterval.value = null
    }

    const intervalId = setInterval(async () => {
      if (!isAuthenticated.value) {
        clearInterval(intervalId)
        sessionMonitoringInterval.value = null
        return
      }

      const currentToken = token.value
      if (!currentToken) {
        clearInterval(intervalId)
        sessionMonitoringInterval.value = null
        return
      }

      if (authService.isTokenExpired?.(currentToken)) {
        clearInterval(intervalId)
        sessionMonitoringInterval.value = null
        await logout('/login')
      }
    }, 30000)

    sessionMonitoringInterval.value = intervalId as unknown as number
  }

  const fetchUserProfile = async () => {
    if (!token.value) {
      return null
    }
    try {
      const userProfile = await authService.getUserProfile(token.value)
      user.value = userProfile
    }
    catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
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
    startSessionMonitoring,
    fetchUserProfile,
  }
}
