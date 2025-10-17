// repositories/StorageRepository.js
export class StorageRepository {
  constructor() {
    this.tokenKey = 'auth.token'
    this.userKey = 'auth.user'
    this.rolesKey = 'auth.roles'
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
      const user = localStorage.getItem(this.userKey)
      return user ? JSON.parse(user) : null
    }
    return null
  }

  saveRoles(roles) {
    if (import.meta.client) {
      localStorage.setItem(this.rolesKey, JSON.stringify(roles))
    }
  }

  getRoles() {
    if (import.meta.client) {
      const roles = localStorage.getItem(this.rolesKey)
      return roles ? JSON.parse(roles) : []
    }
    return []
  }

  async clearAll() {
    if (import.meta.client) {
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem(this.userKey)
      localStorage.removeItem(this.rolesKey)
    }
  }
}
