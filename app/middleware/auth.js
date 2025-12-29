export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const { checkAuth, syncFromStorage, isAuthenticated } = useAuth()
    
    // Najpierw synchronizuj dane z localStorage
    syncFromStorage()
    
    // Jeśli użytkownik jest zalogowany lokalnie, pozwól na nawigację
    if (isAuthenticated.value) {
      // Waliduj token w tle
      checkAuth().catch(() => {
        // Jeśli walidacja się nie powiedzie, nastąpi wylogowanie
      })
      return
    }
    
    // Jeśli nie ma danych lokalnych, wykonaj pełną walidację
    const authResult = await checkAuth()

    if (!authResult) {
      const localePath = useLocalePath()
      return navigateTo(localePath('/login'))
    }
  }
})
