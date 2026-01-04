export default defineNuxtPlugin(async () => {
  const { syncFromStorage, checkAuth, isAuthenticated, startSessionMonitoring } = useAuth()

  // Synchronizuj dane z localStorage
  syncFromStorage()

  // Jeśli użytkownik jest zalogowany, zwaliduj token
  if (isAuthenticated.value) {
    await checkAuth()
    
    // Uruchom monitorowanie sesji
    if (isAuthenticated.value) {
      startSessionMonitoring()
    }
  }
})
