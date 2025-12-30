import type { IIssueCreateResponse, IIssueNewStatusOrPriority } from '~/interfaces/IssuesInterfaces'
import { IssueService } from '~/services/IssueService'

export const useIssue = () => {
  const { token } = useAuth()

  const getIssueService = () => new IssueService(token.value)

  const fetchIssues = async () => {
    return getIssueService().getIssues()
  }
  const fetchCurrentUserIssues = async () => {
    return getIssueService().getCurrentUserIssues()
  }
  const fetchIssueById = async (issueId: string) => {
    return getIssueService().getIssueById(issueId)
  }
  const createIssue = async (newIssue: IIssueCreateResponse) => {
    return getIssueService().createIssue(newIssue)
  }
  const createIssueNewNote = async (issueId: string, noteContent: string) => {
    return getIssueService().createIssueNewNote(issueId, noteContent)
  }
  const deleteIssue = async (issueId: string) => {
    return getIssueService().deleteIssue(issueId)
  }
  const updateIssueStatusOrPriority = async (
    issueId: string,
    updatedFields: IIssueNewStatusOrPriority,
  ) => {
    return getIssueService().updateIssueStatusOrPriority(issueId, updatedFields)
  }
  return {
    fetchIssues,
    fetchCurrentUserIssues,
    fetchIssueById,
    createIssue,
    createIssueNewNote,
    deleteIssue,
    updateIssueStatusOrPriority,
  }
}
