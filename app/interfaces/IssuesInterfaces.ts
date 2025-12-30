export interface IIssueCreateResponse {
  roomId: string
  category: string
  description: string
  priority: string
}

export interface IIssueNewStatusOrPriority {
  status?: string
  priority?: string
}

export interface IIssuesDataResponse {
  id: string
  roomId: string
  roomName: string
  reporterId: string
  reporterName: string
  category: string
  description: string
  status: string
  priority: string
  reportedAt: string
  closedAt?: string
}

export interface IIssueData extends IIssuesDataResponse {
  notes: IIssueNotes[]
  history: IIssueHistory[]
}

interface IIssueNotes {
  id: string
  content: string
  authorId: string
  authorName: string
  createdAt: string
}

interface IIssueHistory {
  id: string
  action: string
  description: string
  userdId: string
  userName: string
  createdAt: string
}
