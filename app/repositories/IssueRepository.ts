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

  async getIssues(status?: 'open' | 'in_progress' | 'closed'): Promise<IIssuesDataResponse[]> {
    const url = status ? `/api/issues?status=${status}` : '/api/issues'
    return await $fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getCurrentUserIssues(status?: 'open' | 'in_progress' | 'closed'): Promise<IIssuesDataResponse[]> {
    const url = status ? `/api/issues/my?status=${status}` : '/api/issues/my'
    return await $fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getIssueById(issueId: string): Promise<IIssueData> {
    return await $fetch(`/api/issues/${issueId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async createIssue(newIssue: IIssueCreateResponse) {
    return await $fetch('/api/issues', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: newIssue,
    })
  }

  async createIssueNewNote(issueId: string, noteContent: string) {
    return await $fetch(`/api/issues/${issueId}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: { content: noteContent },
    })
  }

  async deleteIssue(issueId: string) {
    return await $fetch(`/api/issues/${issueId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async updateIssueStatusOrPriority(issueId: string, updatedFields: IIssueNewStatusOrPriority) {
    return await $fetch(`/api/issues/${issueId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: updatedFields,
    })
  }
}
