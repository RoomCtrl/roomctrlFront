export interface IBookingParticipant {
  id: string
  username: string
  firstName: string
  lastName: string
}

export interface IBookingRoom {
  id: string
  roomName: string
  location: string
}

export interface IBookingUser {
  id: string
  username: string
  firstName: string
  lastName: string
}

export interface IBooking {
  id: string
  title: string
  startedAt: string
  endedAt: string
  participantsCount: number
  participants: IBookingParticipant[]
  isPrivate: boolean
  room: IBookingRoom | null
  user: IBookingUser
  createdAt: string
}

export interface IBookingCreateRequest {
  title: string
  startedAt: string
  endedAt: string
  participantsCount?: number
  participantIds?: string[]
  isPrivate?: boolean
  roomId: string
}

export interface IBookingUpdateRequest extends Partial<IBookingCreateRequest> {
  status?: 'active' | 'cancelled' | 'completed'
}

export interface IBookingStats {
  count: number
  active: number
  completed: number
  cancelled: number
}

export interface IBookingRecurringRequest {
  roomId: string
  type: 'cleaning' | 'maintenance'
  startTime: string
  endTime: string
  daysOfWeek: number[]
  weeksAhead: number
}
