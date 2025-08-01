export class StorageRepository {
  constructor() {
    this.tokenKey = 'auth.token'
    this.userKey = 'auth.user'
  }

  saveToken(token) {
    if (!token) return
    const tokenCookie = useCookie(this.tokenKey, {
      default: () => null,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })
    tokenCookie.value = token
    if (import.meta.client) {
      localStorage.setItem(this.tokenKey, token)
    }
  }

  getToken() {
    const tokenCookie = useCookie(this.tokenKey, {
      default: () => null,
    })
    if (tokenCookie.value) {
      return tokenCookie.value
    }
    if (import.meta.client) {
      const token = localStorage.getItem(this.tokenKey)
      return token || null
    }
    return null
  }

  saveUser(user) {
    if (!user) return
    const userCookie = useCookie(this.userKey, {
      default: () => null,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })
    userCookie.value = user
    if (import.meta.client) {
      localStorage.setItem(this.userKey, JSON.stringify(user))
    }
  }

  getUser() {
    const userCookie = useCookie(this.userKey, {
      default: () => null,
    })
    if (userCookie.value) {
      return userCookie.value
    }
    if (import.meta.client) {
      const userData = localStorage.getItem(this.userKey)
      if (userData) {
        try {
          return JSON.parse(userData)
        }
        catch {
          localStorage.removeItem(this.userKey)
          return null
        }
      }
    }
    return null
  }

  async clearToken() {
    const tokenCookie = useCookie(this.tokenKey)
    tokenCookie.value = null
    if (import.meta.client) {
      localStorage.removeItem(this.tokenKey)
    }
  }

  async clearUser() {
    const userCookie = useCookie(this.userKey)
    userCookie.value = null
    if (import.meta.client) {
      localStorage.removeItem(this.userKey)
    }
  }

  async clearAll() {
    await this.clearToken()
    await this.clearUser()
  }
}
