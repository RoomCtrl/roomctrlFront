export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, syncFromStorage } = useAuth()

  syncFromStorage()

  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})
