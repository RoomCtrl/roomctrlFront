export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, syncFromStorage } = useAuth()

  // Synchronizuj dane z localStorage
  syncFromStorage()

  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})
