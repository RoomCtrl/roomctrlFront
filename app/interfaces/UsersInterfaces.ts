interface IUser {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  roles: string[]
  firstLoginStatus: true
}

export interface IUserResponse extends IUser {
  organization: {
    id: string
    regon: string
    name: string
    email: string
  }
}

export interface IUserAddResponse extends IUser {
  password: string
  organizationId: string
}

export interface IUpdateUserProfileForm {
  firstName: string
  lastName: string
  phone: string
  email?: string
}

export interface IChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface IUserPreferences {
  language: 'pl' | 'en'
  notifications: boolean
  darkMode: boolean
}
