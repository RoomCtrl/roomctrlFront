import type { IOrganization } from './OrganizationInterfaces'

export interface IAuthUser {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  roles: string[]
  organization?: IOrganization
}

export interface IUser extends IAuthUser {
  isActive: boolean
}

export interface IUserAddResponse extends IUser {
  password: string
  organizationId: string
}

export interface IUserCredentials { 

export interface IUpdateUserProfileForm {
  username: string
  firstName: string
  lastName: string
  phone: string
  email: string
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
