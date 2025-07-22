import type { IContactMailData } from '~/interfaces/RepositoriesInterface'
import { MailRepository } from '~/repositories/MailRepository'

export const useMailer = () => {
  const mailRepository = new MailRepository()

  const sendContactMessage = async (data: IContactMailData) => {
    return await mailRepository.contactMail(data)
  }

  return {
    sendContactMessage,
  }
}
