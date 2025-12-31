export interface IBooking {
  id: string
  title: string
  startedAt: string
  endedAt: string
  participants: number
  isPrivate: boolean
}

export interface IEquipment {
  name: string
  category: string
  quantity: number
}

export interface IAirConditioning {
  min: number
  max: number
}

export interface IRoomCard {
  roomId: string
  roomName: string
  status: 'available' | 'out_of_use'
  capacity: number
  size: number
  location: string
  access: string
  description: string
  lighting: string
  airConditioning: {
    min: number
    max: number
  }
  imagePath?: string
  equipment: IEquipment[]
  currentBooking?: IBooking
  nextBookings?: IBooking[]
}

export interface IRoomDetails {
  roomId: string
  roomName: string
  status: 'available' | 'occupied' | 'maintenance'
  capacity: number
  size: number
  location: string
  equipment: IEquipment[]
  currentBooking?: IBooking
  access: string
  nextBookings?: IBooking[]
  description: string
  lighting: string
  airConditioning: IAirConditioning
  isFavorite?: boolean
}

export interface IRoomCreateRequest {
  roomName: string
  capacity: number
  size: number
  location: string
  access: string
  description: string
  lighting: string
  airConditioning: IAirConditioning
  equipment: IEquipment[]
  organizationId?: string
}

export interface IRoomImagesResponse {
  code: number
  imagePaths: string[]
}

export interface IRoomUpdateRequest extends Partial<IRoomCreateRequest> {}
