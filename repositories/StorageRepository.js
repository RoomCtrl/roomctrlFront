export class StorageRepository {
  constructor() {
    this.tokenKey = 'auth.token'
    this.userKey = 'auth.user'
  }

  saveToken(token) {
    if (import.meta.client) {
      localStorage.setItem(this.tokenKey, token)
    }
  }

  getToken() {
    if (import.meta.client) {
      return localStorage.getItem(this.tokenKey)
    }
    return null
  }

  saveUser(user) {
    if (import.meta.client) {
      localStorage.setItem(this.userKey, JSON.stringify(user))
    }
  }

  getUser() {
    if (import.meta.client) {
      const userData = localStorage.getItem(this.userKey)
      return userData ? JSON.parse(userData) : null
    }
    return null
  }

  clearAll() {
    if (import.meta.client) {
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem(this.userKey)
    }
  }

  // Opcjonalnie: obsługa cookies dla SSR
  saveTokenToCookie(token) {
    const tokenCookie = useCookie('auth.token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 dni
    })
    tokenCookie.value = token
  }

  getTokenFromCookie() {
    const tokenCookie = useCookie('auth.token')
    return tokenCookie.value
  }
}
