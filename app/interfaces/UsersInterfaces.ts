interface IUser {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  roles: string[]
  firstLoginStatus: true
  organizationId?: string
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
