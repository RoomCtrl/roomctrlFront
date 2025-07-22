export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})
