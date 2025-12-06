import type { IChangePasswordForm, IUpdateUserProfileForm } from '~/interfaces/UsersInterfaces'
import { UserService } from '~/services/UserService'

export const useSettings = () => {
  const userService = new UserService()
  const { user } = useAuth()
  const colorMode = useColorMode()
  const i18n = useI18n()

  const loading = useState<boolean>('settings-loading', () => false)
  const error = useState<string | null>('settings-error', () => null)
  const success = useState<string | null>('settings-success', () => null)
  const passwordChangeLoading = useState<boolean>('settings-password-loading', () => false)

  const resetMessages = () => {
    error.value = null
    success.value = null
  }

  const updateUserProfile = async (updatedProfile: IUpdateUserProfileForm) => {
    const currentUser = user.value as Record<string, unknown> | null
    if (!currentUser || typeof currentUser.id !== 'string') {
      error.value = 'Nie można zidentyfikować użytkownika'
      return false
    }

    loading.value = true
    resetMessages()

    try {
      await userService.updateUserProfile(currentUser.id, updatedProfile)
      success.value = 'Profil został zaktualizowany pomyślnie'

      // Aktualizuj dane użytkownika w auth composable
      if (currentUser) {
        currentUser.firstName = updatedProfile.firstName
        currentUser.lastName = updatedProfile.lastName
        currentUser.phone = updatedProfile.phone
        if (updatedProfile.email) {
          currentUser.email = updatedProfile.email
        }
      }

      return true
    }
    catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Błąd podczas aktualizacji profilu'
      error.value = errorMsg
      return false
    }
    finally {
      loading.value = false
    }
  }

  const changePassword = async (passwordData: IChangePasswordForm) => {
    const currentUser = user.value as Record<string, unknown> | null
    if (!currentUser || typeof currentUser.id !== 'string') {
      error.value = 'Nie można zidentyfikować użytkownika'
      return false
    }

    passwordChangeLoading.value = true
    resetMessages()

    try {
      await userService.changePassword(currentUser.id, passwordData)
      success.value = 'Hasło zostało zmienione pomyślnie'
      return true
    }
    catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Błąd podczas zmiany hasła'
      error.value = errorMsg
      return false
    }
    finally {
      passwordChangeLoading.value = false
    }
  }

  const updateLanguagePreference = async (language: 'pl' | 'en') => {
    i18n.locale.value = language
    localStorage.setItem('language-preference', language)
  }

  const updateDarkModePreference = async (isDark: boolean) => {
    colorMode.preference = isDark ? 'dark' : 'light'
    localStorage.setItem('dark-mode-preference', isDark ? 'dark' : 'light')
  }

  const getLanguagePreference = (): 'pl' | 'en' => {
    const stored = localStorage.getItem('language-preference')
    return (stored as 'pl' | 'en') || 'pl'
  }

  const getDarkModePreference = (): boolean => {
    const stored = localStorage.getItem('dark-mode-preference')
    return stored === 'dark'
  }

  return {
    updateUserProfile,
    changePassword,
    updateLanguagePreference,
    updateDarkModePreference,
    getLanguagePreference,
    getDarkModePreference,
    resetMessages,

    loading,
    error,
    success,
    passwordChangeLoading,
    user,
  }
}
