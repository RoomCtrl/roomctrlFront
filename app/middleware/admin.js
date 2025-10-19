// middleware/admin.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const { checkAuth, isAdmin } = useAuth()
    const isAuthenticated = await checkAuth()

    if (!isAuthenticated) {
      const localePath = useLocalePath()
      return navigateTo(localePath('/login'))
    }

    if (!isAdmin.value) {
      const localePath = useLocalePath()
      return navigateTo(localePath('/unauthorized')) // lub '/' dla strony głównej
    }
  }
})
