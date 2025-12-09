import type { IContactMailData, IContactMailResponse } from '~/app/interfaces/RepositoriesInterface'

export class MailRepository {
  async contactMail(contactData: IContactMailData): Promise<IContactMailResponse> {
    return await $fetch('/api/contact_mail', {
      method: 'POST',
      body: contactData,
    })
  }
}
