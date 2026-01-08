import type { IIssueCreateResponse, IIssueData, IIssueNewStatusOrPriority, IIssuesDataResponse } from '~/interfaces/IssuesInterfaces'
import { IssueService } from '~/services/IssueService'

export const useIssue = () => {
  const { token } = useAuth()

  const issues = useState<IIssuesDataResponse[]>('issues', () => [])
  const issue = useState<IIssueData | null>('issue', () => null)
  const loading = useState<boolean>('issues-loading', () => false)
  const error = useState<string | null>('issues-error', () => null)

  const getIssueService = () => new IssueService(token.value)

  const fetchIssues = async (status?: 'open' | 'in_progress' | 'closed') => {
    loading.value = true
    error.value = null
    try {
      issues.value = await getIssueService().getIssues(status)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu zgłoszeń'
    }
    finally {
      loading.value = false
    }
  }

  const fetchCurrentUserIssues = async (status?: 'open' | 'in_progress' | 'closed') => {
    loading.value = true
    error.value = null
    try {
      issues.value = await getIssueService().getCurrentUserIssues(status)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu zgłoszeń'
    }
    finally {
      loading.value = false
    }
  }

  const fetchIssueById = async (issueId: string) => {
    loading.value = true
    error.value = null
    try {
      issue.value = await getIssueService().getIssueById(issueId)
    }
    catch
    (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu szczegółów zgłoszenia'
    }
    finally {
      loading.value = false
    }
  }

  const createIssue = async (newIssue: IIssueCreateResponse) => {
    return getIssueService().createIssue(newIssue)
  }

  const createIssueNewNote = async (issueId: string, noteContent: string) => {
    try {
      return await getIssueService().createIssueNewNote(issueId, noteContent)
    }
    finally {
      await fetchIssueById(issueId)
    }
  }

  const deleteIssue = async (issueId: string) => {
    return getIssueService().deleteIssue(issueId)
  }

  const updateIssueStatusOrPriority = async (
    issueId: string,
    updatedFields: IIssueNewStatusOrPriority,
  ) => {
    loading.value = true
    error.value = null
    try {
      await getIssueService().updateIssueStatusOrPriority(issueId, updatedFields)
      await fetchIssues()
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy aktualizacji zgłoszenia'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  return {
    issues,
    issue,
    loading,
    error,
    fetchIssues,
    fetchCurrentUserIssues,
    fetchIssueById,
    createIssue,
    createIssueNewNote,
    deleteIssue,
    updateIssueStatusOrPriority,
  }
}
