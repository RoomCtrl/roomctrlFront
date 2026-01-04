export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const { checkAuth, syncFromStorage, isAuthenticated, logout } = useAuth()
    const localePath = useLocalePath()
    
    // Synchronizuj dane z localStorage
    syncFromStorage()
    
    // Sprawdź czy użytkownik jest zalogowany
    if (!isAuthenticated.value) {
      return navigateTo(localePath('/login'))
    }
    
    // Waliduj token przy każdym przejściu
    const authResult = await checkAuth()

    if (!authResult) {
      // Token wygasł lub jest nieprawidłowy
      // Wyloguj bez przekierowania (aby uniknąć problemów z layoutem)
      await logout()
      return navigateTo(localePath('/login'))
    }
  }
})
