interface IBooking {
  title: string
  startedAt: string
  endedAt: string
  participants: number
  isPrivate: boolean
}

interface IEquipment {
  name: string
  category: string
  quantity: number
}

export interface IRoomCard {
  roomId: number
  roomName: string
  status: string
  capacity: number
  size: string
  currentBooking?: IBooking
  nextBookings?: IBooking[]
}

export interface IRoomDetails {
  roomId: number
  roomName: string
  status: string
  capacity: number
  size: string
  location: string
  equipment: IEquipment[]
  currentBooking?: IBooking
  access: string
  nextBookings?: IBooking[]
  description: string
  lighting: string
  airConditioning: string
}
