import type { IIssueCreateResponse, IIssueData, IIssueNewStatusOrPriority, IIssuesDataResponse } from '~/interfaces/IssuesInterfaces'
import { IssueRepository } from '~/repositories/IssueRepository'

export class IssueService {
  private repository: IssueRepository

  constructor(token?: string | null) {
    this.repository = new IssueRepository(token)
  }

  async getIssues(status?: 'open' | 'in_progress' | 'closed'): Promise<IIssuesDataResponse[]> {
    return this.repository.getIssues(status)
  }

  async getCurrentUserIssues(status?: 'open' | 'in_progress' | 'closed'): Promise<IIssuesDataResponse[]> {
    return this.repository.getCurrentUserIssues(status)
  }

  async getIssueById(issueId: string): Promise<IIssueData> {
    return this.repository.getIssueById(issueId)
  }

  async createIssue(newIssue: IIssueCreateResponse) {
    return this.repository.createIssue(newIssue)
  }

  async createIssueNewNote(issueId: string, noteContent: string) {
    return this.repository.createIssueNewNote(issueId, noteContent)
  }

  async deleteIssue(issueId: string) {
    return this.repository.deleteIssue(issueId)
  }

  async updateIssueStatusOrPriority(
    issueId: string,
    updatedFields: IIssueNewStatusOrPriority,
  ) {
    return this.repository.updateIssueStatusOrPriority(issueId, updatedFields)
  }
}
