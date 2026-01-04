// middleware/admin.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Na serwerze nie sprawdzamy auth, bo nie ma localStorage
  if (import.meta.server) {
    return
  }

  const { checkAuth, isAdmin, syncFromStorage, isAuthenticated, logout } = useAuth()
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
    await logout()
    return navigateTo(localePath('/login'))
  }

  // Sprawdź czy użytkownik jest adminem
  if (!isAdmin.value) {
    return navigateTo(localePath('/'))
  }
})
