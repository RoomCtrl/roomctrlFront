// middleware/admin.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Na serwerze nie sprawdzamy auth, bo nie ma localStorage
  if (import.meta.server) {
    return
  }

  const { checkAuth, isAdmin, syncFromStorage, isAuthenticated, user } = useAuth()
  const localePath = useLocalePath()
  
  // Synchronizuj dane z localStorage
  syncFromStorage()
  
  // Czekaj krótką chwilę na załadowanie danych
  await new Promise(resolve => setTimeout(resolve, 10))
  
  // Jeśli użytkownik i token są dostępne lokalnie
  if (isAuthenticated.value && user.value) {
    // Sprawdź czy jest adminem na podstawie lokalnych danych
    if (!isAdmin.value) {
      return navigateTo(localePath('/unauthorized'))
    }
    // Waliduj token w tle, nie blokując nawigacji
    checkAuth().catch(() => {})
    return
  }
  
  // Jeśli nie ma danych lokalnych, wykonaj pełną walidację
  const authResult = await checkAuth()

  if (!authResult) {
    return navigateTo(localePath('/login'))
  }

  if (!isAdmin.value) {
    return navigateTo(localePath('/unauthorized'))
  }
})
