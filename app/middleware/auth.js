export default defineNuxtRouteMiddleware(async (to, from) => {
  // Uruchom tylko po stronie klienta
  if (import.meta.client) {
    const { checkAuth } = useAuth()
    const isAuthenticated = await checkAuth()

    if (!isAuthenticated) {
      const localePath = useLocalePath()
      return navigateTo(localePath('/login'))
    }
  }
})
