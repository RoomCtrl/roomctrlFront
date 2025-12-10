interface IOrganization {
  id: number
  regon: string
  name: string
  email: string
}

export interface ICredentials {
  login: string
  password: string
}

interface IContactDetail {
  id: number
  streetName: string
  streetNumber: string
  flatNumber: string
  postCode: string
  city: string
  email: string
  phone: string
}

export interface ILoginResponse {
  token: string
}

export interface IGetUserProfileResponse {
  id: number
  username: string
  roles: string[]
  firstName: string
  lastName: string
  firstLogonStatus: boolean
}

export interface IUserLoginResponse {
  success: boolean
  user: IGetUserProfileResponse
  token: string
}

export interface IContactMailData {
  name: string
  email: string
  subject: string
  message: string
}

export interface IContactMailResponse {
  code: number
  message: string
}

export interface IPasswordResetRequest {
  email: string
}

export interface IPasswordResetConfirm {
  token: string
  newPassword: string
}

export interface IPasswordResetResponse {
  message: string
}
