interface IBooking {
  title: string
  startedAt: string
  endedAt: string
  isPrivate: boolean
}

export interface IRoomCard {
  roomId: number
  roomName: string
  status: string
  capacity: number
  size: string
  currentBooking?: IBooking
  nextBooking?: IBooking
}
