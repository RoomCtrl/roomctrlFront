export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const { checkAuth, syncFromStorage, isAuthenticated, logout } = useAuth()
    const localePath = useLocalePath()

    syncFromStorage()

    if (!isAuthenticated.value) {
      return navigateTo(localePath('/login'))
    }

    const authResult = await checkAuth()

    if (!authResult) {
      await logout()
      return navigateTo(localePath('/login'))
    }
  }
})
