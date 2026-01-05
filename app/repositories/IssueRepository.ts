import type { IIssueCreateResponse, IIssueData, IIssueNewStatusOrPriority, IIssuesDataResponse } from '~/interfaces/IssuesInterfaces'

export class IssueRepository {
  private token: string | null = null

  constructor(token?: string | null) {
    if (token) {
      this.token = token
    }
    else if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth.token') || null
    }
  }

  async getIssues(): Promise<IIssuesDataResponse[]> {
    return $fetch('/api/issues', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getCurrentUserIssues(): Promise<IIssuesDataResponse[]> {
    return $fetch('/api/issues/my', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getIssueById(issueId: string): Promise<IIssueData> {
    return $fetch(`/api/issues/${issueId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async createIssue(newIssue: IIssueCreateResponse) {
    return $fetch('/api/issues', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: newIssue,
    })
  }

  async createIssueNewNote(issueId: string, noteContent: string) {
    return $fetch(`/api/issues/${issueId}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: { content: noteContent },
    })
  }

  async deleteIssue(issueId: string) {
    return $fetch(`/api/issues/${issueId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async updateIssueStatusOrPriority(issueId: string, updatedFields: IIssueNewStatusOrPriority) {
    return $fetch(`/api/issues/${issueId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: updatedFields,
    })
  }
}
