export default defineNuxtPlugin(async () => {
  const { checkAuth } = useAuth()

  // Sprawdź autentykację przy starcie aplikacji
  await checkAuth()
})
