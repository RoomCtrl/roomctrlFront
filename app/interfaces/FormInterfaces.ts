export interface IMailContactUs {
  name: string
  email: string
  subject: string
  messageContent: string
}

export interface IAddUserForm {
  username: string
  password: string
  firstName: string
  lastName: string
  roles: string[]
  firstLoginStatus: boolean
  organizationId: number
  contactDetail: {
    streetName: string
    streetNumber: string
    flatNumber: string
    postCode: string
    city: string
    email: string
    phone: string
  }
}
